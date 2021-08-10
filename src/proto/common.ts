/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "pkt";

/** status is a uint16 value */
export enum Status {
  Success = 0,
  SessionNotFound = 10,
  /** NoDestination - client error 100-300 */
  NoDestination = 100,
  InvalidPacketBody = 101,
  InvalidCommand = 103,
  Unauthorized = 105,
  /** SystemException - server error > 300 */
  SystemException = 500,
  NotImplemented = 501,
  UNRECOGNIZED = -1,
}

export function statusFromJSON(object: any): Status {
  switch (object) {
    case 0:
    case "Success":
      return Status.Success;
    case 10:
    case "SessionNotFound":
      return Status.SessionNotFound;
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
    case 500:
    case "SystemException":
      return Status.SystemException;
    case 501:
    case "NotImplemented":
      return Status.NotImplemented;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Status.UNRECOGNIZED;
  }
}

export function statusToJSON(object: Status): string {
  switch (object) {
    case Status.Success:
      return "Success";
    case Status.SessionNotFound:
      return "SessionNotFound";
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
    default:
      return "UNKNOWN";
  }
}

export enum MetaType {
  int = 0,
  string = 1,
  float = 2,
  UNRECOGNIZED = -1,
}

export function metaTypeFromJSON(object: any): MetaType {
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

export function metaTypeToJSON(object: MetaType): string {
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

export enum ContentType {
  Protobuf = 0,
  Json = 1,
  UNRECOGNIZED = -1,
}

export function contentTypeFromJSON(object: any): ContentType {
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

export function contentTypeToJSON(object: ContentType): string {
  switch (object) {
    case ContentType.Protobuf:
      return "Protobuf";
    case ContentType.Json:
      return "Json";
    default:
      return "UNKNOWN";
  }
}

export enum Flag {
  Request = 0,
  Response = 1,
  Push = 2,
  UNRECOGNIZED = -1,
}

export function flagFromJSON(object: any): Flag {
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

export function flagToJSON(object: Flag): string {
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

export interface Meta {
  key: string;
  value: string;
  type: MetaType;
}

export interface Header {
  command: string;
  /** sender channel id */
  channelId: string;
  sequence: number;
  flag: Flag;
  status: Status;
  /** destination is defined as a account,group or room */
  dest: string;
  meta: Meta[];
}

export interface InnerHandshakeReq {
  ServiceId: string;
}

export interface InnerHandshakeResponse {
  Code: number;
  Error: string;
}

const baseMeta: object = { key: "", value: "", type: 0 };

export const Meta = {
  encode(message: Meta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Meta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMeta } as Meta;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        case 3:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Meta {
    const message = { ...baseMeta } as Meta;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = metaTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    return message;
  },

  toJSON(message: Meta): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    message.type !== undefined && (obj.type = metaTypeToJSON(message.type));
    return obj;
  },

  fromPartial(object: DeepPartial<Meta>): Meta {
    const message = { ...baseMeta } as Meta;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    return message;
  },
};

const baseHeader: object = {
  command: "",
  channelId: "",
  sequence: 0,
  flag: 0,
  status: 0,
  dest: "",
};

export const Header = {
  encode(
    message: Header,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    for (const v of message.meta) {
      Meta.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHeader } as Header;
    message.meta = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
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
          message.flag = reader.int32() as any;
          break;
        case 5:
          message.status = reader.int32() as any;
          break;
        case 6:
          message.dest = reader.string();
          break;
        case 7:
          message.meta.push(Meta.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Header {
    const message = { ...baseHeader } as Header;
    message.meta = [];
    if (object.command !== undefined && object.command !== null) {
      message.command = String(object.command);
    } else {
      message.command = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Number(object.sequence);
    } else {
      message.sequence = 0;
    }
    if (object.flag !== undefined && object.flag !== null) {
      message.flag = flagFromJSON(object.flag);
    } else {
      message.flag = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = statusFromJSON(object.status);
    } else {
      message.status = 0;
    }
    if (object.dest !== undefined && object.dest !== null) {
      message.dest = String(object.dest);
    } else {
      message.dest = "";
    }
    if (object.meta !== undefined && object.meta !== null) {
      for (const e of object.meta) {
        message.meta.push(Meta.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.command !== undefined && (obj.command = message.command);
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.sequence !== undefined && (obj.sequence = message.sequence);
    message.flag !== undefined && (obj.flag = flagToJSON(message.flag));
    message.status !== undefined && (obj.status = statusToJSON(message.status));
    message.dest !== undefined && (obj.dest = message.dest);
    if (message.meta) {
      obj.meta = message.meta.map((e) => (e ? Meta.toJSON(e) : undefined));
    } else {
      obj.meta = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Header>): Header {
    const message = { ...baseHeader } as Header;
    message.meta = [];
    if (object.command !== undefined && object.command !== null) {
      message.command = object.command;
    } else {
      message.command = "";
    }
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence;
    } else {
      message.sequence = 0;
    }
    if (object.flag !== undefined && object.flag !== null) {
      message.flag = object.flag;
    } else {
      message.flag = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = 0;
    }
    if (object.dest !== undefined && object.dest !== null) {
      message.dest = object.dest;
    } else {
      message.dest = "";
    }
    if (object.meta !== undefined && object.meta !== null) {
      for (const e of object.meta) {
        message.meta.push(Meta.fromPartial(e));
      }
    }
    return message;
  },
};

const baseInnerHandshakeReq: object = { ServiceId: "" };

export const InnerHandshakeReq = {
  encode(
    message: InnerHandshakeReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ServiceId !== "") {
      writer.uint32(10).string(message.ServiceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InnerHandshakeReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInnerHandshakeReq } as InnerHandshakeReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): InnerHandshakeReq {
    const message = { ...baseInnerHandshakeReq } as InnerHandshakeReq;
    if (object.ServiceId !== undefined && object.ServiceId !== null) {
      message.ServiceId = String(object.ServiceId);
    } else {
      message.ServiceId = "";
    }
    return message;
  },

  toJSON(message: InnerHandshakeReq): unknown {
    const obj: any = {};
    message.ServiceId !== undefined && (obj.ServiceId = message.ServiceId);
    return obj;
  },

  fromPartial(object: DeepPartial<InnerHandshakeReq>): InnerHandshakeReq {
    const message = { ...baseInnerHandshakeReq } as InnerHandshakeReq;
    if (object.ServiceId !== undefined && object.ServiceId !== null) {
      message.ServiceId = object.ServiceId;
    } else {
      message.ServiceId = "";
    }
    return message;
  },
};

const baseInnerHandshakeResponse: object = { Code: 0, Error: "" };

export const InnerHandshakeResponse = {
  encode(
    message: InnerHandshakeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Code !== 0) {
      writer.uint32(8).uint32(message.Code);
    }
    if (message.Error !== "") {
      writer.uint32(18).string(message.Error);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): InnerHandshakeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInnerHandshakeResponse } as InnerHandshakeResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): InnerHandshakeResponse {
    const message = { ...baseInnerHandshakeResponse } as InnerHandshakeResponse;
    if (object.Code !== undefined && object.Code !== null) {
      message.Code = Number(object.Code);
    } else {
      message.Code = 0;
    }
    if (object.Error !== undefined && object.Error !== null) {
      message.Error = String(object.Error);
    } else {
      message.Error = "";
    }
    return message;
  },

  toJSON(message: InnerHandshakeResponse): unknown {
    const obj: any = {};
    message.Code !== undefined && (obj.Code = message.Code);
    message.Error !== undefined && (obj.Error = message.Error);
    return obj;
  },

  fromPartial(
    object: DeepPartial<InnerHandshakeResponse>
  ): InnerHandshakeResponse {
    const message = { ...baseInnerHandshakeResponse } as InnerHandshakeResponse;
    if (object.Code !== undefined && object.Code !== null) {
      message.Code = object.Code;
    } else {
      message.Code = 0;
    }
    if (object.Error !== undefined && object.Error !== null) {
      message.Error = object.Error;
    } else {
      message.Error = "";
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
