<template>
<div id="rankPage" class="container-fulid row">
  <rank-table v-if="viewBy === 'table'" :rankdata="ranklist"></rank-table>
  <rank-chart v-if="viewBy === 'bar3d'" :rawdata="chartlist"></rank-chart>
</div>
</template>
<style lang="less">
</style>
<script>
import rankTable from './rankTable.vue'
import rankChart from './rankChart.vue'
export default {
  name: "rankPage",
  data: function () {
    return {
      rankdata: {
        solved:[],
        submit:[],
        ratio:[],
        standard: []
        },
      ranklist: [],
      chartlist: [],
      viewBy: 'table'
    }
  },
  methods: {
    getData: function () {
      var list=['solved', 'submit', 'ratio', 'myrank']
      for (let i in list) {
        var params = {'sort': list[i]}
        this.$http.get('http://rapapi.org/mockjsdata/33622/rank',params)
          .then(function (e) {
            if (!e.body) return
            if (!e.body.ranklist) return
            this.rankdata[list[i]]=e.body.ranklist
            this.updataSort(this.$store.state.rankFilter.sortBy)
          })
      }
    },
    updataSort: function (n) {
      if (!this.rankdata[n]) return []
      this.ranklist = this.rankdata[n]
      /* 也许有一天会需要这个吧
      if (n === 'nickname') {
        this.ranklist.sort(function (a, b) {
          return ( a.nickname > b.nickname ) ? 1 : ( (a.nickname < b.nickname ) ? -1 : 0 )
        })
        return
      }
      */
      // 在后端完成排序功能前用这个模拟下
      this.ranklist.sort(function (a, b) {
        if(n === 'ratio')
          return - a.solved / a.submit + b.solved / b.submit
        return -a[n] + b[n]
      })
      /* 后端完成后按需传入posx，posy即可 */
      this.chartlist = this.ranklist.map(function (i) {
        if (n === 'ratio') {
          i[n] = (i.solved / i.submit) * 10000
          i[n] = parseInt(i[n]) / 100
        }
        return {nickname: i.nickname, data: i[n], posx: i.posx, posy: i.posy}
      })
      // this.chartlist.sort(() => {return Math.random() > .5 ? -1 : 1})
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getData()
    })
  },
  computed: {
    sortHack: function () {
      return this.$store.getters.rankSortGet
    },
    viewHack: function () {
      return this.$store.getters.rankViewGet
    }
  },
  watch: {
    sortHack: function (n, o) {
      console.log(n)
      this.updataSort(n)
    },
    viewHack: function (n, o) {
      this.viewBy = n
      console.log('view changing')
    }
  },
  components: {
    rankTable,
    rankChart
  }
}
</script>