<template>
    <div class="media onepiece">
        <div class="titile-line media">
          <div class="avatar-box media-left media-middle" :title="item.sponsor">
            <a href="">
              <img class="avatar" src="https://scontent-atl3-1.cdninstagram.com/vp/a20896b90863479914f873af2708210e/5B60AB24/t51.2885-19/s150x150/15803553_930150850418977_1876360934042107904_a.jpg" :alt="item.sponsor">
            </a>
          </div>
          <router-link to="" class="title-a media-body media-middle">
            <div class="media-heading" :title="item.title">{{item.title}}</div>
          </router-link>
        </div>
        <div class="icons-line media">
          <div class="media-left">
            <span class="glyphicon glyphicon-heart-empty"></span>
          </div>
          <div class="media-left">
            <span class="glyphicon glyphicon-comment"></span>
          </div>
          <div class="v-c media-left media-bottom">
            <span class="glyphicon glyphicon-eye-open">{{item.v_c}}</span> 
          </div>
          <div class="r-c media-left media-bottom">
            <span class="glyphicon glyphicon-pencil">{{item.r_c}}</span>
          </div>
          <div class="media-body">
          </div>
          <div class="media-right">
            <span class="glyphicon glyphicon-bookmark"></span>
          </div>
        </div>
        <div class="small-line info-line media">
          <div class="nodes media-left i media-middle">
            <div class="node" v-for="(node, nindex) in item.nodes" :key="nindex">
              {{node}}
            </div>
          </div>
          <div class="sponsor i">
            {{item.sponsor}}
            {{cc}}
            <span class=""></span><!--时长视觉-->
          </div>
          <div class="terminator i">
            {{item.terminator}}
            {{dd}}
            <span class=""></span><!--时长视觉-->
          </div>
        </div>
        <div class="rep-line media">
          <div class="media-left usr-left">
            username
          </div>
          <div class="media-body rep-right">
            replyssssssssssssssssssssss
          </div>
        </div>
        <div class="input-line media">
          <div class="input-wrapper meida-body">
            <div class="input-hack">{{input}}</div>
            <textarea class="input-box" placeholder="添加评论..." v-model="input" @keyup.enter="hit">
            </textarea>
          </div>
          <div class="media-right dot-box">
            <span class="glyphicon glyphicon-share-alt" :class="{active: input !== ''}"></span>
          </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'discussCell',
  props: ['item'],
  data: function () {
    return {
      input: ''
    }
  },
  methods: {
    hit: function () {
      console.log(this.input)
      this.input = ''
    }
  },
  computed: {
    cc: function () {
      return moment(this.item.s_ttamp, 'x').fromNow()
    },
    dd: function () {
      return moment(this.item.t_ttamp, 'x').fromNow()
    }
  },
  mounted: function () {
    this.$nextTick(function () {

    })
  },
  beforeDestroy: function () {
  }
}
</script>
<style lang="less">
.onepiece {
  margin: 2em;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  color: #262626;
  background: #fff;
}

.onepiece .media-right {
  text-align: right;
}

.onepiece .titile-line {
  height: 5em;
  padding: 1em 2em;
  border-bottom: 1px solid #efefef;
  margin-bottom: .5em;
}

.onepiece .avatar-box {
  height: 3em;
  width: 3em;
  border-radius: 50%;
}

.onepiece .avatar {
  height: 3em;
  width: 3em;
  border-radius: 50%;
  border: none;
  outline: none;
  background: #fff;
}

.onepiece .icons-line,
.onepiece .info-line,
.onepiece .rep-line,
.onepiece .input-line {
  height: 2.5em;
  padding: .5em 0;
  padding-bottom: 0;
  margin: 0 2em;
  line-height: 2em;
}

.onepiece .input-line {
  min-height: 4em;
  height: auto;
  padding-bottom: 1em;
  margin-top: .5em;
}

.onepiece .icons-line span {
  font-size: 1.6em;
  cursor: pointer;
  opacity: .8;
}

.onepiece .icons-line span:hover {
  opacity: .9;
}

.onepiece .icons-line .r-c span,
.onepiece .icons-line .v-c span {
  font-size: 1.1em;
  padding-right: .5em;
}

.onepiece .small-line {
  display: flex;
  color: #ccc;
}

.onepiece .small-line .nodes {
  display: flex;
}

.onepiece .media-left {
  margin-right: 2em;
}

.title-a .media-heading {
  text-align: left;
  color: #233;
}

.small-line .nodes .node {
  text-align: center;
  position: relative;
  display: inline-block;
  color: #999;
  cursor: pointer;
  margin: 0 1.5em;
  font-weight: 600;
  transition: all .41s;
}

.small-line .nodes .node:first-child {
  margin-left: 0.8em;
}

.info-line .nodes .node::before,
.info-line .nodes .node::after {
  content: '#';
  display: block;
  position: absolute;
  top: 0;
}

.info-line .nodes .node::before {
  left: -.8em;
}

.info-line .nodes .node::after {
  right: -.8em;
}

.small-line .nodes .node:last-child {
  margin-right: 0;
}

.small-line .nodes .node:hover {
  color: #262626;
}

.info-line .i {
  margin-right: 2em;
  position: relative;
  line-height: 2em;
}

.info .i::after {
  content: '·';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 100%;
  font-weight: 800;
  width: 2em;
  text-align: center;
}

.info-line .i:last-child::after {
  content: '';
}

.rep-line .usr-left {
  font-weight: 600;
  cursor: pointer;
}

.rep-line .rep-right {
  text-align: left;
}

.input-line {
  border-top: 1px solid #efefef;
  position: relative;
}

.input-wrapper {
  position: relative;
  min-height: 2em;
  margin-right: 3em;
}

.input-line .dot-box {
  position: absolute;
  right: 0;
  bottom: 1em;
}

.input-line .dot-box span {
  cursor: pointer;
  transform: rotate(180deg);
  transition: all .41s;
  opacity: .5;
}

.input-line .dot-box span.active {
  opacity: .7;
}

.input-line .dot-box span.active:hover {
  opacity: .9;
}

.input-line .input-hack {
  position: relative;
  display: block;
  z-index: -1;
  opacity: 0;
  word-break: break-all;
}

.input-line .input-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize: none;
  overflow: hidden;
  outline: none;
  color: #262626;
}

.input-line .input-box::-webkit-input-placeholder {
}

.onepiece .media-right {
  min-width: 5em;
}
</style>