<template>
<div id="app">
  <header>
    <div>
      <div id="mainIcon"><img height="50px" src="./assets/peng.gif"></div>
      <div id="mainTitle" v-on:click="changeTo404">NKU Online Judge</div>
      <ul class="nav navbar-nav navbar-right" id="headerRight">
        <li><a href="#"><span class="glyphicon glyphicon-user"></span> 注册</a></li>
        <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>
      </ul>
    </div>
  </header>
  <aside>
    <div><img id="userPicture" src="./assets/userPicture.jpg" v-on:click="changeTo404"></div>
    <div id="userName">User: Saurus</div>
    <ul class="nav nav-pills nav-stacked" id="navigation">
      <li id="home" v-on:click="changeToHome"><span class="glyphicon glyphicon-home"></span>主页</li>
      <li id="problems" v-on:click="changeToProblems"><span class="glyphicon glyphicon-list"></span>题目</li>
      <li id="status" v-on:click="changeTo404"><span class="glyphicon glyphicon-stats"></span>评测</li>
      <li id="contest" v-on:click="changeTo404"><span class="glyphicon glyphicon-tower"></span>比赛</li>
      <li id="ranklist" v-on:click="changeTo404"><span class="glyphicon glyphicon-signal"></span>排名</li>
      <li id="discuss" v-on:click="changeTo404"><span class="glyphicon glyphicon-comment"></span>讨论</li>
    </ul>
  </aside>
  <section id="main">
    <router-view></router-view>
  </section>
</div>
</template>

<script>
export default {
  components: {},
  name: 'App',
  data: function() {
    return {}
  },
  methods: {
    changeToProblems: function() {
      this.$router.push({
        path: '/problems'
      })
    },
    changeToHome: function() {
      this.$router.push({
        path: '/home'
      })
    },
    changeTo404: function() {
      this.$router.push({
        path: '/notFound'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#navigation .glyphicon {
  position: relative;
  top: 1px;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  line-height: 1;
  margin-right: 15px;
  -moz-osx-font-smoothing: grayscale;
}
#headerRight{
  margin-right: 5px;
}
#headerRight li a{
  color:white;
  background: none;
}
* {
  padding: 0;
  margin: 0;
  border: none;
}

header {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #16aad8;
  color: #fff;
}

aside {
  width: 150px;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(55, 55, 55);
}

#navigation li {
  padding-top: 12px;
  padding-bottom: 12px;
}

#navigation {
  margin-top: 30px;
}

#problems,
#home,
#status,
#contest,
#ranklist,
#discuss {
  background-size: 30px;
  background-position: 25px;
  background-repeat: no-repeat;
  font-size: 15px;
  vertical-align: middle;
  cursor: pointer;
  color: lightsteelblue;
  font-weight: bold;
}

/*
#problems{
  background-image: url(assets/problemSet.png);
}
#home{
  background-image: url(assets/home.png);
}
#status{
  background-image: url(assets/status.png);
}
#contest{
  background-image: url(assets/contest.png);
}
#ranklist{
  background-image: url(assets/rankList.png);
}
#discuss{
  background-image: url(assets/discuss.png);
}
*/

#problems:hover,
#home:hover,
#status:hover,
#contest:hover,
#ranklist:hover,
#discuss:hover {
  background-color: black;
  color: white;
}

#userPicture {
  height: 110px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 500px;
  cursor: pointer;
}

#userName {
  text-align: center;
  color: lightgray;
  font-weight: bold;
  font-size: 0.9em;
  margin-top: 5px;
}

#mainIcon {
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  float: left;
}

#mainTitle {
  color: white;
  font-size: 30px;
  font-family: "Adobe Arabic";
  padding: 10px 0;
  margin: 0;
  float: left;
  cursor: pointer;
}

#main {
  position: absolute;
  left: 150px;
  top: 50px;
  right: 0;
  bottom: 0;
  overflow: auto;
  background: rgb(230, 230, 230);
}

#con {
  height: 100%;
  background-color: white;
  color: #fff;
  overflow: scroll;
}
</style>
