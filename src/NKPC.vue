<template>
  <div id="app2">
    <!--导航栏-->
    <div class="navbar" :class="{'show-head':headShowing}">
      <div class="container">
        <a class="navbar-brand"><img src="./assets/logo.png"></a>
        <!--div>-before end-<br>{{endIn.hrs}}:{{endIn.mins}}:{{endIn.secs}}</div-->
        <ul class="navul">
          <li v-for="(item,index) in navbarItems" :key="item">
            <a :class="{'hover':hoverNav==index}" @click="scrollBand(index)">{{item.toUpperCase()}}</a>
          </li>
          <li v-if="userData===undefined"><a class="btn btn-ghost" @click="userPage='login'">登录</a></li>
          <li v-if="userData===undefined"><router-link to="/sign_up" class="btn btn-default" >注册</router-link></li>
          <li v-if="userData!==undefined">
              <div class="avatar">
                <div class="text">{{userData.nickname}}</div>
                <img :src="avatarUrl">
                <div class="dropdown">
                  <button class="dropdown-toggle avatarDown" type="button"  data-toggle="dropdown">
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-right avatarDownul" id="avatardown" aria-labelledby="dropdownMenu1">
                    <li><a href="#" @click="logout">Logout</a></li>
                  </ul>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>

    <!--回到顶部按钮-->
    <div v-if="headShowing" class="up-to-top" @click="upToTop">
      <span class="glyphicon glyphicon-chevron-up"></span>
    </div>

    <!--标题板块-->
    <div class="bg-blue band-with-40padding first-band">
      <!--标题-->
      <div class="container">
        <div class="title-box">
          <div class="shader shader-top"></div>
          <div class="color-white bg-blue">
            <h2>{{contestTitle}}</h2>
            <span>开始时间： {{new Date(startTime).toLocaleString()}}</span>
          </div>
          <div class="shader shader-bottom"></div>
        </div>
      </div>
      <!--时间-->
      <div class="time-bar container">
        <div class="width-80-center setflex padding-t-20">
          <hr class="color-white hrsize-2 flex-1">
          <div class="color-white margin-l-r-20 word" v-if="contestStatus==1">距比赛结束还有</div>
          <div class="color-white margin-l-r-20 word" v-else-if="contestStatus==0">距比赛开始还有</div>
          <div class="color-white margin-l-r-20 word" v-else-if="contestStatus==2">比赛已结束</div>
          <hr class="color-white hrsize-2 flex-1">
        </div>
        <div class="timers">
          <div class="timer" :class="{'timer-first':countDown.ds!=0}" v-if="countDown.ds!=0">
            <div class="bg-white">
              <div>{{countDown.ds}}</div>
            </div>
            <span class="unit" v-if="countDown.ds!=1">days</span>
            <span class="unit" v-else>day</span>
          </div>
          <div class="timer" :class="{'timer-first':countDown.ds==0}">
            <div class="bg-white">
              <div>{{countDown.hrs}}</div>
            </div>
            <span class="unit" v-if="countDown.hrs!=1">hours</span>
            <span class="unit" v-else>hour</span>
          </div>
          <div class="timer">
            <div class="bg-white">
              <div>{{countDown.mins}}</div>
            </div>
            <span class="unit" v-if="countDown.mins!=1">mins</span>
            <span class="unit" v-else>min</span>
          </div>
          <div class="timer">
            <div class="bg-white">
              <div>{{countDown.secs}}</div>
            </div>
            <span class="unit" v-if="countDown.secs!=1">secs</span>
            <span class="unit" v-else>sec</span>
          </div>
        </div>
      </div>
    </div>

    <!--比赛前的介绍界面-->
    <!--<div v-if="contestStatus==0">-->
    <div>
      <div v-for="(text,index) in MDtext" :key="text">
      <div class="band-with-80padding" :class="{'bg-gray':index%2==1,'bg-white':index%2==0}">
        <div class="container">
          <!--标题-->
          <h3><span class="glyphicon glyphicon-list"></span>{{contestTitle}}</h3>
          <div v-html="getMD(MDtext[index])"></div>
        </div>
      </div>

      </div>
      <!--
      <div class="band-with-80padding" :class="{'bg-gray':navbarItems.length%2==1,'bg-white':navbarItems.length%2==0}">
        <div class="container register-bar">
          <div class="text">已经看完了？或许你会想要……？</div>
          <div class="btn-div">
            <a class="btn btn-ghost" @click="userPage='dialog'">反馈或提问</a>-->
            <!--<a v-if="!iswarning" class="btn btn-ghost" @click="registerAttempt">立刻报名</a>-->
            <!--<a v-if="iswarning" class="btn btn-ghost" @click="pushToPC">前往比赛</a>
          </div>
        </div>
      </div>
      -->
    </div>

    <!--比赛中的界面-->
    <!--<div v-else-if="contestStatus==1">-->
    <div v-if="!iswarning">
      <!--题目板块-->
      <div class="bg-gray band-with-80padding problem-band">
        <!--problem标题-->
        <h3><span class="glyphicon glyphicon-list"></span>PROBLEMS</h3>
        <!--题目列表-->
        <div class="container padding-t-40">
          <ul>
            <li v-for="(problem,index) in problems" :key="index">
              <problem-list :problem-index="index" :problem-name="problem.title"
                            :status="mystatus[index] ? mystatus[index].status : 0" :ac="problem.ac" :all="problem.all" :id="problem.problem_id.toString()"
                            :spj="problem.special_judge ? Boolean(problem.special_judge) : false"
                            :dtj="problem.detail_judge ? Boolean(problem.detail_judge) : false"
                            :url="'/public/nkpc.html#/coding/' + contestid + '/' + problem.problem_id"/>
            </li>
          </ul>
        </div>
      </div>
      <hr class="cut-off">

      <!--提交状态板块-->
      <div class="bg-gray band-with-80padding">
        <!--提交状态标题-->
        <h3><span class="glyphicon glyphicon-stats"></span>STATUS</h3>
        <!--提交状态列表-->
        <div class="container padding-t-40">
          <div class="text">
            <status :status="status"></status>
          </div>
          <div class="view-more"><router-link :to="{path: 'status'}" append>View More<span class="glyphicon glyphicon-chevron-right"></span></router-link></div>
        </div>
      </div>

      <hr class="cut-off">

      <!--排名板块-->
      <div class="bg-gray band-with-80padding rank-gray">
        <!--排名标题-->
        <h3><span class=" glyphicon glyphicon-signal"></span>RANK</h3>
        <!--排名列表-->
        <div class="container padding-t-40">
          <acmrank v-if="rule === 'acm'" :limit="10"/>
          <oirank v-if="rule === 'oi'" :limit="10"/>
          <div class="view-more"><router-link :to="{path: 'rank'}" append>View More<span class="glyphicon glyphicon-chevron-right"></span></router-link></div>
        </div>
      </div>

    </div>

    <saurus-footer></saurus-footer>

    <!--弹出框板块-->
    <login-page v-if="userPage=='login' || userPage=='signUp'" @exit="exitShow" :status="userPage"
                @changeStatus="changeLogin" @userInfo="changeUserInfo">
    </login-page>
    <dialog-wrap v-if="userPage=='dialog'" @exit="exitShow" class="dialog">
      <div class="text">
        <vue-loading type="spin" color="black" :size="{ width: '50px', height: '50px' }" v-if="dialogMessage==''"></vue-loading>
        <div v-else>{{dialogMessage}}</div>
      </div>
    </dialog-wrap>
  </div>
</template>

<script>
import problemList from './components/contest/contestOpenCompenents/problemList.vue'
import status from './components/contest/status.vue'
import acmrank from './components/contest/acmrank.vue'
import oirank from './components/contest/oirank.vue'
import loginPage from './components/dialog/loginDialog'
import dialogWrap from './components/dialog/dialogWrap.vue'
import saurusFooter from './components/footer'
import vueLoading from 'vue-loading-template'
import marked from 'marked'
// const marked = () => import(/* webpackChunkName: "marked" */ 'marked')
import {myStatus, contestStatus as contestStatusFunc, rankList} from './components/contest/virtualApi.js'
import pidorders from './components/contest/pidorders.js'

export default {
  name: 'NKPC',
  components: {
    problemList,
    status,
    acmrank,
    oirank,
    loginPage,
    saurusFooter,
    dialogWrap,
    vueLoading
  },
  props: ['iswarning'],
  data () {
    return {
      statusApi: `${window.noPointHost}/api/status/list`,
      headShowing: false,
      hoverNav: 3,
      nowTime: new Date(),
      startTime: '',
      endTime: '',
      contestid: 23,
      contestTitle: '',
      isPadZero: true,
      problems: [],
      MDtext: [],
      navbarItems: [],
      rule: [],

      userPage: 'None',
      userData: undefined,
      dialogMessage: '',

      status: [],
      tick: [],
      mystatus: []
      // oldstatus: new Set([])
    }
  },
  methods: {
    async test () {
      if (this.userData) await myStatus(this.$http, this.problems)
      // const pc_new_status = await pcStatus(this.$http, this.problems, this.oldstatus, this.startTime, this.endTime)
      const ct_new_status = await contestStatusFunc(this.$http, this.contestid, this.status[0] ? this.status[0]['solution_id'] : 0)
      this.status.concat(ct_new_status)
    },
    async statusUpdata () {
      const new_status = await contestStatusFunc(this.$http, this.contestid, this.status[0] ? this.status[0]['solution_id'] : 0, this.startTime, this.endTime)
      if (new_status) this.status = new_status.concat(this.status)
      this.mystatus = await myStatus(this.$http, this.problems)
    },
    handleScroll () {
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
      if (scrolled > 30) {
        this.headShowing = true
      } else {
        this.headShowing = false
      }
      let band = document.querySelectorAll('div.band-with-80padding')
      this.hoverNav = this.navbarItems.length + 1
      for (var i = this.navbarItems.length - 1; i >= 0; i--) {
        if (scrolled > band[i].offsetTop - 70) {
          this.hoverNav = i
          break
        }
      }
    },
    changeProblemListHeight () {
      let problemList = document.querySelectorAll('.problem-list')
      var maxnum = 0
      for (var i = 0; i < problemList.length; i++) {
        maxnum = Math.max(maxnum, problemList[i].offsetHeight)
      }
      for (var i = 0; i < problemList.length; i++) {
        problemList[i].style.cssText = 'height:' + maxnum + 'px'
      }
    },
    scrollBand (index) {
      let band = document.querySelectorAll('div.band-with-80padding')
      Velocity(band[index], 'scroll', { duration: 500, offset: '-60px', easing: 'easeOutQuart'})
    },
    upToTop () {
      Velocity(document.querySelector('body'), 'scroll', { duration: 500, easing: 'easeOutQuart' })
    },
    exitShow: function () {
      this.userPage = 'None'
    },
    changeLogin: function (value) {
      this.userPage = value
    },
    initDatas: function () {
      const vue = this
      // vue.contestid = vue.$route.params.contestid
      console.log('in initDatas', vue.contestid = vue.$route.params.contestid.toString())
      vue.$http.get(`${noPointHost}/api/contest/${vue.contestid}`)
        .then(function (res) {
          res = res.body.data
          const [f, t] = JSON.parse(res.during)
          vue.startTime = f
          vue.endTime = t
          vue.contestTitle = res.title
          vue.navbarItems = []
          vue.MDtext = new Array(1)
          vue.MDtext[0] = res.description
          vue.rule = res.rule
          vue.problems = res.problems.sort(function (l, r) {
            return l.problem_id - r.problem_id
          })
          if (pidorders[vue.contestid]) {
            let mp = pidorders[vue.contestid]
            vue.problems = res.problems.sort(function (l, r) {
              return (mp[l.problem_id].charCodeAt() || 0) - (mp[r.problem_id].charCodeAt() || 0)
            })
          }
        })
      setInterval(() => vue.nowTime = new Date(), 1000)
      /*
      vue.$http
        .get(
          `${noPointHost}/api/contest/` +
              vue.contestid,
          {
            crossDomain: true,
            xhrFields: { withCredentials: true },
            timeout: '8000',
            cache: true,
            credentials: true
          }
        )
        .then(
          res => {
            let datas = res.body.data
            vue.startTime = datas.start
            vue.endTime = datas.end
            vue.contestTitle = datas.title
            vue.navbarItems = datas.info
            vue.MDtext = new Array(vue.navbarItems.length)
            for (let i = 0; i < vue.navbarItems.length; i++) {
              vue.MDtext[i] = ''
              vue.$http.get(`${noPointHost}/api/contest/` + this.contestid + '/' + vue.navbarItems[i]).then(res => {
                vue.MDtext.splice(i, 1, res.body)
              })
            }
          },
          res => {
            // wait to code
            var vue = this
          }
        )
        .catch(function (response) {
          // wait to code
          var vue = this
        })
      setInterval(() => {
        vue.nowTime = new Date()
      }, 100)
      }*/
    },
    initUser: function () {
      var vue = this
      vue.$http
        .get(
          `${noPointHost}/api/user`,
          {
            crossDomain: true,
            xhrFields: { withCredentials: true },
            timeout: '8000',
            cache: true,
            credentials: true
          }
        )
        .then(
          res => {
            if (res.body.code === 0) {
              vue.userData = res.body.data
            } else {
              vue.userData = undefined
            }
          },
          res => {
            // wait to code
            var vue = this
          }
        )
        .catch(function (response) {
          // wait to code
          var vue = this
        })
    },
    getMD: function (text) {
      return marked(text, {sanitize: true})
    },
    changeUserInfo: function (info) {
      this.initUser()
    },
    registerAttempt: function () {
      var vue = this
      if (vue.userData === undefined) {
        vue.userPage = 'signUp'
      } else {
        vue.dialogMessage = ''
        vue.userPage = 'dialog'
        vue.$http
          .get(
            `${noPointHost}/api/user/contest/register/` + vue.contestid,
            {
              crossDomain: true,
              xhrFields: { withCredentials: true },
              timeout: '8000',
              cache: true,
              credentials: true
            }
          )
          .then(
            res => {
              if (res.body.code === 0) {
                vue.dialogMessage = '报名成功！'
              } else if (res.body.code === 3) {
                vue.dialogMessage = '您已经报名过了'
              } else {
                vue.dialogMessage = '操作非法！'
              }
            },
            res => {
              // wait to code
              var vue = this
            }
          )
          .catch(function (response) {
            // wait to code
            var vue = this
          })
      }
    },
    logout: function (event) {
      event.preventDefault()
      this.dialogMessage = ''
      this.userPage = 'dialog'
      this.$http.get(`${noPointHost}/api/user/logout`,
        {
          crossDomain: true,
          xhrFields: {withCredentials: true},
          timeout: '8000',
          cache: true,
          credentials: true
        }).then(res => {
        if (res.body.code === 0) {
          this.dialogMessage = '注销成功'
          this.userData = undefined
        } else {
          this.dialogMessage = '注销失败'
        }
      }, err => {
        this.dialogMessage = '注销失败'
      })
    },
    dealWarning: function () {
      if (this.iswarning !== true) return true
      return false
    },
    pushToPC: function () {
      this.$router.push('/contest')
    }
  },
  mounted: function () {
    // this.$nextTick(function () {
    console.log('warning', this.dealWarning())
    window.addEventListener('scroll', this.handleScroll)
    this.initDatas()
    this.initUser()
    this.changeProblemListHeight()
    this.statusUpdata()
    this.tick.push(setInterval(this.statusUpdata, 4000))
    // })
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.handleScroll)
    for (let it of this.tick) window.clearInterval(it)
  },
  computed: {
    countDown: function () {
      // console.log(contestStatus)
      if (this.contestStatus == 2) {
        return {
          ds: 0,
          hrs: 0,
          mins: 0,
          secs: 0
        }
      }
      var targetTime = this.contestStatus == 1 ? this.endTime : this.startTime
      var msecond = new Date(targetTime).getTime() - new Date(this.nowTime).getTime() // 时间差的毫秒数
      // ------------------------------
      // 计算出相差天数
      var days = Math.floor(msecond / (24 * 3600 * 1000))
      // 计算出小时数
      var leave1 = msecond % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      var seconds = Math.floor(leave3 / 1000)
      if (this.isPadZero) {
        days = ('0' + days).substr(-2)
        hours = ('0' + hours).substr(-2)
        minutes = ('0' + minutes).substr(-2)
        seconds = ('0' + seconds).substr(-2)
      }
      return {
        ds: days,
        hrs: hours,
        mins: minutes,
        secs: seconds
      }
    },
    contestStatus: function () {
      if (new Date(this.nowTime).getTime() > new Date(this.endTime).getTime()) {
        // end
        return 2
      } else if (new Date(this.nowTime) > new Date(this.startTime).getTime()) {
        // starting
        return 1
      } else {
        // waiting for start
        return 0
      }
    },
    avatarUrl: function () {
      return `${noPointHost}/api/avatar/` + this.userData.user_id
    }
  }
}
</script>

<style lang="less" scoped>
@import './components/contest/NKPC.less';
</style>
