import admin from './admin'
import rejudge from './rejudge'
import problem from './adminProblem'
import newpc from './contest/new'
import editpc from './contest/edit'
import pcdata from './contest/pcdata'
import edituser from './contest/edituser'
import editque from './contest/editque'
export default {
  path: '/admin',
  component: admin,
  children: [
    { path: '/admin', component: problem },
    { path: '/admin/problem', component: problem },
    { path: '/admin/newpc', component: newpc },
    { path: '/admin/editpc/:id', component: editpc},
    { path: '/admin/rejudge', component: rejudge},
    { path: '/admin/getpc', component: pcdata},
    { path: '/admin/edituser', component: edituser},
    { path: '/admin/editque', component: editque}
  ]
}
