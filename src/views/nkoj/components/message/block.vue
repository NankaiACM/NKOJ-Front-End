<template>
<div id="block">
  <h3>黑名单</h3>
  <div class="line" v-for="item in block" :key="item.blockee">
    <img class="img" width="36px" height="36px" :src="img(item.blockee)">
    <router-link tag="span" :to="'/space/uid/' + item.blockee" class="usr">{{item.blockee}}</router-link>
    拉黑于
    <span class="date">{{d(item.since)}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'block',
  data: function () {
    return {
      block: []
    }
  },
  methods: {
    img: function (id) {
      return window.noPointHost + '/api/avatar/' + id
    },
    d: function (timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.$http.get(window.noPointHost + '/api/message/block/')
        .then((res) => {
          if (res.body.code === 0) {
            this.block = res.body.data
          }
          this.$store.commit('setNotify', {
            title: '获取黑名单',
            message: res.body.message
          })
        }, (e) => {
          this.$store.commit('setNotify', {
            title: '获取错误',
            message: JSON.stringify(e)
          })
        })
    })
  }
}
</script>

<style lang="less" scoped>
#block {
  .line {
    padding: 1em 2em;
    margin: 1em 2em;
    background: #fff;
    border-radius: .5em;
    box-shadow: 0 0 3px #c24f4a;
    .img {
      border-radius: 50%;
      object-fit: cover;
    }
    .usr {
      font-size: 18px;
      color: #9d9d9d;
      font-weight: 600;
      padding: 0 1em;
      cursor: pointer;
    }
    .date {
      padding: 0 1em;
      color: #9d9d9d;
    }
  }
}
</style>
