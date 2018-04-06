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

    <!--div class="login-sign-up" v-if="pageStatus=='signUp'">
      <div class="title-bar">
        <div class="title">注册</div>
        <div class="subtitle">由此注册，加入南开ACM大家族吧~</div>
      </div>
      <hr>
      <form>
        <transition name="fade" @enter="fadeEnter" @leave="fadeLeave" :css="false">
          <第一阶段，输入邮箱名>
          <div key=1 class="wrapper" v-if="!isEmailSend">
            <div class="form-group" :class="{'hastext':signupAttribute.signupEmail!='','focus':focusing==3}">
              <label @click="labelClick">邮箱</label>
              <input type="text" class="form-control" :class="{'disabled':isEmailSending}"
                     v-model="signupAttribute.signupEmail" :disabled="isEmailSending" @focus="focusing=3"
                     @blur="focusing=0">
            </div>
            <div class="form-group captcha" :class="{'hastext':signupAttribute.signupCaptcha!='','focus':focusing==4}">
              <label @click="labelClick">右图中的文字</label>
              <input type="text" class="form-control" :class="{'disabled':isEmailSending}"
                     v-model="signupAttribute.signupCaptcha"
                     :disabled="isEmailSending" @focus="focusing=4" @blur="focusing=0" maxlength="6">
              <img class="captcha" :src="captchaUrl"
                   @click="captchaUrl=`${noPointHost}/api/captcha/sendmail?_t=` + Math.random()"/>
            </div>
            <div class="message-bar">
              <p>{{statusMessage}}</p>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="emailSendAttempt()" :disabled="isEmailSending">
              <vue-loading type="spin" color="white" :size="{ width: '30px', height: '30px' }" v-if="isEmailSending"></vue-loading>
              <div v-else><span class="glyphicon glyphicon-envelope" style="positon:relative;left:-5px;"></span>确定邮箱</div>
            </button>
            </div>
          </div>
          <第二阶段，输入验证码>
          <div key=2 class="wrapper" v-if="isEmailSend && !isEmailVerify">
            <div class="form-group" :class="{'hastext':signupAttribute.signupEmail!='','focus':focusing==3}">
              <label @click="labelClick">邮箱</label>
              <input type="text" class="form-control disabled" disabled="true"
                     v-model="signupAttribute.signupEmail" @focus="focusing=3"
                     @blur="focusing=0">
            </div>
            <div class="form-group" v-if="isEmailSend && !isEmailVerify"
                 :class="{'hastext':signupAttribute.emailCode!='','focus':focusing==1}">
              <label @click="labelClick">邮箱验证码</label>
              <input type="text" class="form-control" :class="{disabled:isEmailVerifying}"
                     v-model="signupAttribute.emailCode"
                     :disabled="isEmailVerifying" @focus="focusing=1" @blur="focusing=0" maxlength="6">
            </div>
            <div class="message-bar" style="height:6rem;padding-top:10px;">
              <p>{{statusMessage}}</p>
              <div>
                你还可以：
                <a @click="isEmailSend=false">重新填写邮箱</a>
                或
                <a :class="{'disabled':sendColdTime!=0}" @click="resendEmailAttempt">重发邮件</a>
                <span v-if="sendColdTime!=0">(还有{{sendColdTime}}s)</span>
              </div>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="emailVerifyAttempt()" :disabled="isEmailVerifying">
              <vue-loading type="spin" color="white" :size="{ width: '30px', height: '30px' }"
               v-if="isEmailVerifying"></vue-loading>
              <div v-else>验证邮箱</div>
            </button>
            </div>
          </div>
          <第三阶段，输入其他信息>
          <div key=3 class="wrapper" v-if="isEmailVerify && !isSignOK">
            <div class="form-group" :class="{'hastext':signupAttribute.signupName!='','focus':focusing==10}">
              <label @click="labelClick">用户名</label>
              <input type="text" class="form-control" :class="{'disabled':isSignuping}" @focus="focusing=10" @blur="focusing=0"
                     v-model="signupAttribute.signupName" :disabled="isSignuping">
            </div>
            <div class="form-group" :class="{'hastext':signupAttribute.signupPassword!='','focus':focusing==11}">
              <label @click="labelClick">密码</label>
              <input type="password" class="form-control" :class="{'disabled':isSignuping}" @focus="focusing=11" @blur="focusing=0"
                     v-model="signupAttribute.signupPassword" :disabled="isSignuping">
            </div>
            <div class="form-group" :class="{'hastext':signupAttribute.signupPassword2!='','focus':focusing==12}">
              <label @click="labelClick">确认密码</label>
              <input type="password" class="form-control" :class="{'disabled':isSignuping}" @focus="focusing=12" @blur="focusing=0"
                     v-model="signupAttribute.signupPassword2" :disabled="isSignuping">
            </div>
            <div class="message-bar">
              <p>{{statusMessage}}</p>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="signupAttempt()" :disabled="isSignuping">
              <vue-loading type="spin" color="white" :size="{ width: '30px', height: '30px' }"
               v-if="isSignuping"></vue-loading>
              <div v-else>注册</div>
            </button>
            </div>
          </div>
          <第四阶段，注册成功>
          <div key=4 class="wrapper" v-if="isSignOK">
            <div class="message-bar" style="height:9rem;padding-top:2rem">
              <p>注册成功哒~</p>
              <p>（ 窗口将在{{timeToClose}}秒后自动关闭 ）</p>
            </div>
          </div>
        </transition>
      </form>
      <div class="text" v-if="!isSignOK">已有帐号？立刻<a @click="pageStatus='login'">登录</a>！</div>
    </div-->
    </transition>
  </dialog-wrap>
</template>

<script>
import dialogWrap from "./dialogWrap";
import vueLoading from "vue-loading-template";

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
      signupAttribute: {
        signupPassword: "",
        signupPassword2: "",
        signupName: "",
        signupEmail: "",
        signupCaptcha: "",
        emailCode: ""
      },
      isEmailSending: false,
      isEmailSend: false,
      isEmailVerifying: false,
      isEmailVerify: false,
      isSignuping: false,
      isSignOK: false,
      emailSendDate: new Date(),
      statusMessage: "",
      noPointHost: window.noPointHost,
      emailKey: "",
      captchaUrl: `${noPointHost}/api/captcha/sendmail?_t=` + Math.random(),
      captchaUrlLogin:`${noPointHost}/api/captcha/login?_t=` + Math.random(),
      sendColdTime: 0,
      timeToClose: 0,
      noNeedCaptcha: false,
    };
  },
  methods: {
    loginpasswordEncrypt: function(password) {
      this.loginStatus=1;
      var loginPackege = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      loginPackege.password = password;
      loginPackege.user = this.loginAttribute.loginAccount;
      loginPackege.captcha = this.loginAttribute.captcha;
      this.$http
        .post(`${noPointHost}/api/u/login`, loginPackege, {
              crossDomain: true,
              xhrFields: { withCredentials: true },
              timeout: "8000",
              cache: true,
              credentials: true
        })
        .then(res => {
          console.log(res);
          if (res.body.code === 0) {
            this.loginStatus=2;
            this.$emit("userInfo", res.body.user);
            return;
          } else {
            this.loginMessage="";
            for (var item in res.body.error){
              this.loginMessage +=item+" "+res.body.error[item]+". ";
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
      rsaEncrypt(this.loginAttribute.loginPassword, this.loginpasswordEncrypt);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
        inputs[i].style.backgroundColor = "#ffffff";
      }
      event.preventDefault();
    },
    emailSendAttempt: function(event) {
      //邮箱检验
      if (!this.CheckMail(this.signupAttribute.signupEmail)) {
        this.statusMessage = "哎呀，邮箱格式错了，再检查一下吧！";
        this.showMessageBar(".message-bar", 2);
        return;
      } else {
        this.isEmailSending = true;
        this.$http
          .get(
            `${noPointHost}/api/u/verify/` +
              this.signupAttribute.signupEmail +
              "?captcha=" +
              this.signupAttribute.signupCaptcha,
            {
              crossDomain: true,
              xhrFields: { withCredentials: true },
              timeout: "8000",
              cache: true,
              credentials: true
            }
          )
          .then(
            res => {
              var vue = this;
              var resp = res.body;
              if (resp.code === 0) {
                vue.isEmailSend = true;
                vue.emailKey = resp.data.key; //记录key
                vue.emailSendDate = new Date(); //记录当前时间
                vue.statusMessage = "我们已经向您的邮箱发送了邮件！";
                this.isEmailSending = false;
                return;
              } else if (resp.code === 233) {
                vue.statusMessage = "请再输入一次验证码~";
              } else if (resp.code === 234) {
                vue.statusMessage = "验证码错啦！";
              } else {
                vue.emailSendDate = new Date(); //记录当前时间
                vue.statusMessage = "邮箱已经被注册或暂时无法发送邮件！";
              }
              vue.showMessageBar(".message-bar", 2);
              vue.signupAttribute.signupCaptcha = "";
              vue.captchaUrl =
                `${noPointHost}/api/captcha/sendmail?_t=` +
                Math.random();
              this.isEmailSending = false;
            },
            res => {
              var vue = this;
              if (res.status === 429) {
                vue.statusMessage =
                  "请求过于频繁啦，再等" +
                  (60 -
                    Math.floor(
                      (new Date().getTime() - vue.emailSendDate.getTime()) /
                        1000
                    )) +
                  "秒吧";
                vue.signupAttribute.signupCaptcha = "";
                vue.captchaUrl =
                  `${noPointHost}/api/captcha/sendmail?_t=` +
                  Math.random();
              } else {
                vue.statusMessage = "电波……无法传达……（连接失败）";
              }
              vue.showMessageBar(".message-bar", 2);
              this.isEmailSending = false;
            }
          )
          .catch(function(response) {
            var vue = this;
            vue.statusMessage = "通讯间发生错误……稍后再试吧";
            vue.showMessageBar(".message-bar", 2);
            this.isEmailSending = false;
          });
      }
    },
    resendEmailAttempt() {
      var vue = this;
      vue.isEmailSending = true;
      vue.$http
        .get(
          `${noPointHost}/api/u/verify/` +
            vue.emailKey +
            "/" +
            vue.signupAttribute.signupEmail,
          {
            crossDomain: true,
            xhrFields: { withCredentials: true },
            timeout: "8000",
            cache: true,
            credentials: true
          }
        )
        .then(
          res => {
            var vue = this;
            var resp = res.body;
            if (resp.code === 0) {
              vue.isEmailSend = true;
              vue.emailSendDate = new Date(); //记录当前时间
              vue.statusMessage = "邮件重新发送成功";
              vue.sendColdTime = 61;
              vue.setSendColdTime();
            } else {
              vue.statusMessage = "暂时无法发送邮件！";
            }
            this.isEmailSending = false;
          },
          res => {
            var vue = this;
            if (res.status === 429) {
              vue.statusMessage =
                "请求过于频繁啦，再等" +
                (60 -
                  Math.floor(
                    (new Date().getTime() - vue.emailSendDate.getTime()) / 1000
                  )) +
                "秒吧";
            } else {
              vue.statusMessage = "电波……无法传达……（连接失败）";
            }
            this.isEmailSending = false;
          }
        )
        .catch(function(response) {
          var vue = this;
          vue.statusMessage = "通讯间发生错误……稍后再试吧";
          vue.showMessageBar(".message-bar", 2);
          this.isEmailSending = false;
        });
    },
    emailVerifyAttempt() {
      var vue = this;
      vue.isEmailVerifying = true;
      vue.$http
        .get(
          `${noPointHost}/api/u/verify/` +
            vue.emailKey +
            "/" +
            vue.signupAttribute.emailCode,
          {
            crossDomain: true,
            xhrFields: { withCredentials: true },
            timeout: "8000",
            cache: true,
            credentials: true
          }
        )
        .then(
          res => {
            var vue = this;
            var resp = res.body;
            if (resp.code === 0) {
              vue.isEmailVerify = true;
              vue.statusMessage = "";
            } else {
              vue.statusMessage = "邮箱验证码错误，要仔细核对哦";
            }
            vue.isEmailVerifying = false;
          },
          res => {
            var vue = this;
            if (res.status === 429) {
              vue.statusMessage =
                "请求过于频繁啦，再等" +
                (60 -
                  Math.floor(
                    (new Date().getTime() - vue.emailSendDate.getTime()) / 1000
                  )) +
                "秒吧";
            } else {
              vue.statusMessage = "电波……无法传达……（连接失败）";
            }
            vue.isEmailVerifying = false;
          }
        )
        .catch(function(response) {
          var vue = this;
          vue.statusMessage = "通讯间发生错误……稍后再试吧";
          vue.showMessageBar(".message-bar", 2);
          isEmailVerifying = false;
        });
    },
    signuppasswordEncrypt: function(password) {
      var attr = this.signupAttribute;
      if (attr.signupPassword !== attr.signupPassword2) {
        this.statusMessage = "两次输入的密码不一致！";
        this.showMessageBar(".message-bar", 2);
        this.isSignuping = false;
        return;
      }
      var sendPackge = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      sendPackge.password = password;
      sendPackge.nickname = attr.signupName;
      sendPackge.email = attr.signupEmail;
      sendPackge.school = "Nankai University";
      sendPackge.gender = 1;
      this.$http
        .post(`${noPointHost}/api/u/register`, sendPackge, {
          crossDomain: true,
          xhrFields: { withCredentials: true },
          timeout: "8000",
          credentials: true
        })
        .then(res => {
          if (res.body.code === 0) {
            this.$emit("userInfo", res.body.user);
            this.isSignOK = true;
            this.isSignuping = false;
            return;
          } else if(res.body.code === 400) {
            this.statusMessage="";
            if(res.body.error.nickname) this.statusMessage+=("nickname "+ res.body.error.nickname)+". "
            if(res.body.error.password) this.statusMessage+=("password "+ res.body.error.password)+". "
          } else {
            this.statusMessage = "未知错误！";
          }
          this.showMessageBar(".message-bar", 2);
          this.isSignuping = false;
        });
    },
    signupAttempt: function(event) {
      this.isSignuping = true;
      rsaEncrypt(
        this.signupAttribute.signupPassword,
        this.signuppasswordEncrypt
      );
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
    setSendColdTime() {
      this.sendColdTime--;
      if (this.sendColdTime != 0 && this.isEmailSend) {
        setTimeout(this.setSendColdTime, 1000);
      }
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
    isEmailSend: function(newValue, oldValue) {
      if (newValue) {
        this.sendColdTime = 61;
        this.setSendColdTime();
      } else {
        this.signupAttribute.signupCaptcha = "";
        this.captchaUrl =
          `${noPointHost}/api/captcha/sendmail?_t=` + Math.random();
      }
      this.focusing = 0;
    },
    isSignOK: function(newValue, oldValue) {
      if (newValue) {
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
      this.$emit('changeStatus',newValue);
      if(newValue==="signUp")this.captchaUrl=`${noPointHost}/api/captcha/sendmail?_t=` + Math.random()
      if(newValue==="login")this.captchaUrlLogin=`${noPointHost}/api/captcha/login?_t=` + Math.random()
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
