<template>
<div class="modal fadein" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" ref="model">
  <div class="modal-dialog " role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="fadeout"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">
          {{person.nickname}} at
          <router-link class="btn btn-primary" :to="'/problem/' + it.problem_id" target="_blank">
            {{it.problem_id}}
            <span class="badge">{{detail.tried.length}}</span>
          </router-link>
        </h4>
      </div>
      <div class="modal-body">
        得分：<button class="btn btn-default">{{detail.score}}</button><br>
        点击提交id可查看提交详情<br>
        裁定分数使用提交:
        <router-link class="btn btn-success" :to="'/details/' + detail.selected" target="_blank">{{detail.selected}}</router-link>
        <br>
        历史提交:<br>
        <router-link v-for="(item,index) in detail.tried" :key="index" class="btn btn-primary" :to="'/details/' + item" target="_blank">{{item}}</router-link>
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
.modal {
  display: none;
}
.modal-content {
  width: 100%;
}
</style>


