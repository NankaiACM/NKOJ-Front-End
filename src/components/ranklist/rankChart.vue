<template>
  <div id="rank-chart">
    <bg id="bg"></bg>
    <div id="cmain">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'
import bg from '../wallpaper/wallpaper.vue'
let _er = (i) => ('FF' + i.toString(16)).substr(-2)
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
            //color: ['#E1E6FA', '#C4D7ED', '#ABC8E2', '#375D81', '#183152']
            //color: ['#E97778', '#89C7B6', '#FFD57E', '#AD84C7', '#7998C9']
            //color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            //color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0']
            //color: ['#1D2D60', '#354532', '#E6A060', '#DAAC48', '#AE7B63']
            //color: ['#001B81', '#2E4F29', '#FF9C1C', '#FFC700', '#D36E3D']
            //color: ['#1D2D60', '#354532', '#AE7B63']
            //color: ['#69708d', '#635566', '#8b636e', '#98615e', '#c07766', '#c98475', '#b55650', '#de7764', '#ec9c77', '#fbb168']
            //color: ["#fbb168", "#ec9c77", "#de7764", "#b55650", "#c98475", "#c07766", "#98615e", "#8b636e", "#635566", "#69708d"]
            //color: ['#ccc', '#eee']
            //color: ['#000', '#eee']
            //color: ['#fff']
            //color: ["#183152", "#375D81", "#ABC8E2", "#C4D7ED", "#E1E6FA"]
          }
        },
        tooltip: {
          formatter: (a) => {
            return `name: ${a.data.name}<br>
                    rank: ${a.data.rank}<br>
                    faction: ${a.data.faction}<br>
                    solved: ${a.data.solved}<br>
                    submit: ${a.data.submit}`
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
          boxWidth: 141,
          boxDepth: 141,
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        animation: true,
        animationYhreshold: false,
        animationDuration: 1000,
        series: [{
          type: 'bar3D',
          itemStyle: {
            opacity: 0.8,
            color: function (params) {
              var er = _er(params.data.rank)
              return '#' + er + er + er
            },
            borderWidth: 100,
            borderColor: '#fff'
          },
          emphasis: {
            itemStyle: {
              color: '#fff'
            }
          },
          shading: 'lambert',
          data: []
        }]
      }
    }
  },
  methods: {
    init: function () {
      this.dom = echarts.init(document.querySelector('#cmain'))
      this.opinit()
      window.onresize = this.dom.resize()
    },
    opinit: function () {
      if (!this.rawdata) return
      this.options.xAxis3D.data = this.rawdata.xdata
      this.options.yAxis3D.data = this.rawdata.ydata
      this.options.grid3D.boxDepth = this.rawdata.ydata.length * 10
      this.loop()
    },
    loop: function () {
      var d = ~~(Math.random() * 10)
      var tmp = []
      var rwd = this.rawdata.listdata
      var zmaxn = -1
      for (let i in rwd) {
        tmp.push({
          value: [rwd[i].posx, rwd[i].posy, rwd[i].faction + d],
          name: rwd[i].nickname,
          rank: rwd[i].rank,
          faction: rwd[i].faction,
          solved: rwd[i].solved,
          submit: rwd[i].submit
        })
        if (rwd[i].faction > zmaxn) zmaxn = rwd[i].faction
      }
      this.options.series[0].data = tmp
      console.log(JSON.stringify(tmp))
      this.options.visualMap.max = zmaxn
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
    viewHack: function () {
      return this.$store.getters.rankViewGet
    }
  },
  watch: {
    viewHack: function (n, o) {
      if (this.isloop) clearTimeout(this.loopnum)
      this.opinit()
    }
  },
  components: {
    bg
  }
}
</script>
<style lang="less" scoped>
#rank-chart {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  #bg {
    background: rgba(255,255,255,.8);
  }
  #cmain {
    width: 100%;
    height: 100%;
  }
}
</style>
