<template>
<div id="find">
  <h3>选择用户</h3>
  <div id="bginput" :class="{gray: id === ''}">
    <div class="b">
      <input placeholder="输入用户id" class="i" v-model="id">
      <div class="r" @click="trans">转到</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'find',
  data: function () {
    return {
      id: ''
    }
  },
  methods: {
    trans: function () {
      if (this.id === '') return -1
      this.$router.push('/admin/sendto/' + this.id)
    }
  }
}
</script>
<style lang="less" scoped>
#find {
  @import "../bginput.less";
}
</style>
