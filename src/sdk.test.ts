import { doLogin, LoginState } from "./sdk"
import log from 'loglevel-es';

log.setLevel("DEBUG")

describe('basic', () => {
    it('doLogin', async (done) => {
        // test1
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTA5MzU0OX0.P_yk1KMB5v9riUy0yW4eOTgC0k0qeB6XRjih4dL1xGk"
        let { status, channelId, conn } = await doLogin("ws://localhost:8000", {token})
        expect(status).toEqual(LoginState.Success)
        log.info(channelId)
        expect(channelId).toContain("test1")
        done()
    })
})