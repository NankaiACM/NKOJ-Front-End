// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './global.js'
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'
import isScrolled from './scroll'
import mavonEditor from 'mavon-editor'
// const mavonEditor = () => import(
//   /* webpackChunkName: "mavon-editor" */
//   'mavon-editor')
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/zh-cn'
// import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(mavonEditor)

dayjs.locale('zh-cn')
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

Vue.prototype.$dayjs = dayjs

Vue.component('vue-slide-up-down',
  () => import('vue-slide-up-down')
)
Vue.component('notify',
  () => import('./components/shell/notify')
)
/*
 * data of notify should be post
 * title, message, count
 */

/* eslint-disable no-new */
new Vue({
  el: '#NKOJ',
  router,
  store,
  template: '<router-view></router-view>',
  data () {
    return {
      isScrolled
    }
  }
})
