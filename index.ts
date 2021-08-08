import { IMClient, sleep } from "./src/sdk";

const main = async () => {
    let cli = new IMClient("ws://localhost:8000", "ccc");
    let { status } = await cli.login()
    console.log("client login return -- ", status)

    await sleep(15)
    cli.logout()
}

main()