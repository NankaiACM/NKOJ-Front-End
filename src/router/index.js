import Vue from 'vue'
import Router from 'vue-router'
// import NKOJ from '../NKOJ'
// import NKPC from '../NKPC'
// import problems from '../components/problem/problems'
// import home from '../components/home/home'
// import notFound from '../components/404'
// import problem from '../components/problem/problem'
// import status from '../components/status/page'
// import discuss from '../components/discuss/page'
// import newpost from '../components/discuss/newPost'
// import post from '../components/discuss/post'
// import contestWrap from '../components/contest/contestWrap'
// import allContest from '../components/contest/allContest'
// import contest from '../components/contest/contest'
// import details from '../components/details/details'
// import rank from '../components/rank/rank'
// import signup from '../components/sign/signup'

import admin from '../components/admin/route'
import account from '../components/account/route'
import space from '../components/space/route'
import message from '../components/message/route'

// new

const NKOJ = () => import(
  /* webpackChunkName: "nkoj" */
  '../NKOJ.vue')
const NKPC = () => import(
  /* webpackChunkName: "nkpc" */
  '../NKPC.vue')
const home = () => import(
  /* webpackChunkName: "home" */
  '../components/home/home.vue')
const signup = () => import(
  /* webpackChunkName: "sign" */
  '../components/sign/signup.vue')
const problems = () => import(
  /* webpackChunkName: "problem" */
  '../components/problem/problems.vue')
const problem = () => import(
  /* webpackChunkName: "problem" */
  '../components/problem/problem.vue')
const status = () => import(
  /* webpackChunkName: "status" */
  '../components/status/page.vue')
const details = () => import(
  /* webpackChunkName: "status" */
  '../components/details/details.vue')
const contestWrap = () => import(
  /* webpackChunkName: "contest" */
  '../components/contest/contestWrap.vue')
const contest = () => import(
  /* webpackChunkName: "contest" */
  '../components/contest/contest.vue')
const allContest = () => import(
  /* webpackChunkName: "contest" */
  '../components/contest/allContest.vue')
const discuss = () => import(
  /* webpackChunkName: "discuss" */
  '../components/discuss/page.vue')
const post = () => import(
  /* webpackChunkName: "discuss" */
  '../components/discuss/post.vue')
const newpost = () => import(
  /* webpackChunkName: "discuss" */
  '../components/discuss/newPost.vue')
const rank = () => import(
  /* webpackChunkName: "rank" */
  '../components/rank/rank.vue')
const notFound = () => import(
  /* webpackChunkName: "404" */
  '../components/404.vue')
const allContestStatus = () => import(
  /* webpackChunkName: "allconteststatus" */
  '../components/contest/allstatus.vue')
const allContestRank = () => import(
  /* webpackChunkName: "allContestRank" */
  '../components/contest/contestRank.vue'
)
const teriri = () => import(
  /* webpackChunkName: "teriri" */
  '../view/teririplayer/app.vue'
)

Vue.use(Router)
console.log(window.noPointHost)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: NKOJ,
    children: [
      admin,
      account,
      ...space,
      message,
      { path: '/home', component: home },
      { path: '/problems', component: problems },
      { path: '/notFound', component: notFound },
      { path: '/', redirect: '/home' },
      { path: '/problem/:problemId', component: problem },
      {
        path: '/status',
        component: status,
        props: {
          isInfinite: true,
          isBtn: false,
          apiUrl: window.noPointHost + '/api/status'
        }
      },
      {
        path: '/status/:querryString',
        component: status,
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
        component: post
      },
      { path: '/ranklist', component: rank },
      { path: '/details/:solutionId', component: details },
      {
        path: '/contest',
        component: contestWrap,
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
        path: '/sign_up', component: signup
      }
    ]
  }, {
    path: '/NKPC',
    component: NKPC,
    props: {
      iswarning: true
    }
  }, {
    path: '/NKPC/:contestid',
    component: NKPC,
    props: {
      iswarning: false
    }
  }, {
    path: '/NKPC/:contestid/status',
    component: allContestStatus,
    props: true
  }, {
    path: '/NKPC/:contestid/rank',
    component: allContestRank,
    props: {
      limit: NaN
    }
  }, {
    path: '/teriri',
    component: teriri
  }
  ]
})
router.beforeEach((to, from, next) => {
  let store = router.app.$options.store
  let userinfo = store.state.userData
  if (userinfo.check === false) {
    /* 仅在第一次加载页面checkUser(), 但不包含主动checkUser() */
    router.checkUser(store)
    /* WARNING *
     * checkUser 包含异步， 页面加载nextTick中依赖于userDate状态的过程将会在刷新或者第一次进入出错，
     * 但是由非_blank方式跳转而来时，页面将会表现正常。
     * 建议将nextTick中的依赖过程加入watch列表
     */
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
      console.log('sdfsdf')
      console.log(res.body.data)
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
router.rmMsg = function (vm, oa, value) {
  const ops = {
    one: '/api/message/delete/',
    all: '/api/message/deleteall/'
  }
  const api = ops[oa]
  if (!api) return -1
  return vm.$http.get(window.noPointHost + api + value)
    .then(function (res) {
      if (res.body.code === 0) {
        console.log('delete ok')
        vm.$store.commit('setNotify', {
          title: '删除成功',
          message: res.body.message
        })
        return 0
      }
      vm.$store.commit('setNotify', {
        title: '删除消息',
        message: res.body.message
      })
      return -1
    }, function (e) {
      vm.$store.commit('setNotify', {
        title: '发生错误',
        message: JSON.stringify(e)
      })
      console.log(e)
      return -2
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
router.unifyQuery = function (vm, demand) {
  /* demand: {
   *   title,
   *   api,
   *   id,
   *   package
   * }
   */
  var func = function () {
    vm.$http.get(window.noPointHost + demand.api + demand.id)
  }
  if (demand.package) {
    func = function () {
      return vm.$http.post(window.noPointHost + demand.api + demand.id, demand.package)
    }
  }
  return func().then(function (res) {
    if (res.body.code === 0) {
      vm.$store.commit('setNotify', {
        title: demand.title,
        message: res.body.message
      })
      return 0
    }
    vm.$store.commit('setNotify', {
      title: demand.title + ': error',
      message: JSON.stringify(res.body)
    })
  }, function (e) {
    vm.$store.commit('setNotify', {
      title: demand.title + ': fatal',
      message: JSON.stringify(e)
    })
  })
}
export default router
