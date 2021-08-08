# kim_web_sdk

kim web sdk

## 编译proto文件

1. 安装pbjs

> npm install -g pbjs

2. build proto

> pbjs proto/common.proto --ts src/lib/common.pb.ts
> pbjs proto/protocol.proto --ts src/lib/protocol.pb.ts

## 安装测试jest

> npm i -g yarn
> yarn add --dev jest
> yarn add --dev @types/jest