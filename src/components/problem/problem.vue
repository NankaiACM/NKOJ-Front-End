<template>
  <div id="problemPage">
    <transition name="up">
      <div class="submitGirl" v-if="isStart" @click="iCanSee">
        <img src="../../assets/Akkarin.png" style="width: 150px; height: 150px">
      </div>
    </transition>
    <transition name="fade">
      <div id="problemSubmit" v-if="isSee">
        <h4>Code: {{submitLan}}</h4>
        <div id="codeArea">
          <editor v-model="submitCode" @init="editorInit" lang="c_cpp" theme="github" height="430px"></editor>
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
              <li><a v-on:click="setLan('C')">C</a></li>
              <li><a>--以下处于试验阶段--</a></li>
              <li><a v-on:click="setLan('Python')">Python</a></li>
              <li><a v-on:click="setLan('JavaScript')">JavaScrpit</a></li>
              <li><a v-on:click="setLan('Go')">Go</a></li>
              <li><a v-on:click="setLan('Text')">Text</a></li>
              <li><a v-on:click="setLan('pypy3')">pypy3</a></li>
              <!--<li><a v-on:click="setLan('Pascal')">Pascall</a></li>-->
              <!--<li><a v-on:click="setLan('Html')">Html</a></li>-->
              <!--<li><a v-on:click="setLan('Css')">Css</a></li>-->
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
        <div class="bgshadow"
           @click="isInfo=false"
           v-if="isInfo">
        </div>
        <transition name="fade">
          <div class="submitInfo" v-if="isInfo">
            <h4>提示信息</h4>
            <hr>
            {{submitInfo}}
            <div class="text" v-if="solutionId">
              <router-link :to="{path: '/details/' + solutionId}">点击获取详情</router-link>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <div class="pro-container">
      <h2 id="pro-title" align="left" class="problemPageTitle" :class="{[titleclass]: false}">
        {{o.title ? o.title : '暂未获得到信息...'}}
      </h2>
      <hr>
      <div class="problemDescription" @click="iCanSee2">
        <div align="left" v-html="problemMarkDown"></div>
      </div>
      <div class="tags">
        <div class="i h">Tags:</div>
        <div class="i t" v-for="(item, index) in this.o.tags" :key="index"
             v-bind:class="{ty : item.attitude, tn: item.attitude}">
          <div class="l">{{item.name}}</div>
          <div class="r">{{item.p - item.n}}</div>
          <div class="e" v-if="isEditingTag">
            <div class="c" v-if="!item.attitude">
              <div class="y" @click="yes(item, $event)">+</div>
              /
              <div class="n" @click="no(item, $event)">-</div>
            </div>
            <div  class="b" @click="tagCancel(item, $event)" v-if="item.attitude">*</div>
          </div>
        </div>
        <div class="i g" @click="toggleEditTag()">
          <div class="l">{{isEditingTag ? '确认' : '编辑'}}</div>
          <div class="r s"><span class="glyphicon" :class="isEditingTag ? 'glyphicon-check':'glyphicon-pencil'"></span></div>
        </div>
      </div>
      <div class="details">
        <div class="i ct" v-if="o.contest_id">
          <div class="t">Contest</div>
          <div class="b">{{o.contest_id}}</div>
        </div>
        <div class="i ac">
          <div class="t">AC / All</div>
          <div class="b">{{o.ac}} / {{o.all}}</div>
        </div>
        <div class="i cs">
          <div class="t">Cases</div>
          <div class="b">{{o.cases}}</div>
        </div>
        <div class="i level">
          <div class="t">Level</div>
          <div class="b">{{o.level}}</div>
        </div>
        <div class="i tl">
          <div class="t">Time</div>
          <div class="b">{{o.time_limit}} ms</div>
        </div>
        <div class="i ml">
          <div class="t">Memory</div>
          <div class="b">{{o.memory_limit}} kB</div>
        </div>
        <div class="i sj" v-if="o.special_judge">
          <div class="t">Special Judge</div>
        </div>
        <div class="i dj" v-if="o.detail_judge">
          <div class="t">Detail Judge</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isScrolled from '../../scroll'
import markdownIt from 'markdown-it'
import markdownItMathjax from 'markdown-it-mathjax'
import markdownItLatex from 'markdown-it-latex'
import 'markdown-it-latex/dist/index.css'
import {lang2code} from '../status/map.js'

const markdownit = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
markdownit.use(markdownItMathjax)
markdownit.use(markdownItLatex)

window.markdownit = markdownit

// const marked = () => import(/* webpackChunkName: "marked" */ 'marked')
export default {
  name: 'problems-page',
  components: {
    editor: require('vue2-ace-editor')
    // editor: () => import(/* webpackChunkName: "ace" */ 'vue2-ace-editor')
  },
  data: function () {
    return {
      contentObj: {},
      keyArr: [],
      o: { // 现在的视图，会被initView完全覆盖
        case: 0,
        content: 0,
        contest_id: undefined,
        problem_id: 0,
        restriction_id: 0,
        submit_ac: 0,
        submit_all: 0,
        title: 0
      },
      submitLan: 'C++',
      submitCode: '#include <iostream>\n',
      disCode: {
        'C': 
`#include <stdio.h>
int main(int args, char **argv, char **envp){
  return 0;
}`,
        'C++':
`#include <bits/stdc++.h>
using namespace std;
int main(){
  cout<<"hello world"<<endl;
  return 0;
}`,
        'Java':
`import java.util.*;
import java.io.*;
public class Main{
  public static void main(){
    System.out.println("hello world");
  }
}`,
        'Python':
`#!/usr/bin/python3
# -*- coding: utf-8 -*-
print('hello world')
`,
        'JavaScript':
`console.log('hello world');`,
        'Text': '',
        'Go':
`package main
import "fmt"
func main(){
  fmt.Println("hello world")
}`,
        'pypy3':
`#!/usr/bin/python3
# -*- coding: utf-8 -*-
print('hello world')
`
      },
      isScrolled,
      isSee: false,
      isStart: false,
      isEditingTag: false,
      middleInfo: false,
      leftInfo: false,
      rightInfo: false,
      submitInfo: 'hhhhhhhhhhhhh',
      solutionId: undefined,
      isInfo: false,
      titleclass: 'normal',
      problemMarkDown: ''
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.initView()
    })
  },
  methods: {
    getMarkMathjaxLatex () {
      let markdown = ''
      for (let i in this.keyArr) {
        markdown += '### ' + i.replace(/\b\w/g, l => l.toUpperCase()) + '\n' + this.contentObj[i] + '\n'
      }
      window.markdown = markdown
      return markdownit.render(markdown)
    },
    toggleEditTag () {
      this.isEditingTag = !this.isEditingTag
    },
    tagCancel: function (it, e) {
      this.o.tags.forEach((val, index) => {
        if (val.name === it.name && !(typeof val.attitude === 'undefined')) {
          this.$http.get(`${window.noPointHost}/api/problem/${this.$route.params.problemId}/remove/${val.id}`).then(res => {
            if (res.body.code === 0) {
              if (it.attitude) val.p -= 1
              else val.n -= 1
            }
            val.attitude = undefined
            this.$set(this.o.tags, index, val)
          })
        }
      })
    },
    no: function (it, e) {
      this.o.tags.forEach((val, index) => {
        if (val.name === it.name) {
          this.$http.get(`${window.noPointHost}/api/problem/${this.$route.params.problemId}/downvote/${val.id}`).then(res => {
            if (res.body.code === 0) {
              val.n = val.n + 1
            }
            val.attitude = false
            this.$set(this.o.tags, index, val)
          })
        }
      })
    },
    yes: function (it, e) {
      this.o.tags.forEach((val, index) => {
        if (val.name === it.name) {
          this.$http.get(`${window.noPointHost}/api/problem/${this.$route.params.problemId}/upvote/${val.id}`).then(res => {
            if (res.body.code === 0) {
              val.p = val.p + 1
            }
            val.attitude = true
            this.$set(this.o.tags, index, val)
          })
        }
      })
    },
    initView: function () {
      window.addEventListener('scroll', this.hScroll)
      this.setLan('C++')
      this.$http.get(`${window.noPointHost}/api/problem/` + this.$route.params.problemId).then(
        (res) => {
          this.keyArr = res.body.data.content
          this.contentObj = res.body.data.content
          this.o = res.body.data
          this.isStart = true
          this.problemMarkDown = this.getMarkMathjaxLatex()
          this.$http.get(`${window.noPointHost}/api/problem/${this.$route.params.problemId}/tag`).then(res => {
            res.body.data.forEach((val1, index) => {
              this.o.tags.forEach((val2, index) => {
                if (val2.id === val1.tag_id) {
                  val2.attitude = val1.attitude
                  this.$set(this.o.tags, index, val2)
                }
              })
            })
          })
        },
        (e) => {
          console.log(e)
        })
    },
    hScroll: function () {
      const sTop = window.pageYOffset
      const tTop = document.querySelector('#pro-title').offsetTop
      if (sTop > tTop) { // 不给予恢复
        this.titleclass = 'active'
        window.removeEventListener('scroll', this.hScroll)
      }
    },
    submit: function () {
      const sendPackage = {
        pid: this.$route.params.problemId,
        lang: lang2code[this.submitLan],
        code: this.submitCode
      }
      let _this = this
      this.$http.post(`${window.noPointHost}/api/judge`, sendPackage).then(res => {
        _this.isInfo = true
        if (res.body.code === 0) {
          _this.submitInfo = '成功提交！'
          _this.solutionId = res.body.data['solution_id']
        } else {
          _this.submitInfo = `${res.body.message}(${res.body.code})`
        }
      }, err => {
        _this.isInfo = true
        if (err.body.code === 401) {
          _this.submitInfo = '请您登陆！'
        } else {
          _this.submitInfo = `未知错误！(${err.body})`
        }
      })
    },
    setLan: function (Lan) {
      this.submitLan = Lan
      this.submitCode = this.disCode[Lan]
    },
    editorInit: function () {
      require('brace/mode/html')
      require('brace/mode/javascript')
      require('brace/mode/c_cpp')
      require('brace/mode/less')
      require('brace/theme/github')
      // import(/* webpackChunkName: "brace" */ 'brace/mode/html')
      // import(/* webpackChunkName: "brace" */ 'brace/mode/javascript')
      // import(/* webpackChunkName: "brace" */ 'brace/mode/c_cpp')
      // import(/* webpackChunkName: "brace" */ 'brace/theme/github')
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
    bottom: 100px;
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
    right: 300px;
    z-index: 2;
    opacity: 0.85;
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

  .bgshadow {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;
    opacity: .41;
    z-index: 9;
    transition: all .41s;
  }

  .submitInfo {
    position: absolute;
    background: #fff;
    width: 150px;
    left: 75px;
    top: 200px;
    border-radius: 10px;
    border: 1px solid #ccc;
    z-index: 10;
    text-align: center;
    .text {
      padding: 1em;
    }
  }
  .pro-container {
    position: relative;
    width: 80%;
    margin: 5rem auto 0;
    padding: 40px 60px;
    background: rgba(255, 255, 255, 0.7);
    border: solid 1px #eeeeee;
    transition: all 0.5s;
  }

  .pro-container:hover {
    box-shadow: 0 0 5px 5px rgba(150, 150, 150, 0.1);
  }

  .problemPageTitle {
    z-index: 2;
    margin: 1em 0;
    font-family: "微软雅黑", sans-serif;
    font-weight: 400;
    color: #233;
    transition: all 1.41s;
  }

  .problemPageTitle.bga {
    background: rgba(255, 255, 255, 0.7);
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
    position: absolute;
    display: flex;
    top: 0;
    left: -130px;
    flex-direction: column;
    text-align: center;
    margin-top: 5rem;
    .i {
      width: 100px;
      border: solid 1px;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1em;
      .t {
        color: #fff;
      }
      .t, .b {
        padding: .41em 1em;
      }
      .b {
        background: rgba(255, 255, 255, 0.6);
        white-space: pre;
      }
    }
    .ct {
      color: #ff9800;
      border-color: #ff9800;
      .t {
        background: #ff9800;
      }
    }
    .ac {
      color: #db2828;
      border-color: #db2828;
      .t {
        background: #db2828;
      }
    }
    .tl {
      color: #16ab39;
      border-color: #16ab39;
      .t {
        background: #16ab39;
      }
    }
    .ml {
      color: #1678c2;
      border-color: #1678c2;
      .t {
        background: #1678c2;
      }
    }
    .level {
      color: #2cbfec;
      border-color: #2cbfec;
      .t {
        background: #2cbfec;
      }
    }
    .sj {
      color: #eaae00;
      border-color: #eaae00;
      .t {
        background: #eaae00;
      }
    }
    .dj {
      color: #9627ba;
      border-color: #a333c8;
      .t {
        background: #a333c8;
      }
    }
    .cs {
      .t {
        background: #333333;
      }
    }
  }
}
.tags {
  display: flex;
  flex-direction: row;
  .i {
    border: solid 1px;
    margin-right: 1em;
    &.h {
      border: none;
      padding: .21em .41em;
    }
    &.t {
      border-color: #1e88e5;
      .l {
        background: #1e88e5;
        color: #fff;
      }
      .r, .e {
        border-color: #1e88e5;
        color: #1e88e5;
      }
    }
    &.g {
      border-color: #2cbfec;
      .l {
        background: #2cbfec;
        color: #fff;
      }
      .r {
        border-color: #2cbfec;
      }
      .s {
        color: #2cbfec;
      }
    }
    & > div {
      display: inline-block;
      padding: .21em .41em;
      float: left;
    }
    .r {
      border-left: 1px solid;
    }
    .e {
      & > div {
        display: inline-block;
      }
      .c {
        & > div {
          display: inline-block;
          cursor: pointer;
        }
      }
      .b {
        cursor: not-allowed;
      }
    }
    .s {
      cursor: pointer;
    }
  }
}
</style>
