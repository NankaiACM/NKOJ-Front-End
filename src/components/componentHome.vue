<template>
<div class="container-fluid">
  <div class="row">
    <div id="announcement" class="col-sm-12">
      <h2 align="left">公告</h2>
      <pre id="announcementText" v-text="announcement" class="alert alert-info" role="alert"></pre>
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
import homeDiscuss from './homeDiscuss.vue'
import homeProblem from './homeProblem.vue'
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
  margin: 1em;
  padding: 2em;
}

#announcement {
  cursor: pointer;
}

#announcementText {
  padding: 1em;
  font-size: 1.2em;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (min-width: 768px) {
  #announcement,
  #homeContest,
  #homeDiscuss,
  #homeProblem,
  #homeContestList {
    margin: 2em;
    padding: 4em;
  }
}
</style>
