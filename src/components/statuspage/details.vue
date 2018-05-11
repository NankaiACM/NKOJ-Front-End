<template>
<div id="details-container">
  <div id="status-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="details-title">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          {{title}}
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body" v-html="markdownBody">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">你猜这是不是关闭按钮</button>
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
      title: '404'
    }
  },
  watch: {
    datas: function (n, o) {
      console.log(n)
      let data = n
      if (!data) return
      var ret = `
        problem id: ${data.problem_id}
        solution id: ${data.solution_id}
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
#status-details.modal.fade.in,
.modal-backdrop.in {
  top: 50px;
}

#status-details.modal.fade.in .modal-dialog {
  top: 50px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 768px) {
  #status-details.modal.fade.in,#status-details.modal.fade.in .modal-dialog {
    left: 150px;
  }
}
</style>
