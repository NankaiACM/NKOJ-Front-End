import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: {
      Difficulty: '',
      Status: '',
      Keywords: '',
      Tag: ''
    },
    statusFilter: {
      problemID: '',
      userID: '',
      status: '',
      lang: '',
      submit: 0,//监听submit按钮按下
      index: 1,
      page_length: 20
    },
    userData: null,
  },
  mutations: {
    setXFilter (state, payload) {
      if (payload.value === state.filter[payload.key]) {
        payload.value = ''
      }
      state.filter[payload.key] = payload.value
    },
    setSFilter (state, payload) {
      var key = payload.key
      var value = payload.value
      console.log(key+value)
      if (value === state.statusFilter[key]) {
        value = ''
      }
      state.statusFilter[key] = value
    },
  }
})