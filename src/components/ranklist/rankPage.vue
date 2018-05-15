<template>
<div id="rankPage" class="container-fulid">
  <div class="view-container container-fluid">
    <rank-table v-if="viewBy === 'table'" :rankdata="ranklist"></rank-table>
    <rank-chart v-if="viewBy === 'bar3d'" :rawdata="chartlist"></rank-chart>
    <rank-me v-if="viewBy === 'me'"></rank-me>
  </div>
</div>
</template>
<style lang="less">
</style>
<script>
import rankTable from './rankTable.vue'
import rankChart from './rankChart.vue'
import rankMe from './rankMe.vue'
export default {
  name: 'rankPage',
  data: function () {
    return {
      ranklist: [],
      chartlist: [],
      rawdata: [],
      viewBy: 'table',
      timeBy: ''
    }
  },
  methods: {
    getData: function () {
      this.$http.get('http://rapapi.org/mockjsdata/33622/nrank')
        .then(function (e) {
          if (!e.body) return
          if (!e.body.track) return
          this.rawdata = e.body.track
          this.chartlist = this.getChartList(this.rawdata)
          this.getTrackFilterOption(this.rawdata)
        })
    },
    getTrackFilterOption: function (pies) { // 获取filter的参数
      var ops = []
      for (let i in pies) {
        var key = pies[i].key
        var text = pies[i].text
        ops.push({key: key, text: text})
      }
      this.pushFilterCommit(ops)
      if (this.timeBy === '') {
        this.$store.commit({
          type: 'setRFilter',
          key: 'timeBy',
          value: ops[0].key
        })
      }
    },
    getRankList: function (n) {
      var res = this.rawdata.filter((item) => {
        return item.key === n
      })
      res = res[0]
      res = res.data
      return res
    },
    getChartList: function (raw) {
      var listdata = []
      var xdata = []
      var ydata = []
      var ymaxn = -1
      for (let i in raw) {
        let track = raw[i]
        xdata.push(track.text)
        if (track.data.length > ymaxn) ymaxn = track.data.length
        for (let j in track.data) {
          let item = track.data[j]
          var p = {
            posx: track.text,
            posy: j * 1,
            rank: item.rank,
            faction: item.faction,
            nickname: item.nickname,
            solved: item.solved,
            submit: item.submit,
          }
          listdata.push(p)
        }
      }
      for (let i = 1; i <= ymaxn; i++) ydata.push(i)
      return {listdata, xdata, ydata}
    },
    pushFilterCommit: function (ops) { // 向store中推送时间选项参数
      this.$store.commit({
        type: 'pushRFOption',
        key: 'ops',
        value: ops
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getData()
    })
  },
  computed: {
    timeHack: function () {
      return this.$store.getters.rankTimeGet
    },
    viewHack: function () {
      return this.$store.getters.rankViewGet
    }
  },
  watch: {
    timeHack: function (n, o) {
      this.timeBy = n
      this.ranklist = this.getRankList(n)
    },
    viewHack: function (n, o) {
      this.viewBy = n
      console.log('view changing')
    }
  },
  components: {
    rankTable,
    rankChart,
    rankMe
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';
@rtop: @barheight+@fat-container-margin-top+@filterheight;
#rankPage {
  margin-top: @filterheight;
  position: relative;
  .view-container {
    position: relative;
    padding: 0;
    border-radius: 2px;
    border: 2px solid #e8f1f2;
    min-height: calc(100vh - calc(@rtop));
  }
}
</style>
