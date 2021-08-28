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
var sdk_1 = require("./sdk");
var loglevel_es_1 = __importDefault(require("loglevel-es"));
var login_1 = require("./login");
var common_1 = require("./proto/common");
var packet_1 = require("./packet");
var long_1 = __importDefault(require("long"));
require("jest-localstorage-mock");
loglevel_es_1.default.setLevel("info");
jest.setTimeout(30 * 1000);
// https://jestjs.io/docs/cli
//三个测试账号 test1 ,test2 ,test3
var tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDQ4Nn0.YsjY42O9A1hIZaxgbgyUXjQul2RBmwFiAufdlZe3boo",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MiIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDUxNX0.LnlacfRur79dyVnFAoYiGXTSwSiO__hHVnVm8B2f-IY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MyIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDYwOX0.VsBg31LfmgFwfbgHmHWK8u72PI4elAoz3K9p3oKq6EI",
];
var gatewayURL = "ws://119.3.4.216:8000";
test('doLogin', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, _a, success, channelId, account, conn;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tags = ["web"];
                return [4 /*yield*/, login_1.doLogin(gatewayURL, { token: tokens[0], tags: tags })];
            case 1:
                _a = _b.sent(), success = _a.success, channelId = _a.channelId, account = _a.account, conn = _a.conn;
                expect(success).toBeTruthy();
                loglevel_es_1.default.info(account, channelId);
                expect(channelId).toContain("test1");
                expect(account).toEqual("test1");
                conn.onclose = function () {
                    loglevel_es_1.default.info("closed");
                };
                conn.close();
                return [2 /*return*/];
        }
    });
}); });
test('doLoginfail', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, _a, success, err;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tags = ["web"];
                return [4 /*yield*/, login_1.doLogin(gatewayURL, { token: "", tags: tags })];
            case 1:
                _a = _b.sent(), success = _a.success, err = _a.err;
                expect(success).toBeFalsy();
                loglevel_es_1.default.error(err);
                return [2 /*return*/];
        }
    });
}); });
test('store', function () { return __awaiter(void 0, void 0, void 0, function () {
    var ok, msg, id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sdk_1.Store.insert(new sdk_1.Message(long_1.default.fromNumber(1), long_1.default.fromNumber(1)))];
            case 1:
                ok = _a.sent();
                expect(ok).toBeTruthy();
                return [4 /*yield*/, sdk_1.Store.get(long_1.default.fromNumber(1))];
            case 2:
                msg = _a.sent();
                expect(msg === null || msg === void 0 ? void 0 : msg.messageId).toEqual(long_1.default.fromNumber(1));
                loglevel_es_1.default.info(msg);
                return [4 /*yield*/, sdk_1.Store.setAck(long_1.default.fromNumber(1))];
            case 3:
                _a.sent();
                return [4 /*yield*/, sdk_1.Store.lastId()];
            case 4:
                id = _a.sent();
                loglevel_es_1.default.info("id - ", id);
                expect(id).toEqual(long_1.default.fromNumber(1));
                return [2 /*return*/];
        }
    });
}); });
test('clilogin', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, cli, _a, success, err, callback;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tags = ["web"];
                cli = new sdk_1.KIMClient(gatewayURL, { token: tokens[0], tags: tags });
                return [4 /*yield*/, cli.login()];
            case 1:
                _a = _b.sent(), success = _a.success, err = _a.err;
                expect(success).toBeTruthy();
                callback = jest.fn(function (evt) {
                    loglevel_es_1.default.info("--------", evt);
                });
                cli.register([sdk_1.KIMEvent.Closed], callback);
                expect(cli.account).toEqual("test1");
                return [4 /*yield*/, cli.logout()];
            case 2:
                _b.sent();
                return [4 /*yield*/, sdk_1.sleep(2)
                    // Closed回调方法必须被调用一次
                ];
            case 3:
                _b.sent();
                // Closed回调方法必须被调用一次
                expect(callback).toBeCalledTimes(1);
                return [2 /*return*/];
        }
    });
}); });
test('dokickout', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, cli, _a, success, err;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tags = ["web"];
                cli = new sdk_1.KIMClient(gatewayURL, { token: tokens[0], tags: tags });
                return [4 /*yield*/, cli.login()];
            case 1:
                _a = _b.sent(), success = _a.success, err = _a.err;
                expect(success).toBeTruthy();
                cli.register([sdk_1.KIMEvent.Kickout], function (evt) {
                    loglevel_es_1.default.info("--------", evt);
                    expect(evt).toEqual(sdk_1.KIMEvent.Kickout);
                });
                cli = new sdk_1.KIMClient(gatewayURL, { token: tokens[0], tags: tags });
                return [4 /*yield*/, cli.login()];
            case 2:
                _b.sent();
                return [4 /*yield*/, sdk_1.sleep(1)];
            case 3:
                _b.sent();
                return [4 /*yield*/, cli.logout()];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
test('usertalk', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, cli, _a, success, err, cli2, onmessage, suc, _b, status, resp;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                tags = ["web"];
                cli = new sdk_1.KIMClient(gatewayURL, { token: tokens[0], tags: tags });
                return [4 /*yield*/, cli.login()];
            case 1:
                _a = _c.sent(), success = _a.success, err = _a.err;
                expect(err).toBeUndefined();
                expect(success).toBeTruthy();
                cli2 = new sdk_1.KIMClient(gatewayURL, { token: tokens[1], tags: tags });
                onmessage = jest.fn(function (m) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                expect(m.sender).toEqual(cli.account);
                                expect(m.receiver).toEqual(cli2.account);
                                expect(m.body).toEqual("hello");
                                expect(m.type).toEqual(packet_1.MessageType.Text);
                                return [4 /*yield*/, cli.logout()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, cli2.logout()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                cli2.onmessage(onmessage);
                return [4 /*yield*/, cli2.login()];
            case 2:
                suc = (_c.sent()).success;
                expect(suc).toBeTruthy();
                return [4 /*yield*/, cli.talkToUser(cli2.account, new sdk_1.Content("hello"))];
            case 3:
                _b = _c.sent(), status = _b.status, resp = _b.resp;
                expect(status).toEqual(common_1.Status.Success);
                expect(resp === null || resp === void 0 ? void 0 : resp.messageId.greaterThan(1000)).toBeTruthy();
                expect(resp === null || resp === void 0 ? void 0 : resp.sendTime.greaterThan(1000)).toBeTruthy();
                return [4 /*yield*/, sdk_1.sleep(1)];
            case 4:
                _c.sent();
                expect(onmessage).toBeCalledTimes(1);
                return [2 /*return*/];
        }
    });
}); });
test('offline', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, cli, _a, success, err, _b, status, resp, er, cli2, cb, suc;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                tags = ["web"];
                cli = new sdk_1.KIMClient(gatewayURL, { token: tokens[0], tags: tags });
                cli.onofflinemessage(function (om) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, cli.login()];
            case 1:
                _a = _c.sent(), success = _a.success, err = _a.err;
                expect(err).toBeUndefined();
                expect(success).toBeTruthy();
                return [4 /*yield*/, cli.talkToUser("test2", new sdk_1.Content("hello"))];
            case 2:
                _b = _c.sent(), status = _b.status, resp = _b.resp, er = _b.err;
                expect(status).toEqual(common_1.Status.Success);
                if (er) {
                    loglevel_es_1.default.error("---", er.message);
                }
                expect(resp === null || resp === void 0 ? void 0 : resp.messageId.greaterThan(1000)).toBeTruthy();
                expect(resp === null || resp === void 0 ? void 0 : resp.sendTime.greaterThan(1000)).toBeTruthy();
                cli2 = new sdk_1.KIMClient(gatewayURL, { token: tokens[1], tags: tags });
                cb = jest.fn(function (om) { return __awaiter(void 0, void 0, void 0, function () {
                    var users, msgs;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                users = om.listUsers();
                                loglevel_es_1.default.info("onofflinemessage -- load ", users);
                                expect(users.length).toBeGreaterThanOrEqual(1);
                                loglevel_es_1.default.info("--- lazy load messages");
                                return [4 /*yield*/, om.loadUser(users[0], 1)];
                            case 1:
                                msgs = _a.sent();
                                expect(msgs.length).toBeGreaterThanOrEqual(1);
                                expect(msgs[0].body).toEqual("hello");
                                // load again
                                loglevel_es_1.default.info("--- load again");
                                return [4 /*yield*/, om.loadUser(users[0], 1)];
                            case 2:
                                msgs = _a.sent();
                                expect(msgs[0].body).toEqual("hello");
                                return [4 /*yield*/, cli.logout()];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, cli2.logout()];
                            case 4:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                cli2.onofflinemessage(cb);
                return [4 /*yield*/, cli2.login()];
            case 3:
                suc = (_c.sent()).success;
                expect(suc).toBeTruthy();
                expect(cb).toBeCalledTimes(1);
                return [4 /*yield*/, sdk_1.sleep(3)];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
test('group', function () { return __awaiter(void 0, void 0, void 0, function () {
    var tags, cli, _a, success, err, resp, groupId, resp2, resp3, resp4, resp5, resp6;
    var _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                tags = ["web"];
                cli = new sdk_1.KIMClient(gatewayURL, { token: tokens[0], tags: tags });
                return [4 /*yield*/, cli.login()];
            case 1:
                _a = _g.sent(), success = _a.success, err = _a.err;
                expect(err).toBeUndefined();
                expect(success).toBeTruthy();
                return [4 /*yield*/, cli.createGroup({
                        name: "group_sdk",
                        avatar: "",
                        introduction: "test",
                        members: ["test2"],
                    })];
            case 2:
                resp = _g.sent();
                expect(resp.status).toEqual(common_1.Status.Success);
                expect((_b = resp.resp) === null || _b === void 0 ? void 0 : _b.groupId).not.toBeNull();
                groupId = ((_c = resp.resp) === null || _c === void 0 ? void 0 : _c.groupId) || "";
                return [4 /*yield*/, cli.GetGroup({ groupId: groupId })];
            case 3:
                resp2 = _g.sent();
                expect(resp2.status).toEqual(common_1.Status.Success);
                expect((_d = resp2.resp) === null || _d === void 0 ? void 0 : _d.members.length).toEqual(2);
                return [4 /*yield*/, cli.joinGroup({ groupId: groupId, account: "test3" })];
            case 4:
                resp3 = _g.sent();
                expect(resp3.status).toEqual(common_1.Status.Success);
                return [4 /*yield*/, cli.GetGroup({ groupId: groupId })];
            case 5:
                resp4 = _g.sent();
                expect(resp4.status).toEqual(common_1.Status.Success);
                expect((_e = resp4.resp) === null || _e === void 0 ? void 0 : _e.members.length).toEqual(3);
                loglevel_es_1.default.info(resp4);
                return [4 /*yield*/, cli.quitGroup({ groupId: groupId, account: "test3" })];
            case 6:
                resp5 = _g.sent();
                expect(resp5.status).toEqual(common_1.Status.Success);
                return [4 /*yield*/, cli.GetGroup({ groupId: groupId })];
            case 7:
                resp6 = _g.sent();
                expect(resp6.status).toEqual(common_1.Status.Success);
                expect((_f = resp6.resp) === null || _f === void 0 ? void 0 : _f.members.length).toEqual(2);
                return [4 /*yield*/, cli.logout()];
            case 8:
                _g.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=sdk.test.js.map