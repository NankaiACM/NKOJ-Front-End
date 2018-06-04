<template>
  <div id="editque">
    <h3>添加/删除竞赛的题目</h3>
    <addrm subitem="题目ID" supitem="比赛ID" add-a-p-i="/problem/add/" rm-a-p-i="/problem/remove/"></addrm>
  </div>
</template>
<script>
import addrm from './addrm'
export default {
  name: 'editque',
  components: {
    addrm
  }
}
</script>
<style scoped>
#editque{
  position: relative;
  min-height: 100%;
}
</style>
