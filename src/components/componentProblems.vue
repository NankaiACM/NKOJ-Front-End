<template>
<div id="Problems" class="container-fluid">
  <!--bar-->
  <div class="question-filter-base">
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
  <table id="problemTable" class="table table-hover">
    <caption>problems</caption>
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
        <td class="problem-status"></td>
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
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'component-problems',
  data: function() {
    return {
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
  background: #fff;
  padding: 2em 4em;
  min-height: 100%;
}

#Problems td a {
  color: #2c3e50;
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
