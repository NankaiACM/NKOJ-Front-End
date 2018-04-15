<template>
<div class="adminPage">
  <form class="form-horizontal adminForm">
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">修改/上传的题号</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="problem_id" v-model="pId">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">题目名称</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="problem_title" v-model="pTitle">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">内存限制(KB)</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="memory" v-model="pMemory">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">时间限制(ms)</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="time" v-model="pTime">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">数据组数</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="number" v-model="pCase">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label  class="col-sm-3 control-label">
        评测类型
      </label>
      <div class="col-sm-1 checkbox">
        <label>
          <input type="checkbox" v-model="pSpj"> Special Judge
        </label>
      </div>
      <div class="col-sm-1 checkbox">
        <label>
          <input type="checkbox" v-model="pDM"> Detailed Mode
        </label>
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">Tag</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="tag间使用=分隔，例如线段树=数据结构=动态规划" v-model="pTag">
      </div>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">题目难度</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="level" v-model="pLevel">
      </div>
    </div>
    <hr>
    <div>
      <label>题目描述</label>
      <div ref="pDescription" class="adminEditor"></div>
    </div>
    <hr>
    <div>
      <label>输入描述</label>
      <div ref="pInput" class="adminEditor"></div>
    </div>
    <hr>
    <div>
      <label>输出描述</label>
      <div ref="pOutput" class="adminEditor"></div>
    </div>
    <hr>
    <div>
      <label>样例输入</label>
      <div ref="pSInput" class="adminEditor"></div>
    </div>
    <hr>
    <div>
      <label>样例输出</label>
      <div ref="pSOutput" class="adminEditor"></div>
    </div>
    <hr>
    <div>
      <label>Hint</label>
      <div ref="pHint" class="adminEditor"></div>
    </div>
    <hr>
    <button type="submit" class="btn btn-default" @click="problemSubmit">Submit</button>
    <div style="margin-top: 20px"><label v-if="isInfo">{{submitInfo}}</label></div>
  </form>
</div>
</template>

<script>
  import Editor from '../../../bin/wangEditor'
  export default {
    name: 'admin-problem',
    data: function () {
      return {
        pDescription: '',
        pInput: '',
        pOutput: '',
        pSInput: '',
        pSOutput: '',
        pId: '',
        pTitle: '',
        pMemory: '',
        pTime: '',
        pCase: '',
        pSpj: false,
        pDM: false,
        pTag: '',
        pLevel: '',
        pHint: '',
        isInfo: false,
        submitInfo: ''
      }
    },
    methods: {
      problemSubmit : function (e) {
        e.preventDefault()
        let sendPackge = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        sendPackge.title = this.pTitle
        sendPackge.cases = this.pCase
        sendPackge.time_limit = this.pTime
        sendPackge.memory_limit = this.pMemory
        sendPackge.type = 1
        sendPackge.special_judge = this.pSpj
        sendPackge.detail_judge = this.pDM
        sendPackge.tags = this.pTag.split('=')
        sendPackge.description = this.pDescription
        sendPackge.input = this.pInput
        sendPackge.output = this.pOutput
        sendPackge.sample_input = this.pSInput
        sendPackge.sample_output = this.pSOutput
        sendPackge.hint = this.pHint
        sendPackge.level = this.pLevel
        sendPackge.pid = this.pId
        let _this = this
        this.$http.post(`${window.noPointHost}/api/admin/problem/add`, sendPackge,
          {crossDomain : true, credentials : true}).then(res => {
          console.log(res)
          _this.isInfo = true;
          if(res.body.code === 0) {
            _this.submitInfo = '成功提交！'
          } else {
            _this.submitInfo = '未知错误！'
          }
        }, err => {
          _this.isInfo = true;
          if(err.body.code === 401){
            _this.submitInfo = '请您登陆！'
          } else {
            _this.submitInfo = '未知错误！'
          }
        })
      },
      createEditor: function (x, y) {
        let editor = new Editor(x)
        editor.customConfig.onchange = (html) => {
          y = html
        }
        editor.customConfig.uploadImgServer = `${window.noPointHost}/api/admin/upload`
        editor.customConfig.uploadFileName = 'file'
        editor.customConfig.uploadImgHooks = {
          customInsert: function (insertImg, result, editor) {
            var url = result.data[0]
            insertImg(`${window.noPointHost}${url}`)
          }
        }
        editor.create()
      },
      initView: function () {
        this.createEditor(this.$refs.pDescription, this.pDescription)
        this.createEditor(this.$refs.pInput, this.pInput)
        this.createEditor(this.$refs.pOutput, this.pOutput)
        this.createEditor(this.$refs.pSInput, this.pSInput)
        this.createEditor(this.$refs.pSOutput, this.pSOutput)
        this.createEditor(this.$refs.pHint, this.pHint)
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
