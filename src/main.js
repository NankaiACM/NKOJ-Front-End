// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

//window.noPointHost = 'localhost'
window.noPointHost = '111.231.98.20'

Vue.config.productionTip = false
Vue.use(VueResource)
/* eslint-disable no-new */
console.log(router)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
