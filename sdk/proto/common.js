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
exports.InnerHandshakeResponse = exports.InnerHandshakeReq = exports.Header = exports.Meta = exports.flagToJSON = exports.flagFromJSON = exports.Flag = exports.contentTypeToJSON = exports.contentTypeFromJSON = exports.ContentType = exports.metaTypeToJSON = exports.metaTypeFromJSON = exports.MetaType = exports.statusToJSON = exports.statusFromJSON = exports.Status = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = __importDefault(require("long"));
var minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "pkt";
/** status is a uint16 value */
var Status;
(function (Status) {
    /** Success - client defined */
    Status[Status["Success"] = 0] = "Success";
    /** NoDestination - client error 100-200 */
    Status[Status["NoDestination"] = 100] = "NoDestination";
    Status[Status["InvalidPacketBody"] = 101] = "InvalidPacketBody";
    Status[Status["InvalidCommand"] = 103] = "InvalidCommand";
    Status[Status["Unauthorized"] = 105] = "Unauthorized";
    /** SystemException - server error 300-400 */
    Status[Status["SystemException"] = 300] = "SystemException";
    Status[Status["NotImplemented"] = 301] = "NotImplemented";
    /** SessionNotFound - specific error */
    Status[Status["SessionNotFound"] = 404] = "SessionNotFound";
    Status[Status["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Status = exports.Status || (exports.Status = {}));
function statusFromJSON(object) {
    switch (object) {
        case 0:
        case "Success":
            return Status.Success;
        case 100:
        case "NoDestination":
            return Status.NoDestination;
        case 101:
        case "InvalidPacketBody":
            return Status.InvalidPacketBody;
        case 103:
        case "InvalidCommand":
            return Status.InvalidCommand;
        case 105:
        case "Unauthorized":
            return Status.Unauthorized;
        case 300:
        case "SystemException":
            return Status.SystemException;
        case 301:
        case "NotImplemented":
            return Status.NotImplemented;
        case 404:
        case "SessionNotFound":
            return Status.SessionNotFound;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Status.UNRECOGNIZED;
    }
}
exports.statusFromJSON = statusFromJSON;
function statusToJSON(object) {
    switch (object) {
        case Status.Success:
            return "Success";
        case Status.NoDestination:
            return "NoDestination";
        case Status.InvalidPacketBody:
            return "InvalidPacketBody";
        case Status.InvalidCommand:
            return "InvalidCommand";
        case Status.Unauthorized:
            return "Unauthorized";
        case Status.SystemException:
            return "SystemException";
        case Status.NotImplemented:
            return "NotImplemented";
        case Status.SessionNotFound:
            return "SessionNotFound";
        default:
            return "UNKNOWN";
    }
}
exports.statusToJSON = statusToJSON;
var MetaType;
(function (MetaType) {
    MetaType[MetaType["int"] = 0] = "int";
    MetaType[MetaType["string"] = 1] = "string";
    MetaType[MetaType["float"] = 2] = "float";
    MetaType[MetaType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(MetaType = exports.MetaType || (exports.MetaType = {}));
function metaTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "int":
            return MetaType.int;
        case 1:
        case "string":
            return MetaType.string;
        case 2:
        case "float":
            return MetaType.float;
        case -1:
        case "UNRECOGNIZED":
        default:
            return MetaType.UNRECOGNIZED;
    }
}
exports.metaTypeFromJSON = metaTypeFromJSON;
function metaTypeToJSON(object) {
    switch (object) {
        case MetaType.int:
            return "int";
        case MetaType.string:
            return "string";
        case MetaType.float:
            return "float";
        default:
            return "UNKNOWN";
    }
}
exports.metaTypeToJSON = metaTypeToJSON;
var ContentType;
(function (ContentType) {
    ContentType[ContentType["Protobuf"] = 0] = "Protobuf";
    ContentType[ContentType["Json"] = 1] = "Json";
    ContentType[ContentType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
function contentTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "Protobuf":
            return ContentType.Protobuf;
        case 1:
        case "Json":
            return ContentType.Json;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ContentType.UNRECOGNIZED;
    }
}
exports.contentTypeFromJSON = contentTypeFromJSON;
function contentTypeToJSON(object) {
    switch (object) {
        case ContentType.Protobuf:
            return "Protobuf";
        case ContentType.Json:
            return "Json";
        default:
            return "UNKNOWN";
    }
}
exports.contentTypeToJSON = contentTypeToJSON;
var Flag;
(function (Flag) {
    Flag[Flag["Request"] = 0] = "Request";
    Flag[Flag["Response"] = 1] = "Response";
    Flag[Flag["Push"] = 2] = "Push";
    Flag[Flag["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Flag = exports.Flag || (exports.Flag = {}));
function flagFromJSON(object) {
    switch (object) {
        case 0:
        case "Request":
            return Flag.Request;
        case 1:
        case "Response":
            return Flag.Response;
        case 2:
        case "Push":
            return Flag.Push;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Flag.UNRECOGNIZED;
    }
}
exports.flagFromJSON = flagFromJSON;
function flagToJSON(object) {
    switch (object) {
        case Flag.Request:
            return "Request";
        case Flag.Response:
            return "Response";
        case Flag.Push:
            return "Push";
        default:
            return "UNKNOWN";
    }
}
exports.flagToJSON = flagToJSON;
var baseMeta = { key: "", value: "", type: 0 };
exports.Meta = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.key !== "") {
            writer.uint32(10).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(18).string(message.value);
        }
        if (message.type !== 0) {
            writer.uint32(24).int32(message.type);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseMeta);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.string();
                    break;
                case 3:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseMeta);
        if (object.key !== undefined && object.key !== null) {
            message.key = String(object.key);
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = String(object.value);
        }
        else {
            message.value = "";
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = metaTypeFromJSON(object.type);
        }
        else {
            message.type = 0;
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.key !== undefined && (obj.key = message.key);
        message.value !== undefined && (obj.value = message.value);
        message.type !== undefined && (obj.type = metaTypeToJSON(message.type));
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseMeta);
        if (object.key !== undefined && object.key !== null) {
            message.key = object.key;
        }
        else {
            message.key = "";
        }
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = "";
        }
        if (object.type !== undefined && object.type !== null) {
            message.type = object.type;
        }
        else {
            message.type = 0;
        }
        return message;
    },
};
var baseHeader = {
    command: "",
    channelId: "",
    sequence: 0,
    flag: 0,
    status: 0,
    dest: "",
};
exports.Header = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.command !== "") {
            writer.uint32(10).string(message.command);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint32(message.sequence);
        }
        if (message.flag !== 0) {
            writer.uint32(32).int32(message.flag);
        }
        if (message.status !== 0) {
            writer.uint32(40).int32(message.status);
        }
        if (message.dest !== "") {
            writer.uint32(50).string(message.dest);
        }
        for (var _i = 0, _a = message.meta; _i < _a.length; _i++) {
            var v = _a[_i];
            exports.Meta.encode(v, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseHeader);
        message.meta = [];
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.command = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                case 3:
                    message.sequence = reader.uint32();
                    break;
                case 4:
                    message.flag = reader.int32();
                    break;
                case 5:
                    message.status = reader.int32();
                    break;
                case 6:
                    message.dest = reader.string();
                    break;
                case 7:
                    message.meta.push(exports.Meta.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseHeader);
        message.meta = [];
        if (object.command !== undefined && object.command !== null) {
            message.command = String(object.command);
        }
        else {
            message.command = "";
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = String(object.channelId);
        }
        else {
            message.channelId = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = Number(object.sequence);
        }
        else {
            message.sequence = 0;
        }
        if (object.flag !== undefined && object.flag !== null) {
            message.flag = flagFromJSON(object.flag);
        }
        else {
            message.flag = 0;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = statusFromJSON(object.status);
        }
        else {
            message.status = 0;
        }
        if (object.dest !== undefined && object.dest !== null) {
            message.dest = String(object.dest);
        }
        else {
            message.dest = "";
        }
        if (object.meta !== undefined && object.meta !== null) {
            for (var _i = 0, _a = object.meta; _i < _a.length; _i++) {
                var e = _a[_i];
                message.meta.push(exports.Meta.fromJSON(e));
            }
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.command !== undefined && (obj.command = message.command);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.sequence !== undefined && (obj.sequence = message.sequence);
        message.flag !== undefined && (obj.flag = flagToJSON(message.flag));
        message.status !== undefined && (obj.status = statusToJSON(message.status));
        message.dest !== undefined && (obj.dest = message.dest);
        if (message.meta) {
            obj.meta = message.meta.map(function (e) { return (e ? exports.Meta.toJSON(e) : undefined); });
        }
        else {
            obj.meta = [];
        }
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseHeader);
        message.meta = [];
        if (object.command !== undefined && object.command !== null) {
            message.command = object.command;
        }
        else {
            message.command = "";
        }
        if (object.channelId !== undefined && object.channelId !== null) {
            message.channelId = object.channelId;
        }
        else {
            message.channelId = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = 0;
        }
        if (object.flag !== undefined && object.flag !== null) {
            message.flag = object.flag;
        }
        else {
            message.flag = 0;
        }
        if (object.status !== undefined && object.status !== null) {
            message.status = object.status;
        }
        else {
            message.status = 0;
        }
        if (object.dest !== undefined && object.dest !== null) {
            message.dest = object.dest;
        }
        else {
            message.dest = "";
        }
        if (object.meta !== undefined && object.meta !== null) {
            for (var _i = 0, _a = object.meta; _i < _a.length; _i++) {
                var e = _a[_i];
                message.meta.push(exports.Meta.fromPartial(e));
            }
        }
        return message;
    },
};
var baseInnerHandshakeReq = { ServiceId: "" };
exports.InnerHandshakeReq = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.ServiceId !== "") {
            writer.uint32(10).string(message.ServiceId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseInnerHandshakeReq);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.ServiceId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseInnerHandshakeReq);
        if (object.ServiceId !== undefined && object.ServiceId !== null) {
            message.ServiceId = String(object.ServiceId);
        }
        else {
            message.ServiceId = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.ServiceId !== undefined && (obj.ServiceId = message.ServiceId);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseInnerHandshakeReq);
        if (object.ServiceId !== undefined && object.ServiceId !== null) {
            message.ServiceId = object.ServiceId;
        }
        else {
            message.ServiceId = "";
        }
        return message;
    },
};
var baseInnerHandshakeResponse = { Code: 0, Error: "" };
exports.InnerHandshakeResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.Code !== 0) {
            writer.uint32(8).uint32(message.Code);
        }
        if (message.Error !== "") {
            writer.uint32(18).string(message.Error);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = __assign({}, baseInnerHandshakeResponse);
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.Code = reader.uint32();
                    break;
                case 2:
                    message.Error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        var message = __assign({}, baseInnerHandshakeResponse);
        if (object.Code !== undefined && object.Code !== null) {
            message.Code = Number(object.Code);
        }
        else {
            message.Code = 0;
        }
        if (object.Error !== undefined && object.Error !== null) {
            message.Error = String(object.Error);
        }
        else {
            message.Error = "";
        }
        return message;
    },
    toJSON: function (message) {
        var obj = {};
        message.Code !== undefined && (obj.Code = message.Code);
        message.Error !== undefined && (obj.Error = message.Error);
        return obj;
    },
    fromPartial: function (object) {
        var message = __assign({}, baseInnerHandshakeResponse);
        if (object.Code !== undefined && object.Code !== null) {
            message.Code = object.Code;
        }
        else {
            message.Code = 0;
        }
        if (object.Error !== undefined && object.Error !== null) {
            message.Error = object.Error;
        }
        else {
            message.Error = "";
        }
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=common.js.map