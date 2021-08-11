import { doLogin, LoginState } from "./sdk"
import log from 'loglevel-es';

log.setLevel("DEBUG")

describe('basic', () => {
    test('doLogin', async (done) => {
        // test1
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTI1NDMzN30.aWpHyxy3XDvHMWT8jU5LywfKveVklpDYoDmtVBBHckc"
        const tags = ["web"]
        let { status, channelId, conn } = await doLogin("ws://localhost:8000", {token,tags})
        expect(status).toEqual(LoginState.Success)
        log.info("channelId --",channelId)
        expect(channelId).toContain("test1")
        conn.close()
        
    })
})