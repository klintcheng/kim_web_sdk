# kim_web_sdk

kim web sdk

## 编译proto文件

1. 安装ts-proto

> yarn add --dev ts-proto

2. build proto

> ./bin/protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=forceLong=long --ts_proto_opt=esModuleInterop=true --ts_proto_out=src/ ./proto/common.proto
> ./bin/protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=forceLong=long --ts_proto_opt=esModuleInterop=true --ts_proto_out=src/ ./proto/protocol.proto

## 安装测试jest

> npm i -g yarn
> yarn add --dev jest typescript
> yarn add --dev ts-jest @types/jest
> yarn ts-jest config:init