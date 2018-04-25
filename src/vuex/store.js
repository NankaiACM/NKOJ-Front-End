import Vue from 'vue'
import Vuex from 'vuex'
import { truncate } from 'fs';

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
    rankFilter: {
      sortBy: 'solved',
      viewBy: 'table'
    },
    userData: {
      isLogin: false,
      id: '',
      nickname: '',
      lastLogin: '',
      check: false
    },
  },
  getters: {
    rankSortGet: function (state) {
      return state.rankFilter.sortBy
    },
    rankViewGet: function (state) {
      return state.rankFilter.viewBy
    }
  },
  mutations: {
    setXFilter (state, payload) {//problems filter
      if (payload.value === state.filter[payload.key]) {
        payload.value = ''
      }
      state.filter[payload.key] = payload.value
    },
    setSFilter (state, payload) {//status filter
      var key = payload.key
      var value = payload.value
      if (value === state.statusFilter[key]) {
        value = ''
      }
      state.statusFilter[key] = value
    },
    setRFilter (state, payload) {
      if (payload.value === state.rankFilter[payload.key]) {
        if (payload.key !== 'viewBy') payload.value = ''
      }
      state.rankFilter[payload.key] = payload.value
    },
    setuserDate(state, payload){
      if(payload.check===true){
        state.userData.check=true
      }
      else{
        if (payload.isLogin === false) {
          state.userData.isLogin = false
          state.userDate.id = ""
          state.userDate.nickname = ""
          state.userData.lastLogin = ""
        }
        else {
          state.userData.isLogin = true
          state.userData.id = payload.id
          state.userData.nickname = payload.nickname
          state.userData.lastLogin = payload.lastLogin
        }
      }
    },
  }
})