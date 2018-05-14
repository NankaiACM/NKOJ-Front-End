<template>
<div id="details-container">
  <div id="status-details">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          {{title}}
          <button type="button" class="close" @click="remove"><span>&times;</span></button>
        </div>
        <div class="modal-body" v-html="markdownBody">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="remove">你猜这是不是关闭按钮</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'status-details',
  props: ['datas'],
  data: function () {
    return {
      markdownBody: 'null',
      title: '404',
      cpdt: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.showdata(this.datas)
    })
  },
  methods: {
    remove: function () {
      this.$emit('rmdt')
    },
    showdata: function (data) {
      console.log('show' + data)
      if (!data) return
      var ret = `
        problem id: ${data.problem_id}
        solution id: ${data.solution_id}
        status_id: ${data.status_id}
        user: ${data.user_id}
        language: ${data.language}
        code size: ${data.code_size}
        time: ${data.time}
        memory: ${data.memory}
        when: ${data.when}
        msg: ${data.msg_short}
        msg en: ${data.msg_en}
        msg cn: ${data.msg_cn}
      `
      this.markdownBody = marked(ret)
      this.title = data.solution_id
    }
  }
}
</script>
<style scoped>
#details-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
