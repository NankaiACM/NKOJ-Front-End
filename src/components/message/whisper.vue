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
      <div class="title">{{active}}</div>
      <div class="content">
        <div class="word" v-for="(it, index) in rwords" :key="index" :class="{l: true}">
          {{it.content}}
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
      add: '0x3924ef'
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
    img: function (id) {
      return window.noPointHost + '/api/avatar/' + id
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
      vm.$http.post(window.noPointHost + '/api/message/' + vm.active, {
        message: vm.input
      }).then(function (res) {
        console.log(res)
        if (res.body.code === 0) {
          console.log('send ok')
          const newword = { content: vm.input }
          vm.pool[vm.active].push(newword)
          vm.words.push(newword)
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
      padding: .5em;
      text-align: center;
      color: #2cbfec;
      font-weight: 600;
      border-bottom: 1px solid #ccc;
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
          border-color: #2cbfec;
        }
      }
    }
  }
}
</style>
