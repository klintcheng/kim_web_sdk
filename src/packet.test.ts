import { decodeLoginReq, encodeLoginReq } from "./lib/protocol.pb"
import { Command, LogicPkt,MagicLogicPkt } from "./packet"
import log from 'loglevel-es';

log.setLevel("debug")

it('logicpkt_decode', async () => {
    let body = encodeLoginReq({
        token: "test_token",
        tags: ["web"],
    })
    log.info(body)
    let loginReq = LogicPkt.Build(Command.SignIn, "login", body)
    let buf = loginReq.bytes()
    
    expect(buf.subarray(0,4).equals(MagicLogicPkt)).toBeTruthy()

    let req2 = LogicPkt.from(buf.subarray(4))
    expect(req2.header.command).toEqual(Command.SignIn)
    expect(req2.header.dest).toEqual("login")
    expect(req2.header.sequence).toBeGreaterThan(0)
    expect(req2.payload.length).toEqual(body.length)
    
    let req = decodeLoginReq(req2.payload)
    expect(req.token).toEqual("test_token")
    expect(req.tags).toEqual(["web"])
})