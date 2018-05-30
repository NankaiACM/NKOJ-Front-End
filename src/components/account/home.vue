<template>
<div id="root">
  <div id="nav-wrp">
    <fish></fish>
  </div>
  <div id="body-wrp">
    <router-view name="link">
    </router-view>
    <router-view name="body" class="b-wrp">
    </router-view>
  </div>
</div>
</template>
<script>
import fish from './nav.vue'
export default {
  name: 'home',
  components: {
    fish
  }
}
</script>
<style lang="less" scoped>
#root {
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 60px;
  width: 100vw;
  height: 100vh;
  background: #fff;
  font-family: PingFangSC-Regular,Microsoft YaHei,Arial,Helvetica,sans-serif;
  #nav-wrp {
    position: fixed;
    left: 0;
    width: 240px;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid #ccc;
    z-index: 4;
    &:hover {
      overflow-y: auto;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccd0d7;
      border-radius: 3px;
    }
  }
  #body-wrp {
    position: relative;
    padding-left: 240px;
    height: 100%;
    .b-wrp {
      padding: 30px 41px;
    }
  }
}
</style>
