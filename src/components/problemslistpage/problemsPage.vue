<template>
<div id="Problems" class="container">
  <div class="fat-container container-fluid col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-xs-12">
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
          {{problem.submit_ac}} / {{problem.submit_all}}
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
import Vue from 'vue'
export default {
  name: 'component-problems',
  props: ['user_pros_msg'],
  data: function() {
    return {
      filter: [],
      rawList: [],
      problemList: [],
      starlist: [],
      aclist: [],
      onlist: [],
      pageSize: 20,
      queryleft: 1,
      queryright: 150,
      viewing: 1,//>=1
      total: 1
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.filter = this.$store.state.filter
      this.initView()
    })
  },
  methods: {
    initView: function () {
      console.log(this.queryright)
      this.$http.get(`${window.noPointHost}/api/problems/list?l=${this.queryleft}&r=${this.queryright}`)
        .then(function(res) {
          this.rawList = res.body.data.list
          this.total = res.body.data.served
          this.raw2listrender()
        })
    },
    stateAstarRender: function (tmp) {
      for(var x in tmp){
        var item = tmp[x]
        tmp[x].isStar = false
        tmp[x].state = 'none'
        if(this.starlist.indexOf(item.problem_id) !== -1){
          tmp[x].isStar = true
        }
        if(this.aclist.indexOf(item.problem_id) !== -1){
          item[x].state = 'ac'
        }
        if(this.onlist.indexOf(item.problem_id) !== -1){
          item[x].state = 'on'
        }
      }
      return tmp
    },
    raw2listrender: function () {
      var left = (this.viewing - 1) * this.pageSize + 1
      if (left > this.total) left = this.tatal
      if (left < 1) left = 1
      var right = (this.viewing + 0) * this.pageSize
      if (right > this.tatal) right = this.tatal
      if (right < 1) right = 1
      var tmp = this.rawList.slice(left - 1, right)
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
    user_pros_msg : function (newv, oldv) {
      this.starlist = newv.star
      this.aclist = newv.ac
      this.onlist = newv.on
    },
    'this.$store.state.filter': {
      deep: true,
      handler: function (n, o) {
        this.filter = n
        //this.problemList = []
        //this.initView()
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
  background: none;
  color: #233;
  padding:0;
  min-height: 100%;
  transition: all 1s;
}

.fat-container {
  background: #fff;
  border-radius: 2px;
  border: 2px solid #e8f1f2;
  margin-top: @barheight+@fat-container-margin-top+@filterheight;
  margin-bottom: @barheight+@fat-container-margin-top;
}

#Problems td a {
  color: #2c3e50;
  text-decoration: none;
}

#ProblemTable {
  background: #fff;
  padding: 2em;
  border-bottom: 1px solid #e5e9ef;
  margin-bottom: 1em;
}

#ProblemTable thead tr th {
  font-size: 1.4em;
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
