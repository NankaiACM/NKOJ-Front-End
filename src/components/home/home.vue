<template>
<div id="home">
  <div id="beta">
    <div class="mainbar">
      <home-problem></home-problem>
      <home-contest></home-contest>
      <home-discuss></home-discuss>
    </div>
    <div class="sidebar">
      <home-component :title="'纳新喵~'">
        <hr class=".hr">
        <img style="max-width: 80%; display: block; margin: auto" src="../../assets/qqgroup.jpg"/>
      </home-component>
      <princeton></princeton><!--又出现了喵~-->
    </div>
    <div style="clear:both;"></div>
  </div>
  <activity v-if="isactivity" @logIn="logIn"></activity>
  <!--
  <div class="card">
    <home-problem></home-problem>
  </div>
  <div class="card">
    <home-contest></home-contest>
  </div>
  <div class="card">
    <home-component :title="'纳新喵~'">
        <hr class=".hr">
        <img style="max-width: 80%; display: block; margin: auto" src="../../assets/qqgroup.jpg"/>
    </home-component>
  </div>
  -->
</div>
</template>
<script>
import princeton         from '../chat/princeton.vue'
import homeContest       from './contest.vue'
import homeDiscuss       from './discuss.vue'
import homeProblem       from './problems.vue'
import homeComponent     from './homeComponent'
import activity          from './activity.vue'
export default {
  name: 'component-home',
  components: {
    homeComponent,
    princeton,
    homeContest,
    homeDiscuss,
    homeProblem,
    activity
  },
  methods: {
    logIn () {
      this.$emit('logIn')
    }
  },
  computed: {
    isactivity () {
      return localStorage.getItem('activity') !== 'hide'
    }
  },
  mounted() {
    console.log(`%c
      ___           ___           ___           ___           ___           ___     
     /\\  \\         /|  |         /\\  \\         /\\  \\         /\\__\\         /\\  \\    
     \\:\\  \\       |:|  |         \\:\\  \\       /::\\  \\       /:/  /        |::\\  \\   
      \\:\\  \\      |:|  |          \\:\\  \\     /:/\\:\\  \\     /:/  /         |:|:\\  \\  
  _____\\:\\  \\   __|:|  |      ___  \\:\\  \\   /:/ /::\\  \\   /:/  /  ___   __|:|\\:\\  \\ 
 /::::::::\\__\\ /\\ |:|__|____ /\\  \\  \\:\\__\\ /:/_/:/\\:\\__\\ /:/__/  /\\__\\ /::::|_\\:\\__\\
 \\:\\~~\\~~\\/__/ \\:\\/:::::/__/ \\:\\  \\ /:/  / \\:\\/:/  \\/__/ \\:\\  \\ /:/  / \\:\\~~\\  \\/__/
  \\:\\  \\        \\::/~~/~      \\:\\  /:/  /   \\::/__/       \\:\\  /:/  /   \\:\\  \\      
   \\:\\  \\        \\:\\~~\\        \\:\\/:/  /     \\:\\  \\        \\:\\/:/  /     \\:\\  \\     
    \\:\\__\\        \\:\\__\\        \\::/  /       \\:\\__\\        \\::/  /       \\:\\__\\    
     \\/__/         \\/__/         \\/__/         \\/__/         \\/__/         \\/__/    
     
     @NKUACM 2019
`, 'color: #6cf')
    console.log('%c Release 2.6.1. Sunrisefox & Saurus & 墨染 SaucerHi & 什锦', 'color: #6cf')
  },
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';

#home {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  .card {
    position: relative;
    width: 100%;
    padding: 1em 20%;
    height: 100%;
  }
}

#alpha {
  position: fixed;
  top: 0;
  left: 0;
  background: none;
  text-align: left;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  z-index: -1;

  #moka {
    display: none;
    font-size: 50px;
    line-height: 50px;
    font-family: "微软雅黑";
    position: absolute;
    right: 30px;
    top: 100px;
    width: 8em;
    height: 50px;
    margin-left: -120px;
    margin-top: -25px;
    text-align: center;

    #mo {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      color: #d52a1a;
      font-family: cursive;
    }

    #mo::after {
      display: block;
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background: #fff;
    }

    #ka {
      position: absolute;
      top: 0;
      left: 0;
      color: #0fa5d2;
      height: 25px;
      width: 100%;
      overflow: hidden;
    }
  }

  #moka::before {
    content: ' ';
    display: inline-block;
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: content-box;
    transition: all 1.41s;
  }

  #btns {
    position: absolute;
    bottom: 1em;
    left: 2em;
    height: 25px;
    width: 200px;

    span {
      cursor: pointer;
      float: left;
      font-size: 25px;
      margin-right: 25px;
      color: #bbb;
      transition: all .41s;
    }

    span:hover {
      color: #233;
    }
  }
}

#beta {
  position: relative;
  padding: 0 1.5%;

  .mainbar{
    float: left;
    width: 60%;

    h3 {
      margin-top: 0;
      font-family: '微软雅黑';
    }
    div:nth-child(n+2){
      margin-top: 30px;
    }
  }
  .sidebar{
    float: right;
    width: 35%;
    margin-left: 2%;
    padding-left: 3%;
    border-left: 1px solid #eee;
    .wrapper{
      max-width: 350px;
      margin: auto;
    }
    div:nth-child(n+2){
      margin-top: 30px;
    }
    .pre {
      background: none;
      margin-top: 2em;
      &::-webkit-scrollbar {
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #ccd0d7;
        border-radius: 3px;
      }
    }
  }
}
</style>
