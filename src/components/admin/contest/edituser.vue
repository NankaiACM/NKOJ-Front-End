<template>
<div id="edituser">
  <h3>添加/删除竞赛的用户</h3>
  <addrm subitem="用户ID" supitem="比赛ID" add-a-p-i="/user/add/" rm-a-p-i="/user/remove/"></addrm>
</div>
</template>
<script>
import addrm from './addrm'
export default {
  name: 'edituser',
  components: {addrm},
  mounted () {
    if (this.$route.params.id) {
      this.$http.get(`${noPointHost}/api/contest/${this.$route.params.id}`)
        .then(function (res) {
          console.log(res)
        })
    }
  }
}
</script>
<style lang="less" scoped>
#edituser{
  position: relative;
  min-height: 100%;
  z-index: 141;
}
</style>
