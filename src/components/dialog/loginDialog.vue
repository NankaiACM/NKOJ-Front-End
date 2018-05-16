<template>
  <dialog-wrap @exit="$emit('exit')">
    <transition name="fade" @enter="fadeEnter" @leave="fadeLeave" :css="false">
    <div class="login-sign-up" v-if="pageStatus=='login'">
      <div class="title-bar">
        <div class="title">登录</div>
        <div class="subtitle">由此登录，开启今日的ACM之旅吧~</div>
      </div>
      <hr>
      <form class="wrapper">
        <transition name="fade" @enter="fadeEnter" @leave="fadeLeave" :css="false">
        <div v-if="loginStatus==0 || loginStatus==1" key="1">
        <div class="form-group" :class="{'hastext':loginAttribute.loginAccount!='','focus':focusing==1}">
          <label @click="labelClick">用户名或邮箱</label>
          <input type="text" class="form-control" v-model="loginAttribute.loginAccount" @focus="focusing=1"
                 @blur="focusing=0" :disabled="loginStatus==1" :class="{'disabled':loginStatus==1}">
        </div>
        <div class="form-group" :class="{'hastext':loginAttribute.loginPassword!='','focus':focusing==2}">
          <label @click="labelClick">密码</label>
          <input type="password" class="form-control" v-model="loginAttribute.loginPassword" @focus="focusing=2"
                 @blur="focusing=0" :disabled="loginStatus==1" :class="{'disabled':loginStatus==1}">
        </div>

            <div class="form-group captcha" v-show="!noNeedCaptcha" :class="{'hastext':loginAttribute.captcha!='','focus':focusing==4}">
              <label @click="labelClick">右图中的文字</label>
              <input type="text" class="form-control" v-model="loginAttribute.captcha" :disabled="loginStatus==1"
                :class="{'disabled':loginStatus==1}" @focus="focusing=4" @blur="focusing=0" maxlength="6">
              <img class="captcha" :src="captchaUrlLogin" @error="noNeedCaptcha=true" @load="noNeedCaptcha=false;loginAttribute.captcha=''"
                   @click="captchaUrlLogin=`${noPointHost}/api/captcha/login?_t=` + Math.random()"/>
            </div>
        <div class="message-bar">
          <p>{{loginMessage}}</p>
        </div>
        <div class="form-group">
          <button class="btn" @click.prevent="loginAttempt" :disabled="loginStatus==1">
            <vue-loading type="spin" color="white" :size="{ width: '30px', height: '30px' }" v-if="loginStatus==1"></vue-loading>
            <div v-else>登陆</div>
          </button>
        </div>
        </div>
        <div v-else-if="loginStatus==2" key="2">
            <div class="message-bar" style="height:9rem;padding-top:1rem">
              <p>登录成功哒~</p>
              <p>（ 窗口将在{{timeToClose}}秒后自动关闭 ）</p>
            </div>
        </div>
        </transition>
      </form>
      <div class="text" v-if="loginStatus!=2">没有帐号？立刻<a @click="pageStatus='signUp'">注册</a>！</div>
    </div>

    </transition>
  </dialog-wrap>
</template>

<script>
import dialogWrap from "./dialogWrap";
import vueLoading from "vue-loading-template";
import forge from '../../../bin/forge.min.js'

export default {
  name: "loginSignUp",
  props: {
    status: String
  },
  components: { dialogWrap, vueLoading },
  data() {
    return {
      loginAttribute: {
        loginAccount: "",
        loginPassword: "",
        captcha:"",
      },
      loginMessage: "",
      loginStatus: 0,
      focusing: 0,
      pageStatus: this.status,
      noPointHost: window.noPointHost,
      captchaUrlLogin:`${noPointHost}/api/captcha/login?_t=` + Math.random(),
      timeToClose: 0,
      noNeedCaptcha: true,
    };
  },
  methods: {
    loginpasswordEncrypt: function(password) {
      this.loginStatus=1;
      var loginPackege = {}
      loginPackege.password = password;
      loginPackege.user = this.loginAttribute.loginAccount;
      loginPackege.captcha = this.loginAttribute.captcha;
      this.$http
        .post(`${noPointHost}/api/u/login`, loginPackege, {
          timeout: '8000'
        })
        .then(res => {
          console.log(JSON.stringify(res));
          if (res.body.code === 0) {
            this.loginStatus=2;
            this.$store.commit({
              type: 'setuserDate',
              isLogin: true,
              id: res.body.data.user_id,
              nickname: res.body.data.nickname,
              lastLogin: res.body.data.last_login,
              perm: res.body.data.perm
            })
            return;
          } else {
            this.loginMessage="";
            for (var item in res.body.error){
              this.loginMessage +=res.body.error[item].name+" "+res.body.error[item].message+". ";
            }
            this.captchaUrlLogin=`${noPointHost}/api/captcha/login?_t=` + Math.random()
            this.loginStatus=0;
          }
          this.showMessageBar(".message-bar", 2);
        });
    },
    loginAttempt: function(event) {
      var inputs = document.querySelectorAll(".appear input");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        inputs[i].style.backgroundColor = "#ededed";
      }
      var message = this.signupAttribute.signupPassword
      var publicKey = forge.pki.publicKeyFromPem('-----BEGIN PUBLIC KEY-----' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgiSx01fTZ5E6v5fjWEUG' +
        'r31+rkBO5vxKvTI4EWojeboXNI39tzUZsdqwu6h6VYx90HGZtU3pvVXoZUc2Qrtt' +
        'haFQSPCMnlRfOBAoON8/VPaAth79wAbeSpn3l6okHNJNy8EzPMqB87fL5K1WaDh2' +
        '8uRsUtusu/H5WUgHLOort4YYtWXkzhhRer3f8lcWHAPM34EgIX4TZcPp1X6WFTwQ' +
        'MunFq1L6WaWoQE7e8sSuCzUV5iRCaVQpTkkveAqhYi4ZL8X9fX5WKviOXuC4T50y' +
        'OWbRO/ehU7iZj3sPEGHOZtaHzlEa+AvtF1UCEOQ8zB/QJx6/3khfg56JQhow06HQ' +
        'mwIDAQAB' +
        '-----END PUBLIC KEY-----')

      var encrypted = publicKey.encrypt(message)
      var base64 = forge.util.encode64(encrypted)

      this.loginpasswordEncrypt(base64)
      // rsaEncrypt(this.loginAttribute.loginPassword, this.loginpasswordEncrypt);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
        inputs[i].style.backgroundColor = "#ffffff";
      }
      event.preventDefault();
    },
    CheckMail(mail) {
      var filter = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      return filter.test(mail);
    },
    showMessageBar(classcode, high) {
      var mb = document.querySelector(classcode);
      var target= high==0?"0":"10px"
      if(high!=0) high+=1.2
      if (mb.style.height != high + "rem") {
        Velocity(
          mb,
          { height: [high + "rem", mb.style.height],paddingTop:target },
          { duration: 300 }
        );
      }
    },
    labelClick(event) {
      event.target.nextElementSibling.focus();
    },
    fadeEnter(el, done) {
      var target = el.offsetHeight;
      el.style.display = "none";
      var form = el.parentElement;
      var keep = form.offsetHeight;
      form.style.height = keep + "px";
      Velocity(
        form,
        { height: keep - this.tansitionHeight + target + "px" },
        {
          duration: Math.sqrt(Math.abs(this.tansitionHeight - target))*20,
          complete: function() {
            el.style.display = "block";
            form.style.height = "auto";
            done();
          }
        }
      );
      Velocity(el.parentElement, { opacity: 1 }, { duration: 300 });
    },
    fadeLeave(el, done) {
      this.tansitionHeight = el.offsetHeight;
      Velocity(
        el.parentElement,
        { opacity: 0 },
        { duration: 300, complete: done }
      );
    },
  },
  watch: {
    loginStatus: function(newValue, oldValue) {
      if (newValue==2) {
        var vue=this;
        var mesbar = document.querySelector(".message-bar");
        var form = mesbar.parentElement;
        var keep=form.offsetHeight;
        form.style.height=keep+"px";
        setTimeout(
          function(){
            Velocity(form, {height: keep-vue.tansitionHeight+20+"px"},{duration:300})
            mesbar.style.margin="30px"
            mesbar.style.height="4rem"
        Velocity(
          form,
          { opacity:1 },
          { duration: 300 }
        );
          }
        ,300)
        vue.timeToClose=5;
        var func=function(){
          vue.timeToClose--;
          if(vue.timeToClose==0){
            vue.$emit('exit');
          }
          else{
            setTimeout(func, 1000);
          }
        }
        setTimeout(func,1000)
      }
    },
    pageStatus: function (newValue,oldValue) {
      this.$emit('exit');
      this.$emit('changeStatus',newValue);
    },
  }
};
</script>

<style>
.dialog-field .title-bar {
  padding: 1.5rem 0;
  text-align: center;
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

.dialog-field form {
  overflow: hidden;
}

.dialog-field .form-group {
  position: relative;
  padding: 30px 0 0;
  margin: 0;
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

.dialog-field input.disabled {
  background: #dedede;
  cursor: default;
}

.dialog-field input.disabled:hover {
  border-color: #ccc;
}

.dialog-field a.disabled,
.dialog-field a.disabled:hover,
.dialog-field a.disabled:focus,
.dialog-field a.disabled:active,
.dialog-field .message-bar a.disabled:hover,
.dialog-field .message-bar a.disabled:focus,
.dialog-field .message-bar a.disabled:active,
.dialog-field .message-bar a.disabled {
  pointer-events: none;
  color: #aaa;
}

.dialog-field .captcha input {
  padding-right: 150px;
}

.dialog-field .captcha img {
  position: absolute;
  top: 35px;
  right: 5px;
  width: 140px;
  height: 46px;
  border-radius: 3px;
  cursor: pointer;
}

.dialog-field .form-group label {
  font-weight: normal;
  position: absolute;
  left: 20px;
  top: 48px;
  font-size: 1.5rem;
  transition: all 0.3s;
  color: #2c3e50;
  cursor: text;
}

.dialog-field .focus label,
.dialog-field .hastext label {
  top: 37px;
  font-size: 90%;
  color: #aaaaaa;
}

.dialog-field .message-bar {
  height: 0rem;
  overflow: hidden;
  font-size: 1.4rem;
  color: #2c3e50;
  line-height: 2.5rem;
  text-align: center;
  position: relative;
  top: 10px;
}

.dialog-field .message-bar p{
  margin: 0;
}

.dialog-field .message-bar a{
  cursor: pointer;
  color: #1b98e0;
}

.wrapper button {
  width: 100%;
  height: 5.5rem;
  border-radius: 7px;
  border: none;
  background-color: #b8bedd;
  color: white;
}

.wrapper button:hover {
  background-color: #c4c9e3;
  color: white;
}

.wrapper button:focus,
.wrapper button:active {
  background-color: #a8adc9;
  color: white;
}

.login-sign-up .text {
  padding: 1rem 0;
  top: 5px;
  position: relative;
  text-align: center;
}

.login-sign-up .text a {
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

.fade-enter-active,
.fade-leave-active {
  position: absolute;
  transition: opacity 10.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
