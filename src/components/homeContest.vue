<template>
<div id="homeContest" class="col-sm-8">
  <h2 align="left">近期比赛</h2>
  <div class="col-sm-6" v-for="contest in newContests" :key="contest.id">
    <div class="panel panel-info">
      <div class="panel-heading">
        <router-link :to="{path:'contest/'+contest.contestID}">
          {{contest.contestTitle}}
        </router-link>
      </div>
      <div class="panel-body">
        {{contest.contestContent}}
      </div>
    </div>
  </div>
  <img align="left" src="../assets/wtf1.jpg">
</div>
</template>
<script>
export default {
  name: "component-home-contest",
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
    initView: function () {
      var _this = this;
      this.$http.get('/static/newContests.json').then(function(res) {
        _this.newContests = res.body.data;
      });
    }
  }
}
</script>
<style>
</style>
