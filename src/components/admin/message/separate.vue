<template>
<div id="separate">
  <h3>给用户<div class="usr"><img width="36px" height="36px" :src="img"><span>{{$route.params.id}}</span></div>发送消息</h3>
  <div class="newpost">
    <div class="head">
      <input placeholder="标题" class="title" v-model="msg.title">
      <div class="upbtn" @click="upload">发送</div>
    </div>
    <mavon-editor v-model="msg.message" @save="upload"></mavon-editor>
  </div>
</div>
</template>
<script>
export default {
  name: 'separate',
  data: function () {
    return {
      msg: {
        title: '',
        message: ''
      }
    }
  },
  methods: {
    upload: function () {
      const vm = this
      vm.$router.unifyQuery(vm, {
        title: '发送系统私信给用户' + this.$route.params.id,
        api: '/api/admin/message/',
        id: vm.$route.params.id,
        package: {
          title: vm.msg.title,
          message: vm.msg.message
        }
      })
    }
  },
  computed: {
    img: function () {
      return window.noPointHost + '/api/avatar/' + this.$route.params.id
    }
  }
}
</script>
<style lang="less" scoped>
#separate {
  h3 {
    .usr {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: .5em 1em;
      margin: 0 1em;
      display: inline-block;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: inline-block;
      }
      span {
        padding: .5em 1em;
      }
    }
  }
  @import "newpost.less";
}
</style>
