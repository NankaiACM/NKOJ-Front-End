<template>
<div id="homeDiscuss" class="col-sm-12">
  <h2>最新讨论</h2>
  <div class="media" v-for="talk in newDiscuss" :key="talk.id">
    <div class="media-left">
      <router-link :to="{path:'member/'+talk.sponsor}">
        <img class="media-object leftimg" :src="talk.imgurl" :alt="talk.imgalt">
      </router-link>
    </div>
    <div class="media-body text-muted">
      <router-link :to="{path:'discuss/'+talk.id}" class="meadia-heading btn-link node">
        <h4>{{talk.title}}</h4>
      </router-link>
      <router-link :to="{path:'discussnode/'+talk.node}" class="btn btn-xs btn-default node">
        {{talk.node}}
      </router-link>
      •
      <router-link :to="{path:'member/'+talk.sponsor}" class="member-link">
        {{talk.sponsor}}
      </router-link>
      • {{stamp2str(talk.timestamp)}} • 最后回复来自
      <router-link :to="{path:'member/'+talk.terminator}" class="member-link">
        {{talk.terminator}}
      </router-link>
    </div>
  </div>
  <img align="left" src="../assets/wtf3.jpg">
</div>
</template>
<script>
export default {
  name: "component-home-discuss",
  data() {
    return {
      newDiscuss: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initView();
    });
  },
  methods: {
    initView: function() {
      this.$http.get('/static/newDiscuss.json').then(function(res) {
        this.newDiscuss = res.body.data;
      });
    },
    stamp2str: function(timestamp) {
      timestamp = Number(timestamp);
      if (isNaN(timestamp)) return "时间之外";
      var nowstamp = new Date().getTime();
      var d = nowstamp - timestamp;
      d /= 1000;
      if (d < 60) return ~~d + '秒前';
      d /= 60;
      if (d < 60) return ~~d + '分钟前';
      d /= 60;
      if (d < 24) return ~~d + '小时前';
      d /= 24;
      if (d < 366) return ~~d + '天前';
      d /= 365;
      return ~~d + '年前';
    }
  }
}
</script>
<style>
.leftimg {
  width: 64px;
  height: 64px;
  border: none !important;
  background: #fff;
}

.node {
  background: #f5f5f5;
  color: #999;
}

.node:hover {
  background: #e2e2e2;
  color: #777;
}

.member-link {
  background: none;
  color: #777;
  font-weight: bold;
}

.member-link:hover,
.member-link:active {
  color: #555;
  text-decoration: none;
}
</style>
