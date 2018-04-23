<template>
<div id="homeContest" class="home-component">
  <home-component :title="'近期比赛'">
    <ul>
      <li v-for="contest in newContests" :key="contest.id">
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
.panel {
  margin-top: 2rem;
  border: @home-com-border;
}
.panel-info>.panel-heading {
  background: #fff;
  border-bottom: @home-com-border;
}
</style>
