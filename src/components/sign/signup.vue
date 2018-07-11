<template>
  <div id="signup-page">
    <div class="sign-up container">
      <div class="title-bar">
        <div class="title">注册帐号</div>
      </div><hr>
      <form>
        <div class="message-bar" v-if="statusMessage!==undefined">
          <span class="glyphicon glyphicon-warning-sign"></span>
          <div><p v-for="message in statusMessage" :key="message.id">
            <span style="font-weight:bold">{{message.name}}:</span>{{message.message}}</p>
          </div>
        </div>
        <transition name="fade" @enter="fadeEnter" @leave="fadeLeave" :css="false">
          <!--第一阶段，输入邮箱名-->
          <div v-if="signupStatus<4">
            <div class="form-group" :class="{'hastext':signupAttribute.signupEmail!='','focus':focusing==1}">
              <label @click="labelClick">邮箱</label>
              <input type="text" class="form-control" :class="{'disabled':signupStatus===1||signupStatus===3}"
                     v-model="inputEmail" :disabled="signupStatus===1||signupStatus===3"
                     @focus="focusing=1" @blur="focusing=0">
            </div>
            <div class="form-group captcha" :class="{'hastext':signupAttribute.signupCaptcha!='','focus':focusing==2}">
              <label @click="labelClick">右图中的文字</label>
              <input type="text" class="form-control" :class="{'disabled':signupStatus===1||signupStatus===3}"
                     v-model="signupAttribute.signupCaptcha" :disabled="signupStatus===1||signupStatus===3"
                     @focus="focusing=2" @blur="focusing=0" maxlength="6">
              <img class="captcha" :src="captchaUrl"
                   @click="captchaUrl=`${noPointHost}/api/captcha/sendmail?_t=` + Math.random()"/>
            </div>
            <div class="form-group email-code" :class="{'hastext':signupAttribute.emailCode!='','focus':focusing==3}">
              <label @click="labelClick">邮箱验证码</label>
              <input type="text" class="form-control" :class="{'disabled':signupStatus===1||signupStatus===3}"
                     v-model="signupAttribute.emailCode" :disabled="signupStatus===1||signupStatus===3"
                     @focus="focusing=3" @blur="focusing=0" maxlength="6">
              <button v-on:click.prevent="emailSendAttempt()" :disabled="signupStatus===1 || signupStatus===3 || sendColdTime!==0"
                  :class="{'disabled':signupStatus===1 || signupStatus===3 || sendColdTime!==0}">
                <vue-loading type="spin" color="#2c3e50" :size="{ width: '30px', height: '30px' }" v-if="signupStatus===1"></vue-loading>
                <div v-else>获取验证码<div v-if="sendColdTime!==0">(还有{{sendColdTime}}s)</div></div>
              </button>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="emailVerifyAttempt()" :disabled="signupStatus===1 || signupStatus===3">
              <vue-loading type="spin" color="#2c3e50" :size="{ width: '30px', height: '30px' }" v-if="signupStatus===3"></vue-loading>
              <div v-else>确认邮箱</div>
            </button>
            </div>
          </div>
          <!--第二阶段，输入其他信息-->
          <div v-if="signupStatus>=4">
            <div class="form-group" :class="{'hastext':signupAttribute.signupName!='','focus':focusing==1}">
              <label @click="labelClick">昵称</label>
              <input type="text" class="form-control" :class="{'disabled':signupStatus===5}" @focus="focusing=1" @blur="focusing=0"
                     v-model="signupAttribute.signupName" :disabled="signupStatus===5">
            </div>
            <div class="form-group pw" :class="{'hastext':signupAttribute.signupPassword!='','focus':focusing==2}">
              <label @click="labelClick">密码</label>
              <input :type="isLookPw" class="form-control" :class="{'disabled':signupStatus===5}" @focus="focusing=2" @blur="focusing=0"
                     v-model="signupAttribute.signupPassword" :disabled="signupStatus===5">
              <span class="glyphicon" :class="{'glyphicon-eye-close':isLookPw==='password','glyphicon-eye-open':isLookPw==='text'}"
                @click="isLookPw=isLookPw==='text'?'password':'text'"></span>
            </div>
            <div class="form-group" :class="{'hastext':signupAttribute.signupSchool!='','focus':focusing==3}">
              <label @click="labelClick">所属学校（非必填）</label>
              <input type="text" class="form-control" :class="{'disabled':signupStatus===5}" @focus="focusing=3" @blur="focusing=0"
                     v-model="signupAttribute.signupSchool" :disabled="signupStatus===5">
            </div>
            <div class="form-group sex-form">
              <span>性别：</span>
              <div>
                <input type="radio" name="sex" v-model="signupAttribute.signupGender" value="1" :disabled="signupStatus===5" />
                <span>男</span>
                <input type="radio" name="sex" v-model="signupAttribute.signupGender" value="2" :disabled="signupStatus===5" />
                <span>女</span>
                <input type="radio" name="sex" v-model="signupAttribute.signupGender" value="3" :disabled="signupStatus===5" />
                <span>不想透露</span>
                <input type="radio" name="sex" v-model="signupAttribute.signupGender" value="4" :disabled="signupStatus===5" />
                <span>秀吉/朝日/？？</span>
              </div>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="signupAttempt()" :disabled="signupStatus===5">
              <vue-loading type="spin" color="white" :size="{ width: '30px', height: '30px' }"
               v-if="signupStatus===5"></vue-loading>
              <div v-else>注册</div>
            </button>
            </div>
          </div>
        </transition>
        <dialog-wrap v-if="dialogShow" @exit="dialogShow=false;$router.push({path: '/home'});">
          <div class="dialog-wrapper">
          <div v-if="signupStatus===2">
            <p>验证邮件已经发送至您的邮箱！</p>
          </div>
          <div v-else-if="signupStatus===6">
            <p>注册成功哒~</p>
            <p>（窗口将在{{timeToClose}}秒后自动关闭）</p>
          </div>
          </div>
        </dialog-wrap>
      </form>
    </div>
  </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
import dialogWrap from '../dialog/dialogWrap'
import encryptMsg from '../../encrypt/encryptMsg.js'

export default {
  name: 'signupPage',
  components: {vueLoading, dialogWrap},
  data () {
    return {
      focusing: 0,
      inputEmail: '',
      signupAttribute: {
        signupPassword: '',
        signupName: '',
        signupEmail: '',
        signupCaptcha: '',
        emailCode: '',
        signupGender: '1',
        signupSchool: ''
      },
      signupStatus: 0,
      // 0:none 1:sending 2:send 3:verifying 4:verify 5:signuping 6:ok
      isLookPw: 'password',
      emailSendDate: new Date(),
      statusMessage: undefined,
      noPointHost: window.noPointHost,
      emailKey: '',
      captchaUrl: `${window.noPointHost}/api/captcha/sendmail?_t=` + Math.random(),
      sendColdTime: 0,
      timeToClose: 0,
      dialogShow: false
    }
  },
  methods: {
    emailSendAttempt: function (event) {
      // console.log(this.$route.matched[0].components.default)
      // 邮箱检验
      if (!this.CheckMail(this.signupAttribute.signupEmail)) {
        this.statusMessage = [{ name: '邮箱', message: '格式错误，再检查一下吧' }]
      } else {
        this.signupStatus = 1
        this.$http
          .get(
            `${window.noPointHost}/api/u/verify/` +
              this.signupAttribute.signupEmail +
              '?captcha=' +
              this.signupAttribute.signupCaptcha,
            {
              timeout: '8000'
            }
          )
          .then(
            res => {
              var vue = this
              var resp = res.body
              console.log(resp)
              vue.emailSendDate = new Date() // 记录当前时间
              if (resp.code === 0) {
                vue.signupStatus = 2
                vue.emailKey = resp.data.key
                vue.statusMessage = undefined
              } else {
                vue.statusMessage = resp.error
                this.signupStatus = 0
              }
              // 取消图片验证码清空
              // 免使看起来需要输入两次验证码
              // vue.signupAttribute.signupCaptcha = "";
              // vue.captchaUrl = `${noPointHost}/api/captcha/sendmail?_t=` + Math.random();
            },
            res => {
              var vue = this
              if (res.status === 429) {
                vue.statusMessage = [{name: '错误',
                  message:
                  '请求过于频繁啦，再等' + (60 - Math.floor((new Date().getTime() - vue.emailSendDate.getTime()) / 1000)) + '秒吧'
                }]
                vue.signupAttribute.signupCaptcha = ''
                vue.captchaUrl = `${window.noPointHost}/api/captcha/sendmail?_t=` + Math.random()
              } else {
                vue.statusMessage = [{name: '错误', message: '电波……无法传达……（连接失败）'}]
              }
              this.signupStatus = 0
            }
          )
          .catch(function (response) {
            var vue = this
            vue.statusMessage = [{name: '错误', message: '未知错误！如果方便的话可以反馈一下！'}]
            this.signupStatus = 0
          })
      }
    },
    emailVerifyAttempt () {
      let vue = this
      if (vue.signupStatus === 0) {
        vue.statusMessage = [{ name: '错误', message: '请重新获取邮件验证码！'}]
        return
      }
      vue.signupStatus = 3
      vue.$http
        .get(
          `${window.noPointHost}/api/u/verify/` +
            vue.emailKey +
            '/' +
            vue.signupAttribute.emailCode,
          {
            timeout: '8000'
          }
        )
        .then(
          res => {
            var vue = this
            var resp = res.body
            console.log(resp)
            if (resp.code === 0) {
              vue.signupStatus = 4
              vue.statusMessage = undefined
            } else {
              vue.statusMessage = resp.error
              vue.signupStatus = 2
            }
          },
          res => {
            var vue = this
            if (res.status === 429) {
              vue.statusMessage = [{name: '错误',
                message: '请求过于频繁啦，再等' + (60 - Math.floor((new Date().getTime() - vue.emailSendDate.getTime()) / 1000)) + '秒吧'
              }]
            } else {
              vue.statusMessage = [{ name: '错误', message: '电波……无法传达……（连接失败）' }]
            }
            vue.signupStatus = 2
          }
        )
        .catch(function (response) {
          var vue = this
          vue.statusMessage = [{ name: '错误', message: '未知错误！如果方便的话可以反馈一下！' }]
          vue.signupStatus = 2
        })
    },
    signuppasswordEncrypt: function (password) {
      this.signupStatus = 5
      var attr = this.signupAttribute
      var sendPackge = {}
      sendPackge.password = password
      sendPackge.nickname = attr.signupName
      sendPackge.email = attr.signupEmail
      sendPackge.school = attr.signupSchool
      sendPackge.gender = attr.signupGender
      this.$http
        .post(`${window.noPointHost}/api/u/register`, sendPackge, {
          timeout: '8000'
        })
        .then(
          res => {
            console.log(res)
            if (res.body.code === 0) {
              this.signupStatus = 6
              this.$store.commit({
                type: 'setuserDate',
                isLogin: true,
                id: res.body.data.user_id,
                nickname: res.body.data.nickname,
                lastLogin: res.body.data.last_login
              })
            } else {
              this.statusMessage = res.body.error
              this.signupStatus = 4
            }
          },
          res => {
            var vue = this
            if (res.status === 429) {
              vue.statusMessage = [{name: '错误',
                message: '请求过于频繁啦，再等' + (60 - Math.floor((new Date().getTime() - vue.emailSendDate.getTime()) / 1000)) + '秒吧'
              }]
            } else {
              vue.statusMessage = [{ name: '错误', message: '电波……无法传达……（连接失败）' }]
            }
            vue.signupStatus = 4
          }
        )
        .catch(function (response) {
          var vue = this
          vue.statusMessage = [{ name: '错误', message: '未知错误！如果方便的话可以反馈一下！' }]
          vue.signupStatus = 4
        })
    },
    signupAttempt: function (event) {
      const message = this.signupAttribute.signupPassword
      const base64 = encryptMsg(message)
      this.signuppasswordEncrypt(base64)
    },
    CheckMail (mail) {
      var filter = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
      return filter.test(mail)
    },
    labelClick (event) {
      event.target.nextElementSibling.focus()
    },
    setSendColdTime () {
      let vue = this
      vue.sendColdTime = (60 - Math.floor((new Date().getTime() - vue.emailSendDate.getTime()) / 1000))
      let func = function () {
        vue.sendColdTime--
        if (vue.sendColdTime !== 0 && vue.signupStatus < 4) {
          setTimeout(func, 1000)
        }
      }
      if (vue.sendColdTime <= 0) {
        vue.sendColdTime = 0
      } else {
        setTimeout(func, 1000)
      }
    },
    fadeEnter (el, done) {
      done()
    },
    fadeLeave (el, done) {
      done()
    }
  },
  watch: {
    signupStatus: function (newValue, oldValue) {
      if (newValue === 2 && oldValue === 1) {
        this.setSendColdTime()
      } else if (newValue === 6) {
        var vue = this
        vue.timeToClose = 5
        vue.dialogShow = true
        var func = function () {
          vue.timeToClose--
          if (vue.timeToClose === 0) {
            vue.dialogShow = false
            vue.$router.push({path: '/home'})
          } else {
            setTimeout(func, 1000)
          }
        }
        setTimeout(func, 1000)
      }
    },
    inputEmail: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.signupStatus = 0
        this.signupAttribute.signupEmail = newValue
      }
    }
  }
}
</script>

<style scoped>
.sign-up {
  padding: 20px 0;
  max-width: 500px;
}
.sign-up .title-bar {
  padding: 1.5rem 0;
  text-align: left;
}

.sign-up .title-bar .title {
  font-size: 2rem;
}

.sign-up hr {
  margin: 0;
}

.sign-up form {
  padding-right: 10px;
}

.sign-up .form-group {
  position: relative;
  padding: 40px 0 0;
  margin: 0;
}

.sign-up .form-group input {
  box-shadow: none;
  padding: 2.8rem 20px 0.7rem;
  height: auto;
  background: none;
}
.sign-up input:focus {
  box-shadow: none;
}
.sign-up input:hover {
  box-shadow: none;
  border-color: #66afe9;
}
.sign-up input.disabled {
  background: #dedede;
  cursor: default;
}
.sign-up input.disabled:hover {
  border-color: #ccc;
}

.sign-up a.disabled,
.sign-up a.disabled:hover,
.sign-up a.disabled:focus,
.sign-up a.disabled:active,
.sign-up .message-bar a.disabled:hover,
.sign-up .message-bar a.disabled:focus,
.sign-up .message-bar a.disabled:active,
.sign-up .message-bar a.disabled {
  pointer-events: none;
  color: #aaa;
}

.sign-up .form-group label {
  font-weight: normal;
  position: absolute;
  left: 20px;
  top: 58px;
  font-size: 1.5rem;
  transition: all 0.3s;
  color: #2c3e50;
  cursor: text;
}
.sign-up .focus label,
.sign-up .hastext label {
  top: 47px;
  font-size: 90%;
  color: #aaaaaa;
}

.sign-up .captcha input {
  padding-right: 150px;
}
.sign-up .captcha img {
  position: absolute;
  top: 45px;
  right: 5px;
  width: 140px;
  height: 46px;
  border-radius: 3px;
  cursor: pointer;
}

.sign-up .message-bar {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-top: 40px;
  background-color: #ffd4df;
  border-radius: 3px;
  border: 1px solid #ff6a92;
  text-align: left;
  display: flex;
  align-items: center;
}
.sign-up .message-bar .glyphicon {
  padding: 20px;
  font-size: 2em;
  margin-right: 10px;
  margin-left: 10px;
}
.sign-up .message-bar div {
  flex: 1;
  padding-right: 40px;
  margin: 10px 0;
}
.sign-up .message-bar p {
  margin: 3px;
}
.sign-up .message-bar a {
  cursor: pointer;
  color: #1b98e0;
}

.sign-up .email-code {
  display: flex;
  align-items: stretch;
  height: 96px;
  justify-content: space-between;
}
.sign-up .email-code input {
  width: 50%;
}
.sign-up .email-code button {
  width: 49%;
  border: 1px solid #d3dcdc;
  background-color: rgba(242,247,247,0.5);
  transition: all 0.3s ease;
}
.sign-up .email-code button:hover {
  background-color: rgba(232,241,242,0.8);
}
.sign-up .email-code button.disabled{
  pointer-events: none;
  color: gray;
}

.sign-up .pw input{
  padding-right: 60px;
}
.sign-up .pw .glyphicon{
  position: absolute;
  top: 40px;
  right: 0;
  padding: 20px;
  font-size: 1.5em;
}

.sign-up .sex-form{
  display: flex;
}
.sign-up .sex-form div{
  display: flex;
}
.sign-up .sex-form input{
  margin: 0;
}
.sign-up span{
  margin: 0 20px 0 4px;
  white-space: nowrap;
}
.sign-up .sex-form span:first-child{
  font-weight: bold;
  margin-right: 10px;
  margin-left: 10px;
}

.sign-up .btn {
  width: 100%;
  height: 5.5rem;
  border: none;
  background-color: #b8bedd;
  color: white;
  transition: all 0.3s ease;
}
.sign-up .btn:hover {
  background-color: #73abc2;
  color: white;
}

.dialog-wrapper{
  padding-top: 40px;
  padding-bottom: 30px;
}
</style>
