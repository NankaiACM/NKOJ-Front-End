import { apiSelfProfile } from '@/typescript/api'
import VueRouter from 'vue-router'
import Vue from 'vue'
import store, { SET_USER_CHECK_BOOLEAN, SET_USER_DATA_USERINFORMATION } from './store'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/admin',
  routes: [{ // 注意：列出route的顺序应该是父路径在前, 这关系到面包屑导航的索引顺序
    path: '/',
    redirect: '/message/announce',
    name: '首页'
  }, {
    path: '/message',
    name: '公告与私信',
    redirect: '/message/announce'
  }, {
    path: '/message/announce',
    name: '官方公告',
    component: () => import(/* webpackChunkName: "_message_announce" */ './message/announce.vue')
  }, {
    path: '/message/whisper',
    name: '官方私信',
    component: () => import(/* webpackChunkName: "_message_whisper" */ './message/whisper.vue')
  }, {
    path: '/message/report',
    name: '私信举报',
    component: () => import(/* webpackChunkName: "_message_report" */ './message/report.vue')
  }, {
    path: '/contest',
    name: '比赛管理',
    redirect: '/contest/list'
  }, {
    path: '/contest/list',
    name: '比赛列表',
    component: () => import(/* webpackChunkName: "_contest_list" */ './contest/list.vue')
  }, {
    path: '/contest/append',
    name: '添加比赛',
    component: () => import(/* webpackChunkName: "_contest_append" */ './contest/append.vue')
  }, {
    path: '/contest/view/:contestId',
    name: '查看比赛',
    props: (route) => ({ contestId: Number(route.params.contestId) }),
    component: () => import(/* webpackChunkName: "_contest_view" */ './contest/view.vue')
  }, {
    path: '/contest/edit/:contestId',
    name: '编辑比赛',
    props: (route) => ({ contestId: Number(route.params.contestId) }),
    component: () => import(/* webpackChunkName: "_contest_edit" */ './contest/edit/edit.vue')
  }, {
    path: '/discuss',
    name: '讨论区管理',
    redirect: '/discuss/list'
  }, {
    path: '/discuss/list',
    name: '文章列表',
    component: () => import(/* webpackChunkName: "_discuss_list" */ './discuss/list.vue')
  }, {
    path: '/judge',
    name: '评测管理',
    redirect: '/judge/list'
  }, {
    path: '/judge/list',
    name: '评测列表',
    component: () => import(/* webpackChunkName: "_judge_list" */ './judge/list.vue')
  }, {
    path: '/problem',
    name: '题目管理',
    redirect: '/problem/list'
  }, {
    path: '/problem/list',
    name: '题目列表',
    component: () => import(/* webapckChunkName: "_problem_list" */ './problem/list.vue')
  }, {
    path: '/problem/append',
    name: '添加题目',
    component: () => import(/* webpackChunkName: "_problem_append" */ './problem/append.vue')
  }, {
    path: '/problem/edit/:problemId/:tabName',
    name: '题目编辑',
    props: (route) => ({ problemId: Number(route.params.problemId), tabName: route.params.tabName }),
    component: () => import(/* webpackChunkName: "_problem_edit" */ './problem/modify.vue')
  }, {
    path: '/signin',
    name: '登录',
    component: () => import(/* webpackChunkName: "_signin" */ './signin/form.vue')
  }]
})

router.beforeEach(async (to, from, next) => {
  if (to.name !== '登录' && !store.state.user.check) {
    try {
      const selfProfile = await apiSelfProfile() // 检查是不是已经持有登录凭据
      store.commit(SET_USER_DATA_USERINFORMATION, selfProfile) // 更新当前用户信息
      store.commit(SET_USER_CHECK_BOOLEAN, true) // 更新用户校验状态
      next()
    } catch (e) {
      // 没有登录凭据
      // 跳转到登录页面
      next({ name: '登录' })
    }
  } else {
    next()
  }
})

export default router
