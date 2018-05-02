<template>
  <div id="rank-me">
    <div id="imain">
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-gl'
export default {
  name: 'rankMe',
  data: function () {
    return {
      dom: 0,
      rawdata: [],
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            axis: 'auto',
            snap: true
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value',
          data: []
        },
        series: [{
          data: [],
          type: 'line',
          smooth: true
        }]
      }
    }
  },
  methods: {
    init: function () {
      this.dom = echarts.init(document.querySelector('#imain'))
      this.opinit()
    },
    opinit: function () {
      this.$http.get('http://rapapi.org/mockjsdata/33622/rankme')
        .then(function (r) {
          this.rawdata = r.body.zip
          console.log(JSON.stringify(this.rawdata))
          this.afterGet()
          console.log(JSON.stringify(this.options))
        }, function (e) {
          console.log(e)
        })
    },
    afterGet: function () {
      this.getXD()
      this.dom.setOption(this.options)
    },
    getXD: function () {
      var tmpX = []
      var tmpD = []
      for (let i in this.rawdata) {
        tmpX.push(this.rawdata[i].data)
        tmpD.push(this.rawdata[i].rank)
      }
      this.options.xAxis.data = tmpX
      this.options.series[0].data = tmpD
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init()
    })
  }
}
</script>
<style lang="less" scoped>
#rank-me {
  #imain {
    width: 1000px;
    height: 800px;
  }
}
</style>


