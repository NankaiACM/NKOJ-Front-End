<template>
  <div id="app">
    <header>
      <div>
        <div id="mainIcon"><img height="50px" src="./assets/peng.gif"></div>
        <div id="mainTitle" v-on:click="changeTo404">NKU Online Judge</div>
      </div>
    </header>
    <aside>
      <div><img id="userPicture" src="./assets/userPicture.jpg" v-on:click="changeTo404"></div>
      <div id="userName">User: Saurus</div>
      <ul id="navigation">
        <li id="problems" v-on:click="changeToProblems">Problems</li>
        <li id="home" v-on:click="changeTo404">Home</li>
        <li id="status" v-on:click="changeTo404">Status</li>
        <li id="contest" v-on:click="changeTo404">Contest</li>
        <li id="ranklist" v-on:click="changeTo404">RankList</li>
        <li id="discuss" v-on:click="changeTo404">Discuss</li>
      </ul>
    </aside>
    <section id="main">
      <component :is="changeTest"></component>
    </section>
  </div>
</template>

<script>
import componentA from './components/componentA'
import componentB from './components/componentB'
export default {
  components: {componentA},
  name: 'App',
  data: function () {
    return {
      changeTest: componentA
    }
  },
  methods: {
    changeToProblems: function () {
      this.changeTest = componentA
    },
    changeTo404: function () {
      this.changeTest = componentB
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
*{
   padding:0;
   margin:0;
   border:none;
}
header{
  width:100%;
  height:50px;
  position:absolute;
  top:0;
  left:0;
  right:0;
  background-color: #16aad8;
  color:#fff;
}
aside{
  width:150px;
  position:absolute;
  top:50px;
  left:0;
  right:0;
  bottom:0;
  background: #5c5c5c;
}
ul li{
  padding: 12px 0;
}
#navigation{
  margin-top: 30px;
  list-style: none;
}
#problems, #home, #status, #contest, #ranklist, #discuss{
  background-size: 30px;
  background-position: 10px;
  background-repeat: no-repeat;
  padding-left: 50px;
  font-size: 15px;
  vertical-align: center;
  cursor: pointer;
  color: lightsteelblue;
  font-weight: bold;
}
#problems{
  background-image: url(assets/problemset.png);
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
#problems:hover, #home:hover, #status:hover, #contest:hover, #ranklist:hover, #discuss:hover{
  background-color: black;
}
#userPicture{
  height: 130px;
  margin-left:  10px;
  margin-right:  10px;
  margin-top:  20px;
  border-radius: 500px;
  cursor: pointer;
}
#userName{
  text-align: center;
  color: lightgray;
  font-weight: bold;
  margin-top: 5px;
}
#mainIcon{
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  float: left;
}
#mainTitle{
  color: white;
  font-size: 30px;
  font-family: "Adobe Arabic";
  padding: 10px 0;
  margin: 0;
  float: left;
  cursor: pointer;
}
#main{
  position: absolute;
  left: 150px;
  top: 50px;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
#con{
  height:100%;
  overflow:auto;
  background-color:white;
  color:#fff;
  overflow: scroll;
}
</style>
