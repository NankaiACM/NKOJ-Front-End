import Vue from 'vue'
import Router from 'vue-router'
import componentProblems from '../components/problemslistpage/problemsPage'
import componentHome from '../components/home/home'
import componentB from '../components/componentB'
import componentContest from '../components/componentContest'
import problemsPage from '../components/problemPage'
import statusPage from '../components/statuspage/statusPage'
import discussPage from '../components/discussPage'
import userPage from '../components/userPage'
import allContest from '../components/contestpage/allContest'
import contest from '../components/contestpage/contestDetail'
//import codePage from '../components/codePage'
import detailsPage from '../components/detailspage/details'
Vue.use(Router)
console.log(window.noPointHost)
export default new Router({
  mode: 'history',
  routes: [
    {path: '/home', component: componentHome},
    {path: '/problems', component: componentProblems},
    {path: '/notFound', component: componentB},
    {path: '/', redirect: '/home'},
    {path: '/problem/:problemId', component: problemsPage},
    {
      path: '/status',
      component: statusPage,
      props: {
        isFilter: true,
        isInfinite: true,
        isBtn: false,
        apiUrl: window.noPointHost+'/api/status/list'
      }
    },
    {path: '/discuss',component: discussPage},
    {path: '/user/:id', component: userPage},
    //{path: '/code/:id', component: codePage},
    {path: '/details/:solution_id', component: detailsPage},
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
    }
  ]
})
