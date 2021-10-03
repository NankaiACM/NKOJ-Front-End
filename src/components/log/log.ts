import Vue from 'vue'
import Vuex from 'vuex'
import { notification } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style/css'

import Notify from './notifyContent.vue'
import { ApiReturn } from '@/types/interface'

Vue.use(Vuex)
const VueNotify = Vue.extend(Notify)

export const PUSH_USER_DEBUG_LOG = 'PUSH_USER_DEBUG_LOG'

export enum USER_DEBUG_LOG_TYPE {
  SUCCESS,
  FAILURE,
}

export const USER_DEBUG_LOG_CONFIG = {
  ENABLE_CONSOLE_LOG_USER_MESSAGE: true,
  ENABLE_CONSOLE_LOG_DEBUG_MESSAGE: true,
  ENABLE_LOG_STORE: true,
  ENABLE_UI_NOTIFICATION: true
}

export const logStore = new Vuex.Store({
  state: {
    props: [] as Array<Record<string, unknown>>
  },
  mutations: {
    [PUSH_USER_DEBUG_LOG] (state, payload: Record<string, unknown>) {
      state.props.push(payload)
    }
  }
})

export function USER_DEBUG_LOG (userMessage: string, debugMessage?: Record<string, unknown> | ApiReturn, type?: USER_DEBUG_LOG_TYPE) {
  if (USER_DEBUG_LOG_CONFIG.ENABLE_CONSOLE_LOG_USER_MESSAGE) { console.log(userMessage) }
  if (USER_DEBUG_LOG_CONFIG.ENABLE_CONSOLE_LOG_DEBUG_MESSAGE && debugMessage) {
    if (type === USER_DEBUG_LOG_TYPE.FAILURE) {
      console.log(debugMessage)
    }
  } else {
    debugMessage = {}
  }
  const props = { userMessage: userMessage, debugMessage: JSON.stringify(debugMessage, null, 2) }
  // eslint-disable-next-line @typescript-eslint/ban-types
  const hFunction = (h: Function) => h(VueNotify, { props })
  if (USER_DEBUG_LOG_CONFIG.ENABLE_LOG_STORE) { logStore.commit(PUSH_USER_DEBUG_LOG, props) }
  if (USER_DEBUG_LOG_CONFIG.ENABLE_UI_NOTIFICATION) {
    if (type === USER_DEBUG_LOG_TYPE.SUCCESS) {
      notification.success({ message: 'SUCCESS', description: hFunction, duration: 1 })
    } else if (type === USER_DEBUG_LOG_TYPE.FAILURE) {
      notification.error({ message: 'FAILURE', description: hFunction, duration: undefined })
    }
  }
}
