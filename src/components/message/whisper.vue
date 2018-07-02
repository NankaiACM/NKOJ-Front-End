<template>
<div id="whisper">
  <h3>我的私信</h3>
  <div class="wsrp">
    <div class="list">
      <div class="title">消息</div>
      <div class="usr" v-for="item in list" :key="item" @click="switchTo(item)">
        <img :alt="item" width="36px" height="36px" class="img" :src="img(item)">
        {{item}}
      </div>
      <div class="add">
        <span @click="add = ''">add</span>
        <input v-if="add !== '0x3924ef'" v-model="add">
        <span @click="switchTo(add)" v-if="add !== '0x3924ef'" class="glyphicon glyphicon-chevron-right"></span>
      </div>
    </div>
    <div class="dialog">
      <div class="title">
        <span class="l">{{active}}</span>
        <span class="r">
          <span class="b" v-if="!menu" @click="menu = true">···</span>
          <span class="c" v-if="menu">
            <span @click="menu = false">-></span>
            <span @click="cls">清空会话</span>
            <span @click="ban">屏蔽</span>
          </span>
        </span>
      </div>
      <div class="content">
        <div class="word" v-for="(it, index) in rwords" :key="index" :class="{l: true}">
          {{it.content}}
          <span @click="clo(it['message_id'])" class="glyphicon glyphicon-remove i"></span>
          <span @click="report(it['message_id'])" class="i r">举报</span>
        </div>
      </div>
      <div class="input">
        <textarea placeholder="DA(五角星)ZE" class="textarea" v-model="input" @keyup.enter="send"></textarea>
        <div class="send" @click="send">发送</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'whisper',
  data: function () {
    return {
      list: [],
      active: 'anonymous',
      pool: {},
      words: [],
      input: '',
      add: '0x3924ef',
      menu: false
    }
  },
  computed: {
    rwords: function () {
      const tmp = this.words
      tmp.reverse()
      return tmp
    }
  },
  mounted: function () {
    const vm = this
    vm.$nextTick(function () {
      const id = vm.$route.params.id
      if (id) {
        vm.list.push(id)
        vm.active = id
        vm.fetchWords(id)
      }
    })
  },
  methods: {
    cls: function () {
      this.pool[this.active] = []
      this.words = [] // 其实是重复的
      this.$router.rmMsg(this, 'all', this.active)
    },
    ban: function () {
      this.$router.banUser(this, this.active)
    },
    clo: function (id) {
      const vm = this
      vm.$http.get(window.noPointHost + '/api/message/delete/' + id)
        .then(function (res) {
          if (res.body.code === 0) {
            vm.pool[vm.active] = undefined
            vm.fetchWords(vm.active)
          }
          vm.$store.commit('setNotify', {
            title: '删除消息',
            message: res.body.message
          })
        }, function (e) {
          vm.$store.commit('setNotify', {
            title: '删除失败',
            message: JSON.stringify(e)
          })
        })
    },
    img: function (id) {
      return window.noPointHost + '/api/avatar/' + id
    },
    report: function (id) {
      const vm = this
      vm.$http.get(window.noPointHost + '/api/message/report/' + id)
        .then(function (res) {
          vm.$store.commit('setNotify', {
            title: '举报私信',
            message: res.body.message
          })
        }, function (e) {
          vm.$store.commit('setNotify', {
            title: '错误',
            message: JSON.stringify(e)
          })
        })
    },
    fetchWords: function (id) {
      const vm = this
      if (vm.pool[id]) {
        vm.words = vm.pool[id]
        return -1
      }
      vm.$http.get(window.noPointHost + '/api/message/' + id)
        .then(function (res) {
          if (res.body.code === 0) {
            vm.pool[id] = res.body.data
            vm.words = vm.pool[id]
          }
        })
    },
    switchTo: function (id) {
      if (id === '') return -1
      const vm = this
      vm.active = id
      if (vm.list.indexOf(id) === -1) {
        vm.list.push(id)
        vm.add = '0x3924ef'
      }
      vm.fetchWords(id)
    },
    send: function () {
      const vm = this
      console.log(vm.words)
      vm.$http.post(window.noPointHost + '/api/message/' + vm.active, {
        message: vm.input
      }).then(function (res) {
        console.log(res)
        if (res.body.code === 0) {
          console.log('send ok')
          const newword = { content: vm.input }
          console.log(vm.words)
          vm.pool[vm.active].push(newword)
          // vm.words.push(newword)  // js 引用
          vm.input = ''
        } else {
          vm.$store.commit('setNotify', {
            title: '发送私信失败',
            message: JSON.stringify(res.body)
          })
        }
      }, function (e) {
        vm.$store.commit('setNotify', {
          title: '发送私信失败',
          message: JSON.stringify(e)
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#whisper {
  .wsrp {
    margin: 1em 0;
    background: #fff;
    box-shadow: 0 0 3px #ccc;
    border-radius: .5em;
    display: grid;
    grid-template-columns: 241px auto;
    grid-template-rows: auto;
    justify-content: stretch;
    height: 100%;
  }
  .list {
    border-right: 1px solid #ccc;
    .usr, .title {
      padding: .5em 2em;
      text-align: left;
      cursor: pointer;
      &:hover {
        background: darken(#fff, 5%);
      }
      .img {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 2em;
      }
    }
    .title, .add {
      color: #2cbfec;
      font-weight: 600;
      border-bottom: 1px solid #efefef;
    }
    .title {
      font-size: 16px;
    }
    .add {
      padding: 1em 2em;
      display: flex;
      justify-content: center;
      border-top: 1px solid #efefef;
      input {
        width: 6em;
        outline: none;
        border-bottom: 1px solid #2cbfec;
        padding: 0 1em;
        margin: 0 1em;
        text-align: center;
      }
      span {
        cursor: pointer;
      }
    }
  }
  .dialog {
    .title {
      text-align: center;
      font-size: 16px;
      color: #2cbfec;
      font-weight: 600;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .l {
        margin: .5em;
      }
      .r {
        display: flex;
        cursor: pointer;
        .c {
          display: flex;
        }
        .b, .c span {
          padding: .5em 1em;
          cursor: pointer;
          font-weight: 600;
          &:hover {
            background: #efefef;
          }
        }
      }
    }
    .content {
      padding: 2em 0;
      background: #efefef;
      height: 480px;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-direction: column-reverse;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #fff;
        border-radius: 3px;
      }
      .word {
        padding: .5em 1em;
        margin: .5em 1em;
        border-radius: .5em;
        background: #fff;
        &.l {
          align-self: flex-start;
        }
        .i {
          display: none;
          height: 0;
          width: 0;
        }
        &:hover .i {
          color: #333;
          display: inline-block;
          font-weight: 200;
          width: 2em;
          height: 2em;
          line-height: 2em;
          text-align: center;
          background: #ccc;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            color: red;
          }
        }
        &:hover .r {
          width: auto;
          padding: 0 1em;
          border-radius: 4px;
        }
      }
    }
    .input {
      background: #fff;
      min-height: 141px;
      display: grid;
      padding: 1em;
      grid-template-columns: auto 6em;
      grid-template-rows: auto 30px;
      grid-template-areas: " textarea textarea" ". send";
      grid-row-gap: .5em;
      .textarea {
        outline: none;
        border: none;
        resize: none;
        grid-area: textarea;
        &::-webkit-scrollbar {
          width: 6px;
        }
        &::-webkit-scrollbar-thumb {
          background: #ccc;
          height: 30px;
          border-radius: 3px;
        }
      }
      .send {
        text-align: center;
        grid-area: send;
        line-height: 30px;
        border-radius: 4px;
        border: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          color: #2cbfec;
          border-color: #2cbfec;
        }
      }
    }
  }
}
</style>
