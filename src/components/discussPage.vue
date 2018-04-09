<template>
<div id="discuss-page" class="container-fluid">
  <div id="discuss-list" class="col-md-8">
  <discuss-cell  v-for="(item, index) in list" :key="index" :item="item"></discuss-cell>
  </div>
</div>
</template>
<script>
import discussCell from './discuss/discussCell.vue'
export default {
  name: 'discussPage',
  data: function() {
    return {
      list: [{
        id: '123',//讨论的id
        title: '这是标题',
        nodes: ['a','b'],
        sponsor: 'cc',//发起
        terminator: 'dd',//最后回复,
        s_ttamp: '1523177873441',//发起时间戳
        t_ttamp: '1523177873441',//最后回复时间戳
        v_c: '100',//查看量
        r_c: '100',//回复量
      }]
    }
  },
  methods: {},
  components: {
    discussCell
  }
}
</script>
<style>
#discuss-page {
  background: #fdfdfd;
}

#discuss-list {
  padding-top: 60px;
}
</style>
