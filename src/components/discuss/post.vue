<template>
  <div id="post" class="container-fluid ">
    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 col-xs-12">
      <post-cell :item=tmp></post-cell>
    </div>
  </div>
</template>
<script>
import postCell from './discussCell.vue'
export default {
  name: 'post',
  data: function () {
    return {
      tmp: {
        id: '123',//讨论的id
        title: '这是标题',
        article: 'no words<br>w<br>w<br>w<br>w',
        nodes: ['a','b'],
        sponsor: 'cc',//发起
        terminator: 'dd',//最后回复,
        s_ttamp: '1523177873441',//发起时间戳
        t_ttamp: '1523177873441',//最后回复时间戳
        v_c: '100',//查看量
        r_c: '100',//回复量
      }
    }
  },
  components: {
    postCell
  }
}
</script>
<style lang="less">
#post {
  padding-top: 60px;
}
</style>
