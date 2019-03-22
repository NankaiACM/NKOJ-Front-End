<template>
<div id="homeProblem" class="home-component">
  <home-component :title="'新增题目'">
    <ul>
      <li>
        <div>编号</div>
        <div>题目名称</div>
        <div>通过率</div>
      </li>
      <li v-for="problem in newProblems" :key="problem.id">
        <div>{{problem['problem_id']}}</div>
        <div>
          <router-link :to="{path:'problem/'+problem['problem_id']}">
            {{problem.title}}
          </router-link>
        </div>
        <div>{{problem.ac}} / {{problem.all}} = {{(problem.ac / problem.all * 100).toFixed(2)}}%</div>
      </li>
    </ul>
  </home-component>
</div>
</template>
<script>
import homeComponent from './homeComponent.vue'
export default {
  name: 'component-home-problem',
  components: {homeComponent},
  data () {
    return {
      newProblems: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  methods: {
    initView: function () {
      var _this = this
      // 暂时使用problems api的数据
      this.$http.get(`${window.noPointHost}/api/problems/list/0/6`).then(function (res) {
        _this.newProblems = res.body.data.list
      })
    }
  }
}
</script>
<style lang="less">
.list-group .label {
  margin: 0 -15px -10px -15px;
  border-radius: 0;
}

#homeProblem li{
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
      width: 141px;
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
