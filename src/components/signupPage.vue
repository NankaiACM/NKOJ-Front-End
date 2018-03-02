<template>
  <div id="signupPage">
    <h2 align="left">注册</h2><hr>
    <form>
      <div class="form-group">
        <h4 align="left"><label>邮箱</label></h4>
        <input type="text" class="form-control" placeholder="用户名" v-model="signupAccount">
      </div>
      <div class="form-group">
        <h4 align="left"><label>密码</label></h4>
        <input type="password" class="form-control" v-model="signupPassword">
      </div>
      <div class="form-group">
        <h4 align="left"><label>确认密码</label></h4>
        <input type="password" class="form-control" v-model="signupPassword2">
      </div>
      <div class="form-group">
        <h4 align="left"><label>性别</label></h4>
        <input type="text" class="form-control" placeholder="男/女/未知/扶他" v-model="signupGender">
      </div>
      <div class="form-group">
        <h4 align="left"><label>昵称</label></h4>
        <input type="text" class="form-control" placeholder="你喜欢的名字" v-model="signupName">
      </div>
      <div class="form-group">
        <h4 align="left"><label>个人签名</label></h4>
        <input type="text" class="form-control" placeholder="我永远喜欢python" v-model="signupWords">
      </div>
      <div class="form-group">
        <p align="left">{{signupMessage}}</p>
      </div>
      <div class="form-group">
        <button class="btn btn-success" v-on:click="signupAtempt()">注册</button>
        <button class="btn btn-info">清空</button>
      </div>
    </form>
  </div>
</template>

<script>
import '../../bin/rsa-wrapper.min.js'
export default {
  name: 'signup-page',
  data: function () {
    return {
      signupAccount: '',
      signupPassword: '',
      signupPassword2: '',
      signupGender: '',
      signupName: '',
      signupEmail: '',
      signupWords: '',
      signupMessage: '',
      tempPassword: '',
      checkAccountState: false
    }
  },
  methods: {
    passwordEncrypt: function (password) {
      this.tempPassword = password
    },
    checkPassword: function () {
      if (this.signupPassword === this.signupPassword2) return true
      else return false
    },
    checkAccount: function () {
      return new Promise((resolve, reject) => {
        var isOK = true
        this.$http.get('http://111.231.98.20:8000/api/u/check/email/' + this.signupEmail).then(res => {
          if (!res.body.ok) isOK = false
          resolve(isOK)
        })
      })
    },
    checkName: function () {
      return new Promise((resolve) => {
        var isOK = true
        this.$http.get('http://111.231.98.20:8000/api/u/check/nickname' + this.signupName).then(res => {
          if (!res.body.ok) isOK = false
          resolve(isOK)
        })
      })
    },
    signupAtempt: function () {
      if (!this.checkPassword()) {
        this.signupMessage = '两次密码输入不一致！'
        return
      }
      this.signupMessage = ''
      this.checkAccount().then(val => {
        if (!val) {
          this.signupMessage = '邮箱已被注册啦！'
        }
      })
      if (this.signupMessage.length > 0) return
      this.checkName().then(val => {
        if (!val) {
          this.signupMessage = '昵称重名啦！'
        }
      })
      if (this.signupMessage.length > 0) return
      var sendPackge = []
      rsaEncrypt(this.signupPassword, this.passwordEncrypt)
      sendPackge.password = this.tempPassword
      sendPackge.nickname = this.signupName
      sendPackge.email = this.signupEmail
      sendPackge.gender = this.signupGender
      this.$http.post('http://111.231.98.20:8000/api/u/signup', sendPackge).then(res => {
        if (res.body.ok) {
          this.signupMessage = '注册成功！'
        }
      })
    }
  }
}
</script>

<style scoped>
#signupPage{
  position:absolute;
  background: white;
  width: 35%;
  padding: 20px;
  margin: 10% 30%;
  z-index: 4;
  border-radius: 10px;
}
</style>
