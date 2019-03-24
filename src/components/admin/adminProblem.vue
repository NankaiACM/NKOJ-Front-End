<template>
<div class="adminPage">
  <h3>添加题目</h3>
  <form class="form-horizontal adminForm">
    <div class="form-group adminFormGroup">
      <label class="col-sm-3 control-label">修改的题号</label>
      <div class="col-sm-3">
        <input class="form-control" placeholder="problem_id 不填表示创建新的题目" v-model="pId">
      </div>
      <button class="btn btn-default" @click="dataUpload">上传数据</button>
      <button class="btn btn-default" style="margin-left: 20px" @click="dataModify">修改题目</button>
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
        <div class="col-sm-6">
          <select class="form-control" v-model="spjlang">
            <option value="0">C</option>
            <option value="1">C++</option>
            <option value="2">JavaScript</option>
            <option value="3">Python</option>
            <option value="4">Go</option>
          </select>
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
        <label class="col-sm-3 control-label">用户程序最大输出(kb)</label>
        <div class="col-sm-6">
          <input class="form-control" placeholder="number" v-model="max_output">
        </div>
      </div>
      <div class="form-group adminFormGroup">
        <label class="col-sm-3 control-label">最大核心数</label>
        <div class="col-sm-6">
          <input class="form-control" placeholder="number" v-model="max_core">
        </div>
      </div>
      <div class="form-group adminFormGroup">
        <label  class="col-sm-3 control-label">
          Special Judge
        </label>
        <div class="col-sm-2 checkbox">
          <select class="form-control" v-model="pSpj">
            <option value="0">无</option>
            <option value="1">compare</option>
            <option value="2">interactive</option>
          </select>
        </div>
      </div>
      <div class="form-group adminFormGroup">
        <label  class="col-sm-3 control-label">
          Detailed Mode
        </label>
        <div class="col-sm-1 checkbox">
          <label>
            <input type="checkbox" v-model="pDM"> 
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
      <div id="editbox-wrp">
        <div>
          <label>题目描述</label>
          <mavon-editor v-model="pDescription"/>
        </div>
        <hr>
        <div>
          <label>输入描述</label>
          <mavon-editor v-model="pInput"/>
        </div>
        <hr>
        <div>
          <label>输出描述</label>
          <mavon-editor v-model="pOutput"/>
        </div>
        <hr>
        <div>
          <label>样例输入</label>
          <mavon-editor v-model="pSInput"/>
        </div>
        <hr>
        <div>
          <label>样例输出</label>
          <mavon-editor v-model="pSOutput"/>
        </div>
        <hr>
        <div>
          <label>Hint</label>
          <mavon-editor v-model="pHint"/>
        </div>
        <hr>
      </div>
      <button type="submit" class="btn btn-default" @click="problemSubmit">{{buttonInfo}}</button>
      <div style="margin-top: 20px"><label v-if="isInfo">{{submitInfo}}</label></div>
      <div></div>
    </div>
  </form>
</div>
</template>

<script>
import Editor from '../../../bin/wangEditor'
// const Editor = () => import(/* webpackChunkName: "wang-editor" */ '../../../bin/wangEditor')
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
      spjlang: '0',
      max_output: 65536,
      max_core: 10,
    }
  },
  methods: {
    dataSubmit: function (e) {
      e.preventDefault()
      if (this.$refs.fileData.files.length > 0) {
        let sendPackage = new FormData()
        sendPackage.append('file', this.$refs.fileData.files[0])
        this.$http.post(`${window.noPointHost}/api/admin/problem/data/${this.pId}`, sendPackage, res => {
        })
      }
      if (this.$refs.fileSpj.files.length > 0) {
        let sendPackage = new FormData()
        sendPackage.append('file', this.$refs.fileSpj.files[0])
        sendPackage.append('lang', this.spjlang)
        this.$http.post(`${window.noPointHost}/api/admin/problem/spj/${this.pId}`, sendPackage, res => {
        })
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
        {crossDomain: true, credentials: true}).then(res => {
        if (res.body.code !== 0) {
          alert(`Error: ${res.body.code}`)
        } else if (res.body.data === 'data not found') {
          this.initView();
          this.buttonInfo = '修改题目'
          this.isModify = true
        } else {
          this.pDescription = res.body.data.content.description
          this.pInput = res.body.data.content.input
          this.pOutput = res.body.data.content.output
          this.pSInput = res.body.data.content.sample_input
          this.pSOutput = res.body.data.content.sample_output
          this.pHint = res.body.data.content.hint
          this.pTitle = res.body.data.title
          this.pMemory = res.body.data.memory_limit
          this.pTime = res.body.data.time_limit
          this.pCase = res.body.data.cases
          this.pSpj = res.body.data.special_judge
          this.pDM = res.body.data.detail_judge
          this.pLevel = res.body.data.level
          let str = ''
          res.body.data.tags.forEach((item, i) => {
            if (i !== 0) str += '='
            str += item.name
          })
          this.pTag = str
          this.initView()
          this.buttonInfo = '修改题目'
          this.isModify = true
        }
      }, err => {
        alert('Error: ' + err.body.code)
      })
    },
    dataModify: function (e) {
      e.preventDefault()
      this.isData = false
      this.dataGet()
    },
    problemSubmit: function (e) {
      e.preventDefault()
      let sendPackge = {}
      sendPackge.title = this.pTitle
      sendPackge.cases = Number(this.pCase)
      sendPackge.time_limit = this.pTime
      sendPackge.memory_limit = this.pMemory
      sendPackge.type = '0'
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
      sendPackge.max_output = this.max_output
      sendPackge.max_core = this.max_core
      let _this = this
      this.$http.post(this.isModify ? `${window.noPointHost}/api/admin/problem/update/${this.pId}`
        : `${window.noPointHost}/api/admin/problem/add`, sendPackge,
      {crossDomain: true, credentials: true}).then(res => {
        _this.isInfo = true
        if (res.body.code === 0) {
          _this.submitInfo = '成功提交！'
        } else {
          _this.submitInfo = '未知错误！'
        }
      }, err => {
        _this.isInfo = true
        if (err.body.code === 401) {
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
      /*
      this.createEditor(this.$refs.pDescription, 'pDescription')
      this.createEditor(this.$refs.pInput, 'pInput')
      this.createEditor(this.$refs.pOutput, 'pOutput')
      this.createEditor(this.$refs.pSInput, 'pSInput')
      this.createEditor(this.$refs.pSOutput, 'pSOutput')
      this.createEditor(this.$refs.pHint, 'pHint')
      */
    }
  },
  mounted () {
    this.initView()
  }
}
</script>

<style scoped>
.adminForm{
  background: white;
  transition: all 0.2s;
  padding: 3em 0;
}
.adminFormGroup {
  margin: 1em 2em;
}
.adminEditor {
  text-align: left;
  width: 80%;
  margin: 2em 10%;
}
#editbox-wrp label {
  margin: 2em 10% 0 10%;
}
</style>
