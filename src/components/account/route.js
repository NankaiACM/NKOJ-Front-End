import account from './home'
import setting from './setting.vue'
import avatar from './avatar.vue'
import ac from './ac.vue'
export default {
  path: '/account',
  component: account,
  children: [
    {
      path: '/account/setting',
      components: {
        body: setting
      }
    },
    {
      path: '/account/avatar',
      components: {
        body: avatar
      }
    },
    {
      path: '/account/ac',
      components: {
        body: ac
      }
    }
  ]
}
