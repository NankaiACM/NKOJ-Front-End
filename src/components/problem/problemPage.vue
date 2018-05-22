<template>
  <div id="problemPage">
    <transition name="up">
      <div class="submitGirl" v-if="isStart" @click="iCanSee">
        <img src="../../assets/Akkarin.png" width="150px" height="150px">
      </div>
    </transition>
    <transition name="fade">
      <div id="problemSubmit" v-if="isSee">
        <transition name="fade">
          <div class="submitInfo" v-if="isInfo">
            <h4>提示信息</h4>
            <hr>
            <div class="submitInfoText">{{submitInfo}}</div>
          </div>
        </transition>
        <h4>Code: {{submitLan}}</h4>
        <div id="codeArea">
          <editor v-model="submitCode" @init="editorInit" lang="c_cpp" theme="terminal" height="430px"></editor>
        </div>
        <div>
          <button class="mobileHome btn btn-default" @mouseleave="middleInfo = false"
                  @mouseenter="middleInfo = true" @click="submit">
            <span class="glyphicon glyphicon glyphicon-cloud-upload"></span>
          </button>
          <div class="mobileLeft dropup">
            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"
                    @mouseleave="leftInfo = false" @mouseenter="leftInfo = true">
              <span class="glyphicon glyphicon-book" data-toggle="tooltip">
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
                  @mouseleave="rightInfo = false"
                  @mouseenter="rightInfo = true"
                  data-toggle="tooltip" title="返回">
            <span class="glyphicon glyphicon-share-alt"></span>
          </button>
        </div>
        <transition name="fade"><label class="bottomInfo bottomInfoLeft" v-if="leftInfo">Language</label></transition>
        <transition name="fade"><label class="bottomInfo" v-if="middleInfo">Submit</label></transition>
        <transition name="fade"><label class="bottomInfo bottomInfoRight" v-if="rightInfo">Back</label></transition>
      </div>
    </transition>
    <div>
      <div class="pro-container">
        <h2 id="pro-title" align="left" class="problemPageTitle" :class="titleclass">
          {{o.title ? o.title : '美好的bug正在发生'}}
        </h2>
        <div class="problemDescription" @click="iCanSee2">
          <div>
            <div class="details">
              <div class="i ac">
                <div class="l">Ac</div>
                <div class="r">{{o.ac}}</div>
              </div>
              <div class="i all">
                <div class="l">All submit</div>
                <div class="r">{{o.all}}</div>
              </div>
            </div>
            <div class="details">
              <div class="i level">
                <div class="l">Level</div>
                <div class="r">{{o.level}}</div>
              </div>
              <div class="i tl">
                <div class="l">Time Limit</div>
                <div class="r">{{o.time_limit}} ms</div>
              </div>
              <div class="i ml">
                <div class="l">Memory Limit</div>
                <div class="r">{{o.memory_limit}} kB</div>
              </div>
            </div>
            <div class="details">
              <div class="i sj">
                <div class="l">
                  special judge
                </div>
                <div class="r">
                  {{o.special_judge}}
                </div>
              </div>
              <div class="i dj">
                <div class="l">
                  detail judge
                </div>
                <div class="r">
                  {{o.detail_judge}}
                </div>
              </div>
              <div class="i cases">
                <div class="l">
                  cases
                </div>
                <div class="r">
                  {{o.cases}}
                </div>
              </div>
            </div>
          </div>
          <div class="tags">
            <div class="t">Tags:</div>
            <div
              class="t"
              v-for="(item, index) in this.o.tags" :key="index">
              {{item.name}}
              <div class="c">
                <div class="y" @click="yes(item, $event)">vote</div>
                <div class="n" @click="no(item, $event)">no</div>
              </div>
            </div>
          </div>
          <div align="left" v-html="problemMarkDown"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'problems-page',
    data: function () {
      return {
        contentObj: {},
        keyArr: [],
        o: { // 现在的视图，会被initView完全覆盖
          case: 0,
          content: 0,
          problem_id: 0,
          restriction_id: 0,
          submit_ac: 0,
          submit_all: 0,
          title: 0
        },
        submitLan: 'C++',
        submitCode: '#include <iostream>',
        isSee: false,
        isStart: false,
        middleInfo: false,
        leftInfo: false,
        rightInfo: false,
        submitInfo: 'hhhhhhhhhhhhh',
        isInfo: false,
        titleclass: 'normal'
      }
    },
    computed: {
      problemMarkDown: function () {
        var markdown = ''
        for (var i in this.keyArr) {
          markdown += '### ' + i.replace(/\b\w/g, l => l.toUpperCase()) + '\n' + this.contentObj[i] + '\n'
        }
        return marked(markdown, {sanitize: false})
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
      hideDiv: function (node) {
        node.style.display = 'none'
      },
      no: function (it, e) {
        this.hideDiv(e.target.parentElement)
        console.log(e.target.parentElement.style.display)
      },
      yes: function (it, e) {
        this.hideDiv(e.target.parentElement)
      },
      initView: function () {
        window.addEventListener('scroll', this.hScroll)
        this.$http.get(`${window.noPointHost}/api/problem/` + this.$route.params.problemId).then(
          (res) => {
            console.log(res.body)
            this.keyArr = res.body.data.content
            this.contentObj = res.body.data.content
            this.o = res.body.data
            this.isStart = true
            console.log(JSON.stringify(this.o))
          },
          (e) => {
            console.log(e)
          })
      },
      hScroll: function () {
        var sTop = window.pageYOffset
        var tTop = document.querySelector('#pro-title').offsetTop
        if (sTop > tTop) { // 不给予恢复
          this.titleclass = 'active'
          window.removeEventListener('scroll', this.hScroll)
        }
      },
      submit: function () {
        const sendPackage = {
          pid: this.$route.params.problemId,
          lang: 1,
          code: this.submitCode
        }
        let _this = this
        this.$http.post(`${window.noPointHost}/api/judge`, sendPackage,
          {crossDomain: true, credentials: true}).then(res => {
          console.log(res)
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
      setLan: function (Lan) {
        this.submitLan = Lan
      },
      editorInit: function () {
        require('brace/mode/html')
        require('brace/mode/javascript')
        require('brace/mode/c_cpp')
        require('brace/mode/less')
        require('brace/theme/terminal')
      },
      test: function () {
        console.log('wtf')
      },
      iCanSee: function (e) {
        this.isSee = !this.isSee
        this.isStart = !this.isStart
        this.isInfo = false
        e.preventDefault()
      },
      iCanSee2: function () {
        if (this.isSee) {
          this.isSee = !this.isSee
          this.isStart = !this.isStart
          this.isInfo = false
        }
      }
    },
    beforeDestroy: function () {
      try {
        window.removeEventListener('scroll', this.hScroll)
      } catch (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../less/global.less';

  html {
    #problemPage pre {
      text-align: left;
      background: white;
      margin-bottom: 30px;
      border: none;
      color: #13293D;
    }

    #problemPage {
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

    #problemSubmit:hover {
      box-shadow: 0 5px 5px rgba(150, 150, 150, 0.4), 0 -5px 5px rgba(150, 150, 150, 0.4), 5px 0 5px rgba(150, 150, 150, 0.4), -5px 0 5px rgba(150, 150, 150, 0.4);
    }

    #problemSubmit nav {
      padding-right: 20px;
      margin: 0;
      background: #16aad8;
      text-align: left;
      border: none;
      border-radius: 0;
    }

    #problemSubmit h4 {
      font-weight: 600;
      color: #16aad8;
      overflow: hidden;
    }

    #codeArea {
      border: 1px solid rgba(151, 159, 175, 0.8);
      border-radius: 2px;
    }

    #problemPage h1, h2, h3 {
      font-weight: 600;
    }

    .fade-enter-active, .fade-leave-active {
      transition: all .5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
      transform: scale(1.2, 1.2);
    }

    .up-enter-active, .up-leave-active {
      transition: all 1s ease;
    }

    .up-enter {
      opacity: 0;
      transform: translateY(100px);
    }

    .up-leave-to {
      opacity: 0;
      transform: translateY(100px);
    }

    #problemPage button, .mobileLeft {
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

    #problemPage button:focus, button:hover {
      outline: none;
    }

    #problemPage .mobileLeft button {
      left: 0;
      margin-top: 0;
      border: none;
    }

    #problemPage .mobileLeft {
      left: 50px;
      border: none;
    }

    #problemPage .mobileRight {
      left: 210px;
      border: none;
    }

    #problemPage .navbar-default .navbar-nav > .open > a,
    .navbar-default .navbar-nav > .open > a:focus,
    .navbar-default .navbar-nav > .open > a:hover {
      background: #2cbfec;
      border-radius: 10px;
    }

    #problemPage .submitGirl {
      position: fixed;
      bottom: -25px;
      left: 75%;
      z-index: 2;
      opacity: 0.65;
    }

    #problemPage .submitGirl:hover {
      bottom: 0;
      opacity: 1;
      transition: all 0.5s;
      cursor: pointer;
    }

    #problemPage .navbar-header {
      font-weight: bold;
    }

    #problemPage .navbar-text {
      color: white;
    }

    .bottomInfo {
      font-family: inherit;
      font-size: 0.8em;
      bottom: 0;
      left: 130px;
      position: absolute;
    }

    .bottomInfoLeft {
      left: 45px
    }

    .bottomInfoRight {
      left: 215px;
    }

    .submitInfo {
      position: absolute;
      background: white;
      width: 150px;
      left: 75px;
      top: 200px;
      border-radius: 10px;
      z-index: 10;
    }

    .submitInfo h4 {
      padding: 5px;
      margin: 0;
    }

    .submitInfo .submitInfoText {
      padding: 15px;
    }

    .submitInfo hr {
      padding: 5px;
      margin: 0;
    }

  }

  // work tmp, after work break out
  .pro-container {
    position: absolute;
    margin-top: 150px;
    top: 0;
    left: 10%;
    right: 10%;
    margin-bottom: 60px;
    background: white;
    padding: 40px 60px;
    overflow: auto;
    transition: all 0.5s;
    // border-radius: 10px;
    .problemPageTitle {
      background: #fff;
      margin: 2em 0;
      font-family: "微软雅黑";
      font-weight: 400;
      color: #233;
      border-bottom: 1px solid #eee;
      transition: all 1.41s;
    }
    .problemPageTitle.normal {
      border-left: 10px solid #93a7a7;
    }
    .problemPageTitle.active {
      padding: 0;
      margin: 0;
      left: 0;
      right: 0;
      top: @barheight;
      height: @filterheight;
      line-height: @filterheight - 2em;
      text-align: center;
      position: fixed;
      font-weight: 100;
    }
    .details {
      display: flex;
      flex-direction: row;
      margin-bottom: 1em;
      transform: scale(1);
      .i {
        border: solid 1px;
        border-radius: 4px;
        margin-right: 1em;
        .l, .r {
          display: inline-block;
          padding: .41em 1em;
        }
        .l {
          border-right: 1px solid;
        }
      }
      .ac, .all {
        .r {
          position: relative;
        }
        .r::before {
          position: absolute;
          content: ' ';
          width: .6em;
          height: .6em;
          background: #fff;
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          left: 0;
          top: 50%;
        }
      }
      .ac {
        color: #db2828;
        border-color: #db2828;
        .l {
          color: #fff;
          background: #db2828;
        }
      }
      .all {
        color: #1e70bf;
        border-color: #1e70bf;
        .l {
          color: #fff;
          background: #1e70bf;
        }
      }
      .tl {
        color: #16ab39;
        border-color: #16ab39;
      }
      .ml {
        color: #1678c2;
        border-color: #1678c2;
      }
      .level {
        color: #2cbfec;
        border-color: #2cbfec;
      }
      .sj {
        color: #eaae00;
        border-color: #eaae00;
      }
      .dj {
        color: #9627ba;
        border-color: #a333c8;
      }
    }
    .tags {
      display: flex;
      flex-direction: row;
      .t {
        color: #1678c2;
        border: 1px solid #1678c2;
        border-radius: 4px;
        padding: .41em 1em;
        margin-right: 1em;
        position: relative;
        transition: all .41s;
        .c {
          display: inline-block;
          transition: all .41s;
          .y, .n {
            display: inherit;
            position: relative;
            padding: .2em .4em;
            cursor: pointer;
            transition: all .41s;
          }
          .y:hover, .n:hover {
          }
          .y {
            background: #db2828;
            color: #fff;
            border-radius: 4px 0 0 4px;
          }
          .n {
            background: #1e70bf;
            color: #fff;
            border-radius: 0 4px 4px 0;
          }
          .n::before {
            content: ' ';
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -.5em;
            margin-left: -.7em;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            background: #fff;
          }
        }
      }
    }
  }

  .pro-container:hover {
    box-shadow: 0 5px 5px rgba(150, 150, 150, 0.1),
    0 0px 20px rgba(150, 150, 150, 0.1),
    5px 0 5px rgba(150, 150, 150, 0.1),
    -5px 0 5px rgba(150, 150, 150, 0.1);
  }
</style>
