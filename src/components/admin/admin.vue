<template>
<div v-if="isAdmin">
  <nav class="navbar navbar-default sidebar">
    <ul class="nav navbar-nav">
      <li role="presentation"><a href="#">Problems</a></li>
      <li role="presentation"><a href="#">Contests</a></li>
      <li role="presentation"><a href="#">Users</a></li>
      <li role="presentation"><a href="#">Status</a></li>
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
