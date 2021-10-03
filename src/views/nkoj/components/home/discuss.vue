<template>
<div id="homeDiscuss" class="home-component">
  <home-component :title="'最新讨论'">
    <ul>
      <li class="media" v-for="talk in newDiscuss" :key="talk.id">
        <div class="media-left">
          <router-link :to="{path:'/space/uid/'+talk.user_id}">
            <img class="media-object leftimg" :src="imgurl(talk.user_id)" :alt="talk.nickname">
          </router-link>
        </div>
        <div class="media-body text-muted">
          <router-link :to="{path:'/discuss/'+talk.post_id}" class="meadia-heading btn-link node">
            <h5>{{talk.title}}</h5>
          </router-link>
          <router-link :to="{path:'/discuss/'}" class="btn btn-xs btn-default node">
            {{talk.node || '默认话题'}}
          </router-link>
          •
          <router-link :to="{path:'/space/uid/' + talk.user_id}" class="member-link">
            {{talk.nickname || '无名'}}
          </router-link>
          • {{stamp2str(talk["since"])}} • 最后回复来自
          <router-link :to="{path:'/space/uid/'+talk['last_active_user']}" class="member-link">
            {{talk["last_active_user"] || '没有人'}}
          </router-link>
        </div>
      </li>
    </ul>
  </home-component>
</div>
</template>
<script>
import homeComponent from './homeComponent.vue'
export default {
  name: 'component-home-discuss',
  components: { homeComponent },
  data () {
    return {
      newDiscuss: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  methods: {
    imgurl: function (uid) {
      return noPointHost + '/api/avatar/' + uid
    },
    initView: function () {
      this.$http.get(window.noPointHost + '/api/posts/0')
        .then(function (res) {
          this.newDiscuss = res.body.data.list
        })
    },
    stamp2str: function (timestamp) {
      timestamp = new Date(timestamp)
      var nowstamp = new Date().getTime()
      var d = nowstamp - timestamp
      d /= 1000
      if (d < 60) return ~~d + '秒前'
      d /= 60
      if (d < 60) return ~~d + '分钟前'
      d /= 60
      if (d < 24) return ~~d + '小时前'
      d /= 24
      if (d < 366) return ~~d + '天前'
      d /= 365
      return ~~d + '年前'
    }
  }
}
</script>
<style scoped>
.home-discuss {
  text-align: left;
}

.leftimg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none !important;
  background: #fff;
}

.media:hover {
  background: rgba(0, 0, 0, 0.05);
}

.node {
  background: none !important;
  color: #999;
  text-decoration: none !important;
}

.node:hover {
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

.media{
  margin: 0;
  padding: 10px 5px;
}
</style>
