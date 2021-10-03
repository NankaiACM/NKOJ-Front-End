<template>
  <div id="alex">
    <div v-for="(item, index) in trangles" :key="index" class="rawtype" :style="item.style">
    </div>
  </div>
</template>
<script>
const _ld = 50
const _cd = 30
const _r = Math.random
const _p = parseInt
const _t = (v = _ld) => _p((_r() - 0.5) * v)
const _u = () => _p(_r() * _cd)
const _v = () => _r() * 0.3
const _s = (x, y) => `${x + _t()}% ${y + _t()}%,${x + _t()}% ${y + _t()}%,${x + _t()}% ${y + _t()}%`
/* const _w = (x, y) => `${x}% ${y}%,${x}% ${y}%,${x}% ${y}%` */
export default {
  name: 'alex',
  data: function () {
    return {
      isCycle: false,
      cycleNum: -1,
      trangles: [],
      nums: 72,
      color: [[15, 165, 210], [175, 95, 215]]
    }
  },
  methods: {
    wllRender: function () {
      this.boolt = !this.boolt
      var trngls = this.trangles
      this.trangles = []
      for (var i = 0; i < this.nums; i++) {
        var d = trngls[i]
        d = d || {
          x: _p(_r() * 100),
          y: _p(_r() * 100)
        }
        var a = _v()
        var c = this.r()
        var rawstyle = `clip-path: polygon(${_s(d.x, d.y)});background:rgba(${_u() + c[0]},${_u() + c[1]},${_u() + c[2]},${a});`
        var k = {
          style: rawstyle,
          x: d.x + _t(10),
          y: d.y + _t(10)
        }
        this.trangles.push(k)
      }
      if (this.isCycle) this.cycleNum = setTimeout(this.wllRender, 5000)
    },
    r: function () {
      var t = _r()
      if (t > 0.5) t = 1
      if (t !== 1) t = 0
      return this.color[t]
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.wllRender()
    })
  }
}
</script>
<style>
#alex .rawtype {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 5s;
  transition-timing-function: ease-in-out;
}
</style>
