import { doLogin, KIMClient, KIMEvent, KIMStatus } from "./sdk"
import log from 'loglevel-es';

log.setLevel("info")
jest.setTimeout(30*1000)

test('doLogin', async (done) => {
    // test1
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTI1NDMzN30.aWpHyxy3XDvHMWT8jU5LywfKveVklpDYoDmtVBBHckc"
    const tags = ["web"]
    let { success, err, channelId, conn } = await doLogin("ws://localhost:8000", { token, tags })
    expect(success).toBeTruthy()
    log.info("channelId --", channelId)
    expect(channelId).toContain("test1")
    conn.onclose = () => {
        log.info("closed")
        done()
    }
    conn.close()
})

test('clilogin', async (done) => {
    // test1
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTI1NDMzN30.aWpHyxy3XDvHMWT8jU5LywfKveVklpDYoDmtVBBHckc"
    const tags = ["web"]
    let cli = new KIMClient("ws://localhost:8000", { token, tags });
    let { success, err } = await cli.login()
    expect(success).toBeTruthy()
    cli.register([KIMEvent.Closed], (evt: KIMEvent) => {
        log.info("--------",evt)
        if (evt == KIMEvent.Closed) {
            done();
        }
    })

    cli.logout()
})
