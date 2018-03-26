<template>
<div id="homeContest" class="col-sm-8 col-xs-12 home-component">
  <h3 align="left">近期比赛</h3>
  <div id="new-contest-container">
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
  </div>
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
.panel {
  margin-top: 2rem;
  border: @home-com-border;
}
.panel-info>.panel-heading {
  background: #fff;
  border-bottom: @home-com-border;
}
</style>
