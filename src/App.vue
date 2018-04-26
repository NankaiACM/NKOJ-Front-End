<template>
<div id="app">
  <header>
    <head-bar @toHome="localTo('home')" @logIn='changeToLogin' @signUp='changeToSignup'
              @toProblem="localTo('problems')" @toStatus="localTo('status')" @toContest="localTo('contest')"
              @toRank="localTo('ranklist')" @toDiscuss="localTo('discuss')" :nowPage=nowPageF :userPage=userPage>
              <question-filter v-if="this.$route.path === '/problems'"/>
              <status-filter v-if="this.$route.path === '/status'"/>
              <rank-filter v-if="this.$route.path === '/ranklist'"></rank-filter>
    </head-bar>
  </header>
  <section id="main">
    <login-dialog v-if="userPage=='login'" @exit="exitShow" :status="userPage" @changeStatus="changeLogin"></login-dialog>
    <router-view class="com-container"></router-view>
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
export default {
  components: {loginDialog, headBar, questionFilter, statusFilter, rankFilter, componentShell},
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
    nowPageF:function(){
      if(this.nowPage=='')
        return this.$router.currentRoute.fullPath.split("/")[1]
      else
        return this.nowPage
    },
  },
}
</script>

<style lang="less">
@import './less/global.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app header {
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

* {
  padding: 0;
  margin: 0;
  border: none;
}

header {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 1;
}


.com-container {
  width: 100%;
  min-height: 100%;
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
  margin-top: @barheight;
  width: 100%;
  top: 0;
  bottom: 0;
}
</style>
