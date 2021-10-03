import Vue from 'vue'
import bulma from '@/scss/bulma.scss'
import message from '@/components/message/main'
import { USER_DEBUG_LOG_CONFIG } from '@/components/log/log'
import router from './router'
import store from './store'
import App from './app.vue'
import userCheck from './nkpc/usercheck.vue'

USER_DEBUG_LOG_CONFIG.ENABLE_LOG_STORE = false
USER_DEBUG_LOG_CONFIG.ENABLE_UI_NOTIFICATION = false

Vue.use(bulma)
Vue.use(message)
Vue.component('user-check', userCheck)
const VueApp = Vue.extend(App)
const app = new VueApp({
  store, router
})
app.$mount('#app')
