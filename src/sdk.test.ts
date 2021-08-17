import { doLogin, KIMClient, KIMEvent, KIMStatus } from "./sdk"
import log from 'loglevel-es';

log.setLevel("info")
jest.setTimeout(30 * 1000)

//三个测试账号 test1 ,test2 ,test3
const tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDQ4Nn0.YsjY42O9A1hIZaxgbgyUXjQul2RBmwFiAufdlZe3boo",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MiIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDUxNX0.LnlacfRur79dyVnFAoYiGXTSwSiO__hHVnVm8B2f-IY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MyIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDYwOX0.VsBg31LfmgFwfbgHmHWK8u72PI4elAoz3K9p3oKq6EI",
]

const gatewayURL = "ws://119.3.4.216:8000"

test('doLogin', async () => {
    // test1
    const tags = ["web"]
    let { success, err, channelId, conn } = await doLogin(gatewayURL, { token: tokens[0], tags })
    expect(success).toBeTruthy()
    log.info("channelId --", channelId)
    expect(channelId).toContain("test1")
    conn.onclose = () => {
        log.info("closed")
    }
    conn.close()
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
