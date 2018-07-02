import admin from './admin'
import rejudge from './rejudge'
import problem from './adminProblem'
import editpost from './discuss/editpost'
import mngCP from './discuss/mngCP'
import newpc from './contest/new'
import editpc from './contest/edit'
import pcdata from './contest/pcdata'
import edituser from './contest/edituser'
import editque from './contest/editque'
import report from './message/report'
import batch from './message/batch'

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
    { path: '/admin/editque', component: editque},
    { path: '/admin/editpost', component: editpost},
    { path: '/admin/editpost/:id', component: editpost},
    { path: '/admin/report', component: report},
    { path: '/admin/batch', component: batch},
    { path: '/admin/rmcomment',
      component: mngCP,
      props: {
        title: '删除评论',
        cp: 'comment',
        mng: 'remove'
      }
    },
    { path: '/admin/rccomment',
      component: mngCP,
      props: {
        title: '恢复评论',
        cp: 'comment',
        mng: 'recover'
      }
    },
    { path: '/admin/rmpost',
      component: mngCP,
      props: {
        title: '删除讨论',
        cp: 'post',
        mng: 'remove'
      }
    },
    { path: '/admin/rcpost',
      component: mngCP,
      props: {
        title: '恢复讨论',
        cp: 'post',
        mng: 'recover'
      }
    },
  ]
}
