<template>
<div id="problemPage" >
  <h2 align="left" class="col-sm-12">{{problemContent.problemsName}}</h2>
  <div>
    <div v-bind:class="{'col-sm-9' : !isSee, 'col-sm-6': isSee}" class="col-sm-offset-1 problemDescription">
      <div>
        <h4 align="left">题目描述</h4><hr>
        <pre>{{problemContent.problemsDescription}}</pre>
      </div>
      <div>
        <h4 align="left">输入格式</h4><hr>
        <pre>{{problemContent.inputDescription}}</pre>
      </div>
      <div>
        <h4 align="left">输出格式</h4><hr>
        <pre>{{problemContent.outputDescription}}</pre>
      </div>
      <div>
        <h4 align="left">数据范围</h4><hr>
        <pre>{{problemContent.limitDescription}}</pre>
      </div>
      <div>
        <h4 align="left">样例输入</h4><hr>
        <pre>{{problemContent.sampleInput}}</pre>
      </div>
      <div>
        <h4 align="left">样例输出</h4><hr>
        <pre>{{problemContent.sampleOutput}}</pre>
      </div>
    </div>
    <div class="col-sm-1 seeSubmitDiv">
      <div  class="seeSubmit" :class="{'seeSubmitLeft': !isSee, 'seeSubmitRight': isSee}"
            @click="iCanSee"></div>
    </div>
    <transition name="fade" mode="in-out">
      <div class="col-sm-3" id="problemSubmit" v-if="isSee">
        <nav class="navbar navbar-default" role="navigation">
            <div class="navbar-header navbar-brand" >Code</div>
            <div>
              <ul class="nav navbar-nav navbar-right">
                <li class="navbar-text">语言</li>
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
          <editor v-model="submitCode" @init="editorInit" lang="c_cpp" theme="github" height="480px"></editor>
        </div>
      </div>
    </transition>
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
      submitCode: '#include <iostream>',
      isSee: false
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
    },
    setLan: function (Lan) {
      this.submitLan = Lan
    },
    editorInit: function () {
      require('brace/mode/html')
      require('brace/mode/javascript')
      require('brace/mode/c_cpp')
      require('brace/mode/less')
      require('brace/theme/github')
    },
    iCanSee: function () {
      this.isSee = !this.isSee
    }
  }
}
</script>

<style scoped>
#problemPage pre{
  text-align: left;
  background: white;
  margin-bottom: 30px;
  border: none;
  color: #13293D;
}
#problemSubmit {
  background: #16aad8;
  margin-top: 40px;
  height: 550px;
  padding-left: 0;
  padding-right: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 5px 5px 5px rgb(150, 150, 150);
}
.problemDescription{
  margin-top: 40px;
  background: white;
  padding: 20px;
  height: 550px;
  overflow: auto;
  transition: all 1s;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(150, 150, 150);
}
#problemSubmit nav{
  padding-right: 20px;
  margin: 0;
  background: #16aad8;
  text-align: left;
  border: none;
  border-radius: 0;
}
#problemSubmit .navbar-header, #submitLanguage{
  color:white;
  background: #212121;
}
#codeArea{
  padding: 10px 0;
}
#problemSubmit button{
  margin-top: 20px;
  float: right;
}
#problemPage h4{
  font-weight: bold;
  color: #13293D;
}
#problemPage h2{
  background: #2cbfec;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom:  10px;
  margin: 0;
  font-weight: 600;
  font-family: "inherit";
  color: white;
  box-shadow: 5px 5px 5px rgb(150, 150, 150);
}
.seeSubmit{
  height: 550px;
  width: 30%;
  margin-top: 40px;
  margin-left: 0;
  transition: all 1s;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  box-shadow: 5px 5px 5px rgb(150, 150, 150);
}
.seeSubmit:hover{
  cursor: pointer;
}
.seeSubmitDiv{
  padding: 0;
}
.seeSubmitLeft{
  background: #2cbfec;
  position: absolute;
  left: 0;
}
.seeSubmitRight{
  position: absolute;
  left: 70%;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
  background: #16aad8;
}
.submitButton {
  padding: 5px 100px;
  margin: 5px 30%;
}
.fade-enter-active{
  transition: opacity .5s;
  transition-delay: .5s;
}
.fade-leave-to{
  transition: opacity .2s;
}
.fade-enter{
  opacity: 0;
}
.fade-leave-to{
  opacity: 0;
}
#problemPage .navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover{
  background: #2cbfec;
  border-radius: 10px;
}

#problemPage ::-webkit-scrollbar
{
  width: 16px;
  height: 16px;
  background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
#problemPage ::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
#problemPage ::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: rgb(120, 120, 120);
}
#problemPage .navbar-header{
  font-weight: bold;
}
#problemPage .navbar-text{
  color: white;
}
</style>
