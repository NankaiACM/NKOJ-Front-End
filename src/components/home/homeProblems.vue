<template>
<div id="homeProblem" class="home-component">
  <home-component :title="'新增题目'">
    <ul>
      <li v-for="problem in newProblems" :key="problem.id">
        <router-link class="problem-list" :to="{path:'problem/'+problem.problemsID}">
          {{problem.problemsName}}
          <span class="badge visible-lg">{{problem.problemsRatio}}</span>
        </router-link>
      </li>
    </ul>
  </home-component>
</div>
</template>
<script>
import homeComponent from './homeComponent.vue'
export default {
  name: "component-home-problem",
  components:{homeComponent},
  data() {
    return {
      newProblems: []
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
      this.$http.get('../../static/newProblems.json').then(function(res) {
        console.log(res.body)
        _this.newProblems = res.body.data;
      });
    }
  }
}
</script>
<style lang="less">
.problem-list{
  display: flex;
  
}

.list-group .label {
  margin: 0 -15px -10px -15px;
  border-radius: 0;
}
</style>
