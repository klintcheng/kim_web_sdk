
import { w3cwebsocket, IMessageEvent, ICloseEvent } from 'websocket';
import { Buffer } from 'buffer';
import log from 'loglevel-es';
import { Command, LogicPkt, MagicBasicPktInt, Ping } from './packet';
import { Flag, Status } from './proto/common';
import { LoginReq, LoginResp, MessageReq, MessageResp, MessagePush, GroupCreateResp, GroupGetResp, MessageIndexResp, MessageContentResp } from './proto/protocol';

const loginTimeout = 10 * 1000 // 10 seconds

export class LoginBody {
    token: string;
    isp?: string;
    zone?: string;
    tags?: string[];
    constructor(token: string, isp?: string, zone?: string, tags?: string[]) {
        this.token = token;
        this.isp = isp;
        this.zone = zone;
        this.tags = tags;
    }
}

export let doLogin = async (url: string, req: LoginBody): Promise<{ success: boolean, err?: Error, channelId?: string, account?: string, conn: w3cwebsocket }> => {
    return new Promise((resolve, _) => {
        let conn = new w3cwebsocket(url)
        conn.binaryType = "arraybuffer"

        // 设置一个登陆超时器
        let tr = setTimeout(() => {
            clearTimeout(tr)
            resolve({ success: false, err: new Error("timeout"), conn: conn });
        }, loginTimeout);

        conn.onopen = () => {
            if (conn.readyState == w3cwebsocket.OPEN) {
                log.info(`connection established, send ${req}`)
                // send handshake request
                let pbreq = LoginReq.encode(LoginReq.fromJSON(req)).finish()
                let loginpkt = LogicPkt.build(Command.SignIn, "", pbreq)
                let buf = loginpkt.bytes()
                log.debug(`dologin send [${buf.join(",")}]`)
                conn.send(buf)
            }
        }
        conn.onerror = (error: Error) => {
            clearTimeout(tr)
            log.warn(error)
            resolve({ success: false, err: error, conn: conn });
        }

        conn.onmessage = (evt) => {
            if (typeof evt.data === 'string') {
                log.warn("Received: '" + evt.data + "'");
                return
            }
            clearTimeout(tr)
            // wating for login response
            let buf = Buffer.from(evt.data)
            let loginResp = LogicPkt.from(buf)
            if (loginResp.status != Status.Success) {
                log.error("Login failed: " + loginResp.status)
                resolve({ success: false, err: new Error(`response status is ${loginResp.status}`), conn: conn });
                return
            }
            let resp = LoginResp.decode(loginResp.payload)
            resolve({ success: true, channelId: resp.channelId, account: resp.account, conn: conn });
        }

    })
}
