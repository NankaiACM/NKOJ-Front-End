<template>
<div id="details-container">
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#status-details">测试按钮</button>
  <div id="status-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="details-title">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          {{title}}
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
          {{markdown}}
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
import status_details from '../components/statuspage/details.vue'
export default {
  name: 'status-details',
  props: ['run_id'],
  data: function() {
    return {}
  },
  methods: {}
}
</script>
<style>
#status-details.modal.fade.in,
.modal-backdrop.in {
  top: 50px;
}

#status-details.modal.fade.in .modal-dialog {
  top: 0;
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 768px) {
  #status-details,
  .modal-backdrop.in {
    left: 150px;
  }
}
</style>
