import Long from "long"
import { MessagePush } from "./proto/protocol"

it("req",()=>{
    // messageId:1628587114287521000 type:1 body:"hello world"
    let arr = new Uint8Array([8,232,185,139,135,161,235,249,204,22,16,1,26,11,104,101,108,108,111,32,119,111,114,108,100])
    let req  = MessagePush.decode(arr)
    console.info(req)
    expect(req.messageId.toString()).toEqual("1628587114287521000")
    expect(req.body).toEqual("hello world")
    expect(req.type).toEqual(1)
})