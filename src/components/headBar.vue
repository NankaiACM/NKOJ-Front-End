<template>
  <div class="head-wrapper" :class="{'add-shadow':isScrolled}">
    <div class="head-container">
      <div class="mainIcon"><img height="50px" src="../assets/logo_new_whitemode.png" v-on:click="$emit('toHome')"></div>
      <ul class="nav navbar-nav">
        <li class="separate"><span></span></li>
        <li :class="{focusing:nowPage=='home'}" v-on:click="$emit('toHome')"><span class="glyphicon glyphicon-home"></span>主页</li>
        <li :class="{focusing:nowPage=='problems'}" v-on:click="$emit('toProblem')"><span class="glyphicon glyphicon-list"></span>题目</li>
        <li :class="{focusing:nowPage=='status'}" v-on:click="$emit('toStatus')"><span class="glyphicon glyphicon-stats"></span>评测</li>
        <li :class="{focusing:nowPage=='contest'}" v-on:click="$emit('toContest')"><span class="glyphicon glyphicon-tower"></span>比赛</li>
        <li :class="{focusing:nowPage=='rank'}" v-on:click="$emit('toRank')"><span class="glyphicon glyphicon-signal"></span>排名</li>
        <li :class="{focusing:nowPage=='discuss'}" v-on:click="$emit('toDiscuss')"><span class="glyphicon glyphicon-comment"></span>讨论</li>
      </ul>
      <div class="usersBar">
        <div class="separate"></div>
        <div class="field" :class="{'field-focus':userPage=='Signup'}" v-on:click="$emit('signUp')">
          <a> 注册<span class="glyphicon glyphicon-user"></span></a>
        </div>
        <div class="field" :class="{'field-focus':userPage=='Login'}" v-on:click="$emit('logIn')">
          <a> 登录<span class="glyphicon glyphicon-log-in"></span></a>
        </div>
      </div>
    </div>
    <!--
    <div class="head-container">
      <slot></slot>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: "headBar",
  props: {
    nowPage: String,
    userPage: String
  },
  data() {
    return {
      isScrolled: false
    };
  },
  methods: {
    handleScroll() {
      let scrolled =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolled > 0) {
        if (!this.isScrolled) this.isScrolled = true;
      } else {
        if (this.isScrolled) this.isScrolled = false;
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
  }
};
</script>

<style>
.head-wrapper {
  display: table;
  width: 100%;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0);
}
.add-shadow {
  box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0.1);
}
.head-container{
  width: 100%;
  clear: both;
  display: table;
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
}
.head-wrapper .separate{
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
</style>
