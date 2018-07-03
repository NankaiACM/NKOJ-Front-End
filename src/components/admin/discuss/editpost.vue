<template>
<div id="editpost" class="bginputbg">
  <h3>编辑讨论</h3>
  <div v-if="$route.params.id" class="ctn">
    <div class="tctn">
      <input placeholder="title" class="title" v-model="title">
      <div class="ubtn" @click="upload">更新此讨论</div>
    </div>
    <mavon-editor
      id="marktor"
      :ishljs="true"
      @save="upload"
      v-model="content"
    ></mavon-editor>
  </div>
  <div v-else id="bginput" :class="{gray: id === ''}">
    <div class="b">
      <input placeholder="post id" class="i" v-model="id">
      <router-link :to="'/admin/editpost/' + id" tag="div" class="r">edit</router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'editpost',
  data: function () {
    return {
      id: '',
      title: '',
      content: ''
    }
  },
  methods: {
    upload: function () {
      const vm = this
      vm.$router.unifyQuery(vm, {
        api: '/api/admin/post/edit/',
        id: vm.id,
        title: '编辑讨论#' + vm.id,
        package: {
          title: vm.title,
          content: vm.content
        }
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (!this.$route.params.id) return -1
      const vm = this
      vm.id = vm.$route.params.id
      vm.$http.get(window.noPointHost + '/api/post/' + vm.id)
        .then(function (res) {
          console.log(res)
          vm.$store.commit('setNotify', {
            title: 'fetch post data',
            message: res.body.message
          })
          if (res.body.code === 0) {
            vm.title = res.body.data[0].title
            vm.content = res.body.data[0].content
          }
        }, function (e) {
          console.log(e)
          vm.$store.commit('setNotify', {
            title: 'fetch post data error',
            message: JSON.stringify(e)
          })
        })
    })
  }
}
</script>
<style lang="less" scoped>
@import "../bginput.less";
.ctn {
  margin: 2em 1em;
  .tctn {
    display: grid;
    grid-template-columns: auto 12em;
    margin: 2em 0;
    box-shadow: 0 0 4px #aaa;
    .title {
      font-size: 18px;
      height: 2em;
      line-height: 2em;
      padding: 0 2em;
      outline: none;
      border: none;
      border-bottom: 1px solid #ccc;

    }
    .ubtn {
      font-size: 18px;
      height: 2em;
      line-height: 2em;
      background: #aaa;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
