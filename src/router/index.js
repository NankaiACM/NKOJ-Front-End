import Vue from 'vue'
import Router from 'vue-router'
import HOME from '../App'
import NKPC from "../App2"
import componentProblems from '../components/problemslistpage/problemsPage'
import componentHome from '../components/home/home'
import componentB from '../components/componentB'
import componentContest from '../components/componentContest'
import problemsPage from '../components/problemPage'
import statusPage from '../components/statuspage/statusPage'
import discussPage from '../components/discussPage'
import postPage from '../components/discuss/post'
import userPage from '../components/userPage'
import allContest from '../components/contestpage/allContest'
import contest from '../components/contestpage/contestDetail'
//import codePage from '../components/codePage'
import detailsPage from '../components/detailspage/details'
import rankPage from '../components/ranklist/rankPage'
import signupPage from '../components/signupPage'
import adminPage from '../components/admin/admin'
import adminProblemPage from '../components/admin/adminProblem'
Vue.use(Router)
console.log(window.noPointHost)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: HOME,
    children: [
      { path: '/admin',
        component: adminPage,
        children: [
          { path: '/admin/problem', component: adminProblemPage },
          { path: '/admin', component: adminProblemPage }
        ]
      },
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
          apiUrl: window.noPointHost + '/api/status/list'
        }
      },
      { path: '/discuss', component: discussPage },
      { path: '/discuss/:id', component: postPage },
      { path: '/ranklist', component: rankPage },
      { path: '/user/:id', component: userPage },
      { path: '/details/:solution_id', component: detailsPage },
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
      { path: '/sign_up', component: signupPage}
    ]
  }, {
    path: '/NKPC',
    component: NKPC
  }
  ]
})
router.beforeEach((to, from, next) => {
  console.log("ok")
  next()
})
export default router
