"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.KIMClient = exports.Content = exports.Message = exports.OfflineMessages = exports.Request = exports.Response = exports.KIMEvent = exports.KIMStatus = exports.State = exports.sleep = void 0;
var buffer_1 = require("buffer");
var loglevel_es_1 = __importDefault(require("loglevel-es"));
var packet_1 = require("./packet");
var common_1 = require("./proto/common");
var protocol_1 = require("./proto/protocol");
var login_1 = require("./login");
var long_1 = __importDefault(require("long"));
var localforage_1 = __importDefault(require("localforage"));
var heartbeatInterval = 55 * 1000; // seconds
var sendTimeout = 5 * 1000; // 10 seconds
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["Second"] = 1000] = "Second";
    TimeUnit[TimeUnit["Millisecond"] = 1] = "Millisecond";
})(TimeUnit || (TimeUnit = {}));
var sleep = function (second, Unit) {
    if (Unit === void 0) { Unit = TimeUnit.Second; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, _) {
                    setTimeout(function () {
                        resolve();
                    }, second * Unit);
                })];
        });
    });
};
exports.sleep = sleep;
var State;
(function (State) {
    State[State["INIT"] = 0] = "INIT";
    State[State["CONNECTING"] = 1] = "CONNECTING";
    State[State["CONNECTED"] = 2] = "CONNECTED";
    State[State["RECONNECTING"] = 3] = "RECONNECTING";
    State[State["CLOSEING"] = 4] = "CLOSEING";
    State[State["CLOSED"] = 5] = "CLOSED";
})(State = exports.State || (exports.State = {}));
// 客户端自定义的状态码范围 [10, 100)
var KIMStatus;
(function (KIMStatus) {
    KIMStatus[KIMStatus["RequestTimeout"] = 10] = "RequestTimeout";
    KIMStatus[KIMStatus["SendFailed"] = 11] = "SendFailed";
})(KIMStatus = exports.KIMStatus || (exports.KIMStatus = {}));
var KIMEvent;
(function (KIMEvent) {
    KIMEvent["Reconnecting"] = "Reconnecting";
    KIMEvent["Reconnected"] = "Reconnected";
    KIMEvent["Closed"] = "Closed";
    KIMEvent["Kickout"] = "Kickout";
})(KIMEvent = exports.KIMEvent || (exports.KIMEvent = {}));
var Response = /** @class */ (function () {
    function Response(status, dest, payload) {
        if (payload === void 0) { payload = new Uint8Array(); }
        this.status = status;
        this.dest = dest;
        this.payload = payload;
    }
    return Response;
}());
exports.Response = Response;
var Request = /** @class */ (function () {
    function Request(data, callback) {
        this.sendTime = Date.now();
        this.data = data;
        this.callback = callback;
    }
    return Request;
}());
exports.Request = Request;
var pageCount = 50;
var OfflineMessages = /** @class */ (function () {
    function OfflineMessages(cli, indexes) {
        var _a, _b;
        this.groupmessages = new Map();
        this.usermessages = new Map();
        this.cli = cli;
        // 通常离线消息的读取是从下向上，因此这里提前倒序下
        for (var index = indexes.length - 1; index >= 0; index--) {
            var idx = indexes[index];
            var message = new Message(idx.messageId, idx.sendTime);
            if (idx.direction == 1) {
                message.sender = cli.account;
                message.receiver = idx.accountB;
            }
            else {
                message.sender = idx.accountB;
                message.receiver = cli.account;
            }
            if (!!idx.group) {
                if (!this.groupmessages.has(idx.group)) {
                    this.groupmessages.set(idx.group, new Array());
                }
                (_a = this.groupmessages.get(idx.group)) === null || _a === void 0 ? void 0 : _a.push(message);
            }
            else {
                if (!this.usermessages.has(idx.accountB)) {
                    this.usermessages.set(idx.accountB, new Array());
                }
                (_b = this.usermessages.get(idx.accountB)) === null || _b === void 0 ? void 0 : _b.push(message);
            }
        }
    }
    /**
     * 获取离线消息群列表
     */
    OfflineMessages.prototype.listGroups = function () {
        var arr = new Array();
        this.groupmessages.forEach(function (_, key) {
            arr.push(key);
        });
        return arr;
    };
    /**
     * 获取离线消息用户列表
     */
    OfflineMessages.prototype.listUsers = function () {
        var arr = new Array();
        this.usermessages.forEach(function (_, key) {
            arr.push(key);
        });
        return arr;
    };
    /**
     * lazy load group offline messages, the page count is 50
     * @param page page number, start from one
     */
    OfflineMessages.prototype.loadGroup = function (group, page) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, msgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messages = this.groupmessages.get(group);
                        if (!messages) {
                            return [2 /*return*/, new Array()];
                        }
                        return [4 /*yield*/, this.lazyLoad(messages, page)];
                    case 1:
                        msgs = _a.sent();
                        return [2 /*return*/, msgs];
                }
            });
        });
    };
    OfflineMessages.prototype.loadUser = function (account, page) {
        return __awaiter(this, void 0, void 0, function () {
            var messages, msgs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        messages = this.usermessages.get(account);
                        if (!messages) {
                            return [2 /*return*/, new Array()];
                        }
                        return [4 /*yield*/, this.lazyLoad(messages, page)];
                    case 1:
                        msgs = _a.sent();
                        return [2 /*return*/, msgs];
                }
            });
        });
    };
    /**
     * 获取指定群的离线消息数据
     * @param group 群ID
     */
    OfflineMessages.prototype.getGroupMessagesCount = function (group) {
        var messages = this.groupmessages.get(group);
        if (!messages) {
            return 0;
        }
        return messages.length;
    };
    /**
     * 获取指定用户的离线消息数量
     * @param account 用户
     */
    OfflineMessages.prototype.getUserMessagesCount = function (account) {
        var messages = this.usermessages.get(account);
        if (!messages) {
            return 0;
        }
        return messages.length;
    };
    OfflineMessages.prototype.lazyLoad = function (messages, page) {
        return __awaiter(this, void 0, void 0, function () {
            var i, msgs, _a, status, contents, index, msg, original, content;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        i = (page - 1) * pageCount;
                        msgs = messages.slice(i, i + pageCount);
                        loglevel_es_1.default.debug(msgs);
                        if (!msgs || msgs.length == 0) {
                            return [2 /*return*/, new Array()];
                        }
                        if (!!msgs[0].body) {
                            return [2 /*return*/, msgs];
                        }
                        return [4 /*yield*/, this.loadcontent(msgs.map(function (idx) { return idx.messageId; }))];
                    case 1:
                        _a = _b.sent(), status = _a.status, contents = _a.contents;
                        if (status != common_1.Status.Success) {
                            return [2 /*return*/, msgs];
                        }
                        loglevel_es_1.default.debug("load content " + contents.map(function (c) { return c.body; }));
                        if (contents.length == msgs.length) {
                            for (index = 0; index < msgs.length; index++) {
                                msg = msgs[index];
                                original = messages[i + index];
                                content = contents[index];
                                Object.assign(msg, content);
                                Object.assign(original, content);
                            }
                        }
                        return [2 /*return*/, msgs];
                }
            });
        });
    };
    OfflineMessages.prototype.loadcontent = function (messageIds) {
        return __awaiter(this, void 0, void 0, function () {
            var req, pkt, resp, err, respbody;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req = protocol_1.MessageContentReq.encode({ messageIds: messageIds });
                        pkt = packet_1.LogicPkt.build(packet_1.Command.OfflineContent, "", req.finish());
                        return [4 /*yield*/, this.cli.request(pkt)];
                    case 1:
                        resp = _a.sent();
                        if (resp.status != common_1.Status.Success) {
                            err = protocol_1.ErrorResp.decode(pkt.payload);
                            loglevel_es_1.default.error(err);
                            return [2 /*return*/, { status: resp.status, contents: new Array() }];
                        }
                        loglevel_es_1.default.info(resp);
                        respbody = protocol_1.MessageContentResp.decode(resp.payload);
                        return [2 /*return*/, { status: resp.status, contents: respbody.contents }];
                }
            });
        });
    };
    return OfflineMessages;
}());
exports.OfflineMessages = OfflineMessages;
var Message = /** @class */ (function () {
    function Message(messageId, sendTime) {
        this.messageId = messageId;
        this.sendTime = sendTime;
        this.arrivalTime = Date.now();
    }
    return Message;
}());
exports.Message = Message;
var Content = /** @class */ (function () {
    function Content(body, type, extra) {
        if (type === void 0) { type = packet_1.MessageType.Text; }
        this.type = type;
        this.body = body;
        this.extra = extra;
    }
    return Content;
}());
exports.Content = Content;
var KIMClient = /** @class */ (function () {
    function KIMClient(url, req) {
        this.state = State.INIT;
        this.unack = 0;
        this.listeners = new Map();
        // 全双工请求队列
        this.sendq = new Map();
        this.wsurl = url;
        this.req = req;
        this.lastRead = Date.now();
        this.channelId = "";
        this.account = "";
        this.messageCallback = function (m) {
            loglevel_es_1.default.warn("throw a message from " + m.sender + " -- " + m.body + "\nPlease check you had register a onmessage callback method before login");
        };
        this.offmessageCallback = function (m) {
            loglevel_es_1.default.warn("throw OfflineMessages.\nPlease check you had register a onofflinemessage callback method before login");
        };
    }
    KIMClient.prototype.register = function (events, callback) {
        var _this = this;
        // 注册事件到Client中。
        events.forEach(function (event) {
            _this.listeners.set(event, callback);
        });
    };
    KIMClient.prototype.onmessage = function (cb) {
        this.messageCallback = cb;
    };
    KIMClient.prototype.onofflinemessage = function (cb) {
        this.offmessageCallback = cb;
    };
    // 1、登录
    KIMClient.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, success, err, channelId, account, conn;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.state == State.CONNECTED) {
                            return [2 /*return*/, { success: false, err: new Error("client has already been connected") }];
                        }
                        this.state = State.CONNECTING;
                        return [4 /*yield*/, login_1.doLogin(this.wsurl, this.req)];
                    case 1:
                        _a = _b.sent(), success = _a.success, err = _a.err, channelId = _a.channelId, account = _a.account, conn = _a.conn;
                        if (!success) {
                            this.state = State.INIT;
                            return [2 /*return*/, { success: success, err: err }];
                        }
                        loglevel_es_1.default.info("login - ", success);
                        // overwrite onmessage
                        conn.onmessage = function (evt) {
                            try {
                                // 重置lastRead
                                _this.lastRead = Date.now();
                                var buf = buffer_1.Buffer.from(evt.data);
                                var magic = buf.readInt32BE();
                                if (magic == packet_1.MagicBasicPktInt) { //目前只有心跳包pong
                                    loglevel_es_1.default.debug("recv a basic packet - " + buf.join(","));
                                    return;
                                }
                                var pkt = packet_1.LogicPkt.from(buf);
                                _this.packetHandler(pkt);
                            }
                            catch (error) {
                                loglevel_es_1.default.error(evt.data, error);
                            }
                        };
                        conn.onerror = function (error) {
                            loglevel_es_1.default.info("websocket error: ", error);
                            _this.errorHandler(error);
                        };
                        conn.onclose = function (e) {
                            loglevel_es_1.default.debug("event[onclose] fired");
                            if (_this.state == State.CLOSEING) {
                                _this.onclose("logout");
                                return;
                            }
                            _this.errorHandler(new Error(e.reason));
                        };
                        this.conn = conn;
                        this.channelId = channelId || "";
                        this.account = account || "";
                        return [4 /*yield*/, this.loadOfflineMessage()
                            // success
                        ];
                    case 2:
                        _b.sent();
                        // success
                        this.state = State.CONNECTED;
                        this.heartbeatLoop();
                        this.readDeadlineLoop();
                        this.messageAckLoop();
                        return [2 /*return*/, { success: success, err: err }];
                }
            });
        });
    };
    KIMClient.prototype.logout = function () {
        var _this = this;
        return new Promise(function (resolve, _) {
            if (_this.state === State.CLOSEING) {
                return;
            }
            _this.state = State.CLOSEING;
            if (!_this.conn) {
                return;
            }
            var tr = setTimeout(function () {
                loglevel_es_1.default.debug("oh no,logout is timeout~");
                _this.onclose("logout");
                resolve();
            }, 1500);
            _this.closeCallback = function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clearTimeout(tr);
                            return [4 /*yield*/, exports.sleep(1)];
                        case 1:
                            _a.sent();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); };
            _this.conn.close();
            loglevel_es_1.default.info("Connection closing...");
        });
    };
    /**
    * 给用户dest发送一条消息
    * @param dest 用户账号
    * @param req 请求的消息内容
    * @returns status KIMStatus|Status
    */
    KIMClient.prototype.talkToUser = function (dest, req, retry) {
        if (retry === void 0) { retry = 3; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.talk(packet_1.Command.ChatUserTalk, dest, protocol_1.MessageReq.fromJSON(req), retry)];
            });
        });
    };
    /**
     * 给群dest发送一条消息
     * @param dest 群ID
     * @param req 请求的消息内容
     * @returns status KIMStatus|Status
     */
    KIMClient.prototype.talkToGroup = function (dest, req, retry) {
        if (retry === void 0) { retry = 3; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.talk(packet_1.Command.ChatGroupTalk, dest, protocol_1.MessageReq.fromJSON(req), retry)];
            });
        });
    };
    KIMClient.prototype.createGroup = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var req2, pbreq, pkt, resp, err;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        req2 = protocol_1.GroupCreateReq.fromJSON(req);
                        req2.owner = this.account;
                        if (!req2.members.find(function (v) { return v == _this.account; })) {
                            req2.members.push(this.account);
                        }
                        pbreq = protocol_1.GroupCreateReq.encode(req2).finish();
                        pkt = packet_1.LogicPkt.build(packet_1.Command.GroupCreate, "", pbreq);
                        return [4 /*yield*/, this.request(pkt)];
                    case 1:
                        resp = _a.sent();
                        if (resp.status != common_1.Status.Success) {
                            err = protocol_1.ErrorResp.decode(resp.payload);
                            return [2 /*return*/, { status: resp.status, err: err }];
                        }
                        return [2 /*return*/, { status: common_1.Status.Success, resp: protocol_1.GroupCreateResp.decode(resp.payload) }];
                }
            });
        });
    };
    KIMClient.prototype.joinGroup = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var pbreq, pkt, resp, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pbreq = protocol_1.GroupJoinReq.encode(req).finish();
                        pkt = packet_1.LogicPkt.build(packet_1.Command.GroupJoin, "", pbreq);
                        return [4 /*yield*/, this.request(pkt)];
                    case 1:
                        resp = _a.sent();
                        if (resp.status != common_1.Status.Success) {
                            err = protocol_1.ErrorResp.decode(resp.payload);
                            return [2 /*return*/, { status: resp.status, err: err }];
                        }
                        return [2 /*return*/, { status: common_1.Status.Success }];
                }
            });
        });
    };
    KIMClient.prototype.quitGroup = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var pbreq, pkt, resp, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pbreq = protocol_1.GroupQuitReq.encode(req).finish();
                        pkt = packet_1.LogicPkt.build(packet_1.Command.GroupQuit, "", pbreq);
                        return [4 /*yield*/, this.request(pkt)];
                    case 1:
                        resp = _a.sent();
                        if (resp.status != common_1.Status.Success) {
                            err = protocol_1.ErrorResp.decode(resp.payload);
                            return [2 /*return*/, { status: resp.status, err: err }];
                        }
                        return [2 /*return*/, { status: common_1.Status.Success }];
                }
            });
        });
    };
    KIMClient.prototype.GetGroup = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var pbreq, pkt, resp, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pbreq = protocol_1.GroupGetReq.encode(req).finish();
                        pkt = packet_1.LogicPkt.build(packet_1.Command.GroupDetail, "", pbreq);
                        return [4 /*yield*/, this.request(pkt)];
                    case 1:
                        resp = _a.sent();
                        if (resp.status != common_1.Status.Success) {
                            err = protocol_1.ErrorResp.decode(resp.payload);
                            return [2 /*return*/, { status: resp.status, err: err }];
                        }
                        return [2 /*return*/, { status: common_1.Status.Success, resp: protocol_1.GroupGetResp.decode(resp.payload) }];
                }
            });
        });
    };
    KIMClient.prototype.talk = function (command, dest, req, retry) {
        return __awaiter(this, void 0, void 0, function () {
            var pbreq, index, pkt, resp, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pbreq = protocol_1.MessageReq.encode(req).finish();
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < retry + 1)) return [3 /*break*/, 6];
                        pkt = packet_1.LogicPkt.build(command, dest, pbreq);
                        return [4 /*yield*/, this.request(pkt)];
                    case 2:
                        resp = _a.sent();
                        if (resp.status == common_1.Status.Success) {
                            return [2 /*return*/, { status: common_1.Status.Success, resp: protocol_1.MessageResp.decode(resp.payload) }];
                        }
                        if (!(resp.status >= 300 && resp.status < 400)) return [3 /*break*/, 4];
                        // 消息重发
                        loglevel_es_1.default.warn("retry to send message");
                        return [4 /*yield*/, exports.sleep(2)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err = protocol_1.ErrorResp.decode(resp.payload);
                        return [2 /*return*/, { status: resp.status, err: err }];
                    case 5:
                        index++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, { status: KIMStatus.SendFailed, err: new Error("over max retry times") }];
                }
            });
        });
    };
    KIMClient.prototype.request = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, _) {
                        var seq = data.sequence;
                        var tr = setTimeout(function () {
                            // remove from sendq
                            _this.sendq.delete(seq);
                            resolve(new Response(KIMStatus.RequestTimeout));
                        }, sendTimeout);
                        // asynchronous wait ack from server
                        var callback = function (pkt) {
                            clearTimeout(tr);
                            // remove from sendq
                            _this.sendq.delete(seq);
                            resolve(new Response(pkt.status, pkt.dest, pkt.payload));
                        };
                        loglevel_es_1.default.debug("request seq:" + seq + " command:" + data.command);
                        _this.sendq.set(seq, new Request(data, callback));
                        if (!_this.send(data.bytes())) {
                            resolve(new Response(KIMStatus.SendFailed));
                        }
                    })];
            });
        });
    };
    KIMClient.prototype.fireEvent = function (event) {
        var listener = this.listeners.get(event);
        if (!!listener) {
            listener(event);
        }
    };
    KIMClient.prototype.packetHandler = function (pkt) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var req, _b, push, message, ko;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        loglevel_es_1.default.debug("received packet: ", pkt);
                        if (pkt.status >= 400) {
                            loglevel_es_1.default.info("need relogin due to status " + pkt.status);
                            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close();
                            return [2 /*return*/];
                        }
                        if (pkt.flag == common_1.Flag.Response) {
                            req = this.sendq.get(pkt.sequence);
                            if (req) {
                                req.callback(pkt);
                            }
                            else {
                                loglevel_es_1.default.error("req of " + pkt.sequence + " no found in sendq");
                            }
                            return [2 /*return*/];
                        }
                        _b = pkt.command;
                        switch (_b) {
                            case packet_1.Command.ChatUserTalk: return [3 /*break*/, 1];
                            case packet_1.Command.ChatGroupTalk: return [3 /*break*/, 1];
                            case packet_1.Command.SignIn: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        push = protocol_1.MessagePush.decode(pkt.payload);
                        message = new Message(push.messageId, push.sendTime);
                        Object.assign(message, push);
                        message.receiver = this.account;
                        if (pkt.command == packet_1.Command.ChatGroupTalk) {
                            message.group = pkt.dest;
                        }
                        return [4 /*yield*/, exports.Store.exist(message.messageId)];
                    case 2:
                        if (!!(_c.sent())) return [3 /*break*/, 4];
                        // 确保状态处于CONNECTED，才能执行消息ACK
                        if (this.state == State.CONNECTED) {
                            this.lastMessage = message;
                            this.unack++;
                            try {
                                this.messageCallback(message);
                            }
                            catch (error) {
                                loglevel_es_1.default.error(error);
                            }
                        }
                        // 消息保存到数据库中。
                        return [4 /*yield*/, exports.Store.insert(message)];
                    case 3:
                        // 消息保存到数据库中。
                        _c.sent();
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ko = protocol_1.KickoutNotify.decode(pkt.payload);
                        if (ko.channelId == this.channelId) {
                            this.logout();
                            this.fireEvent(KIMEvent.Kickout);
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // 2、心跳
    KIMClient.prototype.heartbeatLoop = function () {
        var _this = this;
        loglevel_es_1.default.debug("heartbeatLoop start");
        var start = Date.now();
        var loop = function () {
            if (_this.state != State.CONNECTED) {
                loglevel_es_1.default.debug("heartbeatLoop exited");
                return;
            }
            if (Date.now() - start >= heartbeatInterval) {
                loglevel_es_1.default.debug(">>> send ping ; state is " + _this.state);
                start = Date.now();
                _this.send(packet_1.Ping);
            }
            setTimeout(loop, 500);
        };
        setTimeout(loop, 500);
    };
    // 3、读超时
    KIMClient.prototype.readDeadlineLoop = function () {
        var _this = this;
        loglevel_es_1.default.debug("deadlineLoop start");
        var loop = function () {
            if (_this.state != State.CONNECTED) {
                loglevel_es_1.default.debug("deadlineLoop exited");
                return;
            }
            if ((Date.now() - _this.lastRead) > 3 * heartbeatInterval) {
                // 如果超时就调用errorHandler处理
                _this.errorHandler(new Error("read timeout"));
            }
            setTimeout(loop, 500);
        };
        setTimeout(loop, 500);
    };
    KIMClient.prototype.messageAckLoop = function () {
        var _this = this;
        var start = Date.now();
        var delay = 500; //ms
        var loop = function () { return __awaiter(_this, void 0, void 0, function () {
            var msg, overflow, diff, req, pkt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.state != State.CONNECTED) {
                            loglevel_es_1.default.debug("messageAckLoop exited");
                            return [2 /*return*/];
                        }
                        msg = this.lastMessage // lock this message
                        ;
                        if (!(!!msg && (Date.now() - start > 3000))) return [3 /*break*/, 4];
                        overflow = this.unack > 10;
                        this.unack = 0; // reset unack before ack
                        this.lastMessage = undefined; //reset last message
                        diff = Date.now() - msg.arrivalTime;
                        if (!(!overflow && diff < delay)) return [3 /*break*/, 2];
                        return [4 /*yield*/, exports.sleep(delay - diff, TimeUnit.Millisecond)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        req = protocol_1.MessageAckReq.encode({ messageId: msg.messageId });
                        pkt = packet_1.LogicPkt.build(packet_1.Command.ChatTalkAck, "", req.finish());
                        start = Date.now();
                        this.send(pkt.bytes());
                        // 修改本地存储中最后一条ACK消息记录
                        return [4 /*yield*/, exports.Store.setAck(msg.messageId)];
                    case 3:
                        // 修改本地存储中最后一条ACK消息记录
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        setTimeout(loop, 500);
                        return [2 /*return*/];
                }
            });
        }); };
        setTimeout(loop, 500);
    };
    KIMClient.prototype.loadOfflineMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadIndex, offmessages, messageId, _a, status_1, indexes, om;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        loglevel_es_1.default.debug("loadOfflineMessage start");
                        loadIndex = function (messageId) {
                            if (messageId === void 0) { messageId = long_1.default.ZERO; }
                            return __awaiter(_this, void 0, void 0, function () {
                                var req, pkt, resp, err, respbody;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            req = protocol_1.MessageIndexReq.encode({ messageId: messageId });
                                            pkt = packet_1.LogicPkt.build(packet_1.Command.OfflineIndex, "", req.finish());
                                            return [4 /*yield*/, this.request(pkt)];
                                        case 1:
                                            resp = _a.sent();
                                            if (resp.status != common_1.Status.Success) {
                                                err = protocol_1.ErrorResp.decode(pkt.payload);
                                                loglevel_es_1.default.error(err);
                                                return [2 /*return*/, { status: resp.status }];
                                            }
                                            respbody = protocol_1.MessageIndexResp.decode(resp.payload);
                                            return [2 /*return*/, { status: resp.status, indexes: respbody.indexes }];
                                    }
                                });
                            });
                        };
                        offmessages = new Array();
                        return [4 /*yield*/, exports.Store.lastId()];
                    case 1:
                        messageId = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 4];
                        return [4 /*yield*/, loadIndex(messageId)];
                    case 3:
                        _a = _b.sent(), status_1 = _a.status, indexes = _a.indexes;
                        if (status_1 != common_1.Status.Success) {
                            return [3 /*break*/, 4];
                        }
                        if (!indexes || !indexes.length) {
                            return [3 /*break*/, 4];
                        }
                        messageId = indexes[indexes.length - 1].messageId;
                        offmessages = offmessages.concat(indexes);
                        return [3 /*break*/, 2];
                    case 4:
                        loglevel_es_1.default.info("load offline indexes - " + offmessages.map(function (msg) { return msg.messageId.toString(); }));
                        om = new OfflineMessages(this, offmessages);
                        this.offmessageCallback(om);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 表示连接中止
    KIMClient.prototype.onclose = function (reason) {
        if (this.state == State.CLOSED) {
            return;
        }
        this.state = State.CLOSED;
        loglevel_es_1.default.info("connection closed due to " + reason);
        this.conn = undefined;
        this.channelId = "";
        this.account = "";
        // 通知上层应用
        this.fireEvent(KIMEvent.Closed);
        if (this.closeCallback) {
            this.closeCallback();
        }
    };
    // 4. 自动重连
    KIMClient.prototype.errorHandler = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            var index, _a, success, err, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 如果是主动断开连接，就没有必要自动重连
                        // 比如收到被踢，或者主动调用logout()方法
                        if (this.state == State.CLOSED || this.state == State.CLOSEING) {
                            return [2 /*return*/];
                        }
                        this.state = State.RECONNECTING;
                        this.fireEvent(KIMEvent.Reconnecting);
                        index = 0;
                        _b.label = 1;
                    case 1:
                        if (!(index < 10)) return [3 /*break*/, 7];
                        return [4 /*yield*/, exports.sleep(3)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        loglevel_es_1.default.info("try to relogin");
                        return [4 /*yield*/, this.login()];
                    case 4:
                        _a = _b.sent(), success = _a.success, err = _a.err;
                        if (success) {
                            this.fireEvent(KIMEvent.Reconnected);
                            return [2 /*return*/];
                        }
                        loglevel_es_1.default.info(err);
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        loglevel_es_1.default.warn(error_1);
                        return [3 /*break*/, 6];
                    case 6:
                        index++;
                        return [3 /*break*/, 1];
                    case 7:
                        this.onclose("reconnect timeout");
                        return [2 /*return*/];
                }
            });
        });
    };
    KIMClient.prototype.send = function (data) {
        try {
            if (this.conn == null) {
                return false;
            }
            this.conn.send(data);
        }
        catch (error) {
            // handle write error
            this.errorHandler(new Error("write timeout"));
            return false;
        }
        return true;
    };
    return KIMClient;
}());
exports.KIMClient = KIMClient;
var MsgStorage = /** @class */ (function () {
    function MsgStorage() {
        localforage_1.default.config({
            name: 'kim',
            storeName: "kim",
        });
    }
    MsgStorage.prototype.keymsg = function (id) {
        return "msg_" + id.toString();
    };
    MsgStorage.prototype.keylast = function () {
        return "last_id";
    };
    // 记录一条消息
    MsgStorage.prototype.insert = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localforage_1.default.setItem(this.keymsg(msg.messageId), msg)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    // 检查消息是否已经保存
    MsgStorage.prototype.exist = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var val, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, localforage_1.default.getItem(this.keymsg(id))];
                    case 1:
                        val = _a.sent();
                        return [2 /*return*/, !!val];
                    case 2:
                        err_1 = _a.sent();
                        loglevel_es_1.default.warn(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    MsgStorage.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var message, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, localforage_1.default.getItem(this.keymsg(id))];
                    case 1:
                        message = _a.sent();
                        return [2 /*return*/, message];
                    case 2:
                        err_2 = _a.sent();
                        loglevel_es_1.default.warn(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    MsgStorage.prototype.setAck = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localforage_1.default.setItem(this.keylast(), id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MsgStorage.prototype.lastId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, localforage_1.default.getItem(this.keylast())];
                    case 1:
                        id = _a.sent();
                        return [2 /*return*/, id || long_1.default.ZERO];
                }
            });
        });
    };
    return MsgStorage;
}());
exports.Store = new MsgStorage();
//# sourceMappingURL=sdk.js.map