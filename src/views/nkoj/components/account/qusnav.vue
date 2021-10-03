<template>
<div id="qusnav">
<h3>我的题目
  <router-link to="/account/qus/all" :class="{chose: chose === 'all'}">all</router-link>
  <router-link to="/account/qus/ac" :class="{chose: chose === 'ac'}">ac</router-link></h3>
</div>
</template>
<script>
export default {
  name: 'qusnav',
  props: ['chose'],
  mounted: function () {
    // this.$nextTick(function () {
    // })
  }
}
</script>
<style lang="less" scoped>
#qusnav {
  a {
    font-size: 18px;
    margin: auto 1em;
    padding: 0 1em;
    text-decoration: none;
    color: #233;
    transition: all .41s;
    &:hover {
      color: #2cbfec;
    }
    &.chose {
      color: #2cbfec;
      border-bottom: 1px solid #2cbfec;
    }
  }
}
</style>
