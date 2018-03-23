<template>
  <div v-bind:style="{height: signupHeight + 'px'}" class="signupPage">
    <h2 align="left">注册</h2><hr>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-3 control-label">邮箱</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" placeholder="" v-model="signupEmail">
        </div>
      </div>
      <div class="form-group blueTextDiv" v-if="emailMessage">{{emailMessage}}</div>
      <transition name="fade" mode="out-in">
        <div v-if="isEmailSend" class="afterEmailSendDiv">
          <div class="form-group" v-if="isEmailSend">
            <label class="col-sm-3 control-label">密码</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" v-model="signupPassword">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">确认密码</label>
            <div class="col-sm-8">
              <input type="password" class="form-control" v-model="signupPassword2">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">昵称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" placeholder="你喜欢的名字" v-model="signupName">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">性别</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" placeholder="男/女/未知/扶他" v-model="signupGender">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-3 control-label">邮箱验证码</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="emailCode">
            </div>
          </div>
        </div>
      </transition>
      <br>
      <div class="form-group blueTextDiv" v-if="errorMessage">{{errorMessage}}</div>
      <div class="form-group">
        <button v-on:click="emailAttempt" class="btn btn-info" v-if="!isEmailSend">验证邮箱</button>
        <button v-on:click="signupAttempt" class="btn btn-info" v-if="isEmailSend">注册</button>
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
      isEmailSend: false,
      emailCode: '',
      tempPassword: '',
      emailMessage: undefined,
      errorMessage: undefined,
      signupHeight: 250
    }
  },
  methods: {
    passwordEncrypt: function (password) {
      if(this.signupPassword !== this.signupPassword2){
        if(typeof this.emailMessage === undefined)
          this.$set(this.data, "errorMessage", '两次输入的密码不一致！')
        else this.errorMessage = '两次输入的密码不一致！'
        return
      }
      var sendPackge = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      this.tempPassword = password
      sendPackge.password = this.tempPassword
      sendPackge.nickname = this.signupName
      sendPackge.email = this.signupEmail
      sendPackge.gender = this.signupGender
      sendPackge.school = 'NanKai University'
      sendPackge.ecode = this.emailCode
      this.$http.post(`http://${window.noPointHost}:8000/api/u/register`, sendPackge, {crossDomain : true, xhrFields: {withCredentials : true}}).then(res => {
        console.log(res)
        if (res.body.code === 0) {
          this.errorMessage = '注册成功！'
        } else {
          this.errorMessage = '未知错误！'
        }
      })
    },
    emailAttempt: function (event) {
      console.log(`http://${window.noPointHost}:8000/api/u/verify/` + this.signupEmail)
      this.$http.get(`http://${window.noPointHost}:8000/api/u/verify/` + this.signupEmail,  {crossDomain : true, xhrFields: {withCredentials : true}}).then((res, err) => {
        if(err){
          console.log(err)
        } else {
          if (res.body.code === 0) {
            this.isEmailSend = true
            this.signupHeight = 550
            if(typeof this.emailMessage === undefined)
              this.$set(this.data, "emailMessage", '我们已经向您的邮箱发送了邮件！')
            else this.emailMessage = '我们已经向您的邮箱发送了邮件！'
          } else {
            this.isEmailSend = true
            this.signupHeight = 550
            if(typeof this.emailMessage === undefined)
              this.$set(this.data, "emailMessage", '邮箱不正确或者已经被注册！')
            else this.emailMessage = '邮箱不正确或者已经被注册！'
          }
        }
      })
      event.preventDefault()
    },
    signupAttempt: function (event) {
      rsaEncrypt(this.signupPassword, this.passwordEncrypt)
      event.preventDefault()
    }
  }
}
</script>

<style scoped>
.signupPage{
  position:absolute;
  background: white;
  width: 35%;
  padding: 20px;
  margin: 5% 30%;
  z-index: 4;
  border-radius: 10px;
  transition: all 0.5s;
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
.signupPage button, .signupPage2 button{
  padding: 5px 10%;
}
.blueTextDiv{
  color: #5bc0de;
  font-weight: bold;
}
.afterEmailSendDiv{
  margin-bottom: 0;
  padding-bottom: 0;
  transition: all 1s;
}
</style>
