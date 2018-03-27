// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './global.js'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import App2 from "./App2"
import router from './router'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
console.log(router)
new Vue({
  el: '#app',
  router,
  components: { App2 },
  template: '<App2/>'
})
