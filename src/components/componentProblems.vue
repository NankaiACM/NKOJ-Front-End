<template>
<div id="Problems" class="container-fluid" @scroll="handleScroll($event)">
  <h3 class="problem-page-title">题目列表</h3>
  <!--bar-->
  <div class="fat-container container-fluid col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-xs-12">
  <div :class="'question-filter-base '+(dom.attach?'nagi':'')">
    <ul class="row search-bar-control nav nav-pills">
      <li role="presentation" class="col-sm-6">
        <input @keyup.enter="initView" v-model="filter.keywords" type="text" class="form-control" placeholder="IDs,titles,or description">
      </li>
      <li role="presentation" class="dropdown">
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
      <li role="presentation" class="dropdown">
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
      <li role="presentation" class="dropdown">
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
          <router-link :to="{path:'problem/'+problem.problemsID}">
            {{problem.problemsID}}
          </router-link>
        </td>
        <td class="problemTableCol2">
          <router-link :to="{path:'problem/'+problem.problemsID}">
            {{problem.problemsName}}
          </router-link>
        </td>
        <td class="problemTableCol3">
          {{problem.problemsRatio}}
        </td>
      </tr>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
            There is no more problems :( at bottom
        </span>
      </infinite-loading>
    </tbody>
  </table>
</div>
</div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'component-problems',
  data: function() {
    return {
      dom: {
        barviewh: 50,
        attach: false
      },
      filter: {
        difficulty: '',
        status: '',
        keywords: ''
      },
      problemList: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initView()
    })
    this.dom.barviewh = document.querySelector(".problem-page-title").offsetHeight
    this.dom.barviewh += document.querySelector(".question-filter-base").offsetHeight
    console.info(this.dom.barviewh)
  },
  methods: {
    initView: function() {
      this.$http.get(
        '/static/problemsData.json', {
          'keywords': this.filter.keywords,
          'difficulty': this.filter.difficulty,
          'status': this.filter.status
        }).then(function(res) {
        this.problemList = res.body.data
      })
    },
    infiniteHandler: function($state) {
      this.$http.get('/static/problemsData.json').then(function(res) {
        if (!res.body.data.length) {
          $state.complete()
          return -1
        }
        this.problemList = this.problemList.concat(res.body.data)
        $state.loaded()
        console.log(this.problemList.length)
      })
    },
    setDifficulty: function(difficulty) {
      if (difficulty === this.filter.difficulty)
        difficulty = ''
      this.filter.difficulty = difficulty
      this.problemList = []
      this.initView()
    },
    setStatus: function(status) {
      if (status === this.filter.status)
        status = ''
      this.filter.status = status
      this.problemList = []
      this.initView()
    },
    handleScroll: function (event) {
      if (!this.dom.attach&&(event.srcElement.scrollTop > this.dom.barviewh)) {
        this.dom.attach = true
        console.info('attach')
      }
      if (event.srcElement.scrollTop <= this.dom.barviewh) {
        this.dom.attach = false
        console.info('un attach')
      }
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>
<style>
#Problems {
  text-align: left;
  background: none;
  color: #233;
  padding:0;
  min-height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  position: absolute;
  transition: all 1s;
}

.fat-container {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0px 9px 10px 5px #ccc;
}

.problem-page-title {
  padding: .5em 2em;
  margin: 0;
  background: #2cbfec;
  color: #fff;
  font-weight:bolder;
}

.question-filter-base {
  background: #fff;
  padding: 4em 3em 3em 3em;
  transition: padding 1s;
}

.nagi {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 1em 3em;
  box-shadow: 10px 3px 10px 3px #ccc;
}

#Problems td a {
  color: #2c3e50;
  text-decoration: none;
}

#ProblemTable {
  background: #fff;
  padding: 2em;
}

#ProblemTable thead tr th {
  color: #2cbfec;
  font-size: 1.4em;
  font-weight: 600;
  font-family: '微软雅黑';
}

#ProblemTable tbody tr td:first-child {
  padding-left: 3em;
}

#ProblemTable tbody tr td:last-child {
  padding-right: 3em;
}

#ProblemTable td {
  vertical-align: middle;
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
    padding: .5em 2em;
    margin: 0 0 4em 0;
    box-shadow: 0px 3px 10px 3px #ccc;
  }
}
@media (min-width: 768px) {
  .nagi {
    left: 150px;
  }
}
/*
#problemTable{
  width: 100%;
  padding: 20px;
  mso-cellspacing: 2px;
  border: 1px black;
}
td[class$=Col1]{
  width: 5%;
}
td[class$=Col3]{
  width: 8%;
}
td[class^=problemTable]{
  text-align: left;
  font-size: 0.9em;
  padding: 10px;
  cursor: pointer;
  border-width: 1px;
  border-color: black;
  border-radius: 2px;
}
#problemTable th {
  padding:5px 15px 5px 6px;
  background-color: deepskyblue;
  border:1px solid deepskyblue;
  text-align:left;
  color:#fff;
  border-radius: 5px;
}
#problemTable tr:nth-child(odd) {
  background-color: rgb(230, 245, 245)
}
#problemTable tr:nth-child(even) {
  background-color:#fff;
}
#problemRow:hover{
  background-color: lightgray;
}
*/
</style>
