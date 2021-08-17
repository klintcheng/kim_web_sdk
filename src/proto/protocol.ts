/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "pkt";

export interface LoginReq {
  token: string;
  isp: string;
  /** location code */
  zone: string;
  tags: string[];
}

export interface LoginResp {
  channelId: string;
  account: string;
}

export interface KickoutNotify {
  channelId: string;
}

export interface Session {
  /** session id */
  channelId: string;
  /** gateway ID */
  gateId: string;
  account: string;
  zone: string;
  isp: string;
  remoteIP: string;
  device: string;
  app: string;
  tags: string[];
}

/** chat message */
export interface MessageReq {
  type: number;
  body: string;
  extra: string;
}

export interface MessageResp {
  messageId: Long;
  sendTime: Long;
}

export interface MessagePush {
  messageId: Long;
  type: number;
  body: string;
  extra: string;
  sender: string;
  sendTime: Long;
}

export interface ErrorResp {
  message: string;
}

export interface MessageAckReq {
  messageId: Long;
}

export interface GroupCreateReq {
  name: string;
  avatar: string;
  introduction: string;
  owner: string;
  members: string[];
}

export interface GroupCreateResp {
  groupId: string;
}

export interface GroupCreateNotify {
  groupId: string;
  members: string[];
}

export interface GroupJoinReq {
  account: string;
  groupId: string;
}

export interface GroupQuitReq {
  account: string;
  groupId: string;
}

export interface GroupGetReq {
  groupId: string;
}

export interface Member {
  account: string;
  alias: string;
  avatar: string;
  joinTime: Long;
}

export interface GroupGetResp {
  id: string;
  name: string;
  avatar: string;
  introduction: string;
  owner: string;
  members: Member[];
  createdAt: Long;
}

export interface GroupJoinNotify {
  groupId: string;
  account: string;
}

export interface GroupQuitNotify {
  groupId: string;
  account: string;
}

export interface MessageIndexReq {
  messageId: Long;
}

export interface MessageIndexResp {
  indexes: MessageIndex[];
}

export interface MessageIndex {
  messageId: Long;
  direction: number;
  sendTime: Long;
  accountB: string;
  group: string;
}

export interface MessageContentReq {
  messageIds: Long[];
}

export interface MessageContent {
  messageId: Long;
  type: number;
  body: string;
  extra: string;
}

export interface MessageContentResp {
  contents: MessageContent[];
}

const baseLoginReq: object = { token: "", isp: "", zone: "", tags: "" };

export const LoginReq = {
  encode(
    message: LoginReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.isp !== "") {
      writer.uint32(18).string(message.isp);
    }
    if (message.zone !== "") {
      writer.uint32(26).string(message.zone);
    }
    for (const v of message.tags) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLoginReq } as LoginReq;
    message.tags = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): LoginReq {
    const message = { ...baseLoginReq } as LoginReq;
    message.tags = [];
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = "";
    }
    if (object.isp !== undefined && object.isp !== null) {
      message.isp = String(object.isp);
    } else {
      message.isp = "";
    }
    if (object.zone !== undefined && object.zone !== null) {
      message.zone = String(object.zone);
    } else {
      message.zone = "";
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: LoginReq): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    message.isp !== undefined && (obj.isp = message.isp);
    message.zone !== undefined && (obj.zone = message.zone);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<LoginReq>): LoginReq {
    const message = { ...baseLoginReq } as LoginReq;
    message.tags = [];
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = "";
    }
    if (object.isp !== undefined && object.isp !== null) {
      message.isp = object.isp;
    } else {
      message.isp = "";
    }
    if (object.zone !== undefined && object.zone !== null) {
      message.zone = object.zone;
    } else {
      message.zone = "";
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(e);
      }
    }
    return message;
  },
};

const baseLoginResp: object = { channelId: "", account: "" };

export const LoginResp = {
  encode(
    message: LoginResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLoginResp } as LoginResp;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): LoginResp {
    const message = { ...baseLoginResp } as LoginResp;
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    return message;
  },

  toJSON(message: LoginResp): unknown {
    const obj: any = {};
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial(object: DeepPartial<LoginResp>): LoginResp {
    const message = { ...baseLoginResp } as LoginResp;
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    return message;
  },
};

const baseKickoutNotify: object = { channelId: "" };

export const KickoutNotify = {
  encode(
    message: KickoutNotify,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KickoutNotify {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKickoutNotify } as KickoutNotify;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): KickoutNotify {
    const message = { ...baseKickoutNotify } as KickoutNotify;
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    return message;
  },

  toJSON(message: KickoutNotify): unknown {
    const obj: any = {};
    message.channelId !== undefined && (obj.channelId = message.channelId);
    return obj;
  },

  fromPartial(object: DeepPartial<KickoutNotify>): KickoutNotify {
    const message = { ...baseKickoutNotify } as KickoutNotify;
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    return message;
  },
};

const baseSession: object = {
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

export const Session = {
  encode(
    message: Session,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    for (const v of message.tags) {
      writer.uint32(74).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSession } as Session;
    message.tags = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): Session {
    const message = { ...baseSession } as Session;
    message.tags = [];
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = String(object.channelId);
    } else {
      message.channelId = "";
    }
    if (object.gateId !== undefined && object.gateId !== null) {
      message.gateId = String(object.gateId);
    } else {
      message.gateId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.zone !== undefined && object.zone !== null) {
      message.zone = String(object.zone);
    } else {
      message.zone = "";
    }
    if (object.isp !== undefined && object.isp !== null) {
      message.isp = String(object.isp);
    } else {
      message.isp = "";
    }
    if (object.remoteIP !== undefined && object.remoteIP !== null) {
      message.remoteIP = String(object.remoteIP);
    } else {
      message.remoteIP = "";
    }
    if (object.device !== undefined && object.device !== null) {
      message.device = String(object.device);
    } else {
      message.device = "";
    }
    if (object.app !== undefined && object.app !== null) {
      message.app = String(object.app);
    } else {
      message.app = "";
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.gateId !== undefined && (obj.gateId = message.gateId);
    message.account !== undefined && (obj.account = message.account);
    message.zone !== undefined && (obj.zone = message.zone);
    message.isp !== undefined && (obj.isp = message.isp);
    message.remoteIP !== undefined && (obj.remoteIP = message.remoteIP);
    message.device !== undefined && (obj.device = message.device);
    message.app !== undefined && (obj.app = message.app);
    if (message.tags) {
      obj.tags = message.tags.map((e) => e);
    } else {
      obj.tags = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Session>): Session {
    const message = { ...baseSession } as Session;
    message.tags = [];
    if (object.channelId !== undefined && object.channelId !== null) {
      message.channelId = object.channelId;
    } else {
      message.channelId = "";
    }
    if (object.gateId !== undefined && object.gateId !== null) {
      message.gateId = object.gateId;
    } else {
      message.gateId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.zone !== undefined && object.zone !== null) {
      message.zone = object.zone;
    } else {
      message.zone = "";
    }
    if (object.isp !== undefined && object.isp !== null) {
      message.isp = object.isp;
    } else {
      message.isp = "";
    }
    if (object.remoteIP !== undefined && object.remoteIP !== null) {
      message.remoteIP = object.remoteIP;
    } else {
      message.remoteIP = "";
    }
    if (object.device !== undefined && object.device !== null) {
      message.device = object.device;
    } else {
      message.device = "";
    }
    if (object.app !== undefined && object.app !== null) {
      message.app = object.app;
    } else {
      message.app = "";
    }
    if (object.tags !== undefined && object.tags !== null) {
      for (const e of object.tags) {
        message.tags.push(e);
      }
    }
    return message;
  },
};

const baseMessageReq: object = { type: 0, body: "", extra: "" };

export const MessageReq = {
  encode(
    message: MessageReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageReq } as MessageReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): MessageReq {
    const message = { ...baseMessageReq } as MessageReq;
    if (object.type !== undefined && object.type !== null) {
      message.type = Number(object.type);
    } else {
      message.type = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.extra !== undefined && object.extra !== null) {
      message.extra = String(object.extra);
    } else {
      message.extra = "";
    }
    return message;
  },

  toJSON(message: MessageReq): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.body !== undefined && (obj.body = message.body);
    message.extra !== undefined && (obj.extra = message.extra);
    return obj;
  },

  fromPartial(object: DeepPartial<MessageReq>): MessageReq {
    const message = { ...baseMessageReq } as MessageReq;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.extra !== undefined && object.extra !== null) {
      message.extra = object.extra;
    } else {
      message.extra = "";
    }
    return message;
  },
};

const baseMessageResp: object = { messageId: Long.ZERO, sendTime: Long.ZERO };

export const MessageResp = {
  encode(
    message: MessageResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.messageId.isZero()) {
      writer.uint32(8).int64(message.messageId);
    }
    if (!message.sendTime.isZero()) {
      writer.uint32(16).int64(message.sendTime);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageResp } as MessageResp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.int64() as Long;
          break;
        case 2:
          message.sendTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageResp {
    const message = { ...baseMessageResp } as MessageResp;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = Long.fromString(object.messageId);
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = Long.fromString(object.sendTime);
    } else {
      message.sendTime = Long.ZERO;
    }
    return message;
  },

  toJSON(message: MessageResp): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = (message.messageId || Long.ZERO).toString());
    message.sendTime !== undefined &&
      (obj.sendTime = (message.sendTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MessageResp>): MessageResp {
    const message = { ...baseMessageResp } as MessageResp;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId as Long;
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = object.sendTime as Long;
    } else {
      message.sendTime = Long.ZERO;
    }
    return message;
  },
};

const baseMessagePush: object = {
  messageId: Long.ZERO,
  type: 0,
  body: "",
  extra: "",
  sender: "",
  sendTime: Long.ZERO,
};

export const MessagePush = {
  encode(
    message: MessagePush,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MessagePush {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessagePush } as MessagePush;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.int64() as Long;
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
          message.sendTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessagePush {
    const message = { ...baseMessagePush } as MessagePush;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = Long.fromString(object.messageId);
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = Number(object.type);
    } else {
      message.type = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.extra !== undefined && object.extra !== null) {
      message.extra = String(object.extra);
    } else {
      message.extra = "";
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = Long.fromString(object.sendTime);
    } else {
      message.sendTime = Long.ZERO;
    }
    return message;
  },

  toJSON(message: MessagePush): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = (message.messageId || Long.ZERO).toString());
    message.type !== undefined && (obj.type = message.type);
    message.body !== undefined && (obj.body = message.body);
    message.extra !== undefined && (obj.extra = message.extra);
    message.sender !== undefined && (obj.sender = message.sender);
    message.sendTime !== undefined &&
      (obj.sendTime = (message.sendTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MessagePush>): MessagePush {
    const message = { ...baseMessagePush } as MessagePush;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId as Long;
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.extra !== undefined && object.extra !== null) {
      message.extra = object.extra;
    } else {
      message.extra = "";
    }
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = object.sendTime as Long;
    } else {
      message.sendTime = Long.ZERO;
    }
    return message;
  },
};

const baseErrorResp: object = { message: "" };

export const ErrorResp = {
  encode(
    message: ErrorResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ErrorResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseErrorResp } as ErrorResp;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): ErrorResp {
    const message = { ...baseErrorResp } as ErrorResp;
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },

  toJSON(message: ErrorResp): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<ErrorResp>): ErrorResp {
    const message = { ...baseErrorResp } as ErrorResp;
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
};

const baseMessageAckReq: object = { messageId: Long.ZERO };

export const MessageAckReq = {
  encode(
    message: MessageAckReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.messageId.isZero()) {
      writer.uint32(8).int64(message.messageId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageAckReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageAckReq } as MessageAckReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageAckReq {
    const message = { ...baseMessageAckReq } as MessageAckReq;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = Long.fromString(object.messageId);
    } else {
      message.messageId = Long.ZERO;
    }
    return message;
  },

  toJSON(message: MessageAckReq): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = (message.messageId || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MessageAckReq>): MessageAckReq {
    const message = { ...baseMessageAckReq } as MessageAckReq;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId as Long;
    } else {
      message.messageId = Long.ZERO;
    }
    return message;
  },
};

const baseGroupCreateReq: object = {
  name: "",
  avatar: "",
  introduction: "",
  owner: "",
  members: "",
};

export const GroupCreateReq = {
  encode(
    message: GroupCreateReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    for (const v of message.members) {
      writer.uint32(42).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupCreateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupCreateReq } as GroupCreateReq;
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupCreateReq {
    const message = { ...baseGroupCreateReq } as GroupCreateReq;
    message.members = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = String(object.avatar);
    } else {
      message.avatar = "";
    }
    if (object.introduction !== undefined && object.introduction !== null) {
      message.introduction = String(object.introduction);
    } else {
      message.introduction = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: GroupCreateReq): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.introduction !== undefined &&
      (obj.introduction = message.introduction);
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.members) {
      obj.members = message.members.map((e) => e);
    } else {
      obj.members = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GroupCreateReq>): GroupCreateReq {
    const message = { ...baseGroupCreateReq } as GroupCreateReq;
    message.members = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = object.avatar;
    } else {
      message.avatar = "";
    }
    if (object.introduction !== undefined && object.introduction !== null) {
      message.introduction = object.introduction;
    } else {
      message.introduction = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(e);
      }
    }
    return message;
  },
};

const baseGroupCreateResp: object = { groupId: "" };

export const GroupCreateResp = {
  encode(
    message: GroupCreateResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== "") {
      writer.uint32(10).string(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupCreateResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupCreateResp } as GroupCreateResp;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupCreateResp {
    const message = { ...baseGroupCreateResp } as GroupCreateResp;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    return message;
  },

  toJSON(message: GroupCreateResp): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = message.groupId);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupCreateResp>): GroupCreateResp {
    const message = { ...baseGroupCreateResp } as GroupCreateResp;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    return message;
  },
};

const baseGroupCreateNotify: object = { groupId: "", members: "" };

export const GroupCreateNotify = {
  encode(
    message: GroupCreateNotify,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== "") {
      writer.uint32(10).string(message.groupId);
    }
    for (const v of message.members) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupCreateNotify {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupCreateNotify } as GroupCreateNotify;
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupCreateNotify {
    const message = { ...baseGroupCreateNotify } as GroupCreateNotify;
    message.members = [];
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: GroupCreateNotify): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = message.groupId);
    if (message.members) {
      obj.members = message.members.map((e) => e);
    } else {
      obj.members = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GroupCreateNotify>): GroupCreateNotify {
    const message = { ...baseGroupCreateNotify } as GroupCreateNotify;
    message.members = [];
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(e);
      }
    }
    return message;
  },
};

const baseGroupJoinReq: object = { account: "", groupId: "" };

export const GroupJoinReq = {
  encode(
    message: GroupJoinReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.groupId !== "") {
      writer.uint32(18).string(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupJoinReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupJoinReq } as GroupJoinReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupJoinReq {
    const message = { ...baseGroupJoinReq } as GroupJoinReq;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    return message;
  },

  toJSON(message: GroupJoinReq): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.groupId !== undefined && (obj.groupId = message.groupId);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupJoinReq>): GroupJoinReq {
    const message = { ...baseGroupJoinReq } as GroupJoinReq;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    return message;
  },
};

const baseGroupQuitReq: object = { account: "", groupId: "" };

export const GroupQuitReq = {
  encode(
    message: GroupQuitReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.groupId !== "") {
      writer.uint32(18).string(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupQuitReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupQuitReq } as GroupQuitReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupQuitReq {
    const message = { ...baseGroupQuitReq } as GroupQuitReq;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    return message;
  },

  toJSON(message: GroupQuitReq): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.groupId !== undefined && (obj.groupId = message.groupId);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupQuitReq>): GroupQuitReq {
    const message = { ...baseGroupQuitReq } as GroupQuitReq;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    return message;
  },
};

const baseGroupGetReq: object = { groupId: "" };

export const GroupGetReq = {
  encode(
    message: GroupGetReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== "") {
      writer.uint32(10).string(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupGetReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupGetReq } as GroupGetReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupGetReq {
    const message = { ...baseGroupGetReq } as GroupGetReq;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    return message;
  },

  toJSON(message: GroupGetReq): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = message.groupId);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupGetReq>): GroupGetReq {
    const message = { ...baseGroupGetReq } as GroupGetReq;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    return message;
  },
};

const baseMember: object = {
  account: "",
  alias: "",
  avatar: "",
  joinTime: Long.ZERO,
};

export const Member = {
  encode(
    message: Member,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Member {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMember } as Member;
    while (reader.pos < end) {
      const tag = reader.uint32();
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
          message.joinTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Member {
    const message = { ...baseMember } as Member;
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    if (object.alias !== undefined && object.alias !== null) {
      message.alias = String(object.alias);
    } else {
      message.alias = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = String(object.avatar);
    } else {
      message.avatar = "";
    }
    if (object.joinTime !== undefined && object.joinTime !== null) {
      message.joinTime = Long.fromString(object.joinTime);
    } else {
      message.joinTime = Long.ZERO;
    }
    return message;
  },

  toJSON(message: Member): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.alias !== undefined && (obj.alias = message.alias);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.joinTime !== undefined &&
      (obj.joinTime = (message.joinTime || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Member>): Member {
    const message = { ...baseMember } as Member;
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    if (object.alias !== undefined && object.alias !== null) {
      message.alias = object.alias;
    } else {
      message.alias = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = object.avatar;
    } else {
      message.avatar = "";
    }
    if (object.joinTime !== undefined && object.joinTime !== null) {
      message.joinTime = object.joinTime as Long;
    } else {
      message.joinTime = Long.ZERO;
    }
    return message;
  },
};

const baseGroupGetResp: object = {
  id: "",
  name: "",
  avatar: "",
  introduction: "",
  owner: "",
  createdAt: Long.ZERO,
};

export const GroupGetResp = {
  encode(
    message: GroupGetResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    for (const v of message.members) {
      Member.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (!message.createdAt.isZero()) {
      writer.uint32(56).int64(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupGetResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupGetResp } as GroupGetResp;
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
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
          message.members.push(Member.decode(reader, reader.uint32()));
          break;
        case 7:
          message.createdAt = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupGetResp {
    const message = { ...baseGroupGetResp } as GroupGetResp;
    message.members = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = String(object.avatar);
    } else {
      message.avatar = "";
    }
    if (object.introduction !== undefined && object.introduction !== null) {
      message.introduction = String(object.introduction);
    } else {
      message.introduction = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(Member.fromJSON(e));
      }
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = Long.fromString(object.createdAt);
    } else {
      message.createdAt = Long.ZERO;
    }
    return message;
  },

  toJSON(message: GroupGetResp): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.avatar !== undefined && (obj.avatar = message.avatar);
    message.introduction !== undefined &&
      (obj.introduction = message.introduction);
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.members = [];
    }
    message.createdAt !== undefined &&
      (obj.createdAt = (message.createdAt || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GroupGetResp>): GroupGetResp {
    const message = { ...baseGroupGetResp } as GroupGetResp;
    message.members = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      message.avatar = object.avatar;
    } else {
      message.avatar = "";
    }
    if (object.introduction !== undefined && object.introduction !== null) {
      message.introduction = object.introduction;
    } else {
      message.introduction = "";
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.members !== undefined && object.members !== null) {
      for (const e of object.members) {
        message.members.push(Member.fromPartial(e));
      }
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt as Long;
    } else {
      message.createdAt = Long.ZERO;
    }
    return message;
  },
};

const baseGroupJoinNotify: object = { groupId: "", account: "" };

export const GroupJoinNotify = {
  encode(
    message: GroupJoinNotify,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== "") {
      writer.uint32(10).string(message.groupId);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupJoinNotify {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupJoinNotify } as GroupJoinNotify;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupJoinNotify {
    const message = { ...baseGroupJoinNotify } as GroupJoinNotify;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    return message;
  },

  toJSON(message: GroupJoinNotify): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = message.groupId);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupJoinNotify>): GroupJoinNotify {
    const message = { ...baseGroupJoinNotify } as GroupJoinNotify;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    return message;
  },
};

const baseGroupQuitNotify: object = { groupId: "", account: "" };

export const GroupQuitNotify = {
  encode(
    message: GroupQuitNotify,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== "") {
      writer.uint32(10).string(message.groupId);
    }
    if (message.account !== "") {
      writer.uint32(18).string(message.account);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupQuitNotify {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupQuitNotify } as GroupQuitNotify;
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): GroupQuitNotify {
    const message = { ...baseGroupQuitNotify } as GroupQuitNotify;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = String(object.groupId);
    } else {
      message.groupId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = String(object.account);
    } else {
      message.account = "";
    }
    return message;
  },

  toJSON(message: GroupQuitNotify): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = message.groupId);
    message.account !== undefined && (obj.account = message.account);
    return obj;
  },

  fromPartial(object: DeepPartial<GroupQuitNotify>): GroupQuitNotify {
    const message = { ...baseGroupQuitNotify } as GroupQuitNotify;
    if (object.groupId !== undefined && object.groupId !== null) {
      message.groupId = object.groupId;
    } else {
      message.groupId = "";
    }
    if (object.account !== undefined && object.account !== null) {
      message.account = object.account;
    } else {
      message.account = "";
    }
    return message;
  },
};

const baseMessageIndexReq: object = { messageId: Long.ZERO };

export const MessageIndexReq = {
  encode(
    message: MessageIndexReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.messageId.isZero()) {
      writer.uint32(8).int64(message.messageId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageIndexReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageIndexReq } as MessageIndexReq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageIndexReq {
    const message = { ...baseMessageIndexReq } as MessageIndexReq;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = Long.fromString(object.messageId);
    } else {
      message.messageId = Long.ZERO;
    }
    return message;
  },

  toJSON(message: MessageIndexReq): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = (message.messageId || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MessageIndexReq>): MessageIndexReq {
    const message = { ...baseMessageIndexReq } as MessageIndexReq;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId as Long;
    } else {
      message.messageId = Long.ZERO;
    }
    return message;
  },
};

const baseMessageIndexResp: object = {};

export const MessageIndexResp = {
  encode(
    message: MessageIndexResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.indexes) {
      MessageIndex.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageIndexResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageIndexResp } as MessageIndexResp;
    message.indexes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.indexes.push(MessageIndex.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageIndexResp {
    const message = { ...baseMessageIndexResp } as MessageIndexResp;
    message.indexes = [];
    if (object.indexes !== undefined && object.indexes !== null) {
      for (const e of object.indexes) {
        message.indexes.push(MessageIndex.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MessageIndexResp): unknown {
    const obj: any = {};
    if (message.indexes) {
      obj.indexes = message.indexes.map((e) =>
        e ? MessageIndex.toJSON(e) : undefined
      );
    } else {
      obj.indexes = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MessageIndexResp>): MessageIndexResp {
    const message = { ...baseMessageIndexResp } as MessageIndexResp;
    message.indexes = [];
    if (object.indexes !== undefined && object.indexes !== null) {
      for (const e of object.indexes) {
        message.indexes.push(MessageIndex.fromPartial(e));
      }
    }
    return message;
  },
};

const baseMessageIndex: object = {
  messageId: Long.ZERO,
  direction: 0,
  sendTime: Long.ZERO,
  accountB: "",
  group: "",
};

export const MessageIndex = {
  encode(
    message: MessageIndex,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageIndex {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageIndex } as MessageIndex;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.int64() as Long;
          break;
        case 2:
          message.direction = reader.int32();
          break;
        case 3:
          message.sendTime = reader.int64() as Long;
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

  fromJSON(object: any): MessageIndex {
    const message = { ...baseMessageIndex } as MessageIndex;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = Long.fromString(object.messageId);
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = Number(object.direction);
    } else {
      message.direction = 0;
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = Long.fromString(object.sendTime);
    } else {
      message.sendTime = Long.ZERO;
    }
    if (object.accountB !== undefined && object.accountB !== null) {
      message.accountB = String(object.accountB);
    } else {
      message.accountB = "";
    }
    if (object.group !== undefined && object.group !== null) {
      message.group = String(object.group);
    } else {
      message.group = "";
    }
    return message;
  },

  toJSON(message: MessageIndex): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = (message.messageId || Long.ZERO).toString());
    message.direction !== undefined && (obj.direction = message.direction);
    message.sendTime !== undefined &&
      (obj.sendTime = (message.sendTime || Long.ZERO).toString());
    message.accountB !== undefined && (obj.accountB = message.accountB);
    message.group !== undefined && (obj.group = message.group);
    return obj;
  },

  fromPartial(object: DeepPartial<MessageIndex>): MessageIndex {
    const message = { ...baseMessageIndex } as MessageIndex;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId as Long;
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = object.direction;
    } else {
      message.direction = 0;
    }
    if (object.sendTime !== undefined && object.sendTime !== null) {
      message.sendTime = object.sendTime as Long;
    } else {
      message.sendTime = Long.ZERO;
    }
    if (object.accountB !== undefined && object.accountB !== null) {
      message.accountB = object.accountB;
    } else {
      message.accountB = "";
    }
    if (object.group !== undefined && object.group !== null) {
      message.group = object.group;
    } else {
      message.group = "";
    }
    return message;
  },
};

const baseMessageContentReq: object = { messageIds: Long.ZERO };

export const MessageContentReq = {
  encode(
    message: MessageContentReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.messageIds) {
      writer.int64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageContentReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageContentReq } as MessageContentReq;
    message.messageIds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.messageIds.push(reader.int64() as Long);
            }
          } else {
            message.messageIds.push(reader.int64() as Long);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageContentReq {
    const message = { ...baseMessageContentReq } as MessageContentReq;
    message.messageIds = [];
    if (object.messageIds !== undefined && object.messageIds !== null) {
      for (const e of object.messageIds) {
        message.messageIds.push(Long.fromString(e));
      }
    }
    return message;
  },

  toJSON(message: MessageContentReq): unknown {
    const obj: any = {};
    if (message.messageIds) {
      obj.messageIds = message.messageIds.map((e) =>
        (e || Long.ZERO).toString()
      );
    } else {
      obj.messageIds = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MessageContentReq>): MessageContentReq {
    const message = { ...baseMessageContentReq } as MessageContentReq;
    message.messageIds = [];
    if (object.messageIds !== undefined && object.messageIds !== null) {
      for (const e of object.messageIds) {
        message.messageIds.push(e);
      }
    }
    return message;
  },
};

const baseMessageContent: object = {
  messageId: Long.ZERO,
  type: 0,
  body: "",
  extra: "",
};

export const MessageContent = {
  encode(
    message: MessageContent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageContent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageContent } as MessageContent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageId = reader.int64() as Long;
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

  fromJSON(object: any): MessageContent {
    const message = { ...baseMessageContent } as MessageContent;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = Long.fromString(object.messageId);
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = Number(object.type);
    } else {
      message.type = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body);
    } else {
      message.body = "";
    }
    if (object.extra !== undefined && object.extra !== null) {
      message.extra = String(object.extra);
    } else {
      message.extra = "";
    }
    return message;
  },

  toJSON(message: MessageContent): unknown {
    const obj: any = {};
    message.messageId !== undefined &&
      (obj.messageId = (message.messageId || Long.ZERO).toString());
    message.type !== undefined && (obj.type = message.type);
    message.body !== undefined && (obj.body = message.body);
    message.extra !== undefined && (obj.extra = message.extra);
    return obj;
  },

  fromPartial(object: DeepPartial<MessageContent>): MessageContent {
    const message = { ...baseMessageContent } as MessageContent;
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = object.messageId as Long;
    } else {
      message.messageId = Long.ZERO;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body;
    } else {
      message.body = "";
    }
    if (object.extra !== undefined && object.extra !== null) {
      message.extra = object.extra;
    } else {
      message.extra = "";
    }
    return message;
  },
};

const baseMessageContentResp: object = {};

export const MessageContentResp = {
  encode(
    message: MessageContentResp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.contents) {
      MessageContent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageContentResp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageContentResp } as MessageContentResp;
    message.contents = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contents.push(MessageContent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MessageContentResp {
    const message = { ...baseMessageContentResp } as MessageContentResp;
    message.contents = [];
    if (object.contents !== undefined && object.contents !== null) {
      for (const e of object.contents) {
        message.contents.push(MessageContent.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: MessageContentResp): unknown {
    const obj: any = {};
    if (message.contents) {
      obj.contents = message.contents.map((e) =>
        e ? MessageContent.toJSON(e) : undefined
      );
    } else {
      obj.contents = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<MessageContentResp>): MessageContentResp {
    const message = { ...baseMessageContentResp } as MessageContentResp;
    message.contents = [];
    if (object.contents !== undefined && object.contents !== null) {
      for (const e of object.contents) {
        message.contents.push(MessageContent.fromPartial(e));
      }
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
