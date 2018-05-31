import account from './home'
import setting from './setting.vue'
import avatar from './avatar.vue'
import qusnav from './qusnav.vue'
import all from './all.vue'
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
      path: '/account/qus',
      components: {
        link: qusnav,
        body: all
      },
      props: {link: {chose: 'all'}, body: {chose: 'all'}}
    },
    {
      path: '/account/qus/all',
      components: {
        link: qusnav,
        body: all
      },
      props: {link: {chose: 'all'}, body: {chose: 'all'}}
    },
    {
      path: '/account/qus/ac',
      components: {
        link: qusnav,
        body: ac
      },
      props: {link: {chose: 'ac'}, body: {chose: 'ac'}}
    }
  ]
}
