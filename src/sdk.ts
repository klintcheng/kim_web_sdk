import { w3cwebsocket, IMessageEvent, ICloseEvent } from 'websocket';
import { Buffer } from 'buffer';
import log from 'loglevel-es';
import { Command, LogicPkt } from './packet';
import { Status } from './lib/common.pb';
import { decodeLoginResp, encodeLoginReq, LoginReq } from './lib/protocol.pb';

export const Ping = new Uint8Array([0, 100, 0, 0, 0, 0])
export const Pong = new Uint8Array([0, 101, 0, 0, 0, 0])

const heartbeatInterval = 10 // seconds

export let sleep = async (second: number): Promise<void> => {
    return new Promise((resolve, _) => {
        setTimeout(() => {
            resolve()
        }, second * 1000)
    })
}

export enum State {
    INIT,
    CONNECTING,
    CONNECTED,
    RECONNECTING,
    CLOSEING,
    CLOSED,
}

export enum LoginState {
    Success = "Success",
    Timeout = "Timeout",
    Loginfailed = "LoginFailed",
    Logined = "Logined",
}

export let doLogin = async (url: string, token: string): Promise<{ status: LoginState, channelId?: string, conn: w3cwebsocket }> => {
    const LoginTimeout = 5 // 5 seconds
    return new Promise((resolve, reject) => {
        let conn = new w3cwebsocket(url)
        conn.binaryType = "arraybuffer"

        // 设置一个登陆超时器
        let tr = setTimeout(() => {
            resolve({ status: LoginState.Timeout, conn: conn });
        }, LoginTimeout * 1000);

        conn.onopen = () => {
            if (conn.readyState === w3cwebsocket.OPEN) {
                log.info("connection established")
                // send handshake request
                let loginReq = LogicPkt.Build(Command.SignIn, "login", encodeLoginReq({
                    token: token,
                    tags: ["web"],
                }))
                conn.send(loginReq.bytes())
            }
        }
        conn.onerror = (error: Error) => {
            clearTimeout(tr)
            // console.debug(error)
            resolve({ status: LoginState.Loginfailed, conn: conn });
        }

        conn.onmessage = (evt) => {
            if (typeof evt.data === 'string') {
                log.debug("Received: '" + evt.data + "'");
                return
            }

            // wating for login response
            let buf = Buffer.from(evt.data)
            let loginResp = LogicPkt.from(buf)
            if (loginResp.header.status != Status.Success) {
                log.error("Login failed: " + loginResp.header.status)
                resolve({ status: LoginState.Loginfailed, channelId: "", conn: conn });
                return
            }
            let resp = decodeLoginResp(loginResp.payload)

            clearTimeout(tr)
            resolve({ status: LoginState.Success, channelId: resp.channelId, conn: conn });
        }

    })
}

export class IMClient {
    wsurl: string
    token: string
    state = State.INIT
    private conn: w3cwebsocket | null
    private lastRead: number
    constructor(url: string, token: string) {
        this.wsurl = url
        this.token = token
        this.conn = null
        this.lastRead = Date.now()
    }
    // 1、登陆
    async login(): Promise<{ status: string }> {
        if (this.state == State.CONNECTED) {
            return { status: LoginState.Logined }
        }
        this.state = State.CONNECTING

        let { status,channelId, conn } = await doLogin(this.wsurl,this.token)
        console.info("login - ", status)

        if (status !== LoginState.Success) {
            this.state = State.INIT
            return { status }
        }
        // overwrite onmessage
        conn.onmessage = (evt: IMessageEvent) => {
            try {
                this.lastRead = Date.now()

                let buf = Buffer.from(<ArrayBuffer>evt.data)
                let command = buf.readInt16BE(0)
                let len = buf.readInt32BE(2)
                console.info(`<<<< received a message ; command:${command} len: ${len}`)
                if (command == 101) {
                    console.info("<<<< received a pong...")
                }
            } catch (error) {
                console.error(evt.data, error)
            }
        }
        conn.onerror = (error) => {
            console.info("websocket error: ", error)
            this.errorHandler(error)
        }
        conn.onclose = (e: ICloseEvent) => {
            console.debug("event[onclose] fired")
            if (this.state == State.CLOSEING) {
                this.onclose("logout")
                return
            }
            this.errorHandler(new Error(e.reason))
        }
        this.conn = conn
        this.state = State.CONNECTED

        this.heartbeatLoop()
        this.readDeadlineLoop()

        return { status }
    }
    logout() {
        if (this.state === State.CLOSEING) {
            return
        }
        this.state = State.CLOSEING
        if (!this.conn) {
            return
        }
        console.info("Connection closing...")
        this.conn.close()
    }
    // 2、心跳
    private heartbeatLoop() {
        console.debug("heartbeatLoop start")

        let loop = () => {
            if (this.state != State.CONNECTED) {
                console.debug("heartbeatLoop exited")
                return
            }

            console.log(`>>> send ping ; state is ${this.state},`)
            this.send(Ping)

            setTimeout(loop, heartbeatInterval * 1000)
        }
        setTimeout(loop, heartbeatInterval * 1000)
    }
    // 3、读超时
    private readDeadlineLoop() {
        console.debug("deadlineLoop start")
        let loop = () => {
            if (this.state != State.CONNECTED) {
                console.debug("deadlineLoop exited")
                return
            }
            if ((Date.now() - this.lastRead) > 3 * heartbeatInterval * 1000) {
                // 如果超时就调用errorHandler处理
                this.errorHandler(new Error("read timeout"))
            }
            setTimeout(loop, 1000)
        }
        setTimeout(loop, 1000)
    }
    // 表示连接中止
    private onclose(reason: string) {
        console.info("connection closed due to " + reason)
        this.state = State.CLOSED
        // 通知上层应用，这里忽略
        // this.closeCallback()
    }
    // 4. 自动重连
    private async errorHandler(error: Error) {
        // 如果是主动断开连接，就没有必要自动重连
        // 比如收到被踢，或者主动调用logout()方法
        if (this.state == State.CLOSED || this.state == State.CLOSEING) {
            return
        }
        this.state = State.RECONNECTING
        console.debug(error)
        // 重连10次
        for (let index = 0; index < 10; index++) {
            try {
                console.info("try to relogin")
                let { status } = await this.login()
                if (status == "Success") {
                    return
                }
            } catch (error) {
                console.warn(error)
            }
            // 重连间隔时间，演示使用固定值
            await sleep(5)
        }
        this.onclose("reconnect timeout")
    }
    private send(data: Buffer | Uint8Array): boolean {
        try {
            if (this.conn == null) {
                return false
            }
            this.conn.send(data)
        } catch (error) {
            // handle write error
            this.errorHandler(new Error("read timeout"))
            return false
        }
        return true
    }
}
