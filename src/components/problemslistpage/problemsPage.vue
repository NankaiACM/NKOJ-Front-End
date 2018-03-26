<template>
<div id="Problems" class="container">
  <!--bar-->

  <div class="question-filter-base container-fluid">
    <ul class="search-bar-control nav nav-pills">
      <li role="presentation" class="col-sm-6">
        <input @keyup.enter="initView" v-model="filter.keywords" type="text" class="form-control" placeholder="IDs,titles,or description">
      </li>
      <li role="presentation" class="dropdown navbar-right">
        <a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          Difficulty
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a @click="setDifficulty('弱虫')" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.difficulty==='弱虫'"></span>
            弱虫
          </a></li>
          <li><a @click="setDifficulty('大角虫')" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.difficulty==='大角虫'"></span>
            大角虫
          </a></li>
          <li><a @click="setDifficulty('王虫')" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.difficulty==='王虫'"></span>
            王虫
          </a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{filter.difficulty}}</a></li>
        </ul>
      </li>
      <li role="presentation" class="dropdown navbar-right">
        <a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          Status
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a @click="setStatus('todo')" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.status==='todo'"></span>
            Todo
          </a></li>
          <li><a @click="setStatus('solved')" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.status==='solved'"></span>
            Solved
          </a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{filter.status}}</a></li>
        </ul>
      </li>
      <li role="presentation" class="dropdown navbar-right">
        <a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          Tags
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a>todo</a></li>
          <li><a>todo</a></li>
          <li><a>todo</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <!---->
  <div class="fat-container container-fluid col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-xs-12">
  <table id="ProblemTable" class="table table-hover">
    <thead>
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
  <problems-pagination @viewingleap="handleViewing"></problems-pagination>
</div>
</div>
</template>
<script>
import ProblemsPagination from './pagination.vue'
export default {
  name: 'component-problems',
  props: ['user_pros_msg'],
  data: function() {
    return {
      filter: {
        difficulty: '',
        status: '',
        keywords: ''
      },
      problemList: [],
      starlist: [],
      aclist: [],
      onlist: [],
      pageSize: 20,
      queryleft: 1001,
      queryright: 10020,
      viewing: 1
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      console.info('ping!')
      this.initView()
    })
  },
  methods: {
    initView: function () {
      this.$http.post(
        `http://${window.noPointHost}:8000/api/problems/list`, {
          'keywords': this.filter.keywords,
          'difficulty': this.filter.difficulty,
          'status': this.filter.status,
          'queryleft': this.queryleft,
          'queryright': this.queryright
        }).then(function(res) {
          console.log(res.body.data)
          var tmp = res.body.data
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
          this.problemList = tmp
      })
    },
    setDifficulty: function (difficulty) {
      if (difficulty === this.filter.difficulty)
        difficulty = ''
      this.filter.difficulty = difficulty
      this.problemList = []
      this.initView()
    },
    setStatus: function (status) {
      if (status === this.filter.status)
        status = ''
      this.filter.status = status
      this.problemList = []
      this.initView()
    },
    handleViewing: function (newv) {
      this.viewing = newv.viewing
      this.queryleft = (newv.viewing - 1) * this.pageSize + 1 +1000
      this.queryright = this.queryleft + this.pageSize - 1
      this.initView()
    }
  },
  watch: {
    user_pros_msg : function (newv,oldv) {
      this.starlist = newv.star
      this.aclist = newv.ac
      this.onlist = newv.on
    }
  },
  components: {
    ProblemsPagination
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
  border: 1px solid #e8f1f2;
  margin-top: @barheight+@fat-container-margin-top;
  margin-bottom: @barheight+@fat-container-margin-top;
}

.question-filter-base {
  position: fixed;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  top: @barheight;
  height: @filterheight;
  z-index: 1;
  background: #fff;
  border-bottom: 1px solid #e8f1f2;
}

.search-bar-control {
  width: 100%;
}

.search-bar-control input.form-control {
  border: none;
  box-shadow: none;
  border-radius: 0;
  transition: all 1s;
}

.search-bar-control input.form-control:focus,
.search-bar-control input.form-control:active {
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
  color: #2cbfec;
  font-size: 1.4em;
  font-weight: 300;
  font-family: '微软雅黑';
  border: 0;
  height: 6rem;
  text-align: center;
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
