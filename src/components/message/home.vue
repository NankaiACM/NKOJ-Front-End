<template>
<div id="message">
  <div>
    <fish></fish>
  </div>
  <div>
    <router-view tag="div"></router-view>
  </div>
</div>
</template>
<script>
import fish from './nav'
export default {
  name: 'message',
  components: {fish}
}
</script>
<style lang="less" scoped>
#message {
  display: grid;
  grid-template-columns: 300px auto;
}
</style>
