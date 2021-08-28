"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print = exports.LogicPkt = exports.Pong = exports.Ping = exports.MessageType = exports.MagicBasicPktInt = exports.MagicLogicPktInt = exports.Command = exports.Seq = void 0;
var common_1 = require("./proto/common");
var Seq = /** @class */ (function () {
    function Seq() {
    }
    Seq.Next = function () {
        Seq.num++;
        Seq.num = Seq.num % 65536;
        return Seq.num;
    };
    Seq.num = 0;
    return Seq;
}());
exports.Seq = Seq;
var Command;
(function (Command) {
    // login
    Command["SignIn"] = "login.signin";
    Command["SignOut"] = "login.signout";
    // chat
    Command["ChatUserTalk"] = "chat.user.talk";
    Command["ChatGroupTalk"] = "chat.group.talk";
    Command["ChatTalkAck"] = "chat.talk.ack";
    // 离线
    Command["OfflineIndex"] = "chat.offline.index";
    Command["OfflineContent"] = "chat.offline.content";
    // 群管理
    Command["GroupCreate"] = "chat.group.create";
    Command["GroupJoin"] = "chat.group.join";
    Command["GroupQuit"] = "chat.group.quit";
    Command["GroupDetail"] = "chat.group.detail";
})(Command = exports.Command || (exports.Command = {}));
var MagicLogicPkt = new Uint8Array([0xc3, 0x11, 0xa3, 0x65]);
var MagicBasicPkt = new Uint8Array([0xc3, 0x15, 0xa7, 0x65]);
exports.MagicLogicPktInt = Buffer.from(MagicLogicPkt).readInt32BE();
exports.MagicBasicPktInt = Buffer.from(MagicBasicPkt).readInt32BE();
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Text"] = 1] = "Text";
    MessageType[MessageType["Image"] = 2] = "Image";
    MessageType[MessageType["Voice"] = 3] = "Voice";
    MessageType[MessageType["Video"] = 4] = "Video";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
exports.Ping = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 0, 1, 0, 0]);
exports.Pong = new Uint8Array([0xc3, 0x15, 0xa7, 0x65, 0, 2, 0, 0]);
var LogicPkt = /** @class */ (function () {
    function LogicPkt() {
        this.sequence = 0;
        this.status = common_1.Status.Success;
        this.payload = new Uint8Array();
    }
    LogicPkt.build = function (command, dest, payload) {
        if (payload === void 0) { payload = new Uint8Array(); }
        // build LogicPkt
        var message = new LogicPkt();
        message.command = command;
        message.sequence = Seq.Next();
        message.dest = dest;
        if (payload.length > 0) {
            message.payload = payload;
        }
        return message;
    };
    LogicPkt.from = function (buf) {
        var offset = 0;
        var magic = buf.readInt32BE(offset);
        var hlen = 0;
        // 判断前面四个字节是否为Magic
        if (magic == exports.MagicLogicPktInt) {
            offset += 4;
        }
        hlen = buf.readInt32BE(offset);
        offset += 4;
        // 反序列化Header
        var header = common_1.Header.decode(buf.subarray(offset, offset + hlen));
        offset += hlen;
        var message = new LogicPkt();
        // 把header中的属性copy到message
        Object.assign(message, header);
        // 读取payload
        var plen = buf.readInt32BE(offset);
        offset += 4;
        message.payload = buf.subarray(offset, offset + plen);
        return message;
    };
    LogicPkt.prototype.bytes = function () {
        var headerArray = common_1.Header.encode(common_1.Header.fromJSON(this)).finish();
        var hlen = headerArray.length;
        var plen = this.payload.length;
        //| 4bytes magic | 4bytes Header Length| header | 4bytes Payload Length| payload |
        var buf = Buffer.alloc(4 + 4 + hlen + 4 + plen);
        var offset = 0;
        Buffer.from(MagicLogicPkt).copy(buf, offset, 0);
        offset += 4;
        // 4bytes Header Length
        offset = buf.writeInt32BE(hlen, offset);
        // header
        Buffer.from(headerArray).copy(buf, offset, 0);
        offset += hlen;
        // 4bytes Payload Length
        offset = buf.writeInt32BE(plen, offset);
        // payload
        Buffer.from(this.payload).copy(buf, offset, 0);
        return buf;
    };
    return LogicPkt;
}());
exports.LogicPkt = LogicPkt;
var print = function (arr) {
    if (arr == null) {
        return;
    }
    console.info("[" + arr.join(",") + "]");
};
exports.print = print;
//# sourceMappingURL=packet.js.map