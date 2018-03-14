<template>
  <div class="head-wrapper" :class="{'add-shadow':isScrolled}">
    <div class="mainIcon"><img height="50px" src="../assets/logo_new_whitemode.png" v-on:click="$emit('toHome')"></div>
    <ul class="nav navbar-nav">
      <li :class="{focusing:nowPage=='Home'}" v-on:click="$emit('toHome')"><span class="glyphicon glyphicon-home"></span>主页</li>
      <li :class="{focusing:nowPage=='Problem'}" v-on:click="$emit('toProblem')"><span class="glyphicon glyphicon-list"></span>题目</li>
      <li :class="{focusing:nowPage=='Status'}" v-on:click="$emit('toStatus')"><span class="glyphicon glyphicon-stats"></span>评测</li>
      <li :class="{focusing:nowPage=='Contest'}" v-on:click="$emit('toContest')"><span class="glyphicon glyphicon-tower"></span>比赛</li>
      <li :class="{focusing:nowPage=='Rank'}" v-on:click="$emit('toRank')"><span class="glyphicon glyphicon-signal"></span>排名</li>
      <li :class="{focusing:nowPage=='Discuss'}" v-on:click="$emit('toDiscuss')"><span class="glyphicon glyphicon-comment"></span>讨论</li>
    </ul>
    <div class="usersBar">
      <div class="field" :class="{'field-focus':userPage=='Signup'}" v-on:click="$emit('signUp')">
        <a> 注册<span class="glyphicon glyphicon-user"></span></a>
      </div>
      <div class="field" :class="{'field-focus':userPage=='Login'}" v-on:click="$emit('logIn')">
        <a> 登录<span class="glyphicon glyphicon-log-in"></span></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headBar',
  props:{
    nowPage: String,
    userPage: String,
  },
  data(){
    return{
      isScrolled: true,
    }
  },
  methods:{
    handleScroll(){
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrolled>0){
        this.isScrolled = true;
      }
      else{
        this.isScrolled = false;
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.handleScroll);
    })
  },
}
</script>

<style>
.head-wrapper{
  display: table;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e8f1f2;
  transition: box-shadow 0.5s ease;
}
.add-shadow{
  box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
}
.mainIcon {
  height: 50px;
  float: left;
  margin: 5px 40px 5px 20px;
  cursor: pointer;
}
.mainIcon img{
  height: 50px;
}
.navbar-nav{
  height: 100%;
  display: block;
  line-height: 50px;
}
.navbar-nav li{
  color: #939da6;
  padding: 5px 1rem;
  font-size: 1.5rem;
  width: 10rem;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  white-space:nowrap;
  transition: all 0.3s ease;
}
.navbar-nav li.focusing{
  background-color: #f2f7f7;
  color: #13293d;
  cursor: default;
  pointer-events: none;
}
.navbar-nav li:hover{
  background-color: #e8f1f2;
  color: #687683;
}
.navbar-nav li span{
  margin-right: 5px;
}


.usersBar{
  float: right;
  padding-right: 20px;
  height: 60px;
}
.usersBar div.field{
  width: 4rem;
  height: 60px;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  margin: 0 5px;
}
.usersBar div.field a{
  line-height: 60px;
  color: #687683;
  position: relative;
  top: -60px;
  transition: top 0.4s ease;
}
.usersBar div.field:hover a , .usersBar div.field-focus a{
  text-decoration: none;
  top: 0;
}
.usersBar div.field a:focus{
  text-decoration: none;
}
.usersBar div.field a span{
  padding: 0 1.1rem;
}
</style>
