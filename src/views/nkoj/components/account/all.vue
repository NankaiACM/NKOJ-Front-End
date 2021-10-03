<template>
<div id="all">
  <router-link v-for="(item, index) in all" :key="index" :to="'/problem/' + item" class="mbtn" :class="{ac: ac.indexOf(item) !== -1}">
    {{item}}
  </router-link>
</div>
</template>
<script>
export default {
  name: 'all',
  computed: {
    all: function () {
      return this.$store.state.userData.o.all
    },
    ac: function () {
      return this.$store.state.userData.o.ac
    }
  }
}
</script>
<style lang="less" scoped>
#all {
  padding: 0 30px;
  .mbtn {
    display: inline-block;
    text-decoration: none;
    color: #233;
    border: 1px solid #233;
    border-radius: 4px;
    padding: .4em 1em;
    margin: .3em 1em;
    &:hover {
      color: #5cf;
      border-color: #5cf;
    }
    &.ac {
      color: #2cbfec;
      border-color: #2cbfec;
    }
  }
}
</style>
