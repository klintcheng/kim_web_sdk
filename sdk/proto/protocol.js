"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageContentResp = exports.MessageContent = exports.MessageContentReq = exports.MessageIndex = exports.MessageIndexResp = exports.MessageIndexReq = exports.GroupQuitNotify = exports.GroupJoinNotify = exports.GroupGetResp = exports.Member = exports.GroupGetReq = exports.GroupQuitReq = exports.GroupJoinReq = exports.GroupCreateNotify = exports.GroupCreateResp = exports.GroupCreateReq = exports.MessageAckReq = exports.ErrorResp = exports.MessagePush = exports.MessageResp = exports.MessageReq = exports.Session = exports.KickoutNotify = exports.LoginResp = exports.LoginReq = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "pkt";
var baseLoginReq = { token: "", isp: "", zone: "", tags: "" };
exports.LoginReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.token !== "") {
            writer.uint32(10).string(message.token);
        }
        if (message.isp !== "") {
            writer.uint32(18).string(message.isp);
        }
        if (message.zone !== "") {
            writer.uint32(26).string(message.zone);
        }
        for (var _i = 0, _a = message.tags; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseLoginReq);
        message.tags = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.isp = reader.string();
                    break;
                case 3:
                    message.zone = reader.string();
                    break;
                case 4:
                    message.tags.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseLoginReq);
        message.tags = [];
        if (object.token !== undefined && object.token !== null) {
            message.token = String(object.token);
        }
        else {
            message.token = "";
        }
        if (object.isp !== undefined && object.isp !== null) {
            message.isp = String(object.isp);
        }
        else {
            message.isp = "";
        }
        if (object.zone !== undefined && object.zone !== null) {
            message.zone = String(object.zone);
        }
        else {
            message.zone = "";
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (var _i = 0, _a = object.tags; _i < _a.length; _i++) {
                var e = _a[_i];
                message.tags.push(String(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.token !== undefined && (obj.token = message.token);
        message.isp !== undefined && (obj.isp = message.isp);
        message.zone !== undefined && (obj.zone = message.zone);
        if (message.tags) {
            obj.tags = message.tags.map(function (e) { return e; });
        }
        else {
            obj.tags = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseLoginReq);
        message.tags = [];
        if (object.token !== undefined && object.token !== null) {
            message.token = object.token;
        }
        else {
            message.token = "";
        }
        if (object.isp !== undefined && object.isp !== null) {
            message.isp = object.isp;
        }
        else {
            message.isp = "";
        }
        if (object.zone !== undefined && object.zone !== null) {
            message.zone = object.zone;
        }
        else {
            message.zone = "";
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (var _i = 0, _a = object.tags; _i < _a.length; _i++) {
                var e = _a[_i];
                message.tags.push(e);
            }
        }
        return message;
    },
};
var baseLoginResp = { channelId: "", account: "" };
exports.LoginResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.account !== "") {
            writer.uint32(18).string(message.account);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseLoginResp);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channelId = reader.string();
                    break;
                case 2:
                    message.account = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseLoginResp);
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.account !== undefined && (obj.account = message.account);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseLoginResp);
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = object.channelId;
        }
        else {
            message.channelId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        return message;
    },
};
var baseKickoutNotify = { channelId: "" };
exports.KickoutNotify = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseKickoutNotify);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channelId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseKickoutNotify);
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.channelId !== undefined && (obj.channelId = message.channelId);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseKickoutNotify);
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = object.channelId;
        }
        else {
            message.channelId = "";
        }
        return message;
    },
};
var baseSession = {
    channelId: "",
    gateId: "",
    account: "",
    zone: "",
    isp: "",
    remoteIP: "",
    device: "",
    app: "",
    tags: "",
};
exports.Session = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.gateId !== "") {
            writer.uint32(18).string(message.gateId);
        }
        if (message.account !== "") {
            writer.uint32(26).string(message.account);
        }
        if (message.zone !== "") {
            writer.uint32(34).string(message.zone);
        }
        if (message.isp !== "") {
            writer.uint32(42).string(message.isp);
        }
        if (message.remoteIP !== "") {
            writer.uint32(50).string(message.remoteIP);
        }
        if (message.device !== "") {
            writer.uint32(58).string(message.device);
        }
        if (message.app !== "") {
            writer.uint32(66).string(message.app);
        }
        for (var _i = 0, _a = message.tags; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(74).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseSession);
        message.tags = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channelId = reader.string();
                    break;
                case 2:
                    message.gateId = reader.string();
                    break;
                case 3:
                    message.account = reader.string();
                    break;
                case 4:
                    message.zone = reader.string();
                    break;
                case 5:
                    message.isp = reader.string();
                    break;
                case 6:
                    message.remoteIP = reader.string();
                    break;
                case 7:
                    message.device = reader.string();
                    break;
                case 8:
                    message.app = reader.string();
                    break;
                case 9:
                    message.tags.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseSession);
        message.tags = [];
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        if (object.gateId !== undefined && object.gateId !== null) {
            message.gateId = String(object.gateId);
        }
        else {
            message.gateId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        if (object.zone !== undefined && object.zone !== null) {
            message.zone = String(object.zone);
        }
        else {
            message.zone = "";
        }
        if (object.isp !== undefined && object.isp !== null) {
            message.isp = String(object.isp);
        }
        else {
            message.isp = "";
        }
        if (object.remoteIP !== undefined && object.remoteIP !== null) {
            message.remoteIP = String(object.remoteIP);
        }
        else {
            message.remoteIP = "";
        }
        if (object.device !== undefined && object.device !== null) {
            message.device = String(object.device);
        }
        else {
            message.device = "";
        }
        if (object.app !== undefined && object.app !== null) {
            message.app = String(object.app);
        }
        else {
            message.app = "";
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (var _i = 0, _a = object.tags; _i < _a.length; _i++) {
                var e = _a[_i];
                message.tags.push(String(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.gateId !== undefined && (obj.gateId = message.gateId);
        message.account !== undefined && (obj.account = message.account);
        message.zone !== undefined && (obj.zone = message.zone);
        message.isp !== undefined && (obj.isp = message.isp);
        message.remoteIP !== undefined && (obj.remoteIP = message.remoteIP);
        message.device !== undefined && (obj.device = message.device);
        message.app !== undefined && (obj.app = message.app);
        if (message.tags) {
            obj.tags = message.tags.map(function (e) { return e; });
        }
        else {
            obj.tags = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseSession);
        message.tags = [];
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = object.channelId;
        }
        else {
            message.channelId = "";
        }
        if (object.gateId !== undefined && object.gateId !== null) {
            message.gateId = object.gateId;
        }
        else {
            message.gateId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        if (object.zone !== undefined && object.zone !== null) {
            message.zone = object.zone;
        }
        else {
            message.zone = "";
        }
        if (object.isp !== undefined && object.isp !== null) {
            message.isp = object.isp;
        }
        else {
            message.isp = "";
        }
        if (object.remoteIP !== undefined && object.remoteIP !== null) {
            message.remoteIP = object.remoteIP;
        }
        else {
            message.remoteIP = "";
        }
        if (object.device !== undefined && object.device !== null) {
            message.device = object.device;
        }
        else {
            message.device = "";
        }
        if (object.app !== undefined && object.app !== null) {
            message.app = object.app;
        }
        else {
            message.app = "";
        }
        if (object.tags !== undefined && object.tags !== null) {
            for (var _i = 0, _a = object.tags; _i < _a.length; _i++) {
                var e = _a[_i];
                message.tags.push(e);
            }
        }
        return message;
    },
};
var baseMessageReq = { type: 0, body: "", extra: "" };
exports.MessageReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.body !== "") {
            writer.uint32(18).string(message.body);
        }
        if (message.extra !== "") {
            writer.uint32(26).string(message.extra);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.body = reader.string();
                    break;
                case 3:
                    message.extra = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageReq);
        if (object.type !== undefined && object.type !== null) {
            message.type = Number(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = "";
        }
        if (object.extra !== undefined && object.extra !== null) {
            message.extra = String(object.extra);
        }
        else {
            message.extra = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.type !== undefined && (obj.type = message.type);
        message.body !== undefined && (obj.body = message.body);
        message.extra !== undefined && (obj.extra = message.extra);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageReq);
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = "";
        }
        if (object.extra !== undefined && object.extra !== null) {
            message.extra = object.extra;
        }
        else {
            message.extra = "";
        }
        return message;
    },
};
var baseMessageResp = { messageId: long_1.default.ZERO, sendTime: long_1.default.ZERO };
exports.MessageResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (!message.messageId.isZero()) {
            writer.uint32(8).int64(message.messageId);
        }
        if (!message.sendTime.isZero()) {
            writer.uint32(16).int64(message.sendTime);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageResp);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageId = reader.int64();
                    break;
                case 2:
                    message.sendTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageResp);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = long_1.default.fromString(object.messageId);
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.sendTime !== undefined && object.sendTime !== null) {
            message.sendTime = long_1.default.fromString(object.sendTime);
        }
        else {
            message.sendTime = long_1.default.ZERO;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.messageId !== undefined &&
            (obj.messageId = (message.messageId || long_1.default.ZERO).toString());
        message.sendTime !== undefined &&
            (obj.sendTime = (message.sendTime || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageResp);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.sendTime !== undefined && object.sendTime !== null) {
            message.sendTime = object.sendTime;
        }
        else {
            message.sendTime = long_1.default.ZERO;
        }
        return message;
    },
};
var baseMessagePush = {
    messageId: long_1.default.ZERO,
    type: 0,
    body: "",
    extra: "",
    sender: "",
    sendTime: long_1.default.ZERO,
};
exports.MessagePush = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (!message.messageId.isZero()) {
            writer.uint32(8).int64(message.messageId);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        if (message.body !== "") {
            writer.uint32(26).string(message.body);
        }
        if (message.extra !== "") {
            writer.uint32(34).string(message.extra);
        }
        if (message.sender !== "") {
            writer.uint32(42).string(message.sender);
        }
        if (!message.sendTime.isZero()) {
            writer.uint32(48).int64(message.sendTime);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessagePush);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageId = reader.int64();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.body = reader.string();
                    break;
                case 4:
                    message.extra = reader.string();
                    break;
                case 5:
                    message.sender = reader.string();
                    break;
                case 6:
                    message.sendTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessagePush);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = long_1.default.fromString(object.messageId);
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = Number(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = "";
        }
        if (object.extra !== undefined && object.extra !== null) {
            message.extra = String(object.extra);
        }
        else {
            message.extra = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = String(object.sender);
        }
        else {
            message.sender = "";
        }
        if (object.sendTime !== undefined && object.sendTime !== null) {
            message.sendTime = long_1.default.fromString(object.sendTime);
        }
        else {
            message.sendTime = long_1.default.ZERO;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.messageId !== undefined &&
            (obj.messageId = (message.messageId || long_1.default.ZERO).toString());
        message.type !== undefined && (obj.type = message.type);
        message.body !== undefined && (obj.body = message.body);
        message.extra !== undefined && (obj.extra = message.extra);
        message.sender !== undefined && (obj.sender = message.sender);
        message.sendTime !== undefined &&
            (obj.sendTime = (message.sendTime || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessagePush);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = "";
        }
        if (object.extra !== undefined && object.extra !== null) {
            message.extra = object.extra;
        }
        else {
            message.extra = "";
        }
        if (object.sender !== undefined && object.sender !== null) {
            message.sender = object.sender;
        }
        else {
            message.sender = "";
        }
        if (object.sendTime !== undefined && object.sendTime !== null) {
            message.sendTime = object.sendTime;
        }
        else {
            message.sendTime = long_1.default.ZERO;
        }
        return message;
    },
};
var baseErrorResp = { message: "" };
exports.ErrorResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseErrorResp);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseErrorResp);
        if (object.message !== undefined && object.message !== null) {
            message.message = String(object.message);
        }
        else {
            message.message = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.message !== undefined && (obj.message = message.message);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseErrorResp);
        if (object.message !== undefined && object.message !== null) {
            message.message = object.message;
        }
        else {
            message.message = "";
        }
        return message;
    },
};
var baseMessageAckReq = { messageId: long_1.default.ZERO };
exports.MessageAckReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (!message.messageId.isZero()) {
            writer.uint32(8).int64(message.messageId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageAckReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageAckReq);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = long_1.default.fromString(object.messageId);
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.messageId !== undefined &&
            (obj.messageId = (message.messageId || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageAckReq);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        return message;
    },
};
var baseGroupCreateReq = {
    name: "",
    avatar: "",
    introduction: "",
    owner: "",
    members: "",
};
exports.GroupCreateReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.avatar !== "") {
            writer.uint32(18).string(message.avatar);
        }
        if (message.introduction !== "") {
            writer.uint32(26).string(message.introduction);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        for (var _i = 0, _a = message.members; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(42).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupCreateReq);
        message.members = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.avatar = reader.string();
                    break;
                case 3:
                    message.introduction = reader.string();
                    break;
                case 4:
                    message.owner = reader.string();
                    break;
                case 5:
                    message.members.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupCreateReq);
        message.members = [];
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = String(object.avatar);
        }
        else {
            message.avatar = "";
        }
        if (object.introduction !== undefined && object.introduction !== null) {
            message.introduction = String(object.introduction);
        }
        else {
            message.introduction = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.members !== undefined && object.members !== null) {
            for (var _i = 0, _a = object.members; _i < _a.length; _i++) {
                var e = _a[_i];
                message.members.push(String(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.avatar !== undefined && (obj.avatar = message.avatar);
        message.introduction !== undefined &&
            (obj.introduction = message.introduction);
        message.owner !== undefined && (obj.owner = message.owner);
        if (message.members) {
            obj.members = message.members.map(function (e) { return e; });
        }
        else {
            obj.members = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupCreateReq);
        message.members = [];
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = object.avatar;
        }
        else {
            message.avatar = "";
        }
        if (object.introduction !== undefined && object.introduction !== null) {
            message.introduction = object.introduction;
        }
        else {
            message.introduction = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.members !== undefined && object.members !== null) {
            for (var _i = 0, _a = object.members; _i < _a.length; _i++) {
                var e = _a[_i];
                message.members.push(e);
            }
        }
        return message;
    },
};
var baseGroupCreateResp = { groupId: "" };
exports.GroupCreateResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.groupId !== "") {
            writer.uint32(10).string(message.groupId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupCreateResp);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupCreateResp);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.groupId !== undefined && (obj.groupId = message.groupId);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupCreateResp);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        return message;
    },
};
var baseGroupCreateNotify = { groupId: "", members: "" };
exports.GroupCreateNotify = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.groupId !== "") {
            writer.uint32(10).string(message.groupId);
        }
        for (var _i = 0, _a = message.members; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupCreateNotify);
        message.members = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.string();
                    break;
                case 2:
                    message.members.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupCreateNotify);
        message.members = [];
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        if (object.members !== undefined && object.members !== null) {
            for (var _i = 0, _a = object.members; _i < _a.length; _i++) {
                var e = _a[_i];
                message.members.push(String(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.groupId !== undefined && (obj.groupId = message.groupId);
        if (message.members) {
            obj.members = message.members.map(function (e) { return e; });
        }
        else {
            obj.members = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupCreateNotify);
        message.members = [];
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        if (object.members !== undefined && object.members !== null) {
            for (var _i = 0, _a = object.members; _i < _a.length; _i++) {
                var e = _a[_i];
                message.members.push(e);
            }
        }
        return message;
    },
};
var baseGroupJoinReq = { account: "", groupId: "" };
exports.GroupJoinReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (message.groupId !== "") {
            writer.uint32(18).string(message.groupId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupJoinReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.groupId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupJoinReq);
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.groupId !== undefined && (obj.groupId = message.groupId);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupJoinReq);
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        return message;
    },
};
var baseGroupQuitReq = { account: "", groupId: "" };
exports.GroupQuitReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (message.groupId !== "") {
            writer.uint32(18).string(message.groupId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupQuitReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.groupId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupQuitReq);
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.groupId !== undefined && (obj.groupId = message.groupId);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupQuitReq);
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        return message;
    },
};
var baseGroupGetReq = { groupId: "" };
exports.GroupGetReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.groupId !== "") {
            writer.uint32(10).string(message.groupId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupGetReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupGetReq);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.groupId !== undefined && (obj.groupId = message.groupId);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupGetReq);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        return message;
    },
};
var baseMember = {
    account: "",
    alias: "",
    avatar: "",
    joinTime: long_1.default.ZERO,
};
exports.Member = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.account !== "") {
            writer.uint32(10).string(message.account);
        }
        if (message.alias !== "") {
            writer.uint32(18).string(message.alias);
        }
        if (message.avatar !== "") {
            writer.uint32(26).string(message.avatar);
        }
        if (!message.joinTime.isZero()) {
            writer.uint32(32).int64(message.joinTime);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMember);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.account = reader.string();
                    break;
                case 2:
                    message.alias = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.joinTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMember);
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        if (object.alias !== undefined && object.alias !== null) {
            message.alias = String(object.alias);
        }
        else {
            message.alias = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = String(object.avatar);
        }
        else {
            message.avatar = "";
        }
        if (object.joinTime !== undefined && object.joinTime !== null) {
            message.joinTime = long_1.default.fromString(object.joinTime);
        }
        else {
            message.joinTime = long_1.default.ZERO;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.account !== undefined && (obj.account = message.account);
        message.alias !== undefined && (obj.alias = message.alias);
        message.avatar !== undefined && (obj.avatar = message.avatar);
        message.joinTime !== undefined &&
            (obj.joinTime = (message.joinTime || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMember);
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        if (object.alias !== undefined && object.alias !== null) {
            message.alias = object.alias;
        }
        else {
            message.alias = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = object.avatar;
        }
        else {
            message.avatar = "";
        }
        if (object.joinTime !== undefined && object.joinTime !== null) {
            message.joinTime = object.joinTime;
        }
        else {
            message.joinTime = long_1.default.ZERO;
        }
        return message;
    },
};
var baseGroupGetResp = {
    id: "",
    name: "",
    avatar: "",
    introduction: "",
    owner: "",
    createdAt: long_1.default.ZERO,
};
exports.GroupGetResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.avatar !== "") {
            writer.uint32(26).string(message.avatar);
        }
        if (message.introduction !== "") {
            writer.uint32(34).string(message.introduction);
        }
        if (message.owner !== "") {
            writer.uint32(42).string(message.owner);
        }
        for (var _i = 0, _a = message.members; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.Member.encode(v, writer.uint32(50).fork()).ldelim();
        }
        if (!message.createdAt.isZero()) {
            writer.uint32(56).int64(message.createdAt);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupGetResp);
        message.members = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.avatar = reader.string();
                    break;
                case 4:
                    message.introduction = reader.string();
                    break;
                case 5:
                    message.owner = reader.string();
                    break;
                case 6:
                    message.members.push(exports.Member.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.createdAt = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupGetResp);
        message.members = [];
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = String(object.name);
        }
        else {
            message.name = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = String(object.avatar);
        }
        else {
            message.avatar = "";
        }
        if (object.introduction !== undefined && object.introduction !== null) {
            message.introduction = String(object.introduction);
        }
        else {
            message.introduction = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        }
        else {
            message.owner = "";
        }
        if (object.members !== undefined && object.members !== null) {
            for (var _i = 0, _a = object.members; _i < _a.length; _i++) {
                var e = _a[_i];
                message.members.push(exports.Member.fromJSON(e));
            }
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = long_1.default.fromString(object.createdAt);
        }
        else {
            message.createdAt = long_1.default.ZERO;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.name !== undefined && (obj.name = message.name);
        message.avatar !== undefined && (obj.avatar = message.avatar);
        message.introduction !== undefined &&
            (obj.introduction = message.introduction);
        message.owner !== undefined && (obj.owner = message.owner);
        if (message.members) {
            obj.members = message.members.map(function (e) {
                return e ? exports.Member.toJSON(e) : undefined;
            });
        }
        else {
            obj.members = [];
        }
        message.createdAt !== undefined &&
            (obj.createdAt = (message.createdAt || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupGetResp);
        message.members = [];
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = "";
        }
        if (object.name !== undefined && object.name !== null) {
            message.name = object.name;
        }
        else {
            message.name = "";
        }
        if (object.avatar !== undefined && object.avatar !== null) {
            message.avatar = object.avatar;
        }
        else {
            message.avatar = "";
        }
        if (object.introduction !== undefined && object.introduction !== null) {
            message.introduction = object.introduction;
        }
        else {
            message.introduction = "";
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = object.owner;
        }
        else {
            message.owner = "";
        }
        if (object.members !== undefined && object.members !== null) {
            for (var _i = 0, _a = object.members; _i < _a.length; _i++) {
                var e = _a[_i];
                message.members.push(exports.Member.fromPartial(e));
            }
        }
        if (object.createdAt !== undefined && object.createdAt !== null) {
            message.createdAt = object.createdAt;
        }
        else {
            message.createdAt = long_1.default.ZERO;
        }
        return message;
    },
};
var baseGroupJoinNotify = { groupId: "", account: "" };
exports.GroupJoinNotify = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.groupId !== "") {
            writer.uint32(10).string(message.groupId);
        }
        if (message.account !== "") {
            writer.uint32(18).string(message.account);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupJoinNotify);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.string();
                    break;
                case 2:
                    message.account = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupJoinNotify);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.groupId !== undefined && (obj.groupId = message.groupId);
        message.account !== undefined && (obj.account = message.account);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupJoinNotify);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        return message;
    },
};
var baseGroupQuitNotify = { groupId: "", account: "" };
exports.GroupQuitNotify = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.groupId !== "") {
            writer.uint32(10).string(message.groupId);
        }
        if (message.account !== "") {
            writer.uint32(18).string(message.account);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseGroupQuitNotify);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.groupId = reader.string();
                    break;
                case 2:
                    message.account = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseGroupQuitNotify);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = String(object.groupId);
        }
        else {
            message.groupId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = String(object.account);
        }
        else {
            message.account = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.groupId !== undefined && (obj.groupId = message.groupId);
        message.account !== undefined && (obj.account = message.account);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseGroupQuitNotify);
        if (object.groupId !== undefined && object.groupId !== null) {
            message.groupId = object.groupId;
        }
        else {
            message.groupId = "";
        }
        if (object.account !== undefined && object.account !== null) {
            message.account = object.account;
        }
        else {
            message.account = "";
        }
        return message;
    },
};
var baseMessageIndexReq = { messageId: long_1.default.ZERO };
exports.MessageIndexReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (!message.messageId.isZero()) {
            writer.uint32(8).int64(message.messageId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageIndexReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageId = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageIndexReq);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = long_1.default.fromString(object.messageId);
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.messageId !== undefined &&
            (obj.messageId = (message.messageId || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageIndexReq);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        return message;
    },
};
var baseMessageIndexResp = {};
exports.MessageIndexResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        for (var _i = 0, _a = message.indexes; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.MessageIndex.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageIndexResp);
        message.indexes = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.indexes.push(exports.MessageIndex.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageIndexResp);
        message.indexes = [];
        if (object.indexes !== undefined && object.indexes !== null) {
            for (var _i = 0, _a = object.indexes; _i < _a.length; _i++) {
                var e = _a[_i];
                message.indexes.push(exports.MessageIndex.fromJSON(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.indexes) {
            obj.indexes = message.indexes.map(function (e) {
                return e ? exports.MessageIndex.toJSON(e) : undefined;
            });
        }
        else {
            obj.indexes = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageIndexResp);
        message.indexes = [];
        if (object.indexes !== undefined && object.indexes !== null) {
            for (var _i = 0, _a = object.indexes; _i < _a.length; _i++) {
                var e = _a[_i];
                message.indexes.push(exports.MessageIndex.fromPartial(e));
            }
        }
        return message;
    },
};
var baseMessageIndex = {
    messageId: long_1.default.ZERO,
    direction: 0,
    sendTime: long_1.default.ZERO,
    accountB: "",
    group: "",
};
exports.MessageIndex = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (!message.messageId.isZero()) {
            writer.uint32(8).int64(message.messageId);
        }
        if (message.direction !== 0) {
            writer.uint32(16).int32(message.direction);
        }
        if (!message.sendTime.isZero()) {
            writer.uint32(24).int64(message.sendTime);
        }
        if (message.accountB !== "") {
            writer.uint32(34).string(message.accountB);
        }
        if (message.group !== "") {
            writer.uint32(42).string(message.group);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageIndex);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageId = reader.int64();
                    break;
                case 2:
                    message.direction = reader.int32();
                    break;
                case 3:
                    message.sendTime = reader.int64();
                    break;
                case 4:
                    message.accountB = reader.string();
                    break;
                case 5:
                    message.group = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageIndex);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = long_1.default.fromString(object.messageId);
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.direction !== undefined && object.direction !== null) {
            message.direction = Number(object.direction);
        }
        else {
            message.direction = 0;
        }
        if (object.sendTime !== undefined && object.sendTime !== null) {
            message.sendTime = long_1.default.fromString(object.sendTime);
        }
        else {
            message.sendTime = long_1.default.ZERO;
        }
        if (object.accountB !== undefined && object.accountB !== null) {
            message.accountB = String(object.accountB);
        }
        else {
            message.accountB = "";
        }
        if (object.group !== undefined && object.group !== null) {
            message.group = String(object.group);
        }
        else {
            message.group = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.messageId !== undefined &&
            (obj.messageId = (message.messageId || long_1.default.ZERO).toString());
        message.direction !== undefined && (obj.direction = message.direction);
        message.sendTime !== undefined &&
            (obj.sendTime = (message.sendTime || long_1.default.ZERO).toString());
        message.accountB !== undefined && (obj.accountB = message.accountB);
        message.group !== undefined && (obj.group = message.group);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageIndex);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.direction !== undefined && object.direction !== null) {
            message.direction = object.direction;
        }
        else {
            message.direction = 0;
        }
        if (object.sendTime !== undefined && object.sendTime !== null) {
            message.sendTime = object.sendTime;
        }
        else {
            message.sendTime = long_1.default.ZERO;
        }
        if (object.accountB !== undefined && object.accountB !== null) {
            message.accountB = object.accountB;
        }
        else {
            message.accountB = "";
        }
        if (object.group !== undefined && object.group !== null) {
            message.group = object.group;
        }
        else {
            message.group = "";
        }
        return message;
    },
};
var baseMessageContentReq = { messageIds: long_1.default.ZERO };
exports.MessageContentReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        writer.uint32(10).fork();
        for (var _i = 0, _a = message.messageIds; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.int64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageContentReq);
        message.messageIds = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.messageIds.push(reader.int64());
                        }
                    }
                    else {
                        message.messageIds.push(reader.int64());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageContentReq);
        message.messageIds = [];
        if (object.messageIds !== undefined && object.messageIds !== null) {
            for (var _i = 0, _a = object.messageIds; _i < _a.length; _i++) {
                var e = _a[_i];
                message.messageIds.push(long_1.default.fromString(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.messageIds) {
            obj.messageIds = message.messageIds.map(function (e) {
                return (e || long_1.default.ZERO).toString();
            });
        }
        else {
            obj.messageIds = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageContentReq);
        message.messageIds = [];
        if (object.messageIds !== undefined && object.messageIds !== null) {
            for (var _i = 0, _a = object.messageIds; _i < _a.length; _i++) {
                var e = _a[_i];
                message.messageIds.push(e);
            }
        }
        return message;
    },
};
var baseMessageContent = {
    messageId: long_1.default.ZERO,
    type: 0,
    body: "",
    extra: "",
};
exports.MessageContent = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (!message.messageId.isZero()) {
            writer.uint32(8).int64(message.messageId);
        }
        if (message.type !== 0) {
            writer.uint32(16).int32(message.type);
        }
        if (message.body !== "") {
            writer.uint32(26).string(message.body);
        }
        if (message.extra !== "") {
            writer.uint32(34).string(message.extra);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageContent);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messageId = reader.int64();
                    break;
                case 2:
                    message.type = reader.int32();
                    break;
                case 3:
                    message.body = reader.string();
                    break;
                case 4:
                    message.extra = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageContent);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = long_1.default.fromString(object.messageId);
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = Number(object.type);
        }
        else {
            message.type = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = "";
        }
        if (object.extra !== undefined && object.extra !== null) {
            message.extra = String(object.extra);
        }
        else {
            message.extra = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.messageId !== undefined &&
            (obj.messageId = (message.messageId || long_1.default.ZERO).toString());
        message.type !== undefined && (obj.type = message.type);
        message.body !== undefined && (obj.body = message.body);
        message.extra !== undefined && (obj.extra = message.extra);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageContent);
        if (object.messageId !== undefined && object.messageId !== null) {
            message.messageId = object.messageId;
        }
        else {
            message.messageId = long_1.default.ZERO;
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = "";
        }
        if (object.extra !== undefined && object.extra !== null) {
            message.extra = object.extra;
        }
        else {
            message.extra = "";
        }
        return message;
    },
};
var baseMessageContentResp = {};
exports.MessageContentResp = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        for (var _i = 0, _a = message.contents; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.MessageContent.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMessageContentResp);
        message.contents = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.contents.push(exports.MessageContent.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMessageContentResp);
        message.contents = [];
        if (object.contents !== undefined && object.contents !== null) {
            for (var _i = 0, _a = object.contents; _i < _a.length; _i++) {
                var e = _a[_i];
                message.contents.push(exports.MessageContent.fromJSON(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        if (message.contents) {
            obj.contents = message.contents.map(function (e) {
                return e ? exports.MessageContent.toJSON(e) : undefined;
            });
        }
        else {
            obj.contents = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMessageContentResp);
        message.contents = [];
        if (object.contents !== undefined && object.contents !== null) {
            for (var _i = 0, _a = object.contents; _i < _a.length; _i++) {
                var e = _a[_i];
                message.contents.push(exports.MessageContent.fromPartial(e));
            }
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=protocol.js.map