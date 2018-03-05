<template>
<div id="problemPage" >
  <h2 align="left" class="col-sm-12 problemPageTitle">A+B Problem</h2>
  <transition name="up">
    <div class="submitGirl" v-if="isStart" @click="iCanSee"><img src="../assets/Akkarin.png" width="150px" height="150px"></div>
  </transition>
  <transition name="fade">
    <div id="problemSubmit" v-if="isSee">
      <h4>Code: {{submitLan}}</h4>
      <div id="codeArea">
        <editor v-model="submitCode" @init="editorInit" lang="c_cpp" theme="github" height="430px"></editor>
      </div>
      <div>
        <button class="mobileHome btn btn-default" @mouseleave="middleInfo = false" @mouseenter="middleInfo = true" >
          <span class="glyphicon glyphicon glyphicon-cloud-upload"></span>
        </button>
        <div class="mobileLeft dropup">
          <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"
                  @mouseleave="leftInfo = false" @mouseenter="leftInfo = true">
              <span class="glyphicon glyphicon-book" data-toggle="tooltip"  title="提交">
              </span></button>
          <ul class="dropdown-menu">
            <li><a v-on:click="setLan('C++')">C++</a></li>
            <li><a v-on:click="setLan('Java')">Java</a></li>
            <li><a v-on:click="setLan('Python')">Python</a></li>
            <li><a v-on:click="setLan('JavaScript')">JavaScrpit</a></li>
            <li><a v-on:click="setLan('Pascal')">Pascall</a></li>
            <li><a v-on:click="setLan('Html')">Html</a></li>
            <li><a v-on:click="setLan('Css')">Css</a></li>
          </ul>
        </div>
        <button class="mobileRight btn btn-default" @click="iCanSee"
                @mouseleave="rightInfo = false" @mouseenter="rightInfo = true" data-toggle="tooltip"  title="返回"><span class="glyphicon glyphicon-share-alt"></span></button>
      </div>
      <transition name="fade"><label class="bottomInfo bottomInfoLeft" v-if="leftInfo">Language</label></transition>
      <transition name="fade"><label class="bottomInfo" v-if="middleInfo">Submit</label></transition>
      <transition name="fade"><label class="bottomInfo bottomInfoRight" v-if="rightInfo">Back</label></transition>
    </div>
  </transition>
  <div>
    <div class="problemDescription" @click="iCanSee2">
      <div align="left" v-html="problemMarkDown"></div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'problems-page',
  data: function () {
    return {
      problemContent: '',
      problemMarkDownText: '# hahaha ',
      submitLan: 'C++',
      submitCode: '#include <iostream>',
      isSee: false,
      isStart: false,
      middleInfo: false,
      leftInfo: false,
      rightInfo: false
    }
  },
  computed: {
    problemMarkDown: function () {
      return marked(this.problemMarkDownText, {sanitize : true})
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.initView()
    })
  },
  components: {
    editor: require('vue2-ace-editor')
  },
  methods: {
    initView: function () {
      this.$http.get('/static/problemTest.md').then((res) => {
        console.log(res.body)
        this.problemMarkDownText = res.body
        this.isStart = true
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
    test: function () {
      console.log('wtf')
    },
    iCanSee: function (e) {
      this.isSee = !this.isSee
      this.isStart = !this.isStart
      e.preventDefault()
    },
    iCanSee2: function() {
      if(this.isSee){
        this.isSee = !this.isSee
        this.isStart = !this.isStart
      }
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
#problemPage{
  padding-bottom: 30px;
}
#problemSubmit {
  background: white;
  position: fixed;
  z-index: 2;
  right: 60px;
  top: 100px;
  padding: 5px;
  margin-top: 40px;
  width: 300px;
  height: 550px;
  border: solid 5px #16aad8;
  border-radius: 10px;
  box-shadow: 0 5px 5px rgba(150, 150, 150, 0.1), 0 -5px 5px rgba(150, 150, 150, 0.1), 5px 0 5px rgba(150, 150, 150, 0.1), -5px 0 5px rgba(150, 150, 150, 0.1);
}
#problemSubmit:hover{
  box-shadow: 0 5px 5px rgba(150, 150, 150, 0.4), 0 -5px 5px rgba(150, 150, 150, 0.4), 5px 0 5px rgba(150, 150, 150, 0.4), -5px 0 5px rgba(150, 150, 150, 0.4);
}
.problemDescription{
  position: absolute;
  margin-top: 100px;
  top: 0;
  left: 10%;
  right: 10%;
  margin-bottom: 60px;
  background: white;
  padding: 40px 60px;
  overflow: auto;
  transition: all 0.5s;
  border-radius: 10px;
}
.problemDescription:hover{
  box-shadow: 0 5px 5px rgba(150, 150, 150, 0.1), 0 -5px 5px rgba(150, 150, 150, 0.1), 5px 0 5px rgba(150, 150, 150, 0.1), -5px 0 5px rgba(150, 150, 150, 0.1);
}
#problemSubmit nav{
  padding-right: 20px;
  margin: 0;
  background: #16aad8;
  text-align: left;
  border: none;
  border-radius: 0;
}
#problemSubmit h4{
  font-weight: 600;
  color: #16aad8;
  overflow: hidden;
}
#codeArea{
  border: 1px solid rgba(151,159,175,0.8);
  border-radius: 2px;
}
#problemPage h1, h2, h3{
  font-weight: 600;
}
#problemPage .problemPageTitle{
  background: #2cbfec;
  position: fixed;
  z-index: 2;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom:  10px;
  margin: 0;
  font-weight: 600;
  font-family: "inherit";
  color: white;
  box-shadow: 0px 5px 5px rgb(150, 150, 150);
}

.fade-enter-active, .fade-leave-active{
   transition: all .5s;
 }
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: scale(1.2, 1.2);
}
.up-enter-active, .up-leave-active{
  transition: all 1s ease;
}
.up-enter{
  opacity: 0;
  transform: translateY(100px);
}
.up-leave-to{
  opacity: 0;
  transform: translateY(100px);
}
#problemPage button, .mobileLeft{
  margin-top: 10px;
  position: absolute;
  left: 130px;
  width: 40px;
  height: 40px;
  background: white;
  border: lightgray solid 1px;
  border-radius: 100px;
  transition: all 0.5s;
}
#problemPage button:focus, button:hover{
  outline: none;
}
#problemPage .mobileLeft button{
  left: 0;
  margin-top: 0;
  border: none;
}
#problemPage .mobileLeft{
  left: 50px;
  border: none;
}
#problemPage .mobileRight{
  left: 210px;
  border: none;
}
#problemPage .navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover{
  background: #2cbfec;
  border-radius: 10px;
}
#problemPage .submitGirl{
  position: fixed;
  bottom: -25px;
  left: 75%;
  z-index: 2;
  opacity: 0.65;
}
#problemPage .submitGirl:hover{
  bottom: 0;
  opacity: 1;
  transition: all 0.5s;
  cursor: pointer;
}

#problemPage .navbar-header{
  font-weight: bold;
}
#problemPage .navbar-text{
  color: white;
}
.bottomInfo{
  font-family: inherit;
  font-size: 0.8em;
  bottom: 0;
  left: 130px;
  position: absolute;
}
.bottomInfoLeft{
  left: 45px
}
.bottomInfoRight{
  left: 215px;
}
</style>
