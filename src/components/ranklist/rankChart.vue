<template>
  <div id="rank-chart">
    <div id="cmain">
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-gl'
export default {
  name: 'rankChart',
  data: function () {
    return {
      rawdata: [],
      isloop: true,
      dom: 0,
      options: {
        visualMap: {
          max: 141,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        tooltip: {
          formatter: (a) => {
            console.log(a.data)
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
          boxWidth: 141,
          boxDepth: 141
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
      console.log('chart init()')
      this.$http.get('http://rapapi.org/mockjsdata/33622/bars')
        .then(function (e) {
          var bars = e.body.bars
          this.rawdata = bars
          for (let x = 0; x <= 41 / 2; x++) {
            this.options.xAxis3D.data.push(x)
            this.options.yAxis3D.data.push(x)
          }
          this.loop()
        })
    },
    loop: function () {
      var d = ~~(Math.random() * 10)
      this.options.series[0].data = this.rawdata.map(function (i) {
        i=i.o3
        return {
          value: [i.x, i.y, i.z + d],
          name: 'kikc',
          data: i.z
          }
      })
      this.dom.setOption(this.options)
      if (this.isloop) setTimeout(this.loop, 1100)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init()
    })
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