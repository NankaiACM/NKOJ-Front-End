<template>
  <div id="wallpaper">
    <div v-for="(item, index) in trangles" :key="index" class="rawtype" :style="item.style">
    </div>
  </div>
</template>
<script>
let _r = Math.random
let _p = parseInt
let _t = () => _p((_r() - .5) * 5)
let _u = () => _p(_r() * 255)
let _v = () => _r() - .2
let _s = (x, y) => `${x + _t()}% ${y + _t()}%,${x + _t()}% ${y + _t()}%,${x + _t()}% ${y + _t()}%`
let _w = (x, y) => `${x}% ${y}%,${x}% ${y}%,${x}% ${y}%`
export default {
  name: 'wallpaper',
  data: function () {
    return {
      isCycle: true,
      cycleNum: -1,
      trangles: []
    }
  },
  methods: {
    wllRender: function () {
      this.boolt = ! this.boolt
      var trngls = this.trangles
      this.trangles = []
      for (var i = 0; i < 100; i++) {
        var d = trngls[i]
        d = d ? d : {
          x : _p(_r() * 100),
          y : _p(_r() * 100)
        }
        var a = _v()
        var rawstyle = `clip-path: polygon(${_s(d.x, d.y)});background:rgba(${_u()},${_u()},${_u()},${a < 0 ? .2 : a});`
        var k = {
          style: rawstyle,
          x: d.x,
          y: d.y
          }
        this.trangles.push(k)
      }
      if (this.isCycle) this.cycleNum = setTimeout(this.wllRender, 2000)
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
#wallpaper .rawtype {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 2s;
  transition-timing-function: ease-in-out;
}
</style>



