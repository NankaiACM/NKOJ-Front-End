<template>
<div id="home">
  <div id="alpha">
    <alex></alex>
    <tlex></tlex>
    <div id="moka" @mousemove="moka" :style="mksty">
      <div id="mo">ACM-ICPC</div>
      <div id="ka">ACM-ICPC</div>
    </div>
    <div id="btns">
      <span class="glyphicon glyphicon-cog" id="set"></span>
      <span class="glyphicon glyphicon-console" id="cmd"></span>
      <span class="glyphicon glyphicon-comment" id="chat"></span>
    </div>
  </div>
  <div id="beta">
    <div class="mainbar">
      <div class="row">
        <home-contest></home-contest>
      </div>
      <div class="row">
        <home-problem></home-problem>
      </div>
      <div class="row">
        <home-discuss></home-discuss>
      </div>
    </div>
    <div class="sidebar">
      <div class="home-component">
        <princeton></princeton>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</div>
</template>
<script>
import princeton         from '../chat/princeton.vue'
import alex              from '../wallpaper/alex.vue'
import tlex              from '../wallpaper/tlex.vue'
import homeContest       from './homeContest.vue'
import homeDiscuss       from './homeDiscuss.vue'
import homeProblem       from './homeProblems.vue'
export default {
  name: 'component-home',
  data: function() {
    return {
      mk: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
    })
  },
  methods: {
    moka: function (e) {
      const w = 210
      const h = 35
      var x = e.layerX - w
      x = x / w
      this.mk.y = x * 30
      var y = e.layerY - h
      y = y / h
      this.mk.x = - y * 30
    }
  },
  computed: {
    mksty: function () {
      return {
        'transform': 'rotateX(' + this.mk.x + 'deg) rotateY(' + this.mk.y + 'deg)'
      }
    }
  },
  components: {
    princeton,
    alex,
    tlex,
    homeContest,
    homeDiscuss,
    homeProblem
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';

#home {
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  overflow-x: hidden;
}

#alpha {
  position: relative;
  background: none;
  text-align: left;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

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
  width: 100vw;
  height: 100vh;

  .mainbar{
    float: left;
    width: 60%;

    .row>:first-child {
      width: 100%;
    }

    .row h3 {
      margin-top: 0;
      font-family: '微软雅黑';
    }
  }
  .sidebar{
    float: right;
    width: 40%;
    padding-left: 30px;
  }
}
</style>
