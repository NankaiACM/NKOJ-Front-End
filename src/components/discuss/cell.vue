<template>
  <div class="onepiece" :class="{top: pos === 0}">
    <div class="title-line">
      <div class="avatar-box" :title="item['user_id']">
        <a href="">
          <img class="avatar" :src="avatarSubUrl + item['user_id']" :alt="item['user_id']">
        </a>
      </div>
      <router-link :to="{path: '/discuss/'+item['post_id']}" class="title-a">
        <div v-if="pos === 0" :title="item.title">{{item.title}}</div>
        <div v-if="pos !== 0" :title="'回复'">回复 #0 @ {{item['parent_id']}}</div>
      </router-link>
      <div v-if="(!item['parent_id']) && (pos === 0)" class="addAns" @click="reply(item['post_id'], item['user_id'])">添加答案</div>
    </div>
    <div class="main-article">
      <markdown-box :mdstr="item.content"></markdown-box>
      <slot name="more-art"></slot>
    </div>
    <div class="icons-line">
      <div class="v-c">
        <span class="glyphicon glyphicon-chevron-up pbtn" @click="u(item['post_id'])"></span>
        <span>{{item.positive}}</span>
      </div>
      <div class="r-c">
        <span class="glyphicon glyphicon-chevron-down pbtn" @click="d(item['post_id'])"></span>
        <span>{{item.negative}}</span>
      </div>
      <div class="sponsor i">
        <span>user [{{item['user_id']}}] post </span>
        {{cc(item.since)}}
      </div>
      <div class="terminator i">
        <span>{{item['last_active_user']}}</span>
        {{cc(item['last_active_date'])}}
      </div>
        <span class="pbtn i" @click="at(item['post_id'], item['user_id'])">评论</span>
        <span v-if="isAdmin" class="pbtn i" @click="$router.mngCP(vm, 'post', 'remove', item['post_id'])">删除</span>
        <span v-if="isAdmin" class="pbtn i" @click="$router.mngCP(vm, 'post', 'recover', item['post_id'])">恢复</span>
        <router-link v-if="isAdmin" tag="span" :to="'/admin/editpost/' + item['post_id']" class="pbtn i">编辑</router-link>
    </div>
    <div class="rep-lines" v-if="item.comments && item.comments.length > 0">
      <div class="rep-line" v-for="(it, index) in item.comments" :key="index">
        <div></div>
        <div class="avatar-box" :title="it['user_id']">
          <a href="">
            <img class="avatar" :src="avatarSubUrl + it['user_id']" :alt="it['user_id']">
          </a>
        </div>
        <div class="rep-right">
          <span class="rep-user">{{it['user_id']}}</span>
          <span>评论 @{{it['reply_to']}}</span>
          <markdown-box class="rep-content" :mdstr="it.content"></markdown-box>
          <div class="info">
            <span class="time">{{dd(it.since)}}</span>
            <span class="pbtn" @click="at(it['reply_id'], it['user_id'])">评论</span>
            <span class="pbtn glyphicon glyphicon-heart" @click="like(it['reply_id'])"> {{it.score}}</span>
            <span v-if="isAdmin" class="pbtn" @click="$router.mngCP(vm, 'comment', 'remove', it['reply_id'])">删除</span>
            <span v-if="isAdmin" class="pbtn" @click="$router.mngCP(vm, 'comment', 'recover', it['reply_id'])">恢复</span>
          </div>
        </div>
      </div>
    </div>
    <slot name="more-rep"></slot>
    <div class="input-line" v-if="focusState">
      <div class="input-wrapper">
        <div id="input-hack" contenteditable="true"><!--{{input}}--></div>
        <!--
        <textarea v-focus="focusState" class="input-box" :placeholder="placeholder" v-model="input">
        </textarea>
        -->
      </div>
      <div class="dot-box" @click="hit">
        <span class="glyphicon glyphicon-share-alt" :class="{active: input !== ''}"></span>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
// const moment = () => import(webpackChunkName: "moment" */ 'moment')
import markdownBox from './markdownBox.vue'
export default {
  name: 'discussCell',
  props: ['item', 'pos'],
  data: function () {
    return {
      input: '',
      placeholder: '',
      focusState: false,
      rid: '',
      rOc: '/reply/'
    }
  },
  methods: {
    hit: function () {
      this.input = document.querySelector('#input-hack').innerText
      console.log(this.input)
      this.$http.post(window.noPointHost + '/api/post' + this.rOc + this.rid, {content: this.input})
        .then(function (r) {
          console.log(JSON.stringify(r))
          if (r.body.code === 0) this.r()
          this.input = ''
          this.focusState = false
        }, function (e) {
          console.log(JSON.stringify(e))
        })
    },
    cc: function (stamp) {
      return moment(new Date(stamp), 'x').fromNow()
    },
    dd: function (stamp) {
      return moment(stamp).format('YYYY-MM-DD HH:mm:ss')
    },
    at: function (prid, uid) {
      this.placeholder = '评论 @' + uid
      this.rid = prid
      this.rOc = '/comment/'
      this.input = ''
      this.focusState = !this.focusState
    },
    reply: function (rid, uid) {
      this.placeholder = '回复 #' + rid + '@' + uid
      this.rid = rid
      this.rOc = '/reply/'
      this.input = ''
      this.focusState = !this.focusState
    },
    like: function (rid) {
      this.$http.get(window.noPointHost + '/api/post/like/' + rid)
        .then(function (r) {
          if (r.body.code !== 0) return
          if (r.body.data.affected !== 0) this.r()
        })
    },
    u: function (rid) {
      this.$http.get(window.noPointHost + '/api/post/upvote/' + rid)
        .then(function (r) {
          if (r.body.code === 0) {
            if (r.body.data.affected === 0) return this.rm('u', rid)
            this.r()
          }
        })
    },
    d: function (rid) {
      this.$http.get(window.noPointHost + '/api/post/downvote/' + rid)
        .then(function (r) {
          if (r.body.code === 0) {
            if (r.body.data.affected === 0) return this.rm('d', rid)
            this.r()
          }
        })
    },
    rm: function (fash, rid) {
      this.$http.get(window.noPointHost + '/api/post/rmvote/' + rid)
        .then(function (r) {
          console.log(r)
          if (r.body.code === 0) {
            this[fash](rid)
            this.r()
          }
        })
    },
    r: function () {
      this.$emit('reload')
    }
  },
  computed: {
    avatarSubUrl: function () {
      return window.noPointHost + '/api/avatar/'
    },
    vm: function () {
      return this
    },
    isAdmin: function () {
      return this.$store.getters.usrLogGet && this.$store.getters.proAddGet
    }
  },
  components: {
    markdownBox
  },
  mounted: function () {
    this.$nextTick(function () {
      this.placeholder = '回复@' + this.item['user_id']
      this.rid = this.item['user_id']
    })
  },
  beforeDestroy: function () {
  },
  directives: {
    focus: {
      update: function (el, {v}) {
        if (v) {
          el.focus()
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.onepiece {
  margin: 0 2em 0 2em;
  color: #262626;
  border-bottom: 1px solid #cdcdcd;
  padding: 1em 0;
  &.top {
    border: none;
    border-bottom: 2px solid #cdcdcd;
    .title-line {
      .title-a {
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
  p {
    margin: 0;
  }
  .pbtn {
    cursor: pointer;
  }
  .avatar-box {
    height: 3em;
    width: 3em;
    border-radius: 50%;
    .avatar {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      border: none;
      outline: none;
      object-fit: cover;
    }
  }
  .title-line {
    height: 5em;
    display: grid;
    grid-template-columns: 4em auto 7em;
    align-items: center;
    padding: 1em 2em;
    // border-bottom: 1px solid #efefef;
    .title-a {
      color: #233;
    }
    .addAns {
      border: 1px #ccc solid;
      padding: .4em 1em;
      text-align: center;
      cursor: pointer;
      color: #99a2aa;
      &:hover {
        color: #233;
      }
    }
  }
  .main-article {
    text-align: left;
    padding: 1em 0;
    margin: 0 2em;
    // border-bottom: 1px solid #efefef;
  }
  .icons-line {
    display: flex;
    flex-direction: row;
    height: 3em;
    color: #99a2aa;
    // border-bottom: 1px solid #efefef;
    .r-c ,.v-c {
      line-height: 2em;
      padding-right: .5em;
    }
    .i {
      margin-right: 2em;
      position: relative;
      line-height: 2em;
      &::after {
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
      &:last-child::after {
        content: '';
      }
    }
  }
  .rep-lines {
    padding: .5em 0;
    margin: 0 2em;
    .rep-line {
      min-height: 2em;
      padding: .5em 0;
      height: auto;
      display: grid;
      grid-template-columns: 1em 2em auto auto;
      grid-column-gap: 1em;
      .avatar-box {
        width: 2em;
        height: 2em;
        justify-self: center;
        align-self: start;
      }
      .rep-right {
        .rep-user {
          margin-right: 1em;
        }
        .rep-content {
          display: inline-block;
        }
        .info {
          height: 1em;
          color: #99a2aa;
          span {
            padding-right: 1em;
          }
        }
      }
    }
  }
  .input-line {
    border-radius: 3px;
    border: 1px solid #ccc;
    #input-hack {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
      // z-index: -1;
      // opacity: 0;
      outline: none;
      word-break: break-all;
      white-space: pre; /* important */
    }
    /*
    .input-box {
      position: absolute;
      background: none;
      display: block;
      top: 0;
      width: 100%;
      height: 100%;
      resize: none;
      overflow: visible;
      outline: none;
      color: #262626;
      &::-webkit-input-placeholder {
      }
    }
    */
  }
}
.onepiece .icons-line,
.onepiece .input-line {
  padding: .5em 0;
  margin: 0 2em;
  line-height: 2em;
  transition: all .41s;
}

.onepiece .input-line {
  position: relative;
  min-height: 4em;
  height: auto;
  padding: .5em 1em;
  margin-top: .5em;
  // border-top: 1px solid #efefef;
}

.input-wrapper {
  position: relative;
  min-height: 2em;
  margin-right: 3em;
}

.input-line .dot-box {
  position: absolute;
  right: 0;
  width: 3em;
  text-align: center;
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
</style>
