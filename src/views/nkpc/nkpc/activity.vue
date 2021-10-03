<template lang="pug">
.activity.has-background-dark.section1.columns.is-vcentered.is-centered
  canvas#canvas
  .part1.column
    p.has-text-white.is-size-3.title.is-init(ref="title") Nankai University Programming Contest 15 is Upcomming!
    br
    p.has-text-white.is-small.has-text-center.subtitle.is-init(ref="subtitle") 第十五届 “我为程序狂” 南开大学程序设计竞赛就要开始啦！
    br
    .field.has-div-center.is-init(ref="field")
      .control
        .button.is-medium.has-background-none.has-text-white 现在报名
</template>
<script>
import velocity from 'velocity-animate'

let ref; let ctx; let reref; let rectx; let w; let h

const fps = 10
const timed = [0, 0]

const lr = []

function resize () {
  w = ref.width = reref.width = window.innerWidth
  h = ref.height = reref.height = window.innerHeight
}

function uninstall () {
  window.isplay = false
  window.removeEventListener('resize', resize)
}

function clear () {
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(54, 54, 54, 0.041)'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'lighter'
}

function draw () {
  clear()
  for (let idx = 0; idx < lr.length; idx++) {
    const i = lr[idx]
    const clr = `rgba(${~~(i.v - 1) * 155 + 100}, ${~~((i.x / w) * 155) + 100}, ${~~((i.y / h) * 255)}, 1)`
    ctx.shadowColor = clr
    ctx.shadowBlur = 5

    ctx.beginPath()
    ctx.strokeStyle = clr
    ctx.lineWidth = 10
    ctx.moveTo(~~i.x, ~~i.y)
    ctx.lineTo(~~(i.x + i.v * 5), ~~i.y)
    ctx.stroke()
    ctx.closePath()

    i.x += i.v * 5

    ctx.beginPath()
    ctx.fillStyle = clr
    ctx.arc(~~i.x, ~~i.y, 5, Math.PI * 2, 0)
    ctx.fill()
    ctx.closePath()

    if (i.x > w) {
      i.x = 0
      i.v = Math.random() + 1
    }
  }
}

function loop () {
  draw()
  // console.log('fps: ' + 1000 / (new Date().getTime() - timed[1]));
  timed[1] = new Date().getTime()
  rectx.beginPath()
  rectx.drawImage(ref, 0, 0)
  rectx.closePath()
  if (window.isplay) setTimeout(loop, 1000 / fps)
  // window.requestAnimationFrame(loop);
}

function init () {
  reref = document.querySelector('#canvas')
  rectx = reref.getContext('2d')
  ref = document.createElement('canvas')
  ctx = ref.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.ref = ref
  window.ctx = ctx
  for (let i = 0; i < 10; i++) {
    lr.push({ v: Math.random() + 1, x: 0, y: (h / 3) * 2 + 141 * Math.random() })
  }
  timed[0] = new Date().getTime()
  window.isplay = true
  loop()
}

export default {
  name: 'activity',
  mounted () {
    this.$nextTick(() => {
      velocity(this.$refs.title, {
        translateY: '50px',
        opacity: 1
      }, {
        easing: 'easeOutSine',
        duration: 1000
      })
      velocity(this.$refs.subtitle, {
        translateY: '75px',
        opacity: 1
      }, {
        easing: 'easeOutSine',
        duration: 1250
      })
      velocity(this.$refs.field, {
        translateY: '80px',
        opacity: 1
      }, {
        easing: 'easeOutSine',
        duration: 1500
      })
      init()
    })
  },
  beforeUnmount () {
    uninstall()
  }
}
</script>
<style lang="scss" scoped>
.activity {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(54, 54, 54, 1) !important
}

.part1 {
  position: absolute;
  background: none;
}
.has-background-none {
  background: none !important;
}
.has-div-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.has-text-center {
  text-align: center;
}
.is-init {
  position: relative;
  top: -100px;
  opacity: 0;
}
</style>
