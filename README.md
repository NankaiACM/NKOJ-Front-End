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
  - 2.7.1 现场赛前第一次修订，修复部分问题以及添加新功能

### 管理员后台和比赛的部分页面

管理中心\[新\] 和 NKPC\[比赛注册, 活动页面, 题面查看\] 在 https://github.com/NankaiACM/NKOJ-Front-End-Sand-Box 中进行维护, 有更好的界面, 维护更容易

管理中心\[新\] 应该部署在此项目 url 下级地址 public 中

例如 NKOJ-Front-End 部署在 localhost/, 则 NKOJ-Front-End-Sand-Box 部署在 localhost/public/

# sandbox

当前 vue 版本为 vue3, cli 版本为 vue-cli4, 语法扩展 vue-class-component.

ant-design-vue 在 admin 中使用, 版本 为 2.x.

bulma 在 nkpc 中使用, 版本 0.9.1.

其他见 package.json.

admin 中主要为 ts, nkpc 中主要为 js, 保持原状.

与后端的接口交互封装在 `src/typescript/api.ts` 中, 相关类型见 `src/types/interface.d.ts`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build NODE_ENV=production
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### 开始跨域预览
```
npm run chrome
```
入口 url 形如 https://localhost:8080/admin.html#/ https://localhost:8080/nkpc.html#/

关于 vue-router 的 base url 用法及作用形式请请查阅 https://next.router.vuejs.org/api/#createwebhashhistory

关于 vue.config.js 的 publicPath 请查阅 https://cli.vuejs.org/zh/config/#publicpath

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Care about
reference of /admin.html# or /admin#

reference of /nkpc.html# or /nkpc#
