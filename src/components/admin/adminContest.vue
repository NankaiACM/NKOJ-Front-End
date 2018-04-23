<template>
<div class="adminPage">
  <form class="form-horizontal adminForm">
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">修改的比赛</label>
      <div class="col-sm-3">
        <input class="form-control" placeholder="contest_id 不填表示创建新的比赛" v-model="cId">
      </div>
      <button class="col-sm-1 btn btn-default">修改比赛</button>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">比赛开始时间</label>
      <div class="col-sm-3">
        <input class="form-control" placeholder="" type="datetime-local" v-model="cStart">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">比赛结束时间</label>
      <div class="col-sm-3">
        <input class="form-control" placeholder="" type="datetime-local" v-model="cEnd">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">比赛类型</label>
      <div class="col-sm-1" style="padding-top: 7px">
        <input type="checkbox" v-model="isAcm">
        <label>ACM</label>
      </div>
      <div class="col-sm-1" style="padding-top: 7px">
        <input type="checkbox" v-model="isNoip">
        <label>NOIP</label>
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">添加题目</label>
      <div class="col-sm-3">
        <input class="form-control" placeholder="题目id" v-model="pId">
      </div>
      <div class="col-sm-3">
        <input class="form-control" placeholder="在比赛中的编号（A, B，C）" v-model="cpID">
      </div>
      <button class="col-sm-1 btn btn-default">添加</button>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">删除题目</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="题目id" v-model="pId">
      </div>
      <button class="col-sm-1 btn btn-default">删除</button>
    </div>
    <hr>
    <div>
      <label>比赛描述</label>
      <div ref="cDescription" class="adminEditor"></div>
    </div>
    <hr>
    <button type="submit" class="btn btn-default" @click="problemSubmit">{{buttonInfo}}</button>
  </form>
</div>
</template>

<script>
  import Editor from '../../../bin/wangEditor'
  export default {
    name: 'admin-contest',
    data: function () {
      return {
        cId: '',
        cStart: '',
        cEnd: '',
        pId: '',
        cpId: '',
        cDescription: '',
        isAcm: true,
        isNoip: false,
        buttonInfo: '创建比赛'
      }
    },
    methods: {
      createEditor: function (x, y) {
        let editor = new Editor(x)
        editor.customConfig.onchange = (html) => {
          this[y] = html
        }
        editor.customConfig.uploadImgServer = `${window.noPointHost}/api/admin/upload`
        editor.customConfig.uploadFileName = 'file'
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            let url = result.data[0]
            insertImg(`${window.noPointHost}${url}`)
          }
        }
        editor.create()
        editor.txt.html(this[y])
      },
      initView: function () {
        this.createEditor(this.$refs.cDescription, "cDescription")
      }
    },
    watch: {
      isAcm: function (val) {
        if(val) this.isNoip = false
      },
      isNoip: function (val) {
        if(val) this.isAcm = false
      }
    },
    mounted() {
      this.initView()
    }
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
.adminEditor {
  text-align: left;
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}
</style>
