<template>
<div id="loginPage">
  <div class="title">登陆</div><hr>
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
      <p align="left">{{loginMessage}}</p>
    </div>
    <div class="form-group">
      <button class="btn btn-success" v-on:click="loginAttempt">登陆</button>
      <button class="btn btn-info">注册</button>
    </div>
  </form>
</div>
</template>

<script>
import '../../bin/rsa-wrapper.min.js'
export default {
  name: 'login-page',
  data: function () {
    return {
      loginAccount: '',
      loginPassword: '',
      tempPassword: '',
      loginMessage: ''
    }
  },
  methods: {
    passwordEncrypt: function (password) {
      this.tempPassword = password
      var loginPackege = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      loginPackege.password = this.tempPassword
      loginPackege.user = this.loginAccount
      this.$http.post('http://111.231.98.20:8000/api/u/login', loginPackege,  {crossDomain : true, credentials : true}).then( (res) => {
        console.log(res)
        if (res.body.code === 400) {
          this.loginMessage = '用户名不存在'
        } else if(res.body.code === 1){
          this.loginMessage = '用户名或密码错误'
        } else if(res.body.code === 0){
          this.loginMessage = '成功登陆！'
          console.log(res.body.user)
          this.$emit('userInfo', res.body.user)
        }
      })
    },
    loginAttempt: function (event) {
      rsaEncrypt(this.loginPassword, this.passwordEncrypt)
      event.preventDefault()
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
#loginPage p{
  color: red;
  font-weight: bold;
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
