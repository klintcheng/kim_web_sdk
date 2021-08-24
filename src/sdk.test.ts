import { Content, KIMClient, KIMEvent, Store, Message, OfflineMessages, sleep } from "./sdk"
import log from 'loglevel-es';
import { doLogin } from "./login";
import { Status } from "./proto/common";
import { MessageType } from "./packet";
import Long from 'long';
import 'jest-localstorage-mock';
log.setLevel("info")
jest.setTimeout(30 * 1000)

// https://jestjs.io/docs/cli

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
    let { success, err } = await doLogin(gatewayURL, { token: "", tags })
    expect(success).toBeFalsy()
    log.error(err)
})

test('store', async () => {
    let ok = await Store.insert(new Message(Long.fromNumber(1), Long.fromNumber(1)))
    expect(ok).toBeTruthy()

    let msg = await Store.get(Long.fromNumber(1))
    expect(msg?.messageId).toEqual(Long.fromNumber(1))
    log.info(msg)
    await Store.setAck(Long.fromNumber(1))

    let id = await Store.lastId()
    log.info("id - ", id)
    expect(id).toEqual(Long.fromNumber(1))
})

test('clilogin', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let { success, err } = await cli.login()
    expect(success).toBeTruthy()
    let callback = jest.fn((evt: KIMEvent) => {
        log.info("--------", evt)
    });
    cli.register([KIMEvent.Closed], callback)
    expect(cli.account).toEqual("test1")
    await cli.logout()
    await sleep(2)
    // Closed回调方法必须被调用一次
    expect(callback).toBeCalledTimes(1)
})

test('dokickout', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let { success, err } = await cli.login()
    expect(success).toBeTruthy()
    cli.register([KIMEvent.Kickout], (evt: KIMEvent) => {
        log.info("--------", evt)
        expect(evt).toEqual(KIMEvent.Kickout)
    })

    cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    await cli.login()
    await sleep(1)
    await cli.logout()
})

test('usertalk', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let { success, err } = await cli.login()
    expect(err).toBeUndefined()
    expect(success).toBeTruthy()

    let cli2 = new KIMClient(gatewayURL, { token: tokens[1], tags });
    let onmessage = jest.fn(async (m: Message) => {
        expect(m.sender).toEqual(cli.account)
        expect(m.receiver).toEqual(cli2.account)
        expect(m.body).toEqual("hello")
        expect(m.type).toEqual(MessageType.Text)

        await cli.logout()
        await cli2.logout()
    });

    cli2.onmessage(onmessage)
    let { success: suc } = await cli2.login()
    expect(suc).toBeTruthy()
    // { type: 1, body: "hello" }
    let { status, resp } = await cli.talkToUser(cli2.account, new Content("hello"))
    expect(status).toEqual(Status.Success)
    expect(resp?.messageId.greaterThan(1000)).toBeTruthy()
    expect(resp?.sendTime.greaterThan(1000)).toBeTruthy()
    await sleep(1)
    expect(onmessage).toBeCalledTimes(1)
})

test('offline', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    cli.onofflinemessage(async (om: OfflineMessages) => {

    })
    let { success, err } = await cli.login()
    expect(err).toBeUndefined()
    expect(success).toBeTruthy()

    // { type: 1, body: "hello" }
    let { status, resp, err: er } = await cli.talkToUser("test2", new Content("hello"))
    expect(status).toEqual(Status.Success)
    if (er) {
        log.error("---", er.message)
    }
    expect(resp?.messageId.greaterThan(1000)).toBeTruthy()
    expect(resp?.sendTime.greaterThan(1000)).toBeTruthy()

    let cli2 = new KIMClient(gatewayURL, { token: tokens[1], tags });
    let cb = jest.fn(async (om: OfflineMessages) => {
        let users = om.listUsers()
        log.info("onofflinemessage -- load ", users)

        expect(users.length).toBeGreaterThanOrEqual(1)
        log.info("--- lazy load messages")
        let msgs = await om.loadUser(users[0], 1)
        expect(msgs.length).toBeGreaterThanOrEqual(1)
        expect(msgs[0].body).toEqual("hello")
        // load again
        log.info("--- load again")
        msgs = await om.loadUser(users[0], 1)
        expect(msgs[0].body).toEqual("hello")
        await cli.logout()
        await cli2.logout()
    });
    cli2.onofflinemessage(cb)
    let { success: suc } = await cli2.login()
    expect(suc).toBeTruthy()
    expect(cb).toBeCalledTimes(1)
    await sleep(3)
})

test('group', async () => {
    // test1
    const tags = ["web"]
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let { success, err } = await cli.login()
    expect(err).toBeUndefined()
    expect(success).toBeTruthy()

    let resp = await cli.createGroup({
        name: "group_sdk",
        avatar: "",
        introduction: "test",
        members: ["test2"],
    })
    expect(resp.status).toEqual(Status.Success)
    expect(resp.resp?.groupId).not.toBeNull()

    let groupId = resp.resp?.groupId||""
    let resp2 = await cli.GetGroup({ groupId })
    expect(resp2.status).toEqual(Status.Success)
    expect(resp2.resp?.members.length).toEqual(2)

    let resp3 = await cli.joinGroup({ groupId, account: "test3" })
    expect(resp3.status).toEqual(Status.Success)

    let resp4 = await cli.GetGroup({ groupId })
    expect(resp4.status).toEqual(Status.Success)
    expect(resp4.resp?.members.length).toEqual(3)
    log.info(resp4)

    let resp5 = await cli.quitGroup({ groupId, account: "test3" })
    expect(resp5.status).toEqual(Status.Success)

    let resp6 = await cli.GetGroup({ groupId })
    expect(resp6.status).toEqual(Status.Success)
    expect(resp6.resp?.members.length).toEqual(2)

    await cli.logout()
})