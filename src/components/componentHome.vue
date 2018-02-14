<template>
<div class="container-fluid">
  <div class="row">
    <div id="announcement" class="col-sm-12">
      <h2 align="left">公告</h2>
      <pre id="announcementText" v-text="announcement"></pre>
    </div>
  </div>
  <div class="row">
    <homeContest/>
    <homeProblem/>
  </div>
  <div class="row">
    <homeDiscuss/>
  </div>
</div>
</template>
<script>
import homeContest from './homeContest.vue'
import homeDiscuss from './homeDiscuss'
import homeProblem from './homeProblem'
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
      var _this = this
      this.$http.get('/static/announcement.json').then(function(res) {
        _this.announcement = res.body.data
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

<style>
.container-fluid {
  padding: 2em;
  text-align: left;
  min-height: 100%;
}

.row {
  display: flex;
}

#announcement,
#homeContest,
#homeDiscuss,
#homeProblem,
#homeContestList {
  background: #fff;
  height: auto;
  margin: 2em;
  padding: 4em;
}

#announcement:hover {
  cursor: pointer;
}

#announcementText {
  padding: 1%;
  font-size: 1.2em;
  text-align: left;
  overflow: auto;
}
</style>
