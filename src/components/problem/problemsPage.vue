<template>
<div id="Problems" class="container-fulid">
  <div class="fat-container container-fluid">
  <table id="ProblemTable" class="table table-hover">
    <thead class="thread-height">
      <tr>
        <th class="problem-status"></th>
        <th class="problemTableHeaderCol1">编号</th>
        <th class="problemTableHeaderCol2">题目名称</th>
        <th class="problemTableHeaderCol3">通过率</th>
      </tr>
    </thead>
    <tbody>
      <tr id="problemRow" v-for="problem in problemList" v-bind:key="problem.id">
        <td class="problem-status">
          <i
            :class="{
              'glyphicon':true,
              'glyphicon-star-empty':true,
              'pro-status-star':problem.isStar
            }">
          </i>
          <i
            :class="{
              'glyphicon':true,
              'glyphicon-minus-sign':problem.state==='none',
              'glyphicon-refresh':problem.state==='on',
              'glyphicon-ok':problem.state==='ac'
            }">
          </i>
        </td>
        <td class="problemTableCol1">
          <router-link :to="{path:'problem/'+problem.problem_id}">
            {{problem.problem_id}}
          </router-link>
        </td>
        <td class="problemTableCol2">
          <router-link :to="{path:'problem/'+problem.problem_id}">
            {{problem.title}}
          </router-link>
        </td>
        <td class="problemTableCol3">
          {{problem.ac}} / {{problem.all}}
        </td>
      </tr>
    </tbody>
  </table>
  <problems-pagination @viewingleap="handleViewing" :pagesize="this.pageSize" :last="this.total"></problems-pagination>
</div>
</div>
</template>
<script>
import ProblemsPagination from './pagination.vue'
import questionFilter from './questionFilter.vue'
export default {
  name: 'component-problems',
  props: ['user_pros_msg'],
  data: function () {
    return {
      filter: [],
      rawList: [],
      problemList: [],
      starlist: [],
      aclist: [],
      onlist: [],
      pageSize: 20,
      queryleft: 0,
      queryright: 50,
      viewing: 1, // >=1
      total: 1
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.filter = this.$store.state.filter
      this.initView()
    })
  },
  methods: {
    initView: function () {
      console.log(this.queryright)
      this.$http.get(`${window.noPointHost}/api/problems/list/${this.queryleft}/${this.queryright}`)
        .then(function (res) {
          this.rawList = res.body.data.list
          this.total = res.body.data.served
          this.raw2listrender()
        })
    },
    stateAstarRender: function (tmp) {
      for (let x in tmp) {
        if (!tmp.hasOwnProperty(x)) continue
        let item = tmp[x]
        tmp[x].isStar = false
        tmp[x].state = 'none'
        if (this.starlist.indexOf(item.problem_id) !== -1) {
          tmp[x].isStar = true
        }
        if (this.aclist.indexOf(item.problem_id) !== -1) {
          item[x].state = 'ac'
        }
        else if (this.onlist.indexOf(item.problem_id) !== -1) {
          item[x].state = 'on'
        }
      }
      return tmp
    },
    raw2listrender: function () {
      let left = (this.viewing - 1) * this.pageSize
      if (left > this.total) left = this.total
      else if (left < 0) left = 0
      let right = this.viewing * this.pageSize
      if (right > this.total) right = this.total
      else if (right < 0) right = 0
      const tmp = this.rawList.slice(left, right)
      this.problemList = this.stateAstarRender(tmp)
      console.log(tmp)
    },
    handleViewing: function (newv) {
      console.info(newv.viewing)
      this.viewing = newv.viewing
      this.raw2listrender()
    }
  },
  watch: {
    user_pros_msg: function (newv, oldv) {
      this.starlist = newv.star
      this.aclist = newv.ac
      this.onlist = newv.on
    },
    'this.$store.state.filter': {
      deep: true,
      handler: function (n, o) {
        this.filter = n
        // this.problemList = []
        // this.initView()
      }
    }
  },
  components: {
    ProblemsPagination,
    questionFilter
  }
}
</script>
<style lang="less">
@import '../../less/global.less';

#Problems {
  background: rgba(255, 255, 255, 0.7);
  color: #233;
  padding:0;
  transition: all 1s;
  margin-top: @filterheight;
}

#Problems td a {
  color: #2c3e50;
  text-decoration: none;
}

#ProblemTable {
  padding: 2em;
  border-bottom: 1px solid #e5e9ef;
  margin-bottom: 1em;
}

#ProblemTable thead tr th {
  font-size: 1.4em;
  text-align: left;
}

#ProblemTable tbody tr td:first-child {
  padding-left: 3em;
}

#ProblemTable tbody tr td:last-child {
  padding-right: 3em;
}

#ProblemTable td {
  vertical-align: middle;
  border: 0;
}

#ProblemTable tr {
  transition: all 1s;
}

tbody .problem-status {
  width: 2rem;
  height: 4rem;
}

.problem-status i {
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  color: #b1b1b1;
  margin: 0;
  padding: 0;
  transition: color .5s;
  cursor: pointer;
}

.problem-status i:hover {
  color: #8b8b8b;
}

.problem-status i.pro-status-star {
  color: orange;
}

.problem-status i.glyphicon-refresh {
  color: #6cf;
}

.problem-status i.glyphicon-ok {
  color: #63c163;
}

@media (min-width: 992px) {
  .problem-page-title {
  }
}
@media (min-width: 768px) {
  .nagi {
  }
}
</style>
