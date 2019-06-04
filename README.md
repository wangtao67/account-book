# About

学习nodejs，个人仿预计账本app做的网页版记账本


## 技术栈

服务端：nodejs + express + mongodb + mongoose
客户端： vue全家桶


## 项目运行


```
git clone https://github.com/wangtao67/account-book.git

cd account-book

cd server // 先打开服务端

npm install   // 安装服务端依赖

mongod --dbpath D:mongoData\data  // cmd开启mongodb，路径以自己mongodb data文件夹为准

npm run server // 在server目录下执行app.js，开启服务

cd ../web // 打开前端项目

npm install  // 安装前端依赖

npm run dev 

访问: http://localhost:8085

```

## 目前功能

- [x] 登录（已使用jwt token实现）、注册
- [x] 新增消费/收入记录，查询消费记录
- [x] 新增消费/收入类型
- [x] 消费/收入图表统计
- [x] 个人中心信息修改 -- 待完成
- [x] 更多 -- 待完成





