import { KIMClient, sleep } from "./src/sdk";

const main = async () => {
    let cli = new KIMClient("ws://localhost:8000", { token: "ccc" });
    let { status } = await cli.login()
    console.log("client login return -- ", status)

    await sleep(15)
    cli.logout()
}

main()