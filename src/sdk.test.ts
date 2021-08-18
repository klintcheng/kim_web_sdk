import { Content, KIMClient, KIMEvent, KIMStatus, Message, sleep } from "./sdk"
import log from 'loglevel-es';
import { doLogin } from "./login";
import { Status } from "./proto/common";
import { MessageType } from "./packet";
import { ErrorResp } from "./proto/protocol";

log.setLevel("debug")
jest.setTimeout(30 * 1000)

//三个测试账号 test1 ,test2 ,test3
const tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDQ4Nn0.YsjY42O9A1hIZaxgbgyUXjQul2RBmwFiAufdlZe3boo",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MiIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDUxNX0.LnlacfRur79dyVnFAoYiGXTSwSiO__hHVnVm8B2f-IY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MyIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDYwOX0.VsBg31LfmgFwfbgHmHWK8u72PI4elAoz3K9p3oKq6EI",
]

const gatewayURL = "ws://119.3.4.216:8000"

test('doLogin', async () => {
    const tags = ["web"]
    let { success, channelId, account, conn } = await doLogin(gatewayURL, { token: tokens[0], tags })
    expect(success).toBeTruthy()
    log.info(account, channelId)
    expect(channelId).toContain("test1")
    expect(account).toEqual("test1")
    conn.onclose = () => {
        log.info("closed")
    }
    conn.close()
})

test('doLoginfail', async () => {
    const tags = ["web"]
    let { success } = await doLogin(gatewayURL, { token: "", tags })
    expect(success).toBeFalsy()
})

test('clilogin', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let { success, err } = await cli.login()
    expect(success).toBeTruthy()
    cli.register([KIMEvent.Closed], (evt: KIMEvent) => {
        log.info("--------", evt)
        if (evt == KIMEvent.Closed) {
        }
    })
    expect(cli.account).toEqual("test1")
    cli.logout()
})

test('usertalk', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let { success, err } = await cli.login()
    expect(err).toBeUndefined()
    expect(success).toBeTruthy()

    let cli2 = new KIMClient(gatewayURL, { token: tokens[1], tags });
    let { success: suc } = await cli2.login()
    expect(suc).toBeTruthy()
    cli2.onmessage(async (m: Message) => {
        expect(m.sender).toEqual(cli.account)
        expect(m.receiver).toEqual(cli2.account)
        expect(m.body).toEqual("hello")
        expect(m.type).toEqual(MessageType.Text)
    })
    // { type: 1, body: "hello" }
    let { status, resp, err: er } = await cli.talkToUser(cli2.account, new Content("hello"))
    expect(status).toEqual(Status.Success)
    if (er) {
        log.error("---", er.message)
    }
    expect(resp?.messageId.greaterThan(1000)).toBeTruthy()
    expect(resp?.sendTime.greaterThan(1000)).toBeTruthy()
    cli.logout()
    cli2.logout()
    await sleep(2)
    return
})
