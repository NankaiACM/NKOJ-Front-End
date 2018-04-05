// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './global.js'
import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
console.log(router)
new Vue({
  el: '#NKOJ',
  router,
  store,
  template: '<router-view></router-view>'
})
