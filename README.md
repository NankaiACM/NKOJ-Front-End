## NKOJ-Front-End

[![CodeQL](https://github.com/NankaiACM/NKOJ-Front-End/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/NankaiACM/NKOJ-Front-End/actions/workflows/codeql-analysis.yml)

### 安装

`npm install`

### 启动调试

调试时, 视情况修改`src\views\nkoj\global.js` 和 `src\typescript\objFormatUrl.ts`, 切换对应的地址.

`src\views\nkoj\global.js` 一般不修改.

`src\typescript\objFormatUrl.ts` 需要修改的部分:

```typescript
// export const API_BASE_URL = '//acm.nankai.edu.cn/api'
export const API_BASE_URL = '//localhost:8080/api'
```

运行命令`npm run serve`, 启动调试.

### 构建

构建前, 修改`src\typescript\objFormatUrl.ts`:

```typescript
export const API_BASE_URL = '//acm.nankai.edu.cn/api'
// export const API_BASE_URL = '//localhost:8080/api'
```


运行命令`npm run build`, 启动构建

### 版本说明

2.6.1 第二长期支持版本的第六次更新第一修订

2.6.2 第二修订

2.7.0 第七次更新, 21校赛前添加部分补丁和管理功能

2.7.1 现场赛前第一次修订, 修复部分问题以及添加新功能

### 关于 NKOJ-Front-End-Sandbox

已经将 NKOJ-Front-End-Sandbox 合并在此仓库内.

### 其他

当前 vue 版本为 vue@2, cli 版本为 vue-cli@4, `src\views\admin` 下使用语法扩展 vue-class-component.

bootstrap 在 src\views\nkoj 中使用.

ant-design-vue 在 src\views\admin 中使用.

bulma 在 src\views\nkpc 中使用.

其他及依赖版本见 package.json.

admin 中主要为 ts, nkpc 中主要为 js.

与后端的接口交互封装在 `src/typescript/api.ts` 中, 相关类型见 `src/types/interface.d.ts`.

### Lints and fixes files

```
npm run lint
```

### 开始跨域预览

```
npm run chrome
```

入口 url 形如:

https://localhost:8080/admin.html#/

https://localhost:8080/nkpc.html#/

关于 vue-router 的 base url 用法及作用形式请请查阅 https://next.router.vuejs.org/api/#createwebhashhistory

关于 vue.config.js 的 publicPath 请查阅 https://cli.vuejs.org/zh/config/#publicpath

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 注意

nkoj: reference of /

admin: reference of /admin.html#

nkpc: reference of /nkpc.html#
