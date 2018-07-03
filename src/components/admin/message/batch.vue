<template>
  <div id="batch">
    <h3>群发</h3>
    <h4>全局通知</h4>
    <div class="gmsg">
      <div class="item" v-for="(item, index) in global" :key="index">
        <div>编号</div>
        <div>{{item['message_id']}}</div>
        <div>标题</div>
        <div>{{item.title}}</div>
        <div>时间</div>
        <div>{{item.since}}</div>
        <div>内容</div>
        <div class="content" v-html="markdown(item.content)"></div>
        <div class="withdraw" @click="withdraw(item['message_id'])">撤回</div>
      </div>
    </div>
    <h4>群发新通知</h4>
    <div class="newpost">
      <div class="head"><input class="title" v-model="newpost.title"><div class="upbtn" @click="upload">发送</div></div>
      <mavon-editor v-model="newpost.content" @save="upload"></mavon-editor>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'batch',
  data: function () {
    return {
      global: [],
      newpost: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    withdraw: function (id) {
      const vm = this
      const fatalcb = function (vm, message) {
        vm.$store.commit('setNotify', {
          title: '操作失败',
          message
        })
      }
      vm.$http.get(window.noPointHost + '/api/admin/message/withdraw/' + id)
        .then(function (res) {
          if (res.body.code === 0) {
            vm.$store.commit('setNotify', {
              title: '撤销通知',
              message: res.body.message
            })
            vm.fetchData()
            return 0
          }
          fatalcb(vm, JSON.stringify(res.body))
        }, function (e) {
          fatalcb(vm, JSON.stringify(e))
        })
    },
    upload: function () {
      const vm = this
      vm.$http.post(window.noPointHost + '/api/admin/message/all', {
        title: vm.newpost.title,
        message: vm.newpost.content
      }).then(function (res) {
        if (res.body.code === 0) {
          vm.$store.commit('setNotify', {
            title: '群发新通知成功',
            message: res.body.message
          })
          vm.fetchData()
          return -1
        }
        vm.$store.commit('setNotify', {
          title: '群发新通知',
          message: res.body.message
        })
      }, function (e) {
        vm.$store.commit('setNotify', {
          title: '发生错误',
          message: JSON.stringify(e)
        })
      })
    },
    markdown: function (raw) {
      return marked(raw)
    },
    fetchData: function () {
      const vm = this
      vm.$http.get(window.noPointHost + '/api/message/announcement')
        .then(function (res) {
          if (res.body.code === 0) {
            vm.global = res.body.data
          }
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.fetchData()
    })
  }
}
</script>
<style lang="less" scoped>
#batch {
  .gmsg {
    .item {
      display: grid;
      grid-template-columns: 5em auto;
      grid-row-gap: .5em;
      margin: 1em;
      padding: 1em;
      border: 1px solid #efefef;
      border-radius: 4px;
      font-size: 15px;
      .content {
        grid-column-start: 1;
        grid-column-end: 3;
        border: 1px solid #9fd2ae;
        padding: 1em;
        margin: .5em 0;
        border-radius: 4px;
      }
      .withdraw {
        border: 1px solid #bbb;
        color: #bbb;
        border-radius: 4px;
        cursor: pointer;
        padding: .5em 0;
        text-align: center;
        &:hover {
          border-color: #eaa19d;
          color: #eaa19d;
        }
      }
    }
  }
  @import "./newpost.less";
}
</style>
