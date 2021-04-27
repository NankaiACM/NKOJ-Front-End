## NKOJ-Front-End
[![CodeQL](https://github.com/NankaiACM/NKOJ-Front-End/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/NankaiACM/NKOJ-Front-End/actions/workflows/codeql-analysis.yml)
### 安装
`npm install`
### 运行
`npm start`
### 启动调试预览
本地调试时，根据后端url不同，需要修改`src/global.js`
```SHELL
npm run dev
node devChrome.js # 以--disable-web-security模式启动Chrome
```
### 部署
`npm run build`为部署方便，将打包文件放到了根目录外面而不是dist文件夹下

### 版本说明

2.6.1 第二长期支持版本的第六次更新第一修订

2.6.2 第二修订

2.7.0 第七次更新，21校赛前添加部分补丁和管理功能

### 管理员后台和比赛的部分页面

管理中心\[新\] 和 NKPC\[比赛注册, 活动页面, 题面查看\] 在 https://github.com/NankaiACM/NKOJ-Front-End-Sand-Box 中进行维护, 有更好的界面, 维护更容易

管理中心\[新\] 应该部署在此项目 url 下级地址 public 中

例如 NKOJ-Front-End 部署在 localhost/, 则 NKOJ-Front-End-Sand-Box 部署在 localhost/public/
