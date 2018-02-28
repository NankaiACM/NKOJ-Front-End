<template>
<div id="loginPage">
  <h2 align="left">登陆</h2><hr>
  <form>
    <div class="form-group">
      <h4 align="left"><label>账号</label></h4>
      <input type="text" class="form-control" placeholder="用户名" v-model="loginAccount">
    </div>
    <div class="form-group">
      <h4 align="left"><label>密码</label></h4>
      <input type="text" class="form-control" placeholder="密码" v-model="loginPassword">
    </div>
    <div class="form-group">
      <button class="btn btn-success" v-on:click="loginAtempt()">登陆</button>
      <button class="btn btn-info">注册</button>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'login-page',
  data: function () {
    return {
      loginAccount: '',
      loginPassword: ''
    }
  },
  methods: {
    loginAtempt: function () {
      var _this = this
      this.$http.post()
    }
  }
}
</script>

<style>
#loginPage{
  position:absolute;
  background: white;
  width: 35%;
  padding: 20px;
  margin: 10% 30%;
  z-index: 4;
  border-radius: 10px;
}
#loginPage h2{
  padding: 10px 0;
  margin: 0;
  font-weight: bold;
  color: #16aad8;
}
#loginPage button{
  padding: 5px 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
}
#loginPage form{
  margin-top: 30px;
}
#loginPage hr{
  width: 50px;
  padding: 0;
  margin: 0;
  border: 2px solid #eff1f3;
}
</style>
