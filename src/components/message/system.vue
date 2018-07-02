<template>
  <div id="system">
    <h3>系统通知</h3>
    <div class="clsbtn" @click="$router.rmMsg(vm, 'all', 'system')">清空系统私信</div>
    <div class="msg anm" v-for="item in anm" :key="item.id">
      {{item['message_id']}}
      {{item.title}}
      {{item.content}}
      {{item.since}}
    </div>
    <div v-for="item in system" :key="item.id">
      {{item['message_id']}}
      {{item.title}}
      {{item.content}}
      {{item.since}}
      <div @click="$router.rmMsg(vm, 'one', item['message_id'])">删除这条消息</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'system',
  data: function () {
    return {
      anm: [],
      system: []
    }
  },
  computed: {
    vm: function () {
      return this
    }
  },
  methods: {
    fetchAPI: function (item, api) {
      // fetch announcement
      const vm = this
      vm.$http.get(window.noPointHost + api)
        .then(function (res) {
          if (res.body.code === 0) {
            vm[item] = res.body.data
          }
          vm.$store.commit('setNotify', {
            title: '获取系统消息',
            message: res.body.message
          })
        }, function (e) {
          vm.$store.commit('setNotify', {
            title: '获取错误',
            message: JSON.stringify(e)
          })
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('inits')
      if (this.$store.getters.usrLogGet) {
        this.fetchAPI('anm', '/api/message/announcement')
        this.fetchAPI('system', '/api/message/system')
      }
    })
  }
}
</script>
<style lang="less" scoped>
#system {
  .msg, .clsbtn {
    margin: 1em 2em;
    padding: 1em 2em;
    background: #fff;
    border-radius: .5em;
    cursor: pointer;
    &.anm {
      box-shadow: 0 0 3px #333;
    }
  }
  .clsbtn {
    box-shadow: 0 0 3px #c24f4a;
  }
}
</style>
