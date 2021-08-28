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
exports.doLogin = exports.LoginBody = void 0;
var websocket_1 = require("websocket");
var buffer_1 = require("buffer");
var loglevel_es_1 = __importDefault(require("loglevel-es"));
var packet_1 = require("./packet");
var common_1 = require("./proto/common");
var protocol_1 = require("./proto/protocol");
var loginTimeout = 10 * 1000; // 10 seconds
var LoginBody = /** @class */ (function () {
    function LoginBody(token, tags) {
        this.token = token;
        this.tags = tags;
    }
    return LoginBody;
}());
exports.LoginBody = LoginBody;
var doLogin = function (url, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, _) {
                var conn = new websocket_1.w3cwebsocket(url);
                conn.binaryType = "arraybuffer";
                // 设置一个登陆超时器
                var tr = setTimeout(function () {
                    clearTimeout(tr);
                    resolve({ success: false, err: new Error("timeout"), conn: conn });
                }, loginTimeout);
                conn.onopen = function () {
                    if (conn.readyState == websocket_1.w3cwebsocket.OPEN) {
                        loglevel_es_1.default.info("connection established, send " + req.token);
                        // send handshake request
                        var pbreq = protocol_1.LoginReq.encode(protocol_1.LoginReq.fromJSON(req)).finish();
                        var loginpkt = packet_1.LogicPkt.build(packet_1.Command.SignIn, "", pbreq);
                        var buf = loginpkt.bytes();
                        loglevel_es_1.default.debug("dologin send [" + buf.join(",") + "]");
                        conn.send(buf);
                    }
                };
                conn.onerror = function (error) {
                    clearTimeout(tr);
                    loglevel_es_1.default.warn(error);
                    resolve({ success: false, err: error, conn: conn });
                };
                conn.onmessage = function (evt) {
                    if (typeof evt.data === 'string') {
                        loglevel_es_1.default.warn("Received: '" + evt.data + "'");
                        return;
                    }
                    clearTimeout(tr);
                    // wating for login response
                    var buf = buffer_1.Buffer.from(evt.data);
                    var loginResp = packet_1.LogicPkt.from(buf);
                    if (loginResp.status != common_1.Status.Success) {
                        loglevel_es_1.default.error("Login failed: " + loginResp.status);
                        resolve({ success: false, err: new Error("response status is " + loginResp.status), conn: conn });
                        return;
                    }
                    var resp = protocol_1.LoginResp.decode(loginResp.payload);
                    resolve({ success: true, channelId: resp.channelId, account: resp.account, conn: conn });
                };
            })];
    });
}); };
exports.doLogin = doLogin;
//# sourceMappingURL=login.js.map