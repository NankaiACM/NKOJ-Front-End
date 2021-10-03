<template>
<div id="nav">
  <div class="w">
    <router-link to="/account/setting" class="a">我的信息</router-link>
    <router-link to="/account/qus" class="a">我的题目</router-link>
    <router-link to="/account/avatar" class="a">我的头像</router-link>
  </div>
</div>
</template>
<script>
export default {
  name: 'nokinav'
}
</script>
<style lang="less" scoped>
#nav {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding-top: 20px;
  .w {
    width: 100%;
    .a {
      display: block;
      width: 100%;
      height: 41px;
      margin: 20px 0;
      font-size: 16px;
      line-height: 41px;
      text-decoration: none;
      text-align: center;
      color: #233;
      transition: all .41s;
      &:hover {
        color: #10a1d6;
      }
    }
  }
}
</style>
