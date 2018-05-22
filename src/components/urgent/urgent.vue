<template>
  <div class="buyaoji" :class="{hide: btns}">
    <a class="hbtn" href="//acm.nankai.edu.cn/old/">NKOJ</a>
    <a class="hbtn" href="//acm.nankai.edu.cn/nkcoj/">NKCOJ</a>
    <a class="hbtn" @click="clsbtns">关闭</a>
  </div>
</template>
<script>
export default {
  name: 'urgent',
  data: function () {
    return {
      btns: false
    }
  },
  methods: {
    clsbtns: function () {
      this.btns = true
    }
  }
}
</script>
<style lang="less" scoped>
  .buyaoji {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #999999;
    z-index: 999;
    opacity: .8;
    transform: translateZ(10000);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    transition: all 1.41s;
    cursor: pointer;
    .hbtn {
      display: block;
      width: 600px;
      height: 100px;
      line-height: 92px;
      text-align: center;
      background: none;
      border: 4px solid #fff;
      color: #fff;
      font-size: 25px;
      margin: 1em 0;
      box-sizing: border-box;
      text-decoration: none;
    }
  }
  .hide {
    top: -200vh;
  }
</style>
