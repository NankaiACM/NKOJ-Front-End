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
          boxWidth: 141 / 2,
          boxDepth: 141 / 2
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
      var len = Math.sqrt(this.rawdata.length)
      this.options.xAxis3D.data = []
      this.options.yAxis3D.data = []
      for (let x = 0; x < len; x++) {
        this.options.xAxis3D.data.push(x)
        this.options.yAxis3D.data.push(x)
      }
      this.loop()
    },
    loop: function () {
      var d = ~~(Math.random() * 10)
      var len = Math.sqrt(this.rawdata.length)
      len = parseInt(len)
      var tmp = new Array()
      var maxn = -1
      for (var i in this.rawdata) {
        tmp.push({
          value: [i/len, i%len, this.rawdata[i].data + d],
          name: this.rawdata[i].nickname,
          data: this.rawdata[i].data
        })
        maxn = maxn > this.rawdata[i].data ? maxn : this.rawdata[i].data
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