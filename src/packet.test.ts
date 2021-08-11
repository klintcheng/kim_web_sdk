import { LoginReq } from "./proto/protocol"
import { Command, LogicPkt, MagicLogicPktInt, print } from "./packet"
import log from 'loglevel-es';

log.setLevel("debug")

describe("decode", () => {
    it('logicpkt', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTA5MzU0OX0.P_yk1KMB5v9riUy0yW4eOTgC0k0qeB6XRjih4dL1xGk"
        let body = LoginReq.encode(LoginReq.fromJSON({
            token: token,
        })).finish()

        print(body)
        let loginReq = LogicPkt.Build(Command.SignIn, "", body)
        log.info(loginReq)
        let buf = loginReq.bytes()
        print(buf)

        expect(buf.readInt32BE()).toEqual(MagicLogicPktInt)

        let req2 = LogicPkt.from(buf.subarray(4))
        expect(req2.command).toEqual(Command.SignIn)
        expect(req2.dest).toEqual("")
        expect(req2.sequence).toBeGreaterThan(0)
        expect(req2.payload.length).toEqual(body.length)

        let req = LoginReq.decode(req2.payload)
        expect(req.token).toEqual(token)
        log.info(req)
    })

})