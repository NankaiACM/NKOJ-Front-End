<template>
  <dialog-wrap @exit="$emit('exit')">
    <div class="login-sign-up" :class="{appear:pageStatus=='login'}">
      <div class="title-bar">
        <div class="title">登录</div>
        <div class="subtitle">由此登录，开启今日的ACM之旅吧~</div>
      </div>
      <hr>
      <form>
        <div class="form-group" :class="{'hastext':loginAttribute.loginAccount!='','focus':focusing==1}">
          <label>用户名或邮箱</label>
          <input type="text" class="form-control" v-model="loginAttribute.loginAccount" @focus="focusing=1" @blur="focusing=0">
        </div>
        <div class="form-group" :class="{'hastext':loginAttribute.loginPassword!='','focus':focusing==2}">
          <label>密码</label>
          <input type="password" class="form-control" v-model="loginAttribute.loginPassword" @focus="focusing=2" @blur="focusing=0">
        </div>
        <div class="form-group message-bar">
          <p>{{loginMessage}}</p>
        </div>
        <div class="form-group">
          <button class="btn" v-on:click="loginAttempt">登陆</button>
        </div>
      </form>
      <div class="text">没有帐号？立刻<a>注册</a>！</div>
    </div>

    <div class="login-sign-up" :class="{appear:pageStatus=='signUp'}">
      <div class="title-bar">
        <div class="title">注册</div>
        <div class="subtitle">由此注册，加入南开ACM大家族吧~</div>
      </div>
      <hr>
    <form>
      <!--第一阶段，输入邮箱名-->
      <div class="form-group" :class="{'hastext':signupAttribute.signupEmail!='','focus':focusing==3}">
        <label>邮箱</label>
        <input type="text" class="form-control" v-model="signupAttribute.signupEmail" @focus="focusing=3" @blur="focusing=0">
      </div>
      <!--第二阶段，输入验证码-->
      <div class="form-group" v-if="isEmailSend" :class="{'hastext':signupAttribute.signupEmail!='','focus':focusing==3}">
        <label>邮箱</label>
        <input type="text" class="form-control" v-model="signupAttribute.signupEmail" @focus="focusing=3" @blur="focusing=0">
      </div>
      <div v-if="isEmailVerify" class="afterEmailSendDiv">
        <div class="form-group">
          <label class="col-sm-3 control-label">密码</label>
          <input type="password" class="form-control" v-model="signupAttribute.signupPassword">
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">确认密码</label>
          <input type="password" class="form-control" v-model="signupAttribute.signupPassword2">
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">用户名</label>
          <input type="text" class="form-control" v-model="signupAttribute.signupName">
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">邮箱验证码</label>
          <input type="text" class="form-control" v-model="emailCode">
        </div>
      </div>
      <div class="form-group message-bar">
          <p>{{errorMessage}}</p>
      </div>
      <div class="form-group">
        <button v-on:click.prevent="emailSendAttempt" class="btn" v-if="!isEmailSend">
          <span class="glyphicon glyphicon-envelope" style="positon:relative;left:-5px;"></span>发送
        </button>
        <button v-on:click.prevent="emailAttempt" class="btn" v-else-if="!isEmailVerify">验证邮箱</button>
        <button v-on:click.prevent="signupAttempt" class="btn" v-else>注册</button>
      </div>
    </form>
      <div class="text">已有帐号？立刻<a>登录</a>！</div>
    </div>
  </dialog-wrap>
</template>

<script>
import dialogWrap from "./dialogWrap";
export default {
  name: "loginSignUp",
  props: {
    status: String
  },
  components: { dialogWrap },
  data() {
    return {
      loginAttribute: {
        loginAccount: "",
        loginPassword: ""
      },
      loginMessage: "",
      focusing: 0,
      pageStatus: this.status,
      signupAttribute: {
        signupAccount: "",
        signupPassword: "",
        signupPassword2: "",
        signupName: "",
        signupEmail: "",
        signupWords: "",
        signupMessage: ""
      },
      isEmailSend: false,
      isEmailVerify: false,
      emailCode: "",
      errorMessage: "",
      signupHeight: 250
    };
  },
  methods: {
    loginpasswordEncrypt: function(password) {
      var loginPackege = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      loginPackege.password = password;
      loginPackege.user = this.loginAttribute.loginAccount;
      this.$http
        .post("http://111.231.98.20:8000/api/u/login", loginPackege, {
          crossDomain: true,
          xhrFields: { withCredentials: true }
        })
        .then(res => {
          console.log(res);
          if (res.body.code === 400) {
            this.loginMessage = "用户名不存在";
          } else if (res.body.code === 1) {
            this.loginMessage = "用户名或密码错误";
          } else if (res.body.code === 0) {
            this.loginMessage = "成功登陆！";
            console.log(res.body.user);
            this.$emit("userInfo", res.body.user);
          }
          this.showMessageBar();
        });
    },
    loginAttempt: function(event) {
      var inputs = document.querySelectorAll(".appear input");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        inputs[i].style.backgroundColor = "#ededed";
      }
      rsaEncrypt(this.loginAttribute.loginPassword, this.loginpasswordEncrypt);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
        inputs[i].style.backgroundColor = "#ffffff";
      }
      event.preventDefault();
    },
    signuppasswordEncrypt: function(password) {
      if (
        this.signupAttribute.signupPassword !==
        this.signupAttribute.signupPassword2
      ) {
        if (typeof this.emailMessage === undefined)
          this.$set(this.data, "errorMessage", "两次输入的密码不一致！");
        else this.errorMessage = "两次输入的密码不一致！";
        return;
      }
      var sendPackge = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      sendPackge.password = password;
      sendPackge.nickname = this.signupAttribute.signupName;
      sendPackge.email = this.signupAttribute.signupEmail;
      sendPackge.gender = this.signupAttribute.signupGender;
      sendPackge.school = "NanKai University";
      sendPackge.ecode = this.emailCode;
      this.$http
        .post("http://111.231.98.20:8000/api/u/register", sendPackge, {
          crossDomain: true,
          xhrFields: { withCredentials: true }
        })
        .then(res => {
          console.log(res);
          if (res.body.code === 0) {
            this.errorMessage = "注册成功！";
          } else {
            this.errorMessage = "未知错误！";
          }
        });
    },
    emailSendAttempt: function(event) {
      //邮箱检验
      var input = document.querySelector(".appear input")
      input.disabled = true;
      input.style.backgroundColor = "#ededed";
      if (!this.CheckMail(this.signupAttribute.signupEmail)) {
        this.errorMessage = "哎呀，邮箱格式错了，再检查一下吧！";
        this.showMessageBar();
        input.disabled = false;
        input.style.backgroundColor = "#fff";
      } else {
        console.log(
          "http://111.231.98.20:8000/api/u/verify/" +
            this.signupAttribute.signupEmail
        );
        this.$http
          .get(
            "http://111.231.98.20:8000/api/u/verify/" +
              this.signupAttribute.signupEmail,
            { crossDomain: true, xhrFields: { withCredentials: true } }
          )
          .then((res, err) => {
            if (err) {
              console.log(err);  0
            } else {
              this.signupHeight = 550;
              if (res.body.code === 0) {
                this.isEmailSend = true;
                this.errorMessage = "我们已经向您的邮箱发送了邮件！";
              } else {
                this.errorMessage = "邮箱不正确或者已经被注册！";
                input.disabled = false;
                input.style.backgroundColor = "#fff";
              }
            }
            this.showMessageBar();
          });
      }
    },
    signupAttempt: function(event) {
      rsaEncrypt(
        this.signupAttribute.signupPassword,
        this.signuppasswordEncrypt
      );
      event.preventDefault();
    },
    CheckMail(mail) {
      var filter = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return filter.test(mail);
    },
    showMessageBar() {
      var mb = document.querySelector(".appear .message-bar");
      if (mb.style.height == 0) {
        Velocity(mb, { height: "2rem" }, { duration: 200 });
        Velocity(mb, { color: "#5bc0de" }, { duration: 300 });
      }
    },
  }
};
</script>

<style>
.login-sign-up {
  visibility: hidden;
  position: absolute;
}
.appear {
  visibility: visible;
  position: relative;
}

.dialog-field .title-bar {
  padding: 1.5rem 0;
}
.dialog-field .title-bar .title {
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 10px;
}
.dialog-field .title-bar .subtitle {
  color: #aaaaaa;
}
.dialog-field hr {
  margin: 0;
}

.dialog-field .form-group {
  position: relative;
  margin: 30px 0;
}
.dialog-field .form-group input {
  box-shadow: none;
  padding: 2.8rem 20px 0.7rem;
  height: auto;
  border-radius: 5px;
}
.dialog-field input:focus {
  box-shadow: none;
}
.dialog-field input:hover {
  box-shadow: none;
  border-color: #66afe9;
}
.dialog-field .form-group label {
  font-weight: normal;
  position: absolute;
  left: 20px;
  top: 1.8rem;
  font-size: 1.5rem;
  transition: all 0.3s;
  color: #2c3e50;
}
.dialog-field .focus label,
.dialog-field .hastext label {
  top: 0.7rem;
  font-size: 90%;
  color: #aaaaaa;
}

.dialog-field .message-bar {
  margin: -15px;
  height: 0;
  overflow: hidden;
  font-size: 1.4rem;
  color: white;
  line-height: 2rem;
  font-weight: bold;
}

.form-group button {
  width: 100%;
  height: 5.5rem;
  border-radius: 7px;
  border: none;
  background-color: #b8bedd;
  color: white;
}
.form-group button:hover {
  background-color: #c4c9e3;
  color: white;
}
.form-group button:focus,
.form-group button:active {
  background-color: #a8adc9;
  color: white;
}

.text {
  padding: 0.5rem 0;
  margin-top: -20px;
}
.text a {
  cursor: pointer;
  color: #1b98e0;
}

.signupPage {
  position: absolute;
  background: white;
  width: 35%;
  padding: 20px;
  margin: 5% 30%;
  z-index: 4;
  border-radius: 10px;
  transition: all 0.5s;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.signupPage button,
.signupPage2 button {
  padding: 5px 10%;
}
.blueTextDiv {
  color: #5bc0de;
  font-weight: bold;
}
.afterEmailSendDiv {
  margin-bottom: 0;
  padding-bottom: 0;
  transition: all 1s;
}
</style>
