import home from './home'
import system from './system'
import whisper from './whisper'
import block from './block'
export default {
  path: '/message',
  component: home,
  children: [
    {
      path: '/message',
      component: system
    },
    {
      path: '/message/system',
      component: system
    },
    {
      path: '/message/whisper',
      component: whisper
    },
    {
      path: '/message/whisper/:id',
      component: whisper
    },
    {
      path: '/message/block',
      component: block
    }
  ]
}
