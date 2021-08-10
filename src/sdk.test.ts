import { doLogin,LoginState } from "./sdk"


describe('doLogin test', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTYyOTA5MzU0OX0.P_yk1KMB5v9riUy0yW4eOTgC0k0qeB6XRjih4dL1xGk"
    let { status,channelId, conn } = await doLogin("ws://localhost:8000",token)
    expect(status).toEqual(LoginState.Success)
    expect(channelId).toContain("test1")
})