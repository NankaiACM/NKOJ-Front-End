<template>
<div id="app">
  <header>
    <head-bar @toHome="localTo('home')" @logIn='changeToLogin' @signUp='changeToSignup'
              @toProblem="localTo('problems')" @toStatus="localTo('status')" @toContest="localTo('contest')"
              @toRank="localTo('ranklist')" @toDiscuss="localTo('discuss')" :nowPage=nowPageF :userPage=userPage>
              <question-filter v-if="this.$route.path === '/problems'" class="abb"></question-filter>
              <status-filter v-if="this.$route.path === '/status'" class="abb"></status-filter>
              <rank-filter v-if="this.$route.path === '/ranklist'" class="abb"></rank-filter>
    </head-bar>
  </header>
  <!--wall-paper></wall-paper-->
  <section id="main" class="container-fluid">
    <login-dialog v-if="userPage=='login'" @exit="exitShow" :status="userPage" @changeStatus="changeLogin"></login-dialog>
    <router-view :class="xclass" ></router-view>
  </section>
  <component-shell></component-shell>
</div>
</template>

<script>
import loginDialog from './components/dialog/loginDialog'
import headBar from './components/headbar/headBar'

import questionFilter from './components/problemslistpage/questionFilter.vue'
import statusFilter from './components/statuspage/statusFilter.vue'
import rankFilter from './components/ranklist/rankFilter.vue'
import componentShell from './components/shell/mayoi.vue'
import wallPaper from './components/wallpaper/wallpaper.vue'

export default {
  components: {loginDialog, headBar, questionFilter, statusFilter, rankFilter, componentShell, wallPaper},
  name: 'NKOJ',
  data: function () {
    return {
      userPage: 'None',
      loginUserName: 'null',
      nowPage: '',
      userData:undefined,
    }
  },
  methods: {
    localTo: function (str) {
      console.info(this.$route.path)
      this.nowPage = str
      this.$router.push({
        path: '/'+str
      })
      console.info(this.$route.path)
    },
    changeTo404: function () {
      this.nowPage='404'
      this.$router.push({
        path: '/notFound'
      })
    },
    changeToUser: function () {
      this.nowPage='User'
      this.$router.push({
        path: '/user/Saurus'
      })
    },
    changeToLogin: function () {
      this.userPage='login'
    },
    changeToSignup: function () {
      this.nowPage='signUp'
      this.$router.push({path: '/sign_up'});
    },
    exitShow: function () {
      this.userPage="None";
    },
    changeLogin:function(value){
      this.userPage="None";
      this.nowPage=value;
      this.$router.push({path: '/sign_up'});
    },
  },
  computed:{
    nowPageF: function () {
      if(this.nowPage=='')
        return this.$router.currentRoute.fullPath.split("/")[1]
      else
        return this.nowPage
    },
    xclass: function () {
      var clear = ['/home', '/contest']
      var xroute = this.$route.path
      var special = clear.indexOf(xroute)
      special = false //special + 1
      return {
        'com-container col-md-10 col-md-offset-1': ! special,
        'xclear': special
      }
    }
  },
}
</script>

<style lang="less">
@import './less/global.less';

* {
  padding: 0;
  margin: 0;
  border: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center; ぱが！
  color: #2c3e50;
}

#app header {
  text-align: center;
  transform: translateZ(99px);
  z-index: 3;
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

header {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 1;
}

.abb {
  border-bottom: 1px solid #d3dcdc;
}

.com-container {
  min-height: 100%;
  height: 100%;
  margin-top: @filterheight;
  margin-bottom: @fat-container-margin-top;
  background-color: rgba(255,255,255,0.5);
}

.xclear {
  width: 100%;
  margin: 0;
  padding: 0;
}

#head-filter {
  clear: both;
  width:100%;
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

#main {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
