import { KIMClient, KIMEvent, Message, OfflineMessages, sleep } from "./src/sdk";
import log from 'loglevel-es';
import 'mock-local-storage'

//三个测试账号 test1 ,test2 ,test3
const tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MSIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDQ4Nn0.YsjY42O9A1hIZaxgbgyUXjQul2RBmwFiAufdlZe3boo",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MiIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDUxNX0.LnlacfRur79dyVnFAoYiGXTSwSiO__hHVnVm8B2f-IY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2MiOiJ0ZXN0MyIsImFwcCI6ImtpbSIsImV4cCI6MTY2MDYzNDYwOX0.VsBg31LfmgFwfbgHmHWK8u72PI4elAoz3K9p3oKq6EI",
]

const gatewayURL = "ws://119.3.4.216:8000"

log.setLevel("DEBUG")

let main = async () => {
    const tags = ["web"]
    // 初始化
    let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });
    let eventcallback = (evt: KIMEvent) => {
        log.info(`event ${evt}`)
    };
    let messagecallback = (m: Message) => {
        log.info(m)
    }
    let offmessagecallback = (om: OfflineMessages) => {
        // 离线的用户列举
        let users = om.listUsers()
        if (users.length > 0) {
            log.info(`offline messages from users of ${users}`)
            // lazy load messages
            let messages = om.loadUser(users[0], 1)
            log.info(messages)
        }
        // 离线的群列表
        let groups = om.listGroups()
        if(groups.length > 0) {
            log.info(`offline messages from groups of ${groups}`)
        }
    }
    // 2.注册事件
    let evts = [KIMEvent.Closed, KIMEvent.Reconnecting, KIMEvent.Reconnected, KIMEvent.Kickout]
    cli.register(evts, eventcallback)
    cli.onmessage(messagecallback)
    cli.onofflinemessage(offmessagecallback)
    // 3. 登录
    let { success, err } = await cli.login()
    if (!success) {
        log.error(err)
        return
    }

    // do something
    await sleep(10)

    // 4. 登出
    await cli.logout()
}

main()