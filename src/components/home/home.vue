<template>
<div id="home">
  <div id="beta">
    <div class="mainbar">
      <home-problem></home-problem>
      <home-contest></home-contest>
      <home-discuss></home-discuss>
    </div>
    <div class="sidebar">
      <home-component :title="'占位符'">
        <hr class=".hr">
        <pre class="pre">
7月7日（周六）  Benelux Algorithm Programming Contest 2014 Preliminary
7月10日（周二） Benelux Algorithm Programming Contest 2014 Final
7月12日（周四） German Collegiate Programming Contest 2015
7月17日（周二） The 2018 ACM-ICPC Chinese Collegiate Programming Contest (held by Ningxia Institute of Science and Technology)​
7月19日（周四） German Collegiate Programming Contest 2018​
7月24日（周二） The 2018 ACM-ICPC China JiangSu Provincial Programming Contest (held by China University of Mining and Technology)
7月26日（周四）Nordic Collegiate Programming Contest 2015​
7月29日（周日）ACM-ICPC 2018 Urumqi
此外，7月14日，21日，28日为ACM-ICPC亚洲训练联盟内的学校命题的练习赛。
        </pre>
      </home-component>
      <princeton></princeton>
    </div>
    <div style="clear:both;"></div>
  </div>
</div>
</template>
<script>
import princeton         from '../chat/princeton.vue'
import homeContest       from './contest.vue'
import homeDiscuss       from './discuss.vue'
import homeProblem       from './problems.vue'
import homeComponent     from './homeComponent'
export default {
  name: 'component-home',
  components: {
    homeComponent,
    princeton,
    homeContest,
    homeDiscuss,
    homeProblem
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';

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
