<template>
<div id="app">
  <header>
    <head-bar @toHome='changeToHome' @logIn='changeToLogin' @signUp='changeToSignup'
              @toProblem="changeToProblems" @toStatus="changeToStatus" @toContest="changeToContest"
              @toRank="changeTo404" @toDiscuss="changeTo404" :nowPage=nowPageF :userPage=userPage>
    </head-bar>
  </header>
  <section id="main">
    <login-page v-if="userPage=='login' || userPage=='signUp'" @exit="exitShow" :status="userPage" @changeStatus="changeLogin"></login-page>
    <router-view class="com-container"></router-view>
  </section>
</div>
</template>

<script>
import loginPage from './components/dialog/loginSignUp'
import signupPage from './components/signupPage'
import headBar from './components/headBar'
export default {
  components: {loginPage, signupPage,headBar},
  name: 'NKOJ',
  data: function () {
    return {
      userPage: 'None',
      loginUserName: 'null',
      nowPage: '',
    }
  },
  methods: {
    changeToProblems: function () {
      this.nowPage='problems'
      this.$router.push({
        path: '/problems'
      })
    },
    changeToHome: function () {
      this.nowPage='home'
      this.$router.push({
        path: '/home'
      })
    },
    changeToStatus: function () {
      this.nowPage='status'
      this.$router.push({
        path: '/status'
      })
    },
    changeToContest: function () {
      this.nowPage='contest'
      this.$router.push({
        path: '/contest'
      })
    },
    changeToDiscuss: function () {
      this.$router.push({
        path: '/discuss'
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
      this.userPage='signUp'
    },
    changeTo404: function () {
      this.nowPage='404'
      this.$router.push({
        path: '/notFound'
      })
    },
    exitShow: function () {
      this.userPage="None"
    },
    changeLogin:function(value){
      this.userPage=value;
    }
  },
  computed:{
    nowPageF:function(){
      if(this.nowPage=='')
        return this.$router.currentRoute.fullPath.split("/")[1]
      else
        return this.nowPage
    }
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
