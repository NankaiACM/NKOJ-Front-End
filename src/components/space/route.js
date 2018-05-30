import space from './home'
export default [
  {
    path: '/space/uid/:uid',
    component: space,
    props: {method: 'uid'}
  },
  {
    path: '/space/nickname/:nickname',
    component: space,
    props: {method: 'nickname'}
  }
]
