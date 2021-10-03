import Vue from 'vue'
import VueRouter from 'vue-router'
import { apiSelfProfile } from '@/typescript/api'
import store, { SET_USER_CHECK_BOOLEAN, SET_USER_DATA_USERINFORMATION } from './store'

Vue.use(VueRouter)

const router = new VueRouter({
  base: '/nkpc',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "_nkpc_register" */ '@/views/nkpc/nkpc/register.vue')
    },
    {
      path: '/register',
      component: () => import(/* webpackChunkName: "_nkpc_register" */ '@/views/nkpc/nkpc/register.vue')
    },
    {
      path: '/coding/:cid/:pid',
      component: () => import(/* webpackChunkName: "_nkpc_coding" */ '@/views/nkpc/nkpc/coding.vue'),
      props: true,
      name: 'coding'
    },
    {
      path: '/coding/:cid',
      component: () => import(/* webpackChunkName: "_nkpc_coding" */ '@/views/nkpc/nkpc/coding.vue'),
      props: true
    },
    {
      path: '/coding',
      component: () => import(/* webpackChunkName: "_nkpc_coding" */ '@/views/nkpc/nkpc/coding.vue')
    },
    {
      path: '/activity',
      component: () => import(/* webpackChunkName: "_nkpc_activity" */ '@/views/nkpc/nkpc/activity.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'recycler',
      component: () => import(/* webpackChunkName: "_nkpc_recycler" */ '@/views/nkpc/nkpc/404.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!store.state.user.check) {
    try {
      const selfProfile = await apiSelfProfile() // 检查是不是已经持有登录凭据
      store.commit(SET_USER_DATA_USERINFORMATION, selfProfile) // 更新当前用户信息
      store.commit(SET_USER_CHECK_BOOLEAN, true) // 更新用户校验状态
    } catch (e) {
      console.log('未登录, 强制进行路径导航')
    }
  }
  next()
})

export default router
