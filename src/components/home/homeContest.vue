<template>
<div id="homeContest" class="home-component">
  <home-component :title="'近期比赛'">
    <ul>
      <li>
        <div>编号</div>
        <div>比赛名称</div>
        <div>开始时间</div>
        <div>状态</div>
      </li>
      <li v-for="contest in newContests" :key="contest.id">
        <div>{{contest.contestID}}</div>
        <div>
          <router-link :to="{path:'contest/'+contest.contestID}">
            {{contest.contestTitle}}
          </router-link>
        </div>
        <div>{{contest.date}}</div>
        <div>???</div>
      </li>
    </ul>
  </home-component>
</div>
</template>
<script>
import homeComponent from './homeComponent.vue'
export default {
  name: "component-home-contest",
  components:{homeComponent},
  data() {
    return {
      newContests: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initView();
    });
  },
  methods: {
    initView: function() {
      var _this = this;
      this.$http.get('/static/newContests.json').then(function(res) {
        _this.newContests = res.body.data;
      });
    }
  }
}
</script>
<style scope lang="less">
@import '../../less/global.less';
#new-contest-container {
  margin: 0 -15px;
}
li{
  display: flex;
  width: 100%;
  line-height: 225%;
  div{
    text-align: center;
    &:nth-child(2){
      flex: 1;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &:nth-child(1){
      width: 80px;
    }
    &:nth-child(3){
      width: 240px;
    }
    &:nth-child(4){
      width: 100px;
    }
  }
  &:nth-child(1){
    div:nth-child(2){
      padding-left: 5px;
    }
  }
  &:nth-child(n+2):hover{
    background-color: rgba(0, 0, 0, 0.05);
  }
}
.panel {
  margin-top: 2rem;
  border: @home-com-border;
}
.panel-info>.panel-heading {
  background: #fff;
  border-bottom: @home-com-border;
}
</style>
