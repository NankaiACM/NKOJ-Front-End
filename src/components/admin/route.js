import admin from './admin'
import rejudge from './rejudge'
import problem from './adminProblem'
import newpc from './contest/new'
import pcdata from './contest/pcdata'
export default { path: '/admin',
  component: admin,
  children: [
    { path: '/admin', component: problem },
    { path: '/admin/problem', component: problem },
    { path: '/admin/newpc', component: newpc },
    { path: '/admin/rejudge', component: rejudge},
    { path: '/admin/getpc', component: pcdata}
  ]
}
