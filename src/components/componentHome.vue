<template>
<div>
  <div id="announcement">
    <h1 align="left">公告</h1>
    <pre id="announcementText" v-text="announcement"></pre>
  </div>
  <div id="homeContest">
    <h1 align="left">近期比赛</h1>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <img align="left" src="../assets/wtf1.jpg">
  </div>
  <div id="homeProblem">
    <h1 align="left">新增题目</h1>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <img align="left" src="../assets/wtf2.jpg">
  </div>
  <div id="homeDiscuss">
    <h1 align="left">最新讨论</h1>
    <h2 align="left">...........</h2>
    <h2 align="left">...........</h2>
    <img align="left" src="../assets/wtf3.jpg">
  </div>
</div>
</template>

<script>
export default {
  name: 'component-home',
  data: function () {
    return {
      announcement: '',
      homeContestList: []
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
        console.log(_this.problemList)
      })
    }
  }
}
</script>

<style>
#announcement{
  width: 90%;
  height: 100px;
  background: linear-gradient(to right, white, white 75%, #16aad8);
  margin-top: 20px;
  margin-left: 4%;
  margin-right: 4%;
  padding: 1%;
  border-radius: 25px;
}
#homeContest{
  width: 60%;
  height: 300px;
  background: linear-gradient(45deg, white, white 85%, #16aad8);
  margin-top: 20px;
  margin-left: 4%;
  padding: 1%;
  border-radius: 15px;
  float: left;
}
#homeProblem{
  width: 27%;
  height: 300px;
  background: linear-gradient(45deg, white, white 80%, #16aad8);
  margin-top: 20px;
  margin-left: 1%;
  margin-right: 4%;
  padding: 1%;
  border-radius: 15px;
  float: left;
}
#homeDiscuss{
  width: 90%;
  height: 300px;
  background: linear-gradient(45deg, white, white 80%, #16aad8);
  margin-top: 20px;
  margin-left: 4%;
  margin-right: 4%;
  padding: 1%;
  border-radius: 25px;
  float:left;
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
