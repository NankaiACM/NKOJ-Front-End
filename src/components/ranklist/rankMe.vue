<template>
  <div id="rank-me" class="container-fluid">
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
      window.onresize = this.dom.resize
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  #imain {
    width: 100%;
    height: 100%;
  }
}
</style>


