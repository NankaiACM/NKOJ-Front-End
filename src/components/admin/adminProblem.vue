<template>
<div class="adminPage">
  <form class="form-horizontal adminForm">
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">修改/上传的题号</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="problem_id">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">题目名称</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="problem_title">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">内存限制(KB)</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="memory">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">时间限制(ms)</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="time">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label  class="col-sm-3 control-label">
        编辑类型
      </label>
      <div class="col-sm-1  checkbox">
        <label>
          <input type="checkbox"> markdown
        </label>
      </div>
      <div class="col-sm-1 checkbox">
        <label>
          <input type="checkbox"> html
        </label>
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">题目描述文件(md)</label>
      <div class="col-sm-3">
        <input type="file">
      </div>
      <div class="col-sm-3">
        <button type="submit" class="btn btn-default">Download origin md/html file</button>
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">数据组数</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="number">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label  class="col-sm-3 control-label">
        评测类型
      </label>
      <div class="col-sm-1 checkbox">
        <label>
          <input type="checkbox"> Special Judge
        </label>
      </div>
      <div class="col-sm-1 checkbox">
        <label>
          <input type="checkbox"> Detailed Mode
        </label>
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">Tag</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="tag">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">题目权限等级</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="level">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <div class="col-sm-11">
        <button type="submit" class="btn btn-default">Submit</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
  export default {
    name: 'admin-problem'
  }
</script>

<style scoped>
.adminPage{
  background: #f5f5f5;
  padding: 20px 0;
}
.adminForm{
  background: white;
  padding: 20px 0;
  border-radius: 5px;
  width: 80%;
  margin-left: 10%;
  transition: all 0.2s;
}
.adminForm:hover{
  box-shadow: 0 0 15px 1px #e1e1e1;
}
.adminFormGroup {
  margin-top: 45px;
}
</style>
