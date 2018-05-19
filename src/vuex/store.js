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
      id: '',
      nickname: '',
      lastLogin: '',
      check: false,
      perm: 'abc',
      o: []
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
      console.log(state.userData.perm.ADD_PROBLEM)
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
          state.userDate.id = ''
          state.userDate.nickname = ''
          state.userData.lastLogin = ''
          state.userData.perm = []
          state.userData.o = []
        } else {
          state.userData.isLogin = true
          state.userData.id = payload.id
          state.userData.nickname = payload.nickname
          state.userData.lastLogin = payload.lastLogin
          state.userData.perm = payload.perm
          state.userData.o = payload.o
          console.log(state)
        }
      }
    },
  }
})
