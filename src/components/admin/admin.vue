<template>
<div id="admin">
  <div class="view-wrp" v-if="isAdmin">
    <div class="b-wrp">
      <div class="body-wrp">
        <router-view></router-view>
      </div>
    </div>
    <div class="nav-wrp">
      <router-link to="/admin/problem">添加题目</router-link>
      <router-link to="/admin/newpc">添加竞赛</router-link>
      <router-link to="/admin/allcontest">竞赛列表</router-link>
      <router-link to="/admin/getpc">竞赛数据</router-link>
      <router-link to="/admin/editque">竞赛题目</router-link>
      <router-link to="/admin/edituser">竞赛用户</router-link>
      <router-link to="/admin/rejudge">重新评测</router-link>
      <router-link to="/admin/editpost">编辑讨论</router-link>
      <router-link to="/admin/rmpost">删除讨论</router-link>
      <router-link to="/admin/rcpost">恢复讨论</router-link>
      <router-link to="/admin/rmcomment">删除评论</router-link>
      <router-link to="/admin/rccomment">恢复评论</router-link>
      <router-link to="/admin/report">用户举报</router-link>
      <router-link to="/admin/batch">群发私信</router-link>
      <router-link to="/admin/sendto">独立私信</router-link>
    </div>
  </div>
</div>
</template>

<script>
import adminProblem from './adminProblem'
export default {
  components: {adminProblem},
  name: 'admin',
  data: function () {
    return {
      isAdmin: false
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.initView()
    })
  },
  methods: {
    initView: function () {
      this.$http.get(`${window.noPointHost}/api/admin/role`,
        {
          crossDomain: true,
          timeout: '8000',
          cache: true,
          credentials: true
        }).then((res) => {
        if (res.body.code === 0) {
          this.isAdmin = true
        }
      }, (err) => {
        if (err.body.code === 401) {
          alert('访问不可达')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#admin {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  background: #fff;
  overflow-y: auto;
  font-family: PingFangSC-Regular,Microsoft YaHei,Arial,Helvetica,sans-serif;
  .view-wrp {
    height: 100%;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccd0d7;
    border-radius: 3px;
  }
  .nav-wrp {
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 90px;
    width: 240px;
    height: 100vh;
    border-right: solid 1px #ccc;
    a {
      display: block;
      width: calc(100% - 2em);
      height: 3em;
      line-height: 3em;
      text-decoration: none;
      text-align: center;
      margin: 1em 1em;
      border-radius: 0;
      transition: all .41s;
      background: #6cf;
      color: #fff;
      &:hover {
        transform: rotateX(0deg) rotateY(0deg) rotate(4.1deg) translateZ(300px) scale(1.1);
      }
    }
  }
  .b-wrp {
    position: relative;
    padding-left: 240px;
    height: 100%;
    .body-wrp {
      height: 100%;
      padding: 30px 41px;
    }
  }
}
</style>
