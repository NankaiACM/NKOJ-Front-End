import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'core-js/stable'
import '@/plugins/vuetify'

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
