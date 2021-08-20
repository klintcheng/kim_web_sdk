import { w3cwebsocket, IMessageEvent, ICloseEvent } from 'websocket';
import { Buffer } from 'buffer';
import log from 'loglevel-es';
import { Command, LogicPkt, MagicBasicPktInt, MessageType, Ping } from './packet';
import { Flag, Status } from './proto/common';
import { LoginReq, LoginResp, MessageReq, MessageResp, MessagePush, GroupCreateResp, GroupGetResp, MessageIndexResp, MessageContentResp, ErrorResp, KickoutNotify, MessageAckReq, MessageIndexReq, MessageIndex, MessageContentReq, MessageContent } from './proto/protocol';
import { doLogin, LoginBody } from './login';
import Long from 'long';

const heartbeatInterval = 55 * 1000 // seconds
const sendTimeout = 5 * 1000 // 10 seconds

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

// 客户端自定义的状态码范围 [10, 100)
export enum KIMStatus {
    RequestTimeout = 10,
    SendFailed = 11,
}

export enum KIMEvent {
    Reconnecting = "Reconnecting", //重连中
    Reconnected = "Reconnected", //重连成功
    Closed = "Closed",
    Kickout = "Kickout", // 被踢
}


export class Response {
    status: number;
    dest?: string;
    payload: Uint8Array
    constructor(status: number, dest?: string, payload: Uint8Array = new Uint8Array()) {
        this.status = status;
        this.dest = dest;
        this.payload = payload;
    }
}

export class Request {
    sendTime: number
    data: LogicPkt
    callback: (response: LogicPkt) => void
    constructor(data: LogicPkt, callback: (response: LogicPkt) => void) {
        this.sendTime = Date.now()
        this.data = data
        this.callback = callback
    }
}

const pageCount = 50

export class OfflineMessages {
    private cli: KIMClient
    private groupmessages = new Map<string, Message[]>()
    private usermessages = new Map<string, Message[]>()
    constructor(cli: KIMClient, indexes: MessageIndex[]) {
        this.cli = cli
        // 通常离线消息的读取是从下向上，因此这里提前倒序下
        for (let index = indexes.length - 1; index >= 0; index--) {
            const idx = indexes[index];
            let message = new Message(idx.messageId, idx.sendTime)
            if (idx.direction == 1) {
                message.sender = cli.account
                message.receiver = idx.accountB
            } else {
                message.sender = idx.accountB
                message.receiver = cli.account
            }

            if (!!idx.group) {
                if (!this.groupmessages.has(idx.group)) {
                    this.groupmessages.set(idx.group, new Array<Message>())
                }
                this.groupmessages.get(idx.group)?.push(message)
            } else {
                if (!this.usermessages.has(idx.accountB)) {
                    this.usermessages.set(idx.accountB, new Array<Message>())
                }
                this.usermessages.get(idx.accountB)?.push(message)
            }
        }
    }
    listGroups(): Array<string> {
        let arr = new Array<string>()
        this.groupmessages.forEach((_, key) => {
            arr.push(key)
        })
        return arr
    }
    listUsers(): Array<string> {
        let arr = new Array<string>()
        this.usermessages.forEach((_, key) => {
            arr.push(key)
        })
        return arr
    }
    /**
     * lazy load group offline messages, the page count is 50
     * @param page page number, start from one
     */
    async loadGroup(group: string, page: number): Promise<Message[]> {
        let messages = this.groupmessages.get(group)
        if (!messages) {
            return new Array<Message>();
        }
        let msgs = await this.lazyLoad(messages, page);
        return msgs
    }
    async loadUser(account: string, page: number): Promise<Message[]> {
        let messages = this.usermessages.get(account)
        if (!messages) {
            return new Array<Message>();
        }
        let msgs = await this.lazyLoad(messages, page);
        return msgs
    }
    async lazyLoad(messages: Array<Message>, page: number): Promise<Array<Message>> {
        let i = (page - 1) * pageCount
        let msgs = messages.slice(i, i + pageCount)
        log.debug(msgs)
        if (!msgs || msgs.length == 0) {
            return new Array<Message>();
        }
        if (!!msgs[0].body) {
            return msgs
        }
        //load from server
        let { status, contents } = await this.loadcontent(msgs.map(idx => idx.messageId))
        if (status != Status.Success) {
            return msgs
        }
        log.debug(`load content ${contents.map(c => c.body)}`)
        if (contents.length == msgs.length) {
            for (let index = 0; index < msgs.length; index++) {
                let msg = msgs[index];
                let original = messages[i + index]
                let content = contents[index]
                Object.assign(msg, content)
                Object.assign(original, content)
            }
        }
        return msgs
    }
    async loadcontent(messageIds: Long[]): Promise<{ status: number, contents: MessageContent[] }> {
        let req = MessageContentReq.encode({ messageIds })
        let pkt = LogicPkt.build(Command.OfflineContent, "", req.finish())
        let resp = await this.cli.request(pkt)
        if (resp.status != Status.Success) {
            let err = ErrorResp.decode(pkt.payload)
            log.error(err)
            return { status: resp.status, contents: new Array<MessageContent>() }
        }
        log.info(resp)
        let respbody = MessageContentResp.decode(resp.payload)
        return { status: resp.status, contents: respbody.contents }
    }
}

export class Message {
    messageId: Long;
    type?: number;
    body?: string;
    extra?: string;
    sender?: string;
    receiver?: string;
    group?: string;
    sendTime: Long;
    constructor(messageId: Long, sendTime: Long) {
        this.messageId = messageId
        this.sendTime = sendTime
    }
}

export class Content {
    type?: number;
    body: string;
    extra?: string;
    constructor(body: string, type: number = MessageType.Text, extra?: string) {
        this.type = type
        this.body = body
        this.extra = extra
    }
}

export class KIMClient {
    wsurl: string
    private req: LoginBody
    state = State.INIT
    channelId: string
    account: string
    private conn?: w3cwebsocket
    private lastRead: number
    private lastMessage?: Message
    private listeners = new Map<string, (e: KIMEvent) => void>()
    private messageCallback: (m: Message) => void
    private offmessageCallback: (m: OfflineMessages) => void
    // 全双工请求队列
    private sendq = new Map<number, Request>()
    constructor(url: string, req: {
        token: string,
        isp?: string,
        zone?: string,
        tags?: string[],
    }) {
        this.wsurl = url
        this.req = req
        this.lastRead = Date.now()
        this.channelId = ""
        this.account = ""
        this.messageCallback = (m: Message) => {
            log.warn(`throw a message from ${m.sender} -- ${m.body}, Please check you had register a onmessage before login`)
        }
        this.offmessageCallback = (m: OfflineMessages) => {
            log.warn(`throw OfflineMessages,Please check you had register a onofflinemessage before login`)
        }
    }
    register(events: string[], callback: (e: KIMEvent) => void) {
        // 注册事件到Client中。
        events.forEach((event) => {
            this.listeners.set(event, callback)
        })
    }
    onmessage(cb: (m: Message) => void) {
        this.messageCallback = cb
    }
    onofflinemessage(cb: (m: OfflineMessages) => void) {
        this.offmessageCallback = cb
    }
    // 1、登录
    async login(): Promise<{ success: boolean, err?: Error }> {
        if (this.state == State.CONNECTED) {
            return { success: false, err: new Error("client has already been connected") }
        }
        this.state = State.CONNECTING
        let { success, err, channelId, account, conn } = await doLogin(this.wsurl, this.req)
        if (!success) {
            this.state = State.INIT
            return { success, err }
        }
        log.info("login - ", success)
        // overwrite onmessage
        conn.onmessage = (evt: IMessageEvent) => {
            try {
                // 重置lastRead
                this.lastRead = Date.now()
                let buf = Buffer.from(<ArrayBuffer>evt.data)
                let magic = buf.readInt32BE()
                if (magic == MagicBasicPktInt) {//目前只有心跳包pong
                    log.debug(`recv a basic packet - ${buf.join(",")}`)
                    return
                }
                let pkt = LogicPkt.from(buf)
                this.packetHandler(pkt)
            } catch (error) {
                log.error(evt.data, error)
            }
        }
        conn.onerror = (error) => {
            log.info("websocket error: ", error)
            this.errorHandler(error)
        }
        conn.onclose = (e: ICloseEvent) => {
            log.debug("event[onclose] fired")
            if (this.state == State.CLOSEING) {
                this.onclose("logout")
                return
            }
            this.errorHandler(new Error(e.reason))
        }
        this.conn = conn
        this.channelId = channelId || ""
        this.account = account || ""
        await this.loadOfflineMessage()
        // success
        this.state = State.CONNECTED
        this.heartbeatLoop()
        this.readDeadlineLoop()
        this.messageAckLoop()
        return { success, err }
    }
    logout() {
        if (this.state === State.CLOSEING) {
            return
        }
        this.state = State.CLOSEING
        if (!this.conn) {
            return
        }
        log.info("Connection closing...")
        this.conn.close()
    }
    /**
    * 给用户dest发送一条消息
    * @param dest 用户账号
    * @param req 请求的消息内容
    * @returns status KIMStatus|Status
    */
    async talkToUser(dest: string, req: Content): Promise<{ status: number, resp?: MessageResp, err?: ErrorResp }> {
        return this.talk(Command.ChatUserTalk, dest, MessageReq.fromJSON(req))
    }
    /**
     * 给群dest发送一条消息
     * @param dest 群ID
     * @param req 请求的消息内容
     * @returns status KIMStatus|Status
     */
    async talkToGroup(dest: string, req: Content): Promise<{ status: number, resp?: MessageResp, err?: ErrorResp }> {
        return this.talk(Command.ChatGroupTalk, dest, MessageReq.fromJSON(req))
    }
    private async talk(command: string, dest: string, req: MessageReq): Promise<{ status: number, resp?: MessageResp, err?: ErrorResp }> {
        let pbreq = MessageReq.encode(req).finish()
        let pkt = LogicPkt.build(command, dest, pbreq)
        let resp = await this.request(pkt)
        if (resp.status != Status.Success) {
            let err = ErrorResp.decode(pkt.payload)
            return { status: resp.status, err: err }
        }
        return { status: resp.status, resp: MessageResp.decode(resp.payload) }
    }
    async request(data: LogicPkt): Promise<Response> {
        return new Promise((resolve, _) => {
            let seq = data.sequence

            let tr = setTimeout(() => {
                // remove from sendq
                this.sendq.delete(seq)
                resolve(new Response(KIMStatus.RequestTimeout))
            }, sendTimeout)

            // asynchronous wait ack from server
            let callback = (pkt: LogicPkt) => {
                clearTimeout(tr)
                // remove from sendq
                this.sendq.delete(seq)
                resolve(new Response(pkt.status, pkt.dest, pkt.payload))
            }
            log.debug(`request seq:${seq} command:${data.command}`)

            this.sendq.set(seq, new Request(data, callback))
            if (!this.send(data.bytes())) {
                resolve(new Response(KIMStatus.SendFailed))
            }
        })
    }
    private fireEvent(event: KIMEvent) {
        let listener = this.listeners.get(event)
        if (!!listener) {
            listener(event)
        }
    }
    private packetHandler(pkt: LogicPkt) {
        log.debug("received packet: ", pkt)
        if (pkt.flag == Flag.Response) {
            let req = this.sendq.get(pkt.sequence)
            if (req) {
                req.callback(pkt)
            } else {
                log.error(`req of ${pkt.sequence} no found in sendq`)
            }
            return
        }
        switch (pkt.command) {
            case Command.ChatUserTalk:
            case Command.ChatGroupTalk:
                let push = MessagePush.decode(pkt.payload)
                let message = new Message(push.messageId, push.sendTime)
                Object.assign(message, push)
                message.receiver = this.account
                if (pkt.command == Command.ChatGroupTalk) {
                    message.group = pkt.dest
                }
                if (!MsgStorage.exist(message.messageId)) {
                    try {
                        this.messageCallback(message)
                    } catch (error) {
                        log.error(error)
                    }
                    MsgStorage.insert(message)
                    // 确保状态处于CONNECTED，才能执行消息ACK
                    if (this.state == State.CONNECTED) {
                        this.lastMessage = message
                    }
                }
                break;
            case Command.SignIn:
                let ko = KickoutNotify.decode(pkt.payload)
                if (ko.channelId == this.channelId) {
                    this.logout()
                    this.fireEvent(KIMEvent.Kickout)
                }
                break;
        }
    }
    // 2、心跳
    private heartbeatLoop() {
        log.debug("heartbeatLoop start")
        let start = Date.now()
        let loop = () => {
            if (this.state != State.CONNECTED) {
                log.debug("heartbeatLoop exited")
                return
            }
            if (Date.now() - start >= heartbeatInterval) {
                log.debug(`>>> send ping ; state is ${this.state}`)
                start = Date.now()
                this.send(Ping)
            }
            setTimeout(loop, 500)
        }
        setTimeout(loop, 500)
    }
    // 3、读超时
    private readDeadlineLoop() {
        log.debug("deadlineLoop start")
        let loop = () => {
            if (this.state != State.CONNECTED) {
                log.debug("deadlineLoop exited")
                return
            }
            if ((Date.now() - this.lastRead) > 3 * heartbeatInterval) {
                // 如果超时就调用errorHandler处理
                this.errorHandler(new Error("read timeout"))
            }
            setTimeout(loop, 500)
        }
        setTimeout(loop, 500)
    }
    private messageAckLoop() {
        let start = Date.now()
        let loop = () => {
            if (this.state != State.CONNECTED) {
                log.debug("messageAckLoop exited")
                return
            }
            if (this.lastMessage && Date.now() - start > 3000) {
                let req = MessageAckReq.encode({ messageId: this.lastMessage.messageId })
                let pkt = LogicPkt.build(Command.ChatTalkAck, "", req.finish())
                start = Date.now()
                this.send(pkt.bytes())
            }
            setTimeout(loop, 500)
        }
        setTimeout(loop, 500)
    }
    private async loadOfflineMessage() {
        log.debug("loadOfflineMessage start")
        // 1. 加载消息索引

        let loadIndex = async (messageId: Long = Long.ZERO): Promise<{ status: number, indexes?: MessageIndex[] }> => {
            let req = MessageIndexReq.encode({ messageId })
            let pkt = LogicPkt.build(Command.OfflineIndex, "", req.finish())
            let resp = await this.request(pkt)
            if (resp.status != Status.Success) {
                let err = ErrorResp.decode(pkt.payload)
                log.error(err)
                return { status: resp.status }
            }
            let respbody = MessageIndexResp.decode(resp.payload)
            return { status: resp.status, indexes: respbody.indexes }
        }
        let offmessages = new Array<MessageIndex>();
        let messageId = MsgStorage.lastId()
        while (true) {
            let { status, indexes } = await loadIndex(messageId)
            if (status != Status.Success) {
                break
            }
            if (!indexes || !indexes.length) {
                break
            }
            messageId = indexes[indexes.length - 1].messageId
            offmessages = offmessages.concat(indexes)

            // indexes.forEach((idx) => {
            //     let message = new Message(idx.messageId, idx.sendTime)
            //     if (idx.direction == 1) {
            //         message.sender = this.account
            //         message.receiver = idx.accountB
            //     } else {
            //         message.sender = idx.accountB
            //         message.receiver = this.account
            //     }
            //     offmessages.push(message)
            // })
        }
        log.info(`load offline indexes - ${offmessages.map(msg => msg.messageId.toString())}`)
        let om = new OfflineMessages(this, offmessages)
        this.offmessageCallback(om)
    }
    // 表示连接中止
    private onclose(reason: string) {
        log.info("connection closed due to " + reason)
        this.state = State.CLOSED
        this.conn = undefined
        this.channelId = ""
        this.account = ""
        // 通知上层应用
        this.fireEvent(KIMEvent.Closed)
    }
    // 4. 自动重连
    private async errorHandler(error: Error) {
        // 如果是主动断开连接，就没有必要自动重连
        // 比如收到被踢，或者主动调用logout()方法
        if (this.state == State.CLOSED || this.state == State.CLOSEING) {
            return
        }
        this.state = State.RECONNECTING
        this.fireEvent(KIMEvent.Reconnecting)
        // 重连10次
        for (let index = 0; index < 10; index++) {
            await sleep(3)
            try {
                log.info("try to relogin")
                let { success, err } = await this.login()
                if (success) {
                    this.fireEvent(KIMEvent.Reconnected)
                    return
                }
                log.info(err)
            } catch (error) {
                log.warn(error)
            }
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
            this.errorHandler(new Error("write timeout"))
            return false
        }
        return true
    }
}

class MsgStorage {
    // 记录一条消息
    static insert(msg: {
        messageId: Long;
        sender?: string;
        group?: string;
        sendTime: Long;
    }): boolean {
        localStorage.setItem(`kim_msg_${msg.messageId.toString()}`, JSON.stringify(msg))
        localStorage.setItem("kim_last", msg.messageId.toString())
        return true
    }
    // 检查消息是否已经保存
    static exist(id: Long): boolean {
        return !!localStorage.getItem(`kim_msg_${id.toString()}`)
    }
    static lastId(): Long {
        return Long.fromString(localStorage.getItem("kim_last") || "0")
    }
}