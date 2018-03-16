<template>
<div id="homeProblem" class="col-sm-4 col-xs-12 home-component">
  <h3 align="left">新增题目</h3>
  <div id="new-pros-container">
    <div class="list-group">
      <router-link class="list-group-item" v-for="problem in newProblems" :key="problem.id" :to="{path:'problem/'+problem.problemsID}">
        {{problem.problemsName}}
        <span class="badge visible-lg">{{problem.problemsRatio}}</span>
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "component-home-problem",
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
@import '../../less/global.less';
#new-pros-container {
  padding-top: 2rem;
}

.list-group>.list-group-item {
  border: @home-com-border;
}

.list-group .label {
  margin: 0 -15px -10px -15px;
  border-radius: 0;
}
</style>
