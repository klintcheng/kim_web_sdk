
import { Header, Flag, Status } from './proto/common';
import log from 'loglevel-es';

export class Seq {
    static num: number = 0
    static Next() {
        Seq.num++
        Seq.num = Seq.num % 65536
        return Seq.num
    }
}

export enum Command {
    // login
    SignIn = "login.signin",
    SignOut = "login.signout",

    // chat
    ChatUserTalk = "chat.user.talk",
    ChatGroupTalk = "chat.group.talk",
    ChatTalkAck = "chat.talk.ack",

    // 离线
    OfflineIndex = "chat.offline.index",
    OfflineContent = "chat.offline.content",

    // 群管理
    GroupCreate = "chat.group.create",
    GroupJoin = "chat.group.join",
    GroupQuit = "chat.group.quit",
    GroupMembers = "chat.group.members",
    GroupDetail = "chat.group.detail",
}

const MagicLogicPkt = new Uint8Array([0xc3, 0x11, 0xa3, 0x65])
const MagicBasicPkt = new Uint8Array([0xc3, 0x15, 0xa7, 0x65])

export const MagicLogicPktInt = Buffer.from(MagicLogicPkt).readInt32BE()
export const MagicBasicPktInt = Buffer.from(MagicBasicPkt).readInt32BE()

export enum MessageType {
    Text = 1, // 文本
    Image = 2, // 图片
    Voice = 3, // 语音
    Video = 4, //视频
}

// LittleEndian
export const Ping = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 1, 0, 0, 0])

export class LogicPkt {
    command?: string;
    channelId?: string;
    sequence: number = 0;
    flag?: number;
    status: number = Status.Success;
    dest?: string;
    payload: Uint8Array
    constructor() {
        this.payload = new Uint8Array();
    }
    static Build(command: string, dest: string, payload: Uint8Array = new Uint8Array()): LogicPkt {
        // build LogicPkt
        let message = new LogicPkt()
        message.command = command
        message.sequence = Seq.Next()
        message.dest = dest

        if (payload.length > 0) {
            message.payload = payload
        }
        return message
    }
    static from(buf: Buffer): LogicPkt {
        let offset = 0
        let magic = buf.readInt32BE(offset)
        let hlen = 0
        if (magic == MagicLogicPktInt) {
            offset += 4
        }
        hlen = buf.readInt32BE(offset)
        offset += 4

        let header = Header.decode(buf.subarray(offset, offset + hlen))
        offset += hlen
        // build message with header
        let message = new LogicPkt()
        Object.assign(message, header)

        let plen = buf.readInt32BE(offset)
        offset += 4
        message.payload = buf.subarray(offset, offset + plen)
        return message
    }
    bytes(): Buffer {
        let headerArray = Header.encode(Header.fromJSON(this)).finish()
        let hlen = headerArray.length
        let plen = this.payload.length
        //| 4bytes magic | 4bytes Header Length| header | 4bytes Payload Length| payload |
        let buf = Buffer.alloc(4 + 4 + hlen + 4 + plen)
        let offset = 0
        Buffer.from(MagicLogicPkt).copy(buf, offset, 0)
        offset += 4
        // 4bytes Header Length
        offset = buf.writeInt32BE(hlen, offset)
        // header
        Buffer.from(headerArray).copy(buf, offset, 0)
        offset += hlen
        // 4bytes Payload Length
        offset = buf.writeInt32BE(plen, offset)
        // payload
        Buffer.from(this.payload).copy(buf, offset, 0)
        return buf
    }
}

export let print = (arr: Uint8Array) => {
    if (arr == null) {
        return
    }
    console.info(`[${arr.join(",")}]`)
}