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
      <li v-for="contest in newContests" :key="contest['contest_id']">
        <div><span>{{contest['contest_id']}}</span></div>
        <div>
          <router-link :to="{path:'/NKPC/'+contest['contest_id']}">
            {{contest.title}}
          </router-link>
        </div>
        <div>{{timestr(contest.during)}}</div>
        <div>{{isDuring(contest.during)}}</div>
      </li>
    </ul>
  </home-component>
</div>
</template>
<script>
import homeComponent from './homeComponent.vue'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)
export default {
  name: 'component-home-contest',
  components: {homeComponent},
  data () {
    return {
      newContests: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  methods: {
    initView () {
      var _this = this
      // 暂时使用contest api的数据
      this.$http.get(`${window.noPointHost}/api/contests/`).then(function (res) {
        _this.newContests = res.body.data.list.slice(0, 5)
        console.log(_this.newContests)
      })
    },
    isDuring (during) {
      const [f, s] = during.split(',')
      console.log(f, s)
      const a = f.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d+/)
      const b = s.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d+/)
      if (!a || !b) return 'unknow'
      return dayjs().isBetween(a[0], b[0]) ? '进行中' : dayjs().isAfter(b[0]) ? '已结束' : '即将开始'
    },
    timestr (str) {
      const a = str.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d+/)
      if (!a) return 'unknow'
      return a[0]
    }
  }
}
</script>
<style scoped lang="less">
@import '../../less/global.less';
#new-contest-container {
  margin: 0 -15px;
}
#homeContest li{
  display: flex;
  width: 100%;
  line-height: 30px;
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
    color: #999;
    div:nth-child(2){
      padding-left: 5px;
    }
  }
  &:nth-child(n+2){
    div{
      &:nth-child(2n+1){
        color: #999;
      }
      &:nth-child(2) a{
        color: inherit;
      }
    }
  }
  &:nth-child(n+2):hover{
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
