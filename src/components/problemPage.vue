<template>
<div id="problemPage" >
  <h2 align="left" class="col-sm-12">{{problemContent.problemsID}}: {{problemContent.problemsName}}</h2>
  <div class="col-sm-6" id="problemDescription">
    <div>
      <h4 align="left">题目描述</h4>
      <pre>{{problemContent.problemsDescription}}</pre>
    </div>
    <div>
      <h4 align="left">输入格式</h4>
      <pre>{{problemContent.inputDescription}}</pre>
    </div>
    <div>
      <h4 align="left">输出格式</h4>
      <pre>{{problemContent.outputDescription}}</pre>
    </div>
    <div>
      <h4 align="left">数据范围</h4>
      <pre>{{problemContent.limitDescription}}</pre>
    </div>
    <div>
      <h4 align="left">样例输入</h4>
      <pre>{{problemContent.sampleInput}}</pre>
    </div>
    <div>
      <h4 align="left">样例输出</h4>
      <pre>{{problemContent.sampleOutput}}</pre>
    </div>
  </div>
  <div class="col-sm-5" id="problemSubmit">
    <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header navbar-brand">Code</div>
        <div>
          <ul class="nav navbar-nav navbar-right">
            <li><a>语言</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="submitLanguage">
                {{submitLan}}
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                <li><a v-on:click="setLan('C++')">C++</a></li>
                <li><a v-on:click="setLan('Java')">Java</a></li>
                <li><a v-on:click="setLan('Python')">Python</a></li>
                <li><a v-on:click="setLan('JavaScript')">JavaScrpit</a></li>
                <li><a v-on:click="setLan('Pascal')">Pascall</a></li>
                <li><a v-on:click="setLan('Html')">Html</a></li>
                <li><a v-on:click="setLan('Css')">Css</a></li>
              </ul>
            </li>
          </ul>
        </div>
    </nav>
    <div id="codeArea">
      <editor v-model="submitCode" @init="editorInit" lang="c_cpp" theme="terminal" height="400px"></editor>
    </div>
    <button type="button" class="btn btn-success">提交</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'problems-page',
  data: function () {
    return {
      problemContent: '',
      submitLan: 'C++',
      submitCode: '#include <iostream>'
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  methods: {
    initView: function () {
      var _this = this
      this.$http.get('/static/problemsMoreData.json').then(function (res) {
        res.body.data.forEach(function (val) {
          console.log(val)
          if (val.problemsID === _this.$route.params.id) {
            _this.problemContent = val
          }
        })
      })
      console.log(this.$editor.fontSize)
    },
    setLan: function (Lan) {
      this.submitLan = Lan
    },
    editorInit: function () {
      require('vue2-ace-editor/node_modules/brace/mode/html')
      require('vue2-ace-editor/node_modules/brace/mode/javascript')
      require('vue2-ace-editor/node_modules/brace/mode/c_cpp')
      require('vue2-ace-editor/node_modules/brace/mode/less')
      require('vue2-ace-editor/node_modules/brace/theme/terminal')
    }
  }
}
</script>

<style scoped>
#problemPage pre{
  text-align: left;
  background: white;
  margin-bottom: 30px;
}
#problemSubmit {
  background: rgb(33, 33, 33);
  margin-top: 20px;
  height: 550px;
}
#problemSubmit nav{
  padding: 0;
  margin: 0;
}
#problemDescription{
  margin-top: 20px;
  background: white;
  padding: 20px;
  margin-left: 20px;
  height: 550px;
  overflow: auto;
}
#problemSubmit nav{
  text-align: left;
  background: rgb(33, 33, 33);
  border: none;
}
#problemSubmit .navbar-header, #submitLanguage{
  color:white;
}
#codeArea{
  padding: 10px 0;
  background: black;
}
#problemSubmit button{
  margin-top: 20px;
  float: right;
}
#problemPage h4{
  font-weight: bold;
}
#problemPage h2{
  background: lightseagreen;
  padding: 10px;
  margin: 0;
  font-weight: bolder;
  color: white;
}
</style>
