<template>
<div id="component-home" class="container-fluid">
  <div class="mainbar">
  <div class="row">
    <homeContest/>
  </div>
  <div class="row">
    <homeProblem/>
  </div>
  <div class="row">
    <homeDiscuss/>
  </div>
</div>
  <div class="sidebar">
    <div class="home-component"><princeton></princeton></div>
  </div>
</div>
</template>
<script>
import homeContest from './homeContest.vue'
import homeDiscuss from './homeDiscuss.vue'
import homeProblem from './homeProblems.vue'
import princeton from '../chat/princeton.vue'
export default {
  name: 'component-home',
  data: function() {
    return {
      announcement: '',
      homeContestList: [],
      newProblems: [],
      newContests: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initView()
    })
  },
  methods: {
    initView: function() {
      this.$http.get('/static/announcement.json').then(function(res) {
        this.announcement = res.body.data
      })
    }
  },
  components: {
    homeContest,
    homeDiscuss,
    homeProblem,
    princeton,
  }
}
</script>

<style lang="less">
@import '../../less/global.less';
#component-home.container-fluid {
  padding: 2em;
  text-align: left;
  min-height: 100%;
  display: flex;
}

.mainbar{
  flex-grow: 1;
}

.sidebar{
  flex: 0 0 auto;
  width: 300px;
  margin-left: 30px;
}

.row>:first-child {
  width: 100%;
}

.row h3 {
  margin-top: 0;
  font-family: '微软雅黑';
}

.home-component {
  background: #fff;
  height: auto;
  margin: 1em;
  padding: 1em;
}

#announcement {
  cursor: pointer;
}

#announcement h2 {
  margin-top: 0;
}

#announcementText {
  padding: 1em;
  margin: 0;
  font-size: 1.2em;
  background: #fff;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
  border: @home-com-border;
}

@media (min-width: 1241px) {
  #component-home.container-fluid{
    padding: 2em 6em;
  }
  .sidebar{
    width: 30%;
  }
}

@media (max-width: 768px) {
  .row:nth-child(2) {
    flex-direction: column;
  }
  .home-component {
    margin: 0;
  }
  .sidebar{
    display: none;
  }
}
</style>
