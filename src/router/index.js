import Vue from 'vue'
import Router from 'vue-router'
import componentProblems from '../components/componentProblems'
import componentHome from '../components/componentHome'
import componentB from '../components/componentB'
import componentContest from '../components/componentContest'
import problemsPage from '../components/problemPage'
import statusPage from '../components/statusPage'
import userPage from '../components/userPage'
Vue.use(Router)
export default new Router({
  routes: [
    {path: '/home', component: componentHome},
    {path: '/problems', component: componentProblems},
    {path: '/notFound', component: componentB},
    {path: '/', redirect: '/home'},
    {path: '/problem/:id', component: problemsPage},
    {path: '/status', component: statusPage},
    {path: '/contest', component: componentContest},
    {path: '/user/:id', component: userPage},
    /*,
    {path: '/problem/:id', component: componentProblem},//TODO
    {path: '/problem/:id', component: componentContest}//TODO
    */
  ]
})
