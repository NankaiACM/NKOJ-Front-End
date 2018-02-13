<template>
<div class="container-fluid">
  <div class="row">
    <div id="announcement" class="col-sm-12">
      <h2 align="left">公告</h2>
      <pre id="announcementText" v-text="announcement"></pre>
    </div>
  </div>
  <div class="row">
    <div id="homeContest" class="col-sm-8">
      <h2 align="left">近期比赛</h2>
      <div class="col-sm-6"
           v-for="contest in newContests"
           :key="contest.id"
          >
        <div class="panel panel-info">
          <div class="panel-heading">
            <router-link :to="{path:'contest/'+contest.contestID}">
              {{contest.contestTitle}}
            </router-link>
          </div>
          <div class="panel-body">
            {{contest.contestContent}}
          </div>
        </div>
      </div>
      <img align="left" src="../assets/wtf1.jpg">
    </div>
    <div id="homeProblem" class="col-sm-4">
      <h2 align="left">新增题目</h2>
      <div class="list-group">
        <router-link class="list-group-item"
           v-for="problem in newProblems"
           :key="problem.id"
           :to="{path:'problem/'+problem.problemsID}">
          {{problem.problemsName}}
          <span class="badge">{{problem.problemsRatio}}</span>
        </router-link>
      </div>
      <img align="left" src="../assets/wtf2.jpg">
    </div>
  </div>
  <div class="row">
    <div id="homeDiscuss" class="col-sm-12">
      <h1 align="left">最新讨论</h1>
      <h2 align="left">...........</h2>
      <h2 align="left">...........</h2>
      <img align="left" src="../assets/wtf3.jpg">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'component-home',
  data: function () {
    return {
      announcement: '',
      homeContestList: [],
      newProblems: [],
      newContests: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  methods: {
    initView: function () {
      var _this = this
      this.$http.get('/static/announcement.json').then(function (res) {
        _this.announcement = res.body.data
      })
      this.$http.get('/static/newProblems.json').then(function (res) {
        _this.newProblems = res.body.data
      })
      this.$http.get('/static/newContests.json').then(function (res) {
        _this.newContests = res.body.data
      })
    }
  }
}
</script>

<style>
.container-fluid{
  padding:2em;
  text-align: left;
  min-height:100%;
}
.row{
  display: flex;
}
#announcement{
}
#homeContest{
}
#homeProblem{
}
#homeDiscuss{
}
#announcement,#homeContest,#homeDiscuss,#homeProblem,#homeContestList{
  background: #fff;
  height:auto;
  margin:2em;
  padding:4em;
}
#announcement:hover{
  cursor:pointer;
}
#announcementText{
  padding: 1%;
  font-size: 1.2em;
  text-align: left;
  overflow: auto;
}
</style>
