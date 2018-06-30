<template>
  <div id="system">
    <h3>系统通知</h3>
    <div class="clsbtn" @click="rmMsg('all', 'system')">清空系统私信</div>
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
      <div @click="rmMsg('one', item['message_id'])">删除这条消息</div>
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
    },
    rmMsg: function (oa, value) {
      const ops = {
        one: '/api/message/delete/',
        all: '/api/message/deleteall/'
      }
      const api = ops[oa]
      if (!api) return -1
      const vm = this
      vm.$http.get(window.noPointHost + api + value)
        .then(function (res) {
          if (res.body.code === 0) {
            console.log('delete ok')
          }
          vm.$store.commit('setNotify', {
            title: '删除消息',
            message: res.body.message
          })
        }, function (e) {
          vm.$store.commit('setNotify', {
            title: '发生错误',
            message: JSON.stringify(e)
          })
          console.log(e)
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
