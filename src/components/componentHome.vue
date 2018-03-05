<template>
<div id="component-home" class="container-fluid">
  <div class="row">
    <div id="announcement" class="col-sm-12 home-component">
      <h3 align="left">公告</h3>
      <pre id="announcementText" v-text="announcement" class="alert alert-info" role="alert"></pre>
    </div>
  </div>
  <div class="row">
    <homeContest/>
    <homeProblem/>
  </div>
  <div class="row">
    <homeDiscuss/>
    <componentShell/>
  </div>
</div>
</template>
<script>
import homeContest from './homeContest.vue'
import homeDiscuss from './homeDiscuss.vue'
import homeProblem from './homeProblem.vue'
import componentShell from './componentShell'
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
    componentShell
  }
}
</script>

<style>
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
  padding: 2em;
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
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (min-width: 1241px) {
  #component-home.container-fluid{
    padding: 2em 6em;
  }
  .home-component {
    margin: 2em;
    padding: 4em;
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
