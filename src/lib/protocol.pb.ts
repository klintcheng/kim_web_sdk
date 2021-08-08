export interface LoginReq {
  token?: string;
  isp?: string;
  zone?: string;
  tags?: string[];
}

export function encodeLoginReq(message: LoginReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeLoginReq(message, bb);
  return toUint8Array(bb);
}

function _encodeLoginReq(message: LoginReq, bb: ByteBuffer): void {
  // optional string token = 1;
  let $token = message.token;
  if ($token !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $token);
  }

  // optional string isp = 2;
  let $isp = message.isp;
  if ($isp !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $isp);
  }

  // optional string zone = 3;
  let $zone = message.zone;
  if ($zone !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $zone);
  }

  // repeated string tags = 4;
  let array$tags = message.tags;
  if (array$tags !== undefined) {
    for (let value of array$tags) {
      writeVarint32(bb, 34);
      writeString(bb, value);
    }
  }
}

export function decodeLoginReq(binary: Uint8Array): LoginReq {
  return _decodeLoginReq(wrapByteBuffer(binary));
}

function _decodeLoginReq(bb: ByteBuffer): LoginReq {
  let message: LoginReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string token = 1;
      case 1: {
        message.token = readString(bb, readVarint32(bb));
        break;
      }

      // optional string isp = 2;
      case 2: {
        message.isp = readString(bb, readVarint32(bb));
        break;
      }

      // optional string zone = 3;
      case 3: {
        message.zone = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string tags = 4;
      case 4: {
        let values = message.tags || (message.tags = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface LoginResp {
  channelId?: string;
}

export function encodeLoginResp(message: LoginResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeLoginResp(message, bb);
  return toUint8Array(bb);
}

function _encodeLoginResp(message: LoginResp, bb: ByteBuffer): void {
  // optional string channelId = 1;
  let $channelId = message.channelId;
  if ($channelId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $channelId);
  }
}

export function decodeLoginResp(binary: Uint8Array): LoginResp {
  return _decodeLoginResp(wrapByteBuffer(binary));
}

function _decodeLoginResp(bb: ByteBuffer): LoginResp {
  let message: LoginResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string channelId = 1;
      case 1: {
        message.channelId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface KickoutNotify {
  channelId?: string;
}

export function encodeKickoutNotify(message: KickoutNotify): Uint8Array {
  let bb = popByteBuffer();
  _encodeKickoutNotify(message, bb);
  return toUint8Array(bb);
}

function _encodeKickoutNotify(message: KickoutNotify, bb: ByteBuffer): void {
  // optional string channelId = 1;
  let $channelId = message.channelId;
  if ($channelId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $channelId);
  }
}

export function decodeKickoutNotify(binary: Uint8Array): KickoutNotify {
  return _decodeKickoutNotify(wrapByteBuffer(binary));
}

function _decodeKickoutNotify(bb: ByteBuffer): KickoutNotify {
  let message: KickoutNotify = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string channelId = 1;
      case 1: {
        message.channelId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Session {
  channelId?: string;
  gateId?: string;
  account?: string;
  zone?: string;
  isp?: string;
  remoteIP?: string;
  device?: string;
  app?: string;
  tags?: string[];
}

export function encodeSession(message: Session): Uint8Array {
  let bb = popByteBuffer();
  _encodeSession(message, bb);
  return toUint8Array(bb);
}

function _encodeSession(message: Session, bb: ByteBuffer): void {
  // optional string channelId = 1;
  let $channelId = message.channelId;
  if ($channelId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $channelId);
  }

  // optional string gateId = 2;
  let $gateId = message.gateId;
  if ($gateId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $gateId);
  }

  // optional string account = 3;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $account);
  }

  // optional string zone = 4;
  let $zone = message.zone;
  if ($zone !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $zone);
  }

  // optional string isp = 5;
  let $isp = message.isp;
  if ($isp !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $isp);
  }

  // optional string remoteIP = 6;
  let $remoteIP = message.remoteIP;
  if ($remoteIP !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $remoteIP);
  }

  // optional string device = 7;
  let $device = message.device;
  if ($device !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $device);
  }

  // optional string app = 8;
  let $app = message.app;
  if ($app !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $app);
  }

  // repeated string tags = 9;
  let array$tags = message.tags;
  if (array$tags !== undefined) {
    for (let value of array$tags) {
      writeVarint32(bb, 74);
      writeString(bb, value);
    }
  }
}

export function decodeSession(binary: Uint8Array): Session {
  return _decodeSession(wrapByteBuffer(binary));
}

function _decodeSession(bb: ByteBuffer): Session {
  let message: Session = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string channelId = 1;
      case 1: {
        message.channelId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string gateId = 2;
      case 2: {
        message.gateId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string account = 3;
      case 3: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      // optional string zone = 4;
      case 4: {
        message.zone = readString(bb, readVarint32(bb));
        break;
      }

      // optional string isp = 5;
      case 5: {
        message.isp = readString(bb, readVarint32(bb));
        break;
      }

      // optional string remoteIP = 6;
      case 6: {
        message.remoteIP = readString(bb, readVarint32(bb));
        break;
      }

      // optional string device = 7;
      case 7: {
        message.device = readString(bb, readVarint32(bb));
        break;
      }

      // optional string app = 8;
      case 8: {
        message.app = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string tags = 9;
      case 9: {
        let values = message.tags || (message.tags = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageReq {
  type?: number;
  body?: string;
  extra?: string;
}

export function encodeMessageReq(message: MessageReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageReq(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageReq(message: MessageReq, bb: ByteBuffer): void {
  // optional int32 type = 1;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($type));
  }

  // optional string body = 2;
  let $body = message.body;
  if ($body !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $body);
  }

  // optional string extra = 3;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $extra);
  }
}

export function decodeMessageReq(binary: Uint8Array): MessageReq {
  return _decodeMessageReq(wrapByteBuffer(binary));
}

function _decodeMessageReq(bb: ByteBuffer): MessageReq {
  let message: MessageReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 type = 1;
      case 1: {
        message.type = readVarint32(bb);
        break;
      }

      // optional string body = 2;
      case 2: {
        message.body = readString(bb, readVarint32(bb));
        break;
      }

      // optional string extra = 3;
      case 3: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageResp {
  messageId?: Long;
  sendTime?: Long;
}

export function encodeMessageResp(message: MessageResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageResp(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageResp(message: MessageResp, bb: ByteBuffer): void {
  // optional int64 messageId = 1;
  let $messageId = message.messageId;
  if ($messageId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $messageId);
  }

  // optional int64 sendTime = 2;
  let $sendTime = message.sendTime;
  if ($sendTime !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $sendTime);
  }
}

export function decodeMessageResp(binary: Uint8Array): MessageResp {
  return _decodeMessageResp(wrapByteBuffer(binary));
}

function _decodeMessageResp(bb: ByteBuffer): MessageResp {
  let message: MessageResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 messageId = 1;
      case 1: {
        message.messageId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 sendTime = 2;
      case 2: {
        message.sendTime = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessagePush {
  messageId?: Long;
  type?: number;
  body?: string;
  extra?: string;
  sender?: string;
  sendTime?: Long;
}

export function encodeMessagePush(message: MessagePush): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessagePush(message, bb);
  return toUint8Array(bb);
}

function _encodeMessagePush(message: MessagePush, bb: ByteBuffer): void {
  // optional int64 messageId = 1;
  let $messageId = message.messageId;
  if ($messageId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $messageId);
  }

  // optional int32 type = 2;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($type));
  }

  // optional string body = 3;
  let $body = message.body;
  if ($body !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $body);
  }

  // optional string extra = 4;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $extra);
  }

  // optional string sender = 5;
  let $sender = message.sender;
  if ($sender !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $sender);
  }

  // optional int64 sendTime = 6;
  let $sendTime = message.sendTime;
  if ($sendTime !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $sendTime);
  }
}

export function decodeMessagePush(binary: Uint8Array): MessagePush {
  return _decodeMessagePush(wrapByteBuffer(binary));
}

function _decodeMessagePush(bb: ByteBuffer): MessagePush {
  let message: MessagePush = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 messageId = 1;
      case 1: {
        message.messageId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 type = 2;
      case 2: {
        message.type = readVarint32(bb);
        break;
      }

      // optional string body = 3;
      case 3: {
        message.body = readString(bb, readVarint32(bb));
        break;
      }

      // optional string extra = 4;
      case 4: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      // optional string sender = 5;
      case 5: {
        message.sender = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 sendTime = 6;
      case 6: {
        message.sendTime = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface ErrorResp {
  message?: string;
}

export function encodeErrorResp(message: ErrorResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeErrorResp(message, bb);
  return toUint8Array(bb);
}

function _encodeErrorResp(message: ErrorResp, bb: ByteBuffer): void {
  // optional string message = 1;
  let $message = message.message;
  if ($message !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $message);
  }
}

export function decodeErrorResp(binary: Uint8Array): ErrorResp {
  return _decodeErrorResp(wrapByteBuffer(binary));
}

function _decodeErrorResp(bb: ByteBuffer): ErrorResp {
  let message: ErrorResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string message = 1;
      case 1: {
        message.message = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageAckReq {
  messageId?: Long;
}

export function encodeMessageAckReq(message: MessageAckReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageAckReq(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageAckReq(message: MessageAckReq, bb: ByteBuffer): void {
  // optional int64 messageId = 1;
  let $messageId = message.messageId;
  if ($messageId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $messageId);
  }
}

export function decodeMessageAckReq(binary: Uint8Array): MessageAckReq {
  return _decodeMessageAckReq(wrapByteBuffer(binary));
}

function _decodeMessageAckReq(bb: ByteBuffer): MessageAckReq {
  let message: MessageAckReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 messageId = 1;
      case 1: {
        message.messageId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupCreateReq {
  name?: string;
  avatar?: string;
  introduction?: string;
  owner?: string;
  members?: string[];
}

export function encodeGroupCreateReq(message: GroupCreateReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupCreateReq(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupCreateReq(message: GroupCreateReq, bb: ByteBuffer): void {
  // optional string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // optional string avatar = 2;
  let $avatar = message.avatar;
  if ($avatar !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $avatar);
  }

  // optional string introduction = 3;
  let $introduction = message.introduction;
  if ($introduction !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $introduction);
  }

  // optional string owner = 4;
  let $owner = message.owner;
  if ($owner !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $owner);
  }

  // repeated string members = 5;
  let array$members = message.members;
  if (array$members !== undefined) {
    for (let value of array$members) {
      writeVarint32(bb, 42);
      writeString(bb, value);
    }
  }
}

export function decodeGroupCreateReq(binary: Uint8Array): GroupCreateReq {
  return _decodeGroupCreateReq(wrapByteBuffer(binary));
}

function _decodeGroupCreateReq(bb: ByteBuffer): GroupCreateReq {
  let message: GroupCreateReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string avatar = 2;
      case 2: {
        message.avatar = readString(bb, readVarint32(bb));
        break;
      }

      // optional string introduction = 3;
      case 3: {
        message.introduction = readString(bb, readVarint32(bb));
        break;
      }

      // optional string owner = 4;
      case 4: {
        message.owner = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string members = 5;
      case 5: {
        let values = message.members || (message.members = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupCreateResp {
  group_id?: string;
}

export function encodeGroupCreateResp(message: GroupCreateResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupCreateResp(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupCreateResp(message: GroupCreateResp, bb: ByteBuffer): void {
  // optional string group_id = 1;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $group_id);
  }
}

export function decodeGroupCreateResp(binary: Uint8Array): GroupCreateResp {
  return _decodeGroupCreateResp(wrapByteBuffer(binary));
}

function _decodeGroupCreateResp(bb: ByteBuffer): GroupCreateResp {
  let message: GroupCreateResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string group_id = 1;
      case 1: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupCreateNotify {
  group_id?: string;
  members?: string[];
}

export function encodeGroupCreateNotify(message: GroupCreateNotify): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupCreateNotify(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupCreateNotify(message: GroupCreateNotify, bb: ByteBuffer): void {
  // optional string group_id = 1;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $group_id);
  }

  // repeated string members = 2;
  let array$members = message.members;
  if (array$members !== undefined) {
    for (let value of array$members) {
      writeVarint32(bb, 18);
      writeString(bb, value);
    }
  }
}

export function decodeGroupCreateNotify(binary: Uint8Array): GroupCreateNotify {
  return _decodeGroupCreateNotify(wrapByteBuffer(binary));
}

function _decodeGroupCreateNotify(bb: ByteBuffer): GroupCreateNotify {
  let message: GroupCreateNotify = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string group_id = 1;
      case 1: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string members = 2;
      case 2: {
        let values = message.members || (message.members = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupJoinReq {
  account?: string;
  group_id?: string;
}

export function encodeGroupJoinReq(message: GroupJoinReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupJoinReq(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupJoinReq(message: GroupJoinReq, bb: ByteBuffer): void {
  // optional string account = 1;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $account);
  }

  // optional string group_id = 2;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $group_id);
  }
}

export function decodeGroupJoinReq(binary: Uint8Array): GroupJoinReq {
  return _decodeGroupJoinReq(wrapByteBuffer(binary));
}

function _decodeGroupJoinReq(bb: ByteBuffer): GroupJoinReq {
  let message: GroupJoinReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string account = 1;
      case 1: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      // optional string group_id = 2;
      case 2: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupQuitReq {
  account?: string;
  group_id?: string;
}

export function encodeGroupQuitReq(message: GroupQuitReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupQuitReq(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupQuitReq(message: GroupQuitReq, bb: ByteBuffer): void {
  // optional string account = 1;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $account);
  }

  // optional string group_id = 2;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $group_id);
  }
}

export function decodeGroupQuitReq(binary: Uint8Array): GroupQuitReq {
  return _decodeGroupQuitReq(wrapByteBuffer(binary));
}

function _decodeGroupQuitReq(bb: ByteBuffer): GroupQuitReq {
  let message: GroupQuitReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string account = 1;
      case 1: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      // optional string group_id = 2;
      case 2: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupGetReq {
  group_id?: string;
}

export function encodeGroupGetReq(message: GroupGetReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupGetReq(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupGetReq(message: GroupGetReq, bb: ByteBuffer): void {
  // optional string group_id = 1;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $group_id);
  }
}

export function decodeGroupGetReq(binary: Uint8Array): GroupGetReq {
  return _decodeGroupGetReq(wrapByteBuffer(binary));
}

function _decodeGroupGetReq(bb: ByteBuffer): GroupGetReq {
  let message: GroupGetReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string group_id = 1;
      case 1: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Member {
  account?: string;
  alias?: string;
  avatar?: string;
  join_time?: Long;
}

export function encodeMember(message: Member): Uint8Array {
  let bb = popByteBuffer();
  _encodeMember(message, bb);
  return toUint8Array(bb);
}

function _encodeMember(message: Member, bb: ByteBuffer): void {
  // optional string account = 1;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $account);
  }

  // optional string alias = 2;
  let $alias = message.alias;
  if ($alias !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $alias);
  }

  // optional string avatar = 3;
  let $avatar = message.avatar;
  if ($avatar !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $avatar);
  }

  // optional int64 join_time = 4;
  let $join_time = message.join_time;
  if ($join_time !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $join_time);
  }
}

export function decodeMember(binary: Uint8Array): Member {
  return _decodeMember(wrapByteBuffer(binary));
}

function _decodeMember(bb: ByteBuffer): Member {
  let message: Member = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string account = 1;
      case 1: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      // optional string alias = 2;
      case 2: {
        message.alias = readString(bb, readVarint32(bb));
        break;
      }

      // optional string avatar = 3;
      case 3: {
        message.avatar = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 join_time = 4;
      case 4: {
        message.join_time = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupGetResp {
  id?: string;
  name?: string;
  avatar?: string;
  introduction?: string;
  owner?: string;
  members?: Member[];
  created_at?: Long;
}

export function encodeGroupGetResp(message: GroupGetResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupGetResp(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupGetResp(message: GroupGetResp, bb: ByteBuffer): void {
  // optional string id = 1;
  let $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // optional string name = 2;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $name);
  }

  // optional string avatar = 3;
  let $avatar = message.avatar;
  if ($avatar !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $avatar);
  }

  // optional string introduction = 4;
  let $introduction = message.introduction;
  if ($introduction !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $introduction);
  }

  // optional string owner = 5;
  let $owner = message.owner;
  if ($owner !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $owner);
  }

  // repeated Member members = 6;
  let array$members = message.members;
  if (array$members !== undefined) {
    for (let value of array$members) {
      writeVarint32(bb, 50);
      let nested = popByteBuffer();
      _encodeMember(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional int64 created_at = 7;
  let $created_at = message.created_at;
  if ($created_at !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $created_at);
  }
}

export function decodeGroupGetResp(binary: Uint8Array): GroupGetResp {
  return _decodeGroupGetResp(wrapByteBuffer(binary));
}

function _decodeGroupGetResp(bb: ByteBuffer): GroupGetResp {
  let message: GroupGetResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string name = 2;
      case 2: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string avatar = 3;
      case 3: {
        message.avatar = readString(bb, readVarint32(bb));
        break;
      }

      // optional string introduction = 4;
      case 4: {
        message.introduction = readString(bb, readVarint32(bb));
        break;
      }

      // optional string owner = 5;
      case 5: {
        message.owner = readString(bb, readVarint32(bb));
        break;
      }

      // repeated Member members = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        let values = message.members || (message.members = []);
        values.push(_decodeMember(bb));
        bb.limit = limit;
        break;
      }

      // optional int64 created_at = 7;
      case 7: {
        message.created_at = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupJoinNotify {
  group_id?: string;
  account?: string;
}

export function encodeGroupJoinNotify(message: GroupJoinNotify): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupJoinNotify(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupJoinNotify(message: GroupJoinNotify, bb: ByteBuffer): void {
  // optional string group_id = 1;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $group_id);
  }

  // optional string account = 2;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $account);
  }
}

export function decodeGroupJoinNotify(binary: Uint8Array): GroupJoinNotify {
  return _decodeGroupJoinNotify(wrapByteBuffer(binary));
}

function _decodeGroupJoinNotify(bb: ByteBuffer): GroupJoinNotify {
  let message: GroupJoinNotify = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string group_id = 1;
      case 1: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string account = 2;
      case 2: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface GroupQuitNotify {
  group_id?: string;
  account?: string;
}

export function encodeGroupQuitNotify(message: GroupQuitNotify): Uint8Array {
  let bb = popByteBuffer();
  _encodeGroupQuitNotify(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupQuitNotify(message: GroupQuitNotify, bb: ByteBuffer): void {
  // optional string group_id = 1;
  let $group_id = message.group_id;
  if ($group_id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $group_id);
  }

  // optional string account = 2;
  let $account = message.account;
  if ($account !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $account);
  }
}

export function decodeGroupQuitNotify(binary: Uint8Array): GroupQuitNotify {
  return _decodeGroupQuitNotify(wrapByteBuffer(binary));
}

function _decodeGroupQuitNotify(bb: ByteBuffer): GroupQuitNotify {
  let message: GroupQuitNotify = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string group_id = 1;
      case 1: {
        message.group_id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string account = 2;
      case 2: {
        message.account = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageIndexReq {
  message_id?: Long;
}

export function encodeMessageIndexReq(message: MessageIndexReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageIndexReq(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageIndexReq(message: MessageIndexReq, bb: ByteBuffer): void {
  // optional int64 message_id = 1;
  let $message_id = message.message_id;
  if ($message_id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $message_id);
  }
}

export function decodeMessageIndexReq(binary: Uint8Array): MessageIndexReq {
  return _decodeMessageIndexReq(wrapByteBuffer(binary));
}

function _decodeMessageIndexReq(bb: ByteBuffer): MessageIndexReq {
  let message: MessageIndexReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 message_id = 1;
      case 1: {
        message.message_id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageIndexResp {
  indexes?: MessageIndex[];
}

export function encodeMessageIndexResp(message: MessageIndexResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageIndexResp(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageIndexResp(message: MessageIndexResp, bb: ByteBuffer): void {
  // repeated MessageIndex indexes = 1;
  let array$indexes = message.indexes;
  if (array$indexes !== undefined) {
    for (let value of array$indexes) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeMessageIndex(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMessageIndexResp(binary: Uint8Array): MessageIndexResp {
  return _decodeMessageIndexResp(wrapByteBuffer(binary));
}

function _decodeMessageIndexResp(bb: ByteBuffer): MessageIndexResp {
  let message: MessageIndexResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated MessageIndex indexes = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.indexes || (message.indexes = []);
        values.push(_decodeMessageIndex(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageIndex {
  message_id?: Long;
  direction?: number;
  send_time?: Long;
  accountB?: string;
  group?: string;
}

export function encodeMessageIndex(message: MessageIndex): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageIndex(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageIndex(message: MessageIndex, bb: ByteBuffer): void {
  // optional int64 message_id = 1;
  let $message_id = message.message_id;
  if ($message_id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $message_id);
  }

  // optional int32 direction = 2;
  let $direction = message.direction;
  if ($direction !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($direction));
  }

  // optional int64 send_time = 3;
  let $send_time = message.send_time;
  if ($send_time !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $send_time);
  }

  // optional string accountB = 4;
  let $accountB = message.accountB;
  if ($accountB !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $accountB);
  }

  // optional string group = 5;
  let $group = message.group;
  if ($group !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $group);
  }
}

export function decodeMessageIndex(binary: Uint8Array): MessageIndex {
  return _decodeMessageIndex(wrapByteBuffer(binary));
}

function _decodeMessageIndex(bb: ByteBuffer): MessageIndex {
  let message: MessageIndex = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 message_id = 1;
      case 1: {
        message.message_id = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 direction = 2;
      case 2: {
        message.direction = readVarint32(bb);
        break;
      }

      // optional int64 send_time = 3;
      case 3: {
        message.send_time = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string accountB = 4;
      case 4: {
        message.accountB = readString(bb, readVarint32(bb));
        break;
      }

      // optional string group = 5;
      case 5: {
        message.group = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageContentReq {
  message_ids?: Long[];
}

export function encodeMessageContentReq(message: MessageContentReq): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageContentReq(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageContentReq(message: MessageContentReq, bb: ByteBuffer): void {
  // repeated int64 message_ids = 1;
  let array$message_ids = message.message_ids;
  if (array$message_ids !== undefined) {
    let packed = popByteBuffer();
    for (let value of array$message_ids) {
      writeVarint64(packed, value);
    }
    writeVarint32(bb, 10);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
}

export function decodeMessageContentReq(binary: Uint8Array): MessageContentReq {
  return _decodeMessageContentReq(wrapByteBuffer(binary));
}

function _decodeMessageContentReq(bb: ByteBuffer): MessageContentReq {
  let message: MessageContentReq = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated int64 message_ids = 1;
      case 1: {
        let values = message.message_ids || (message.message_ids = []);
        if ((tag & 7) === 2) {
          let outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint64(bb, /* unsigned */ false));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint64(bb, /* unsigned */ false));
        }
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageContent {
  messageId?: Long;
  type?: number;
  body?: string;
  extra?: string;
}

export function encodeMessageContent(message: MessageContent): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageContent(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageContent(message: MessageContent, bb: ByteBuffer): void {
  // optional int64 messageId = 1;
  let $messageId = message.messageId;
  if ($messageId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $messageId);
  }

  // optional int32 type = 2;
  let $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($type));
  }

  // optional string body = 3;
  let $body = message.body;
  if ($body !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $body);
  }

  // optional string extra = 4;
  let $extra = message.extra;
  if ($extra !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $extra);
  }
}

export function decodeMessageContent(binary: Uint8Array): MessageContent {
  return _decodeMessageContent(wrapByteBuffer(binary));
}

function _decodeMessageContent(bb: ByteBuffer): MessageContent {
  let message: MessageContent = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 messageId = 1;
      case 1: {
        message.messageId = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int32 type = 2;
      case 2: {
        message.type = readVarint32(bb);
        break;
      }

      // optional string body = 3;
      case 3: {
        message.body = readString(bb, readVarint32(bb));
        break;
      }

      // optional string extra = 4;
      case 4: {
        message.extra = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface MessageContentResp {
  contents?: MessageContent[];
}

export function encodeMessageContentResp(message: MessageContentResp): Uint8Array {
  let bb = popByteBuffer();
  _encodeMessageContentResp(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageContentResp(message: MessageContentResp, bb: ByteBuffer): void {
  // repeated MessageContent contents = 1;
  let array$contents = message.contents;
  if (array$contents !== undefined) {
    for (let value of array$contents) {
      writeVarint32(bb, 10);
      let nested = popByteBuffer();
      _encodeMessageContent(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
}

export function decodeMessageContentResp(binary: Uint8Array): MessageContentResp {
  return _decodeMessageContentResp(wrapByteBuffer(binary));
}

function _decodeMessageContentResp(bb: ByteBuffer): MessageContentResp {
  let message: MessageContentResp = {} as any;

  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated MessageContent contents = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        let values = message.contents || (message.contents = []);
        values.push(_decodeMessageContent(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export interface Long {
  low: number;
  high: number;
  unsigned: boolean;
}

interface ByteBuffer {
  bytes: Uint8Array;
  offset: number;
  limit: number;
}

function pushTemporaryLength(bb: ByteBuffer): number {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb: ByteBuffer, type: number): void {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value: string): Long {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value: Long): string {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value: number): Long {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack: ByteBuffer[] = [];

function popByteBuffer(): ByteBuffer {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb: ByteBuffer): void {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes: Uint8Array): ByteBuffer {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb: ByteBuffer): Uint8Array {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb: ByteBuffer, offset: number): void {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb: ByteBuffer): boolean {
  return bb.offset >= bb.limit;
}

function grow(bb: ByteBuffer, count: number): number {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb: ByteBuffer, count: number): number {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb: ByteBuffer, count: number): Uint8Array {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb: ByteBuffer, buffer: Uint8Array): void {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb: ByteBuffer, count: number): string {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2: number, c3: number, c4: number, c: number;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb: ByteBuffer, text: string): void {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb: ByteBuffer, buffer: ByteBuffer): void {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb: ByteBuffer): number {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb: ByteBuffer): number {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb: ByteBuffer): number {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb: ByteBuffer, value: number): void {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb: ByteBuffer, unsigned: boolean): Long {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb: ByteBuffer, value: Long): void {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb: ByteBuffer): number {
  let c = 0;
  let value = 0;
  let b: number;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb: ByteBuffer, value: number): void {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb: ByteBuffer, unsigned: boolean): Long {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b: number;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb: ByteBuffer, value: Long): void {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb: ByteBuffer): number {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb: ByteBuffer, value: number): void {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb: ByteBuffer): Long {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb: ByteBuffer, value: Long): void {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
