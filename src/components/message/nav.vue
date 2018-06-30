<template>
<div id="msgnav">
  <h3>消息中心</h3>
  <router-link class="a" tag="div" to="/message/system">系统通知</router-link>
  <router-link class="a" tag="div" to="/message/whisper">我的私信</router-link>
  <router-link class="a" tag="div" to="/message/block">黑名单</router-link>
</div>
</template>
<script>
export default {
  name: 'msgnav'
}
</script>
<style lang="less" scoped>
#msgnav {
  h3 {
    text-align: center;
  }
  .a {
    padding: 1em 2em;
    margin: 1em 2em;
    background: #fff;
    border-radius: .5em;
    box-shadow: 0 0 3px #ccc;
    cursor: pointer;
    border-color: #fff;
    &:hover {
      border-left: 20px solid darken(#fff, 5%);
    }
  }
}
</style>
