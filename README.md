# kim_web_sdk

本项目是King IM CLoud的web版本SDK。

## Quick Start

在介绍本章节的内容之前，我们从三方开发的角度，来了解下SDK被调用的流程，这有助于我们构建出一个完整的逻辑图谱。首先，我们再次回顾下客户端的生命周期状态图，**在SDK端所有逻辑都离不开这个状态图**，非常重要。

![sdk_status.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec4ee25597564dd2b17c14dd61e60ef2~tplv-k3u1fbpfcp-watermark.image)

那么，三方应用集成`KIM SDK`之后，一个简单的调用流程如下：

```ts
const tags = ["web"]
// 1. 初始化
let cli = new KIMClient(gatewayURL, { token: tokens[0], tags });

// 2. 注册监听器
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

// 4. 发送消息
let { status, resp, err: err2 } = await cli.talkToUser("test2", new Content("hello"))
if (status != Status.Success) {
    log.error(err)
    return
}
log.info(`resp - ${resp?.messageId} ${resp?.sendTime.toString()}`)

await sleep(10)

// 5. 登出
await cli.logout()
```

**我们主要了解下其中三个监听器**：

- **eventcallback**：事件监听器回调方法。在Client的生命周期图中，状态随着主动或被动的事件触发而发现改变。比如断线重连时两种状态`Reconnecting`和`Reconnected`，虽然SDK可能在几秒内就自动重连成功，但是这个变动过程还是要通知给上层，让业务决定是否显现给用户。

```ts
let eventcallback = (evt: KIMEvent) => {
    log.info(`event ${evt}`)
};
```

- messagecallback：用于接收`在线消息`的回调方法。

```ts
let messagecallback = (m: Message) => {
    log.info(m)
}
```

- offmessagecallback：`离线消息`回调方法。通常是**dologin**成功并且同步离线索引完成之后，才会回调给上层，如下是调用示例：

```ts
let offmessagecallback = (om: OfflineMessages) => {
    // 离线时的发送方用户列表
    let users = om.listUsers()
    if (users.length > 0) {
        log.info(`offline messages from users of ${users}`)
        // lazy load the first page messages from 'users[0]'
        let messages = om.loadUser(users[0], 1)
        log.info(messages)
    }
    // 离线的群列表
    let groups = om.listGroups()
    if(groups.length > 0) {
        log.info(`offline messages from groups of ${groups}`)
    }
}
```

- `om.loadUser(users[0], 1)` 表示加载users[0]的第一页离线消息。

