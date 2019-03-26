<template>
<div>
  <div class="head-wrapper" :class="{'hasScroll': visScrl}">
    <div class="head-container">
      <div class="mainIcon"><img height="50px" src="../../assets/logo_new_whitemode.png" v-on:click="$emit('toHome')">
      </div>
      <ul class="nav navbar-nav">
        <li class="separate"><span></span></li>
        <li :class="{focusing:nowPage==='home'}" v-on:click="$emit('toHome')"><span
          class="glyphicon glyphicon-home"></span>主页
        </li>
        <li :class="{focusing:nowPage==='problems'}" v-on:click="$emit('toProblem')"><span
          class="glyphicon glyphicon-list"></span>题目
        </li>
        <li :class="{focusing:nowPage==='status'}" v-on:click="$emit('toStatus')"><span
          class="glyphicon glyphicon-stats"></span>评测
        </li>
        <li :class="{focusing:nowPage==='contest'}" v-on:click="$emit('toContest')"><span
          class="glyphicon glyphicon-tower"></span>比赛
        </li>
        <!--
        <li :class="{focusing:nowPage==='rank'}" v-on:click="$emit('toRank')"><span
          class="glyphicon glyphicon-signal"></span>排名
        </li>
        -->
        <li :class="{focusing:nowPage==='discuss'}" v-on:click="$emit('toDiscuss')"><span
          class="glyphicon glyphicon-comment"></span>讨论
        </li>
        <li @click="teriri()"><span class="glyphicon glyphicon-expand"></span>视频
        </li>
      </ul>
      <div class="usersBar" :class="{'login-usersBar':userData.isLogin}">
        <div class="field" @click="toggleAnnouncement">
          <a class="slider">公告<img src="../../assets/ic_mail.png"/></a>
        </div>
        <div class="separate"></div>
        <div class="field" :class="{'field-focus':nowPage==='signUp' && userPage!=='login'}"
             v-on:click="$emit('signUp')"
             v-if="userData.isLogin===false">
          <a> 注册<span class="glyphicon glyphicon-user"></span></a>
        </div>
        <div class="field" :class="{'field-focus':userPage==='login'}" v-on:click="$emit('logIn')"
             v-if="userData.isLogin===false" id="loginBtn">
          <a> 登录<span class="glyphicon glyphicon-log-in"></span></a>
        </div>
        <div class="userdetail" v-if="userData.isLogin">
          <img class="img-circle" :src="avatarUrl">
          <dropmenu v-if="userData.isLogin" :userData="userData">
            <li class="nickname">Hi! <span v-if="proAdd"> [管理员] </span><span>{{userData.nickname}}</span></li>
            <li class="hr"><hr></li>
            <!--
            <li class="link forbiden"><a href="#">我收藏的比赛</a></li>
            <li class="hr"><hr></li>
            -->
            <li class="link" v-if="usrLog"><router-link to="/account/setting">个人中心</router-link></li>
            <li class="link" v-if="usrLog"><router-link to="/message">消息中心</router-link></li>
            <li class="link" v-if="proAdd"><router-link to="/admin">管理中心</router-link></li>
            <li class="link" v-if="usrLog"><a href="#" @click="logout()">注销</a></li>
            <li class="hr"><hr></li>
            <li class="lst-login">上次登陆日期 {{new Date(userData.lastLogin).toLocaleDateString()}}</li>
          </dropmenu>
        </div>
      </div>
    </div>
    <!--<div class="slider" @click="toggleAnnouncement"></div>-->
    <div class="head-container" id="loki">
      <slot></slot>
    </div>
  </div>
  <vue-slide-up-down :active="showAnnouncement">
    <div class="announcement" :class="{'hasScroll':isScrolled}">
      {{annoucement}}
    </div>
    <div class="clearfix"></div>
  </vue-slide-up-down>
</div>
</template>

<script>
import dropmenu from './dropmenu.vue'
import isScrolled from '../../scroll'
export default {
  name: 'headBar',
  components: {dropmenu},
  props: {
    nowPage: String,
    userPage: String
  },
  data () {
    return {
      isScrolled,
      showAnnouncement: false,
      userData: {isLogin: false},
      annoucement: '暂无通知'
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
      setTimeout(() => (this.showAnnouncement = !this.showAnnouncement), 200)
    },
    freshUserData () {
      this.userData = this.$store.state.userData
    },
    fetchAnnouncement: function () {
      this.$http.get(window.noPointHost + '/api/message/announcement')
        .then(function (res) {
          if (res.body.code === 0) {
            if (res.body.data[0]) this.annoucement = res.body.data[0].content
          }
        }, err => {})
    },
    logout: function () {
      this.$http.get(this.logoutUrl, {credentials: true})
        .then(function () {
          console.log(this.logoutUrl)
          console.log('注销成功')
          window.location.reload()
        }, function (e) {
          console.log('erro')
          console.log(e)
        })
    },
    teriri: function () {
      window.open('http://acm.nankai.edu.cn/teriri')
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.handleScroll)
      this.freshUserData()
      this.fetchAnnouncement()
    })
  },
  computed: {
    logoutUrl: function () {
      return `${window.noPointHost}/api/u/logout`
    },
    avatarUrl: function () {
      return `${window.noPointHost}/api/avatar/` + this.userData['user_id']
    },
    proAdd: function () {
      return this.$store.getters.proAddGet
    },
    usrLog: function () {
      return this.$store.getters.usrLogGet
    },
    isChage: function () {
      return this.$store.state.userData['user_id']
    },
    visScrl: function () {
      return this.isScrolled || (this.$route.path.indexOf('account') !== -1) || (this.$route.path.indexOf('admin') !== -1)
    }
  },
  watch: {
    isChage: function () {
      console.log('Data change[from headbar]')
      this.freshUserData()
    }
  }
}
</script>

<style lang="less">
#loki {
  border: none;
}

.forbiden {
  cursor: not-allowed;
}

.head-wrapper {
  display: table;
  width: 100%;
  transition: all 0.5s ease;
  box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0);
  padding: 0;
}

.hasScroll {
  box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0.1);
  background-color: white;
  .navbar-nav li.focusing {
    background-color: #f2f7f7;
  }
  .navbar-nav li:hover {
    background-color: #e8f1f2;
  }
}

.head-container {
  width: 100%;
  clear: both;
  display: table;
}

.mainIcon {
  height: 50px;
  float: left;
  margin: 4px 40px 5px 20px;
  cursor: pointer;
}

.navbar-nav {
  height: 100%;
  display: block;
  line-height: 50px;
  float: left;
  margin: 0;
}

.mainIcon img {
  height: 50px;
}

.navbar-nav {
  height: 100%;
  display: block;
  line-height: 50px;
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
  padding: 5px 2rem;
  font-size: 1.5rem;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  transition: all 0.3s ease;
  &.focusing {
    color: #13293d;
    cursor: default;
    pointer-events: none;
  }
  &:hover {
    color: #687683;
  }
  @media screen and (max-width: 920px){
    padding: 5px 1.5rem;
  }
}

.navbar-nav li span{
  margin-right: 5px;
  @media screen and (max-width: 1050px){
    display: none;
  }
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
  margin-top: -10px;
  margin-left: -10px;
  height: 50px;
  width: 50px;
  border: 3px solid #ffffff;
  object-fit: cover;
}

.announcement {
  padding: 2rem 0;
  width: 70%;
  margin: auto;
  margin-bottom: 1em;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);
}
.slider:active {
  transform: scale(1.5);
}
.slider {
  width: 32px;
  height: 32px;
}
</style>
