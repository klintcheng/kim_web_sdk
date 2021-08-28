"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protocol_1 = require("./proto/protocol");
test("msg_decode", function () {
    //messageId:1628644843872655000 type:1 body:"hello world" extra:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTA5MzU0OX0.P_yk1KMB5v9riUy0yW4eOTgC0k0qeB6XRjih4dL1xGk"
    var arr = new Uint8Array([8, 152, 173, 180, 194, 180, 251, 134, 205, 22, 16, 1, 26, 11, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 34, 140, 1, 101, 121, 74, 104, 98, 71, 99, 105, 79, 105, 74, 73, 85, 122, 73, 49, 78, 105, 73, 115, 73, 110, 82, 53, 99, 67, 73, 54, 73, 107, 112, 88, 86, 67, 74, 57, 46, 101, 121, 74, 104, 89, 50, 77, 105, 79, 105, 74, 48, 90, 88, 78, 48, 77, 83, 73, 115, 73, 109, 70, 119, 99, 67, 73, 54, 73, 109, 116, 112, 98, 83, 73, 115, 73, 109, 86, 52, 99, 67, 73, 54, 77, 84, 89, 121, 79, 84, 65, 53, 77, 122, 85, 48, 79, 88, 48, 46, 80, 95, 121, 107, 49, 75, 77, 66, 53, 118, 57, 114, 105, 85, 121, 48, 121, 87, 52, 101, 79, 84, 103, 67, 48, 107, 48, 113, 101, 66, 54, 88, 82, 106, 105, 104, 52, 100, 76, 49, 120, 71, 107]);
    var req = protocol_1.MessagePush.decode(arr);
    expect(req.messageId.toString()).toEqual("1628644843872655000");
    expect(req.body).toEqual("hello world");
    expect(req.extra).toEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTA5MzU0OX0.P_yk1KMB5v9riUy0yW4eOTgC0k0qeB6XRjih4dL1xGk");
    expect(req.type).toEqual(1);
});
//# sourceMappingURL=proto.test.js.map