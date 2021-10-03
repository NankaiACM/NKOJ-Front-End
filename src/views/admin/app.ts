import Antd from 'ant-design-vue'
import App from './app.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import './app.scss'
import Vue from 'vue'

Vue.use(Antd)
const VueApp = Vue.extend(App)
const app = new VueApp({
  store,
  router
})
app.$mount('#app')
