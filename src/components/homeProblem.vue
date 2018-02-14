<template>
<div id="homeProblem" class="col-sm-4">
  <h2 align="left">新增题目</h2>
  <div class="list-group">
    <router-link class="list-group-item" v-for="problem in newProblems" :key="problem.id" :to="{path:'problem/'+problem.problemsID}">
      {{problem.problemsName}}
      <span class="badge">{{problem.problemsRatio}}</span>
    </router-link>
  </div>
  <img align="left" src="../assets/wtf2.jpg">
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
    initView: function () {
      var _this = this;
      this.$http.get('/static/newProblems.json').then(function(res) {
        _this.newProblems = res.body.data;
      });
    }
  }
}
</script>
<style>
</style>
