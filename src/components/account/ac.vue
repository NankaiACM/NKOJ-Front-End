<template>
<div id="ac">
  <router-link v-for="(item, index) in ac" :key="index" :to="'/problem/' + item" class="mbtn">
    {{item}}
  </router-link>
</div>
</template>
<script>
export default {
  name: 'ac',
  computed: {
    ac: function () {
      return this.$store.state.userData.o.ac
    }
  }
}
</script>
<style lang="less" scoped>
#ac {
  padding: 0 30px;
  .mbtn {
    display: inline-block;
    padding: .4em 1em;
    margin: .3em 1em;
    text-decoration: none;
    border: 1px solid #2cbfec;
    color: #2cbfec;
    border-radius: 4px;
  }
}
</style>
