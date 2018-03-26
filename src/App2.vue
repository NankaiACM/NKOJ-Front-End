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
          <li v-if="userData===undefined"><a class="btn btn-default" @click="userPage='signUp'">注册</a></li>
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
    <div v-if="contestStatus==0">
      <div v-for="(text,index) in navbarItems" :key="text">
      <div class="band-with-80padding" :class="{'bg-gray':index%2==1,'bg-white':index%2==0}">
        <div class="container">
          <!--标题-->
          <h3><span class="glyphicon glyphicon-list"></span>{{text.toUpperCase()}}</h3>
          <div v-html="getMD(MDtext[index])"></div>
        </div>
      </div>

      </div>

      <div class="band-with-80padding" :class="{'bg-gray':navbarItems.length%2==1,'bg-white':navbarItems.length%2==0}">
        <div class="container register-bar">
          <div class="text">已经看完了？或许你会想要……？</div>
          <div class="btn-div">
            <!--a class="btn btn-ghost" @click="userPage='dialog'">反馈或提问</a-->
            <a class="btn btn-ghost" @click="registerAttempt">立刻报名</a>
          </div>
        </div>
      </div>
    </div>

    <!--比赛中的界面-->
    <div v-else-if="contestStatus==1">
      <!--题目板块-->
      <div class="bg-gray band-with-80padding problem-band">
        <!--problem标题-->
        <h3><span class="glyphicon glyphicon-list"></span>PROBLEMS</h3>
        <!--题目列表-->
        <div class="container padding-t-40">
          <ul>
            <li v-for="(problem,index) in problems" :key="problem.id">
              <problem-list :problem-index="index" :problem-name="problem.problemName"
                            :status="problem.status"/>
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
          <status :is-infinite="false" :is-filter="false" :is-btn="true" api-url="/static/status.json"/>
          <div class="view-more"><a>View More<span class="glyphicon glyphicon-chevron-right"></span></a></div>
        </div>
      </div>

      <hr class="cut-off">

      <!--排名板块-->
      <div class="bg-gray band-with-80padding">
        <!--排名标题-->
        <h3><span class=" glyphicon glyphicon-signal"></span>RANK</h3>
        <!--排名列表-->
        <div class="container padding-t-40">
          <ranks/>
          <div class="view-more"><a>View More<span class="glyphicon glyphicon-chevron-right"></span></a></div>
        </div>
      </div>

    </div>

    <saurus-footer></saurus-footer>

    <!--弹出框板块-->
    <login-page v-if="userPage=='login' || userPage=='signUp'" @exit="exitShow" :status="userPage"
                @changeStatus="changeLogin" @userInfo="changeUserInfo">
    </login-page>
    <dialog-wrap v-if="userPage=='dialog'" @exit="exitShow" class="dialog">
      <div class="text">{{dialogMessage}}</div>
    </dialog-wrap>
  </div>
</template>

<script>
import problemList from "./components/contestpage/contestOpenCompenents/problemList.vue";
import status from "./components/statuspage/statusPage.vue";
import ranks from "./components/contestpage/contestRank.vue";
import loginPage from './components/dialog/loginSignUp';
import dialogWrap from "./components/dialog/dialogWrap.vue";
import saurusFooter from './components/footer'
export default {
  name: 'App2',
  components:{
    problemList,
    status,
    ranks,
    loginPage,
    saurusFooter,
    dialogWrap,
  },
  data(){
    return{
      headShowing: false,
      hoverNav:3,
      nowTime: new Date(),
      startTime: "",
      endTime: "",
      contestid: 23,
      contestTitle: "",
      isPadZero: true,
      problems:[
        {
          problemName:'Fantastic Girlfriend And White Album',
          status:0,
        },
        {
          problemName:'Touhou Project',
          status:1,
        },
        {
          problemName:'Osu! ver 2.0',
          status:2,
        },
        {
          problemName:'A Game With Numbers',
          status:0,
        },
        {
          problemName:'Congruence Equation',
          status:0,
        },
        {
          problemName:'Seat Arrangements',
          status:0,
        },
        {
          problemName:'Perfect Number',
          status:2,
        },
      ],
      MDtext: [],
      navbarItems: [],

      userPage:"None",
      userData: undefined,
      dialogMessage: "",
    }
  },
  methods:{
    handleScroll(){
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrolled > 30){
        this.headShowing=true;
      }
      else{
        this.headShowing=false;
      }
      let band = document.querySelectorAll("div.band-with-80padding");
      this.hoverNav=this.navbarItems.length+1;
      for(var i=this.navbarItems.length-1;i>=0;i--){
        if(scrolled > band[i].offsetTop-70) {
          this.hoverNav=i;
          break;
        }
      }
    },
    changeProblemListHeight(){
      let problemList = document.querySelectorAll(".problem-list");
      var maxnum=0;
      for(var i=0;i<problemList.length;i++){
        maxnum = Math.max(maxnum,problemList[i].offsetHeight);
      }
      for(var i=0;i<problemList.length;i++){
        problemList[i].style.cssText = "height:"+maxnum+'px';
      }
    },
    scrollBand(index){
      let band = document.querySelectorAll("div.band-with-80padding");
      Velocity(band[index],"scroll",{ duration:500 ,offset: "-60px", easing: "easeOutQuart"});
    },
    upToTop(){
      Velocity(document.querySelector("body"),"scroll", { duration: 500, easing: "easeOutQuart" })
    },
    exitShow: function () {
      this.userPage="None"
    },
    changeLogin:function(value){
      this.userPage=value;
    },
    initDatas:function(){
      var vue=this;
      vue.$http
          .get(
            `http://${noPointHost}:8000/api/contest/` +
              vue.contestid,
            {
              crossDomain: true,
              xhrFields: { withCredentials: true },
              timeout: "8000",
              cache: true,
              credentials: true
            }
          )
          .then(
            res => {
              let datas=res.body.data;
              vue.startTime=datas.start;
              vue.endTime=datas.end;
              vue.contestTitle=datas.title;
              vue.navbarItems=datas.info;
              vue.MDtext=new Array(vue.navbarItems.length);
              for(let i=0;i<vue.navbarItems.length;i++){
                vue.MDtext[i]="";
                vue.$http.get(`http://${noPointHost}:8000/api/contest/` + this.contestid + '/' + vue.navbarItems[i]).then(res => {
                  vue.MDtext.splice(i, 1, res.body)
                })
              }
            },
            res => {
              //wait to code
              var vue = this;
            }
          )
          .catch(function(response) {
            //wait to code
            var vue = this;
          });
      setInterval(() => {
        vue.nowTime=new Date();
      }, 100);
    },
    initUser:function(){
      var vue=this;
      vue.$http
          .get(
            `http://${noPointHost}:8000/api/user/login/check`,
            {
              crossDomain: true,
              xhrFields: { withCredentials: true },
              timeout: "8000",
              cache: true,
              credentials: true
            }
          )
          .then(
            res => {
              if(res.body.code===0){
                vue.userData = res.body.data;
              }
              else{
                vue.userData = undefined;
              }
            },
            res => {
              //wait to code
              var vue = this;
            }
          )
          .catch(function(response) {
            //wait to code
            var vue = this;
          });
    },
    getMD: function (text) {
      return marked(text, {sanitize : true})
    },
    changeUserInfo:function (info){
      this.initUser();
    },
    registerAttempt: function () {
        var vue=this;
      if(vue.userData===undefined){
        vue.userPage='signUp';
      }
      else{
      vue.$http
          .get(
            `http://${noPointHost}:8000/api/user/contest/register/` + vue.contestid,
            {
              crossDomain: true,
              xhrFields: { withCredentials: true },
              timeout: "8000",
              cache: true,
              credentials: true
            }
          )
          .then(
            res => {
              if(res.body.code===0){
                vue.dialogMessage="注册成功！"
              } else if(res.body.code===3){
                vue.dialogMessage="您已经注册过了"
              } else{
                vue.dialogMessage="操作非法！"
              }
              vue.userPage="dialog";
            },
            res => {
              //wait to code
              var vue = this;
            }
          )
          .catch(function(response) {
            //wait to code
            var vue = this;
          });
      }
    },
    logout: function (event) {
      event.preventDefault()
      this.$http.get(`http://${noPointHost}:8000/api/user/logout`,
      {
        crossDomain: true,
        xhrFields: {withCredentials: true},
        timeout: "8000",
        cache: true,
        credentials: true
      }).then( res => {
          if(res.body.code === 0){
            this.dialogMessage = "注销成功"
            this.userData = undefined
          } else {
            this.dialogMessage = "注销失败"
          }
      }, err => {
        this.dialogMessage = "注销失败"
      })
      this.userPage = 'dialog'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.handleScroll);
      this.initDatas();
      this.initUser();
      this.changeProblemListHeight();
    })
  },
  computed:{
    countDown:function(){
      var targetTime = this.contestStatus==1? this.endTime : this.startTime;
      var msecond = new Date(targetTime).getTime() - new Date(this.nowTime).getTime();   //时间差的毫秒数
      //------------------------------
      //计算出相差天数
      var days=Math.floor(msecond/(24*3600*1000))
      //计算出小时数
      var leave1=msecond%(24*3600*1000)    //计算天数后剩余的毫秒数
      var hours=Math.floor(leave1/(3600*1000))
      //计算相差分钟数
      var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
      var minutes=Math.floor(leave2/(60*1000))
      //计算相差秒数
      var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
      var seconds=Math.floor(leave3/1000)
      if(this.isPadZero){
        days = ('0'+days).substr(-2)
        hours = ('0'+hours).substr(-2)
        minutes = ('0'+minutes).substr(-2)
        seconds = ('0'+seconds).substr(-2)
      }
      return{
        ds:days,
        hrs:hours,
        mins:minutes,
        secs:seconds
      }
    },
    contestStatus:function(){
      if(this.nowTime<this.endTime){
        //end
        return 2;
      } else if(this.nowTime<this.startTime){
        //starting
        return 1;
      } else{
        //waiting for start
        return 0;
      }
    },
    avatarUrl:function(){
      return `http://${noPointHost}:8000/api/avatar/`+ this.userData.user_id
    }
  }
}
</script>

<style>
.bg-blue, .title-box .shader{
    background-color: #1b98e0;
}
.bg-gray{
    background-color: #e8f1f2;
}
.bg-white{
    background-color: #f6f9fa;
}
.band-with-40padding, .padding-t-b-40, .padding-t-40{
    padding-top: 40px;
}
.band-with-40padding, .padding-t-b-40, .padding-b-40{
    padding-bottom: 40px;
}
.band-with-80padding{
    padding-top: 80px;
    padding-bottom: 80px;
}
.padding-t-20{
    padding-top: 20px;
}
.band-with-40padding{
    width: 100%;
}
.first-band{
    padding-top: 110px;
}
.padding-15{
    padding-top: 15px;
    padding-bottom: 15px;
}
.padding-15{
    padding-left: 15px;
    padding-right: 15px;
}
.margin-t-b-40{
    margin-top: 40px;
    margin-bottom: 40px;
}
.margin-l-r-20, .margin-20{
    margin-left: 20px;
    margin-right: 20px;
}
.margin-20{
    margin-top: 20px;
    margin-bottom: 20px;
}
.margin-20-percent{
    margin-left: 20%;
}
.width-80-center{
    width: 80%;
    margin: auto;
}
.width-10{
    width: 10%;
}
.color-white{
    color: #e8f1f2;
}
.hrsize-2{
    border: 1px solid #e8f1f2;
}
.flex-1{
    flex: 1;
}
.setflex{
    display: flex;
}
hr.cut-off{
    margin: 0;
    color: #d3dcdc;
    border-top: 1px solid #d3dcdc;
}




.title-box{
    margin: 8rem 12% 6rem;
    border: 10px solid #e8f1f2;
    overflow: visible;
    padding-left: 6rem;
    padding-right: 6rem;
}
.title-box .shader{
    width: 90%;
    position: relative;
    height: 20px;
    left: 5%;
}
.title-box .shader-top{
    top: -15px;
}
.title-box .shader-bottom{
    bottom: -15px;
}
.title-box div.bg-blue{
    padding: 3rem 0 0.5rem;
    margin-bottom: 10px;
    font-family: "微软雅黑";
}
.title-box h2{
    font-size: 3rem;
    letter-spacing: 0.1rem;
    text-align: center;
    line-height: 1.2em;
    margin-top: 0;
    margin-bottom: 20px;
    padding: 0;
}
.title-box span{
    width: 100%;
    font-size: 2rem;
    letter-spacing: 0.08rem;
    text-align: center;
    display: block;
}





.time-bar .timers{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.time-bar .timer{
    display: inline-block;
}
.timer .bg-white{
    border-radius: 10px;
    height: 8rem;
    width: 8rem;
    font-size: 4rem;
    line-height: 8rem;
    color: #1b98e0;
    vertical-align: bottom;
    margin: 0 20px;
}
.timer .bg-white div{
    text-align: center;
}
.timer .unit{
    color: #e8f1f2;
    font-size: 2rem;
    text-align: center;
    line-height: 2rem;
    width: 100%;
    display: inline-block;
    vertical-align: bottom;
}
.time-bar .word{
    color: #e8f1f2;
    font-size: 2rem;
    position: relative;
    top: 5px;
}






.navbar{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 60px;
    padding-bottom: 60px;
    transition: all 0.5s ease;
    z-index: 1;
    background: #1b98e0;
    border-radius: 0;
}
.show-head{
    background: #13293d;
    padding-top: 10px;
    padding-bottom: 10px;
}
.navbar-brand{
    height: 50px;
    padding: 0px 10px;
    float: left;
}
.navbar-brand img{
    height: 50px;
    display: block;
}
.navbar .navul{
    float: right;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: baseline;
}
.navbar .navul li{
    float: left;
    display: block;
}
.navbar .navul li a{
    margin: 7px 1.5rem;
    line-height: 34px;
    font-weight: 400;
    color: #e8f1f2;
    display: block;
    text-decoration: none;
    cursor: pointer;
    height: 36px;
}
.navbar .navul li a:hover{
    text-decoration: none;
}
.navbar .navul li a::after{
    content: '';
    transition: all 550ms cubic-bezier(.45,1,.32,1);
    width: 100%;
    height: 2px;
    transform: scale(0,1);
    background: #7bbfea;
    display: block;
}
.show-head .navul li a::after{
    background: #87b7cb;
}
.navbar .navul li a:hover::after{
    transform: scale(1,1);
}
.navbar .navul li a.hover::after{
    transform: scale(1,1);
}
.navbar .navul li a.btn{
    padding: 0 3rem;
    position: relative;
    top: -1px;
}
.navbar .navul li a.btn:focus,
.navbar .navul li a.btn:active{
    box-shadow: none;
}
.navbar .navul li a.btn-ghost{
    border: 2px solid #e8f1f2;
    border-color: #e8f1f2;
    background: transparent;
    color: #e8f1f2;
    transition: all 0.3s ease;
}
.navbar .navul li a.btn-ghost:hover{
    border-color: #247ba0;
}
.navbar .navul li a.btn-default{
    border: 2px solid #e8f1f2;
    background: #e8f1f2;
    color: #1b98e0;
    transition: all 0.3s ease;
}
.navbar .navul li a.btn-default:hover{
    background: #247ba0;
    color: #e8f1f2;
    border-color: #247ba0;
}
.navbar .navul li a.btn::after{
    visibility: hidden;
}
.navbar .avatar{
	height: 40px;
	display: flex;
	padding:0 25px;
	align-content: center;
	margin: 5px 0 5px 30px;
    border-left: 1px solid #7bbfea;
    position: relative;
    transition: all 0.5s ease;
}
.show-head .avatar{
    border-color:#87b7cb;
}
.navbar .avatar .text{
    color: #e8f1f2;
    line-height: 40px;
    margin-right: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    max-width: 120px;
    pointer-events: none;
}
.navbar .avatar img{
	height: 34px;
	border-radius: 34px;
	width: 34px;
	border: 2px solid white;
    margin: auto;
}
.navbar .avatar .menu{
    position: absolute;
    width: 200px;
    height: 400px;
    background: white;
    top: -10px;
    left: -1px;
    width: 100%;
    z-index: -1;
    visibility: hidden;
}

.up-to-top{
    position: fixed;
    bottom: 30px;
    right: 10px;
    width: 4rem;
    height: 4rem;
    background: rgba(19, 41, 61, 0.3);
    color: #e8f1f2;
    font-size: 2rem;
    line-height: 4rem;
    text-align: center;
    transition: background 550ms ease;
    cursor: pointer;
}
.up-to-top:hover{
    background: rgba(19, 41, 61, 0.5);
}




.band-with-80padding h3{
    text-align: center;
    color: #87b7cb;
    font-size: 3rem;
    font-weight: 400;
    font-family: "Whitney SSm A", "Whitney SSm B", "Avenir", "Segoe UI", "Ubuntu", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.band-with-80padding h3 span{
    margin-right: 1rem;
    font-size: 2.5rem;
}
.band-with-80padding p,
.band-with-80padding li{
    letter-spacing: 0.08em;
    line-height: 1.5em;
}
.band-with-80padding h4{
    padding: 40px 0 10px;
    font-weight: bold;
    font-size: 1.2em;
}
.band-with-80padding code{
    background: white;
}
.band-title{
    width: 80%;
    margin: auto;
}
.problem-band ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
}
@media (min-width: 992px) {
    .problem-band ul{
        padding: 0 6rem;
    }
}
@media (min-width: 767px) {
    .problem-band ul{
        justify-content: space-between;
    }
}
.problem-band ul li{
    display: block;
    display: flex;
    align-items: stretch;
}
.container .view-more{
    text-align: right;
    margin-top: 3rem;
    font-size: 2rem;
}
.container .view-more a{
    color: #44aae5;
    cursor: pointer;
    display: block;
    float: right;
}

.register-bar .text{
	text-align: center;
	font-size: 1.2em;
	letter-spacing: 0.1em;
	padding: 20px;
}
.register-bar .btn-div{
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: 20px 0;
}
.register-bar .btn-div a.btn-ghost{
    border: 2px solid #87b7cb;
    background: transparent;
    margin: 10px 40px;
    border-radius: 3px;
    width: 200px;
    padding: 10px 0;
    color: #87b7cb;
    transition: all 0.3s ease;
}
.register-bar .btn-div a.btn-ghost:hover,
.register-bar .btn-div a.btn-ghost:active{
    box-shadow: none;
    border: 2px solid #87b7cb;
    background: #87b7cb;
    margin: 10px 40px;
    border-radius: 3px;
    width: 200px;
    padding: 10px 0;
    color: white;
    transition: all 0.3s ease;
}

.dialog div.text{
    padding: 40px 0;
    text-align: center;
}


.footer{
    background: #006494;
    color: #e8f1f2;
    padding: 20px 0;
}
.footer div{
    width: 100%;
    text-align: center;
    line-height: 2rem;
}
.footer div.total{
    font-size: 1rem;
    color: #bec6c7;
}
.footer div.contact a{
    color: #1b98e0;
    cursor: pointer;
}

.avatarDown span{
  background: none;
  color: white;
}
.avatarDown {
  border: none;
  background: none;
  height: 34px;
  border-radius: 34px;
  width: 20px;
  margin: 3px;
  padding: 0px;
  cursor: pointer;
  transition: all 0.3s ease;
}
#avatardown {
  width: 100px;
  min-width: 150px;
}
#avatardown li{
  width: 100%;
  text-align: center;
  display: inline-block;
}
#avatardown li a::after{
  background: transparent;

}
#avatardown li a{
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  height: 30px;
  color: #333;
  white-space: nowrap;
  margin: 10px 0;
}
</style>
