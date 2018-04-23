<template>
<div>
  <div class="head-wrapper" :class="{'add-shadow':isScrolled}">
    <div class="head-container">
      <div class="mainIcon"><img height="50px" src="../../assets/logo_new_whitemode.png" v-on:click="$emit('toHome')">
      </div>
      <ul class="nav navbar-nav">
        <li class="separate"><span></span></li>
        <li :class="{focusing:nowPage=='home'}" v-on:click="$emit('toHome')"><span
          class="glyphicon glyphicon-home"></span>主页
        </li>
        <li :class="{focusing:nowPage=='problems'}" v-on:click="$emit('toProblem')"><span
          class="glyphicon glyphicon-list"></span>题目
        </li>
        <li :class="{focusing:nowPage=='status'}" v-on:click="$emit('toStatus')"><span
          class="glyphicon glyphicon-stats"></span>评测
        </li>
        <li :class="{focusing:nowPage=='contest'}" v-on:click="$emit('toContest')"><span
          class="glyphicon glyphicon-tower"></span>比赛
        </li>
        <li :class="{focusing:nowPage=='rank'}" v-on:click="$emit('toRank')"><span
          class="glyphicon glyphicon-signal"></span>排名
        </li>
        <li :class="{focusing:nowPage=='discuss'}" v-on:click="$emit('toDiscuss')"><span
          class="glyphicon glyphicon-comment"></span>讨论
        </li>
      </ul>
      <div class="usersBar" :class="{'login-usersBar':userData.isLogin}">
        <div class="separate"></div>
        <div class="field" :class="{'field-focus':nowPage=='signUp' && userPage!=='login'}" v-on:click="$emit('signUp')"
            v-if="userData.isLogin===false">
          <a> 注册<span class="glyphicon glyphicon-user"></span></a>
        </div>
        <div class="field" :class="{'field-focus':userPage=='login'}" v-on:click="$emit('logIn')"  v-if="userData.isLogin===false">
          <a> 登录<span class="glyphicon glyphicon-log-in"></span></a>
        </div>
        <div class="userdetail" v-if="userData.isLogin">
          <img :src="avatarUrl">
          <dropmenu v-if="userData.isLogin" :userData="userData">
            <li class="nickname">Hi! <span>{{userData.nickname}}</span></li>
            <li class="hr"><hr></li>
            <li class="link"><a href="#">我出的题目</a></li>
            <li class="link"><a href="#">我收藏的比赛</a></li>
            <li class="hr"><hr></li>
            <li class="link"><a href="#">用户信息与设置</a></li>
            <li class="link"><a href="#">注销</a></li>
            <li class="hr"><hr></li>
            <li class="lst-login">上次登陆日期 {{new Date(userData.lastLogin).toLocaleDateString()}}</li>
          </dropmenu>
        </div>
      </div>
      <div class="navbar-nav usersBar slider" @click="toggleAnnouncement"></div>
    </div>
    <!--<div class="slider" @click="toggleAnnouncement"></div>-->
    <div class="head-container" id="loki">
      <slot></slot>
    </div>
  </div>
  <vue-slide-up-down :active="showAnnouncement">
    <div class="announcement">
      2017.12.8 我们为它加入了新的语言 Python~ 欢迎尝试<br>
      如果您对 OJ 的进一步开发，包括前端/后台/数据库设计，有兴趣，请联系 sunrisefox@qq.com ~
    </div>
    <div class="clearfix"></div>
  </vue-slide-up-down>
</div>
</template>

<script>
  import dropmenu from './dropmenu.vue'
  export default {
    name: 'headBar',
    components:{dropmenu},
    props: {
      nowPage: String,
      userPage: String,
    },
    data () {
      return {
        isScrolled: false,
        showAnnouncement: false,
        userData: {isLogin:false}
      }
    },
    methods: {
      handleScroll () {
        let scrolled =
          document.documentElement.scrollTop || document.body.scrollTop
        if (scrolled > 0) {
          if (!this.isScrolled) this.isScrolled = true
        } else {
          if (this.isScrolled) this.isScrolled = false
        }
      },
      toggleAnnouncement () {
        setTimeout(() => (this.showAnnouncement = !this.showAnnouncement), 200);
      },
      freshUserData(){
        this.userData=this.$store.state.userData
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.handleScroll)
        this.freshUserData()
      })
    },
    computed:{
      avatarUrl:function(){
        return `${noPointHost}/api/avatar/`+ this.userData.id
      }
    }
  }
</script>

<style>
  .head-wrapper {
    display: table;
    width: 100%;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0);
  }

  .add-shadow {
    box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0.1);
  }

  .head-container {
    width: 100%;
    clear: both;
    display: table;
    background-color: #fff;
    border-bottom: 1px solid #d3dcdc;
  }

  .mainIcon {
    height: 50px;
    float: left;
    margin: 5px 40px 5px 20px;
    cursor: pointer;
  }

  .mainIcon img {
    height: 50px;
  }

  .navbar-nav {
    height: 100%;
    display: block;
    line-height: 50px;
    float: left;
    margin: 0;
  }

  .head-wrapper .separate {
    width: 0;
    margin: 10px 10px;
    padding: 0;
    height: 40px;
    border-left: 1px solid #d3dcdc;
    display: inline-block;
  }

  .navbar-nav li {
    color: #939da6;
    padding: 5px 1rem;
    font-size: 1.5rem;
    width: 10rem;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .navbar-nav li.focusing {
    background-color: #f2f7f7;
    color: #13293d;
    cursor: default;
    pointer-events: none;
  }

  .navbar-nav li:hover {
    background-color: #e8f1f2;
    color: #687683;
  }

  .navbar-nav li span {
    margin-right: 5px;
  }

  .usersBar {
    float: right;
    padding-right: 20px;
    height: 60px;
    display: flex;
  }

  .usersBar div.field {
    width: 4rem;
    height: 60px;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin: 0 5px;
  }

  .usersBar div.field a {
    line-height: 60px;
    color: #687683;
    position: relative;
    top: -60px;
    transition: top 0.4s ease;
  }

  .usersBar .field-focus{
    pointer-events: none;
    cursor: default;
  }
  .usersBar div.field:hover a,
  .usersBar div.field-focus a {
    text-decoration: none;
    top: 0;
  }

  .usersBar div.field a:focus {
    text-decoration: none;
  }

  .usersBar div.field a span {
    padding: 0 1.1rem;
  }

  .login-usersBar{
    padding-right: 10px;
  }
  .userdetail{
    display: flex;
    padding: 15px 20px;
    height: 60px;
    position: relative;
  }
  .userdetail img{
    height: 100%;
    border-radius: 30px;
    border: 3px solid #ffffff;
    transition: border-color 0.3s ease;
  }

  .announcement {
    padding: 2rem 0;
    width: 70%;
    margin: auto;
    margin-bottom: 1em;
    background-color: #fff;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.35);
  }
  .slider:active {
    transform: scale(1.5);
  }
  .slider {width: 64px;background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNjRweCIgaGVpZ2h0PSI2NHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDk3LDI0MWgtNDVjLTguMjg0LDAtMTUsNi43MTYtMTUsMTVzNi43MTYsMTUsMTUsMTVoNDVjOC4yODQsMCwxNS02LjcxNiwxNS0xNVM1MDUuMjg0LDI0MSw0OTcsMjQxeiIgZmlsbD0iIzkzM0VDNSIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQ3Ny42MDcsMzM1LjM5NGwtMzAtMzBjLTUuODU3LTUuODU3LTE1LjM1NS01Ljg1Ny0yMS4yMTMsMGMtNS44NTksNS44NTctNS44NTksMTUuMzU1LDAsMjEuMjEzbDMwLDMwICAgIGM1Ljg1Nyw1Ljg1OCwxNS4zNTYsNS44NTgsMjEuMjEzLDBDNDgzLjQ2NSwzNTAuNzQ5LDQ4My40NjUsMzQxLjI1Miw0NzcuNjA3LDMzNS4zOTR6IiBmaWxsPSIjOTMzRUM1Ii8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNDc3LjYwNiwxNTUuMzk0Yy01Ljg1Ny01Ljg1Ny0xNS4zNTUtNS44NTctMjEuMjEzLDBsLTMwLDMwYy01Ljg1OCw1Ljg1OC01Ljg1OCwxNS4zNTUsMCwyMS4yMTMgICAgYzUuODU4LDUuODU4LDE1LjM1Niw1Ljg1NywyMS4yMTMsMGwzMC0zMEM0ODMuNDY0LDE3MC43NDksNDgzLjQ2NCwxNjEuMjUyLDQ3Ny42MDYsMTU1LjM5NHoiIGZpbGw9IiM5MzNFQzUiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zNDcsNjFjLTIyLjUzMSwwLTQxLjI0NSwxNi42NDUtNDQuNDk3LDM4LjI4NGwtMTMuNjgzLDEzLjY4M0MyNjUuMDA1LDEzNi43ODIsMjI5LjkzMywxNTEsMTk1LDE1MWgtOTAgICAgYy0xOS41NTUsMC0zNi4yMjgsMTIuNTQxLTQyLjQyLDMwSDYwYy0zMy4wODQsMC02MCwyNi45MTYtNjAsNjBzMjYuOTE2LDYwLDYwLDYwaDIuNThjNC41MjcsMTIuNzY0LDE0LjY1NiwyMi44OTMsMjcuNDIsMjcuNDIgICAgVjQwNmMwLDI0LjgxMywyMC4xODgsNDUsNDUuMDAxLDQ1QzE1OS44MTMsNDUxLDE4MCw0MzAuODEzLDE4MCw0MDZ2LTc1aDE1YzM0LjkzMiwwLDcwLjAwNCwxNC4yMTgsOTMuODIsMzguMDMzbDEzLjY4MywxMy42ODMgICAgQzMwNS43NTUsNDA0LjM1NCwzMjQuNDcsNDIxLDM0Ny4wMDEsNDIxQzM3MS44MTMsNDIxLDM5Miw0MDAuODEzLDM5MiwzNzZWMTA2QzM5Miw4MS4xODcsMzcxLjgxMyw2MSwzNDcsNjF6IE02MCwyNzEgICAgYy0xNi41NDIsMC0zMC0xMy40NTgtMzAtMzBzMTMuNDU4LTMwLDMwLTMwVjI3MXogTTE1MCw0MDZjMCw4LjI3MS02LjcyOSwxNS0xNSwxNXMtMTUtNi43MjktMTUtMTV2LTc1aDMwVjQwNnogTTE4MCwzMDFoLTc1ICAgIGMtOC4yNzEsMC0xNS02LjcyOS0xNS0xNXYtOTBjMC04LjI3MSw2LjcyOS0xNSwxNS0xNWg3NVYzMDF6IE0zMDIsMzQwLjM0NmMtMjUuMzQxLTIxLjkzMi01Ny45MjItMzUuNTU5LTkyLjEtMzguNjY2ICAgIGwwLjAwMS0xMjEuMzYxYzM0LjE3Ny0zLjEwNiw2Ni43NTgtMTYuNzMzLDkyLjA5OS0zOC42NjZWMzQwLjM0NnogTTM2MiwzNzZjMCw4LjI3MS02LjcyOSwxNS0xNC45OTksMTVIMzQ3ICAgIGMtOC4yNzEsMC0xNS02LjcyOS0xNS0xNVYxMDZjMC04LjI3MSw2LjcyOS0xNSwxNS4wMDEtMTVjOC4yNywwLDE0Ljk5OSw2LjcyOSwxNC45OTksMTVWMzc2eiIgZmlsbD0iIzkzM0VDNSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)}
</style>
