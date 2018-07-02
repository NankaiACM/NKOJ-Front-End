<template>
  <div id="system">
    <h3>系统通知</h3>
    <div class="clsbtn" @click="rmit('all', 'system')">清空系统私信</div>
    <div class="msg anm" v-for="item in anm" :key="item.id" title="不可删除">
      {{item['message_id']}}
      {{item.title}}
      {{item.content}}
      {{item.since}}
    </div>
    <div class="msg sys" v-for="item in system" :key="item.id">
      {{item['message_id']}}
      {{item.title}}
      {{item.content}}
      {{item.since}}
      <div class="rm" @click="rmit('one', item['message_id'])">删除这条消息</div>
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
    },
    lg: function () {
      return this.$store.getters.usrLogGet
    }
  },
  methods: {
    rmit: function (opa, id) {
      const vm = this
      vm.$router.rmMsg(vm, opa, id)
        .then(function (res) {
          // ok
          if (res === 0) {
            console.log('ok')
            vm.init()
          }
        })
    },
    fetchAPI: function (item, api) {
      // fetch announcement
      const vm = this
      vm.$http.get(window.noPointHost + api)
        .then(function (res) {
          if (res.body.code === 0) {
            vm[item] = res.body.data
            return '0x141'
          }
          vm.$store.commit('setNotify', {
            title: '获取系统消息',
            message: res.body.message
          })
          return '0x312'
        }, function (e) {
          vm.$store.commit('setNotify', {
            title: '获取错误',
            message: JSON.stringify(e)
          })
          return '0x203'
        })
        .then(function (v) {
          console.log(vm)
        })
    },
    init: function () {
      const lg = this.$store.getters.usrLogGet
      console.log(lg)
      if (lg) {
        this.fetchAPI('anm', '/api/message/announcement')
        this.fetchAPI('system', '/api/message/system')
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('inits')
      this.init()
    })
  },
  watch: {
    lg: function (n, o) {
      console.log(o)
      console.log(n)
      this.init()
    }
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
    &.sys {
      box-shadow: 0 0 3px #2cbfec;
      .rm {
        display: inline-block;
        padding: .5em 1em;
        margin: 0 1em;
        border: 1px solid #2cbfec;
        color: #2cbfec;
        border-radius: 4px;
        &:hover {
          box-shadow: 0 0 4px #2cbfec;
        }
      }
    }
  }
  .clsbtn {
    box-shadow: 0 0 3px #c24f4a;
  }
}
</style>
