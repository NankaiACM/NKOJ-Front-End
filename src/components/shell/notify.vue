<template>
<div id="notify" :class="{show: show}">
  <div class="t">{{title}}</div>
  <div class="m">{{message}}</div>
  <div class="x" @click="close"><span class="glyphicon glyphicon-remove"></span></div>
</div>
</template>
<script>
export default {
  name: 'notify',
  props: ['title', 'message', 'count'],
  data: function () {
    return {
      show: false
    }
  },
  watch: {
    count: function () {
      this.show = true
    }
  },
  methods: {
    close: function () {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
#notify {
  background: #fff;
  box-shadow: 0 0 10px 1px #ccc;
  position: fixed;
  padding: 1em 30px 1em 1em;
  z-index: 141;
  bottom: 1em;
  right: -110%;
  transition: all 1.41s;
  .t {
    font-weight: 700;
  }
  .t, .m {
    padding: .3em 1em;
  }
  .x {
    position: absolute;
    right: .5em;
    top: .5em;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    background: #eee;
    transition: all .41s;
    color: #ccc;
    &:hover {
      background: #999;
    }
    .glyphicon {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
  &.show {
    right: 1em;
  }
}
</style>
