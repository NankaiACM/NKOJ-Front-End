<template>
<div id="app">
  <alex></alex>
  <login-dialog v-if="userPage=='login'" @exit="exitShow" :status="userPage" @changeStatus="changeLogin"></login-dialog>
  <header>
    <!--
    <head-bar @toHome="localTo('home')" @logIn='changeToLogin' @signUp='changeToSignup'
              @toProblem="localTo('problems')" @toStatus="localTo('status')" @toContest="localTo('contest')"
              @toRank="localTo('ranklist')" @toDiscuss="localTo('discuss')" :nowPage=nowPageF :userPage=userPage>
    -->
    <head-bar @toHome="localTo('home')" @logIn='changeToLogin' @signUp='changeToSignup'
              @toProblem="localTo('problems')" @toStatus="localTo('status')" @toContest="localTo('contest')"
              @toDiscuss="localTo('discuss')"
              :nowPage=nowPageF :userPage=userPage>
    <question-filter v-if="this.$route.path === '/problems'" class="abb"></question-filter>
    <status-filter v-if="this.$route.path === '/status'" class="abb"></status-filter>
    <rank-filter v-if="this.$route.path === '/ranklist'" class="abb"></rank-filter>
    </head-bar>
  </header>
  <!--wall-paper></wall-paper-->
  <div class="struct">
    <div :class="xclass">
      <router-view></router-view>
    </div>
    <foot></foot>
  </div>
  <component-shell></component-shell>
  <ver></ver>
  <notify :title="$store.state.notify.title" :message="$store.state.notify.message" :count="$store.state.notify.count"></notify>
</div>
</template>

<script>
import loginDialog from './components/dialog/loginDialog'
import headBar from './components/headbar/headBar'

import questionFilter from './components/problem/questionFilter.vue'
import statusFilter from './components/statuspage/statusFilter.vue'
import rankFilter from './components/ranklist/rankFilter.vue'
import componentShell from './components/shell/mayoi.vue'
import wallPaper from './components/wallpaper/wallpaper.vue'
import alex from './components/wallpaper/alex.vue'
import foot from './components/footer.vue'
import ver from './components/ver/ver.vue'

export default {
  components: {loginDialog, headBar, questionFilter, statusFilter, rankFilter, componentShell, wallPaper, alex, foot, ver},
  name: 'NKOJ',
  data: function () {
    return {
      userPage: 'None',
      loginUserName: 'null',
      nowPage: '',
      userData: undefined
    }
  },
  methods: {
    localTo: function (str) {
      console.info(this.$route.path)
      this.nowPage = str
      this.$router.push({
        path: '/' + str
      })
      console.info(this.$route.path)
    },
    changeTo404: function () {
      this.nowPage = '404'
      this.$router.push({
        path: '/notFound'
      })
    },
    changeToUser: function () {
      this.nowPage = 'User'
      this.$router.push({
        path: '/user/Saurus'
      })
    },
    changeToLogin: function () {
      this.userPage = 'login'
    },
    changeToSignup: function () {
      this.nowPage = 'signUp'
      this.$router.push({path: '/sign_up'})
    },
    exitShow: function () {
      this.userPage = 'None'
    },
    changeLogin: function (value) {
      this.userPage = 'None'
      this.nowPage = value
      this.$router.push({path: '/sign_up'})
    }
  },
  computed: {
    nowPageF: function () {
      if (this.nowPage === '') {
        return this.$router.currentRoute.fullPath.split('/')[1]
      } else {
        return this.nowPage
      }
    },
    xclass: function () {
      var clear = ['/home']
      var xroute = this.$route.path
      var special = clear.indexOf(xroute)
      return {
        'com-container col-md-10 col-md-offset-1': true,
        'xbgc': special + 1
      }
    }
  }
}
</script>

<style lang="less">
@import './less/global.less';

* {
  padding: 0;
  margin: 0;
  border: none;
}
#alex{
  position: fixed;
  top: 0;
  left: 0;
  background: none;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  z-index: -1;
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
  margin-top: @filterheight+10px;
  margin-bottom: 20px;
  background: none;
  padding-top: 2vw;
  padding-bottom: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  &::before{
    background-color: white;
    width: 100%;
    height: 5vw;
    display: block;
    background: linear-gradient(rgba(255, 255, 255, 0),rgba(255, 255, 255, 0.8));
    position: absolute;
    top: -5vw;
    left: 0;
  }
}

.xbgc {
  background: rgba(255,255,255,0.7);
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

.struct{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
