import Vue from 'vue'
import Vuex from 'vuex'
// import { truncate } from 'fs'

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
      submit: 0, // 监听submit按钮按下
      index: 1,
      page_length: 20
    },
    rankFilter: {
      timeBy: '',
      viewBy: 'table',
      timeOps: []
    },
    userData: {
      isLogin: false,
      'user_id': '',
      nickname: '',
      lastLogin: '',
      check: false,
      perm: {},
      o: {}
    },
    notify: {
      title: '',
      message: '',
      count: 0
    }
  },
  getters: {
    rankTimeGet: function (state) {
      return state.rankFilter.timeBy
    },
    rankViewGet: function (state) {
      return state.rankFilter.viewBy
    },
    rankFTOpsGet: function (state) {
      return state.rankFilter.timeOps
    },
    proAddGet: function (state) {
      if (!state.userData.perm) return false
      if (!state.userData.perm.ADD_PROBLEM) return false
      return state.userData.perm.ADD_PROBLEM === '1'
    },
    usrLogGet: function (state) {
      return state.userData.isLogin
    }
  },
  mutations: {
    setXFilter (state, payload) { // problems filter
      if (payload.value === state.filter[payload.key]) {
        payload.value = ''
      }
      state.filter[payload.key] = payload.value
    },
    setSFilter (state, payload) { // status filter
      var key = payload.key
      var value = payload.value
      if (value === state.statusFilter[key]) {
        value = ''
      }
      state.statusFilter[key] = value
    },
    setRFilter (state, payload) {
      state.rankFilter[payload.key] = payload.value
    },
    pushRFOption (state, payload) { // push option into rank filter time menu
      if (payload.key !== 'ops') return
      state.rankFilter.timeOps = payload.value
    },
    setuserDate (state, payload) {
      if (payload.check === true) {
        state.userData.check = true
      } else {
        if (payload.isLogin === false) {
          state.userData.isLogin = false
          state.userData['user_id'] = ''
          state.userData.nickname = ''
          state.userData.lastLogin = ''
          state.userData.perm = {}
          state.userData.o = {}
          console.log('清空用户数据')
          console.log(JSON.stringify(state.userData))
        } else {
          state.userData.isLogin = true
          state.userData['user_id'] = payload['user_id']
          state.userData.nickname = payload.nickname
          state.userData.lastLogin = payload.lastLogin
          state.userData.perm = payload.perm
          state.userData.o = payload.o
        }
      }
    },
    setNotify: function (state, payload) {
      state.notify.title = payload.title
      state.notify.message = payload.message
      state.notify.count++
    }
  }
})
