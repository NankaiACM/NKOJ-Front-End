<template>
  <div id="rank-chart">
    <bg></bg>
    <div id="cmain">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import bg from '../wallpaper/wallpaper.vue'
import 'echarts-gl'
export default {
  name: 'rankChart',
  props: ['rawdata'],
  data: function () {
    return {
      isloop: false,
      loopnum: 0,
      dom: 0,
      title: {},
      options: {
        visualMap: {
          max: 141,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        tooltip: {
          formatter: (a) => {
            return `name: ${a.data.name}<br>data: ${a.data.data}`
          }
        },
        xAxis3D: {
          data: []
        },
        yAxis3D: {
          data: []
        },
        zAxis3D: {},
        grid3D: {
          boxWidth: 100,
          boxDepth: 10000
        },
        animation: true,
        animationYhreshold: false,
        animationDuration: 1000,
        series: [{
          type: 'bar3D',
          shading: 'color',//not should
          itemStyle: {
            opacity: 0.8
          },
          emphasis: {
            itemStyle: {
              color: '#ccc'
            }
          },
          data: []
        }]
      }
    }
  },
  methods: {
    init: function () {
      this.dom = echarts.init(document.querySelector('#cmain'))
      this.opinit()
    },
    opinit: function () {
      if (!this.rawdata) return
      this.options.xAxis3D.data = [0, 1, 2, 3, 4, 5, 6]
      this.options.yAxis3D.data = []
      var maxn = -1
      for (let i in this.rawdata) {
        if (maxn <= this.rawdata[i].posy) maxn = this.rawdata[i].posy
      }
      for (var i = 0; i < maxn; i ++) {
        this.options.yAxis3D.data.push(i)
      }
      this.options.grid3D.boxDepth = maxn * 10
      this.loop()
    },
    loop: function () {
      var d = ~~(Math.random() * 10)
      var len = Math.sqrt(this.rawdata.length)
      len = parseInt(len)
      var tmp = new Array()
      var maxn = -1
      var rwd = this.rawdata
      for (var i in rwd) {
        tmp.push({
          value: [rwd[i].posx, rwd[i].posy, rwd[i].data + d],
          name: rwd[i].nickname,
          data: rwd[i].data
        })
        console.log(tmp[tmp.length-1].value)
        maxn = maxn > rwd[i].data ? maxn : rwd[i].data
      }
      this.options.series[0].data = tmp
      this.options.visualMap.max = maxn
      this.dom.setOption(this.options)
      if (this.isloop) this.loopnum = setTimeout(this.loop, 1100)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init()
    })
  },
  computed: {
    sortHack: function () {
      return this.$store.getters.rankSortGet
    }
  },
  watch: {
    sortHack: function (n, o) {
      if (this.isloop) clearTimeout(this.loopnum)
      this.opinit()
    }
  },
  components: {
    bg
  }
}
</script>
<style>
#rank-chart {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
}
#cmain {
  width: 100%;
  height: 100%;
}
</style>