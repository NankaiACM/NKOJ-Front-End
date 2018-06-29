<template>
  <div id="mngCP" class="bginputbg">
    <h3>{{title}}</h3>
    <div id="bginput" :class="{gray: id === ''}">
      <div class="b">
        <input :placeholder="cp + ' id'" class="i" v-model="id">
        <div class="r" @click="mngCP">{{mng}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mngCP',
  props: ['title', 'cp', 'mng'],
  data: function () {
    return {
      id: ''
    }
  },
  methods: {
    mngCP: function () {
      const vm = this
      vm.$router.mngCP(vm, vm.cp, vm.mng, vm.id)
    }
  }
}
</script>
<style lang="less" scoped>
@import "../bginput.less";
</style>
