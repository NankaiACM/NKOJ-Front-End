<template>
<div class="modal fadein" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" ref="model">
  <div class="modal-dialog " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">
          {{person.nickname}} at 
          <button class="btn btn-primary" @click="$router.push('/problem/' + it['problem_id'])">
            {{it['problem_id']}}
            <span class="badge">{{detail.tried.length}}</span>
          </button>
        </h4>
      </div>
      <div class="modal-body">
        得分：<button class="btn btn-default">{{detail.score}}</button><br>
        点击提交id可查看提交详情<br>
        裁定分数使用提交: <a class="btn btn-success" @click="$router.push('/details/'+detail.selected)">{{detail.selected}}</a><br>
        历史提交:<br>
        <a v-for="(item,index) in detail.tried" :key="index" class="btn btn-primary" @click="$router.push('/details/' + item)">{{item}}</a>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" @click="fadeout" >Close</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'problemdetail',
  data () {
    return {
      person: '',
      it: ''
    }
  },
  methods: {
    fadeout() {
      this.$refs.model.style.display='none'
    }
  },
  computed: {
    detail () {
      let normal = {selected: 'not yet',tried:[],score: 0}
      if (!this.it['problem_id']) return normal
      return this.person.details[this.it['problem_id']] || normal
    }
  }
}
</script>
<style scoped>
.btn {
  margin: 3px;
}
.modal, .modal-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-content {
  width: 100%;
}
</style>


