<template>
<div id="details-container">
  <div id="status-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="details-title">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          {{title}} {{run_id}}
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          {{markdown_body}}
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
  props: ['run_id'],
  data: function() {
    return {
      title: 'title',
      markdown_body: ''
    }
  },
  methods: {},
  watch: {
    run_id: function(){
      var run_id = this.run_id
      this.$http.get('/static/status_details.json',{
        run_id:run_id
      })
      .then(res=>{
        this.markdown_body = res.body.data.markdown_body
      },error=>console.info(error))
    }
  }
}
</script>
<style>
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
