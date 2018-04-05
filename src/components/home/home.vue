<template>
<div id="component-home" class="container-fluid">
  <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
  <div class="row">
    <div id="announcement" class="col-sm-12 home-component">
      <h3 align="left">公告</h3>
      <pre id="announcementText" v-text="announcement" class="alert" role="alert"></pre>
    </div>
  </div>
  <div class="row">
    <homeContest/>
    <homeProblem/>
  </div>
  <div class="row">
    <homeDiscuss/>
    <div class="col-lg-8 visible-lg home-component"><h3 align="left">Shell</h3></div>
  </div>
</div>
</div>
</template>
<script>
import homeContest from './homeContest.vue'
import homeDiscuss from './homeDiscuss.vue'
import homeProblem from './homeProblems.vue'
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
    homeProblem
  }
}
</script>

<style lang="less">
@import '../../less/global.less';
#component-home.container-fluid {
  padding: 2em;
  text-align: left;
  min-height: 100%;
}

.row {
  display: flex;
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
}

@media (max-width: 768px) {
  .row:nth-child(2) {
    flex-direction: column;
  }
  .home-component {
    margin: 0;
  }
}
</style>
