<template>
<div v-if="isAdmin">
  <nav class="navbar navbar-default sidebar">
    <ul class="nav navbar-nav">
      <li role="presentation"><a href="/admin/problem">Problems</a></li>
      <li role="presentation"><a href="/admin/contest">Contests</a></li>
      <li role="presentation"><a href="/admin/user">Users</a></li>
      <li role="presentation"><a href="/admin/status">Status</a></li>
    </ul>
  </nav>
  <router-view></router-view>
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
        })
      }
    }
  }
</script>

<style scoped>
.sidebar {
  background: hotpink;
  margin-bottom: 0;
}
.sidebar ul {
  width: 100%;
}
.sidebar li{
  width: 25%;
}
.sidebar li:hover, li a:focus{
  background: none;
  color: white;
}
.sidebar li a:hover{
  background: none;
  color: white;
  font-size: 25px;
}
.sidebar li a:focus{
  color: white;
}
.sidebar li a {
  font-size: 20px;
  font-family: "Yu Gothic UI";
  color: white;
  width:  100%;
  transition: all 0.2s;
}
</style>
