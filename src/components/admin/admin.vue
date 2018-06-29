<template>
<div id="admin">
  <div class="view-wrp" v-if="isAdmin">
    <div class="b-wrp">
      <div class="body-wrp">
        <router-view></router-view>
      </div>
    </div>
    <div class="nav-wrp">
      <router-link to="/admin/problem">Add problem</router-link>
      <router-link to="/admin/newpc">New Contest</router-link>
      <router-link to="/admin/getpc">Contest Data</router-link>
      <router-link to="/admin/rejudge">Rejudge</router-link>
      <router-link to="/admin/edituser">Edit User</router-link>
      <router-link to="/admin/editque">Edit Ques</router-link>
      <router-link to="/admin/editpost">Edit Post</router-link>
      <router-link to="/admin/rmpost">Remove Post</router-link>
      <router-link to="/admin/rcpost">Recover Post</router-link>
      <router-link to="/admin/rmcomment">Remove Comment</router-link>
      <router-link to="/admin/rccomment">Recover Comment</router-link>
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
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-decoration: none;
      text-align: center;
      margin: 2em 0;
      color: #233;
      transition: all .41s;
      &:hover {
        color: #1e88e5;
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
