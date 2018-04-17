<template xmlns:padding-top="http://www.w3.org/1999/xhtml">
<div class="adminPage">
  <form class="form-horizontal adminForm">
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">修改的题号</label>
      <div class="col-sm-3">
        <input class="form-control" placeholder="problem_id 不填表示创建新的题目" v-model="pId">
      </div>
      <button class="col-sm-1 btn btn-default" @click="dataUpload">上传数据</button>
      <button class="col-sm-1 btn btn-default" style="margin-left: 20px" @click="dataModify">修改题目</button>
    </div>
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">题目名称</label>
      <div class="col-sm-6">
        <input class="form-control" placeholder="problem_title" v-model="pTitle">
      </div>
    </div>
    <div v-if="isData && isModify">
      <div class="form-group adminFormGroup">
        <label class="col-sm-3 control-label">Data压缩包</label>
        <div class="col-sm-9" >
          <input type="file" ref="fileData">
        </div>
        <div class="col-sm-9" style="text-align: left; color: #aaaaaa; margin-top: 20px">提示：压缩包内输入与输出文件一一对应，格式：“a1.in" “a1.out”</div>
      </div>
      <div class="form-group adminFormGroup">
        <label class="col-sm-3 control-label">Special Judge文件</label>
        <div class="col-sm-6" style="padding-top: 7px">
          <input type="file" ref="fileSpj">
        </div>
      </div>
      <div class="form-group adminFormGroup" style="margin-bottom: 70px">
        <label class="col-sm-3 control-label">Special Judge 语言</label>
        <div class="col-sm-1" style="padding-top: 7px">
          <input type="checkbox" v-model="isCpp">
          <label>cpp</label>
        </div>
        <div class="col-sm-1" style="padding-top: 7px">
          <input type="checkbox" v-model="isJava">
          <label>java</label>
        </div>
        <div class="col-sm-1" style="padding-top: 7px">
          <input type="checkbox" v-model="isPython">
          <label>python</label>
        </div>
      </div>
      <hr>
      <button type="submit" class="btn btn-default" @click="dataSubmit"
        style="margin-top: 20px">Submit</button>
    </div>
    <div v-if="!(isData && isModify)">
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
      <button type="submit" class="btn btn-default" @click="problemSubmit">{{buttonInfo}}</button>
      <div style="margin-top: 20px"><label v-if="isInfo">{{submitInfo}}</label></div>
    </div>
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
        submitInfo: '',
        isData: false,
        isModify: false,
        buttonInfo: '创建新题',
        isCpp: false,
        isJava: false,
        isPython: false
      }
    },
    methods: {
      dataSubmit: function (e) {
        e.preventDefault()
        if(this.$refs.fileData.files.length > 0) {
          let sendPackage = new FormData()
          sendPackage.append('data', this.$ref.fileData.files[0])
        }
        if(this.$ref.fileSpj.files.length > 0) {
          let sendPackage = new FormData()
          sendPackage.append('data', this.$ref.fileData.files[0])
          sendPackage.append('lang', this.isCpp ? 0 : this.isJava ? 1 : 2)
        }
      },
      dataUpload: function (e) {
        e.preventDefault()
        this.isData = true
        this.dataGet()
      },
      dataGet: function () {
        this.isModify = false
        this.$http.get(`${window.noPointHost}/api/problem/${this.pId}`,
          {crossDomain : true, credentials : true}).then(res => {
          if(res.body.code !== 0){
            alert(`Error: ${res.body.code}`)
          } else {
            console.log(res)
            this.pDescription = res.body.data.content.description
            this.pInput = res.body.data.content.input
            this.pOutput = res.body.data.content.output
            this.pSInput = res.body.data.content.sample_input
            this.pSOutput = res.body.data.content.sample_output
            this.pHint = res.body.data.content.hint
            this.pTitle = res.body.data.title
            //this.pMemory = res.body.data.memory
            //this.pTime = res.body.data.time
            this.pCase = res.body.data.cases
            this.pSpj = res.body.data.special_judge
            this.pDM = res.body.data.detail_judge
            this.pLevel = res.body.data.level
            let str = ''
            res.body.data.tags.forEach( (item, i) => {
              if(i !== 0) str += '='
              str += item.name
            })
            this.pTag = str
            this.initView()
            this.buttonInfo = "修改题目"
            this.isModify = true
          }
        }, err => {
          console.log(err)
          alert("Error: " + err.body.code)
        })
      },
      dataModify: function (e) {
        e.preventDefault()
        this.isData = false
        this.dataGet()
      },
      problemSubmit : function (e) {
        e.preventDefault()
        let sendPackge = {}
        sendPackge.title = this.pTitle
        sendPackge.cases = this.pCase
        sendPackge.time_limit = this.pTime
        sendPackge.memory_limit = this.pMemory
        sendPackge.type = "0"
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
        let _this = this
        this.$http.post(this.isModify ? `${window.noPointHost}/api/admin/problem/update/${this.pId}`
            : `${window.noPointHost}/api/admin/problem/add`, sendPackge,
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
        this.createEditor(this.$refs.pDescription, "pDescription")
        this.createEditor(this.$refs.pInput, "pInput")
        this.createEditor(this.$refs.pOutput, "pOutput")
        this.createEditor(this.$refs.pSInput, "pSInput")
        this.createEditor(this.$refs.pSOutput, "pSOutput")
        this.createEditor(this.$refs.pHint, "pHint")
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
