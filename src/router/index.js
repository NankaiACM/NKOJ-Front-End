import Vue from 'vue'
import Router from 'vue-router'
import HOME from '../NKOJ'
import NKPC from '../NKPC'
import componentProblems from '../components/problem/problemsPage'
import componentHome from '../components/home/home'
import componentB from '../components/componentB'
import problemsPage from '../components/problem/problemPage'
import statusPage from '../components/statuspage/statusPage'
import discuss from '../components/discuss/page'
import newpost from '../components/discuss/newPost'
import postPage from '../components/discuss/post'
import componentContest from '../components/contestpage/componentContest'
import allContest from '../components/contestpage/allContest'
import contest from '../components/contestpage/contest'
import detailsPage from '../components/detailspage/details'
import rankPage from '../components/ranklist/rankPage'
import signupPage from '../components/signupPage'
import admin from '../components/admin/route'
import account from '../components/account/route'
import space from '../components/space/route'
import message from '../components/message/route'

Vue.use(Router)
console.log(window.noPointHost)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: HOME,
    children: [
      admin,
      account,
      ...space,
      message,
      { path: '/home', component: componentHome },
      { path: '/problems', component: componentProblems },
      { path: '/notFound', component: componentB },
      { path: '/', redirect: '/home' },
      { path: '/problem/:problemId', component: problemsPage },
      {
        path: '/status',
        component: statusPage,
        props: {
          isInfinite: true,
          isBtn: false,
          apiUrl: window.noPointHost + '/api/status'
        }
      },
      {
        path: '/discuss',
        component: discuss
      },
      {
        path: '/discuss/new',
        component: newpost
      },
      {
        path: '/discuss/:id',
        component: postPage
      },
      { path: '/ranklist', component: rankPage },
      { path: '/details/:solutionId', component: detailsPage },
      {
        path: '/contest',
        component: componentContest,
        children: [
          {
            path: '/contest/allContest',
            component: allContest
          },
          {
            path: '/contest',
            component: contest
          }
        ]
      },
      {
        path: '/sign_up', component: signupPage
      }
    ]
  }, {
    path: '/NKPC',
    component: NKPC
  }
  ]
})
router.beforeEach((to, from, next) => {
  let store = router.app.$options.store
  let userinfo = store.state.userData
  if (userinfo.check === false) { // 仅在第一次加载页面checkUser(), 但不包含主动checkUser()
    router.checkUser(store)
    store.commit({
      type: 'setuserDate',
      check: true
    })
  }
  next()
})
router.checkUser = function (store, logined, notLogging, catchError) {
  Vue.http.get(`${window.noPointHost}/api/user`, {
    crossDomain: true,
    xhrFields: { withCredentials: true },
    timeout: '8000',
    cache: true,
    credentials: true
  }).then(function (res) {
    if (res.body.code === 0) {
      store.commit({
        type: 'setuserDate',
        isLogin: true,
        'user_id': res.body.data.user_id,
        nickname: res.body.data.nickname,
        lastLogin: res.body.data.last_login,
        perm: res.body.data.perm,
        o: res.body.data
      })
      console.log('成功获取用户数据')
      if (!logined) return
      logined() // 成功时的回调
    } else {
      console.log('未知状态')
      console.log(res)
    }
  }, function (e) {
    if (e.body.code === 401) {
      console.log('未登录')
      store.commit({
        type: 'setuserDate',
        isLogin: false
      })
      if (!notLogging) return
      notLogging(e) // 未登录时回调
      return
    }
    console.log('api get error')
    if (!catchError) return
    catchError(e) // 失败时的回调
  })
}
router.addShare = function (vm, solutionId, status) {
  console.log(vm)
  vm.$http.get(window.noPointHost + '/api/status/share/add/' + solutionId)
    .then(function (r) {
      if (r.body.code === 0) {
        vm.notify.title = 'add status'
        vm.notify.message = 'add succeed'
        vm.notify.count++
        if (status) status.shared = true
        return 0
      }
      vm.notify.title = 'add status'
      vm.notify.message = 'add failed'
      vm.notify.count++
    })
}
router.removeShare = function (vm, solutionId, status) {
  vm.$http.get(window.noPointHost + '/api/status/share/remove/' + solutionId)
    .then(function (r) {
      if (r.body.code === 0) {
        vm.notify.title = 'remove status'
        vm.notify.message = 'remove succeed'
        vm.notify.count++
        if (status) status.shared = false
        return 0
      }
      vm.notify.title = 'remove status'
      vm.notify.message = 'remove failed'
      vm.notify.count++
    })
}
router.mngCP = function (vm, cp, mng, id) {
  /*
   * manage comment and post
   * 删除评论
   * cp:
   * comment, post
   * mng:
   * recover, remove
   */
  if (mng !== 'recover' && mng !== 'remove') return -1
  var apiUrl = ''
  if (cp === 'comment') apiUrl = window.noPointHost + '/api/admin/post/' + mng + '/comment/' + id
  else if (cp === 'post') apiUrl = window.noPointHost + '/api/admin/post/' + mng + '/' + id
  else return -1
  vm.$http.get(apiUrl)
    .then(function (res) {
      if (res.body.code === 0) {
        vm.$store.commit('setNotify', {
          title: mng + ': ok',
          message: res.body.message
        })
      } else {
        vm.$store.commit('setNotify', {
          title: res.body.message,
          message: JSON.stringify(res.error)
        })
      }
    }, function (e) {
      vm.$store.commit('setNotify', {
        title: 'net error',
        message: JSON.stringify(e)
      })
    })
}
router.uploadPost = function (vm, id) {
  vm.$http.post(window.noPointHost + '/api/post/' + id, {
    title: vm.title,
    content: vm.content
  }).then(function (res) {
    console.log(res.body)
    if (res.body.code === 0) {
      vm.$store.commit('setNotify', {
        title: 'submit ok',
        message: res.body.message
      })
    } else {
      vm.$store.commit('setNotify', {
        title: 'error' + res.body.message,
        message: JSON.stringify(res.body.error)
      })
    }
  }, function (e) {
    console.log('error')
    vm.$store.commit('setNotify', {
      title: 'upload error',
      message: JSON.stringify(e)
    })
    console.log(e)
  })
}
router.rmMsg = function (vm, oa, value) {
  const ops = {
    one: '/api/message/delete/',
    all: '/api/message/deleteall/'
  }
  const api = ops[oa]
  if (!api) return -1
  vm.$http.get(window.noPointHost + api + value)
    .then(function (res) {
      if (res.body.code === 0) {
        console.log('delete ok')
      }
      vm.$store.commit('setNotify', {
        title: '删除消息',
        message: res.body.message
      })
    }, function (e) {
      vm.$store.commit('setNotify', {
        title: '发生错误',
        message: JSON.stringify(e)
      })
      console.log(e)
    })
}
router.banUser = function (vm, id) {
  vm.$http.get(window.noPointHost + '/api/message/block/' + id)
    .then(function (res) {
      vm.$store.commit('setNotify', {
        title: '屏蔽用户',
        message: res.body.message
      })
    }, function (e) {
      vm.$store.commit('setNotify', {
        title: '发生错误',
        message: JSON.stringify(e)
      })
    })
}
export default router
