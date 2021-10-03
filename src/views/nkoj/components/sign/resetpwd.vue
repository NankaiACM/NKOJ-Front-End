<template>
  <div id="resetpwd-page">
    <div class="resetPwd container">
      <div class="title-bar">
        <div class="title">找回密码</div>
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
          <div v-if="rePwdStatus<4">
            <div class="form-group" :class="{'hastext':resetPwdAttr.rePwdEmail!='','focus':focusing==1}">
              <label @click="labelClick">注册所用邮箱</label>
              <input type="text" class="form-control" :class="{'disabled':rePwdStatus===1||rePwdStatus===3}"
                     v-model="inputEmail" :disabled="rePwdStatus===1||rePwdStatus===3"
                     @focus="focusing=1" @blur="focusing=0">
            </div>
            <div class="form-group captcha" :class="{'hastext':resetPwdAttr.rePwdCaptcha!='','focus':focusing==2}">
              <label @click="labelClick">右图中的文字</label>
              <input type="text" class="form-control" :class="{'disabled':rePwdStatus===1||rePwdStatus===3}"
                     v-model="resetPwdAttr.rePwdCaptcha" :disabled="rePwdStatus===1||rePwdStatus===3"
                     @focus="focusing=2" @blur="focusing=0" maxlength="6">
              <img class="captcha" :src="captchaUrl"
                   @click="captchaUrl=`${noPointHost}/api/captcha/sendmail?_t=` + Math.random()"/>
            </div>
            <div class="form-group email-code" :class="{'hastext':resetPwdAttr.emailCode!='','focus':focusing==3}">
              <label @click="labelClick">邮箱验证码</label>
              <input type="text" class="form-control" :class="{'disabled':rePwdStatus===1||rePwdStatus===3}"
                     v-model="resetPwdAttr.emailCode" :disabled="rePwdStatus===1||rePwdStatus===3"
                     @focus="focusing=3" @blur="focusing=0" maxlength="6">
              <button v-on:click.prevent="emailSendAttempt()" :disabled="rePwdStatus===1 || rePwdStatus===3 || sendColdTime!==0"
                  :class="{'disabled':rePwdStatus===1 || rePwdStatus===3 || sendColdTime!==0}">
                <vue-loading type="spin" color="#2c3e50" :size="{ width: '30px', height: '30px' }" v-if="rePwdStatus===1"></vue-loading>
                <div v-else>获取验证码<div v-if="sendColdTime!==0">(还有{{sendColdTime}}s)</div></div>
              </button>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="emailVerifyAttempt()" :disabled="rePwdStatus===1 || rePwdStatus===3">
              <vue-loading type="spin" color="#2c3e50" :size="{ width: '30px', height: '30px' }" v-if="rePwdStatus===3"></vue-loading>
              <div v-else>确认邮箱</div>
            </button>
            </div>
          </div>
          <!--第二阶段，输入其他信息-->
          <div v-if="rePwdStatus>=4">
            <div class="form-group pw" :class="{'hastext':resetPwdAttr.resetPassword!='','focus':focusing==2}">
              <label @click="labelClick">密码</label>
              <input :type="isLookPw" class="form-control" :class="{'disabled':rePwdStatus===5}" @focus="focusing=2" @blur="focusing=0"
                     v-model="resetPwdAttr.resetPassword" :disabled="rePwdStatus===5">
              <span class="glyphicon" :class="{'glyphicon-eye-close':isLookPw==='password','glyphicon-eye-open':isLookPw==='text'}"
                @click="isLookPw=isLookPw==='text'?'password':'text'"></span>
            </div>
            <div class="form-group pw" :class="{'hastext':resetPwdAttr.confirmPassword!='','focus':focusing==2}">
              <label @click="labelClick">确认密码</label>
              <input :type="isLookPw" class="form-control" :class="{'disabled':rePwdStatus===5}" @focus="focusing=2" @blur="focusing=0"
                     v-model="resetPwdAttr.confirmPassword" :disabled="rePwdStatus===5">
              <span class="glyphicon" :class="{'glyphicon-eye-close':isLookPw==='password','glyphicon-eye-open':isLookPw==='text'}"
                @click="isLookPw=isLookPw==='text'?'password':'text'"></span>
            </div>
            <div class="form-group">
            <button class="btn" v-on:click.prevent="resetAttempt()" :disabled="rePwdStatus===5">
              <vue-loading type="spin" color="white" :size="{ width: '30px', height: '30px' }"
               v-if="rePwdStatus===5"></vue-loading>
              <div v-else>重置密码</div>
            </button>
            </div>
          </div>
        </transition>
        <dialog-wrap v-if="dialogShow" @exit="dialogShow=false;$router.push({path: '/home'});">
          <div class="dialog-wrapper">
          <div v-if="rePwdStatus===2">
            <p>验证邮件已经发送至您的邮箱！</p>
          </div>
          <div v-else-if="rePwdStatus===6">
            <p>重置密码成功啦~</p>
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
  name: 'resetPwdPage',
  components: { vueLoading, dialogWrap },
  data () {
    return {
      focusing: 0,
      inputEmail: '',
      resetPwdAttr: {
        resetPassword: '',
        confirmPassword: '',
        rePwdEmail: '',
        rePwdCaptcha: ''
      },
      rePwdStatus: 0,
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
    emailSendAttempt: function () {
      // console.log(this.$route.matched[0].components.default)
      // 邮箱检验
      if (!this.CheckMail(this.resetPwdAttr.rePwdEmail)) {
        this.statusMessage = [{ name: '邮箱', message: '格式错误，再检查一下吧' }]
      } else {
        this.rePwdStatus = 1
        this.$http
          .get(
            `${window.noPointHost}/api/u/resetpwd/` +
              this.resetPwdAttr.rePwdEmail +
              '?captcha=' +
              this.resetPwdAttr.rePwdCaptcha,
            {
              timeout: '8000'
            }
          )
          .then(
            res => {
              var resp = res.body
              console.log(resp)
              this.emailSendDate = new Date() // 记录当前时间
              if (resp.code === 0) {
                this.rePwdStatus = 2
                this.emailKey = resp.data.key
                this.statusMessage = undefined
              } else {
                this.statusMessage = resp.error
                this.rePwdStatus = 0
                this.resetPwdAttr.rePwdCaptcha = ''
                this.captchaUrl = `${noPointHost}/api/captcha/sendmail?_t=` + Math.random()
              }
            },
            res => {
              if (res.status === 429) {
                this.statusMessage = [{
                  name: '错误',
                  message:
                  '请求过于频繁啦，再等' + (60 - Math.floor((new Date().getTime() - this.emailSendDate.getTime()) / 1000)) + '秒吧'
                }]
                this.resetPwdAttr.rePwdCaptcha = ''
                this.captchaUrl = `${window.noPointHost}/api/captcha/sendmail?_t=` + Math.random()
              } else {
                this.statusMessage = [{ name: '错误', message: '电波……无法传达……（连接失败）' }]
              }
              this.rePwdStatus = 0
            }
          )
          .catch(() => {
            this.statusMessage = [{ name: '错误', message: '未知错误！如果方便的话可以反馈一下！' }]
            this.rePwdStatus = 0
          })
      }
    },
    emailVerifyAttempt () {
      if (this.rePwdStatus === 0) {
        this.statusMessage = [{ name: '错误', message: '请重新获取邮件验证码！' }]
        return
      }
      this.rePwdStatus = 3
      this.$http
        .get(
          `${window.noPointHost}/api/u/resetpwd/verify/` +
            this.emailKey +
            '/' +
            this.resetPwdAttr.emailCode,
          {
            timeout: '8000'
          }
        )
        .then(
          res => {
            var resp = res.body
            console.log(resp)
            if (resp.code === 0) {
              this.rePwdStatus = 4
              this.statusMessage = undefined
            } else {
              this.statusMessage = resp.error
              this.rePwdStatus = 2
            }
          },
          res => {
            if (res.status === 429) {
              this.statusMessage = [{
                name: '错误',
                message: '请求过于频繁啦，再等' + (60 - Math.floor((new Date().getTime() - this.emailSendDate.getTime()) / 1000)) + '秒吧'
              }]
            } else {
              this.statusMessage = [{ name: '错误', message: '电波……无法传达……（连接失败）' }]
            }
            this.rePwdStatus = 2
          }
        )
        .catch(() => {
          this.statusMessage = [{ name: '错误', message: '未知错误！如果方便的话可以反馈一下！' }]
          this.rePwdStatus = 2
        })
    },
    signuppasswordEncrypt: function (password) {
      this.rePwdStatus = 5
      var attr = this.resetPwdAttr
      var sendPackge = {}
      sendPackge.password = password
      sendPackge.email = attr.rePwdEmail
      this.$http
        .post(`${window.noPointHost}/api/u/reset_passwd`, sendPackge, {
          timeout: '8000'
        })
        .then(
          res => {
            console.log(res)
            if (res.body.code === 0) {
              this.rePwdStatus = 6
              this.$store.commit({
                type: 'setuserDate',
                isLogin: true,
                id: res.body.data.user_id,
                nickname: res.body.data.nickname,
                lastLogin: res.body.data.last_login
              })
            } else {
              this.statusMessage = res.body.error
              this.rePwdStatus = 4
            }
          },
          res => {
            if (res.status === 429) {
              this.statusMessage = [{
                name: '错误',
                message: '请求过于频繁啦，再等' + (60 - Math.floor((new Date().getTime() - this.emailSendDate.getTime()) / 1000)) + '秒吧'
              }]
            } else {
              this.statusMessage = [{ name: '错误', message: '电波……无法传达……（连接失败）' }]
            }
            this.rePwdStatus = 4
          }
        )
        .catch(() => {
          this.statusMessage = [{ name: '错误', message: '未知错误！如果方便的话可以反馈一下！' }]
          this.rePwdStatus = 4
        })
    },
    resetAttempt: function () {
      if (this.resetPwdAttr.resetPassword !== this.resetPwdAttr.confirmPassword) {
        this.statusMessage = [{ name: '错误', message: '两次输入的密码不一致！' }]
        this.rePwdStatus = 4
        return
      }
      const message = this.resetPwdAttr.resetPassword
      const base64 = encryptMsg(message)
      this.signuppasswordEncrypt(base64)
    },
    CheckMail (mail) {
      // eslint-disable-next-line no-control-regex
      var filter = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
      return filter.test(mail)
    },
    labelClick (event) {
      event.target.nextElementSibling.focus()
    },
    setSendColdTime () {
      this.sendColdTime = (60 - Math.floor((new Date().getTime() - this.emailSendDate.getTime()) / 1000))
      const func = () => {
        this.sendColdTime--
        if (this.sendColdTime !== 0 && this.rePwdStatus < 4) {
          setTimeout(func, 1000)
        }
      }
      if (this.sendColdTime <= 0) {
        this.sendColdTime = 0
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
    rePwdStatus: function (newValue, oldValue) {
      if (newValue === 2 && oldValue === 1) {
        this.setSendColdTime()
      } else if (newValue === 6) {
        this.timeToClose = 5
        this.dialogShow = true
        var func = () => {
          this.timeToClose--
          if (this.timeToClose === 0) {
            this.dialogShow = false
            this.$router.push({ path: '/home' })
          } else {
            setTimeout(func, 1000)
          }
        }
        setTimeout(func, 1000)
      }
    },
    inputEmail: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.rePwdStatus = 0
        this.resetPwdAttr.rePwdEmail = newValue
      }
    }
  }
}
</script>

<style scoped>
.resetPwd {
  padding: 20px 0;
  max-width: 500px;
}
.resetPwd .title-bar {
  padding: 1.5rem 0;
  text-align: left;
}

.resetPwd .title-bar .title {
  font-size: 2rem;
}

.resetPwd hr {
  margin: 0;
}

.resetPwd form {
  padding-right: 10px;
}

.resetPwd .form-group {
  position: relative;
  padding: 40px 0 0;
  margin: 0;
}

.resetPwd .form-group input {
  box-shadow: none;
  padding: 2.8rem 20px 0.7rem;
  height: auto;
  background: none;
}
.resetPwd input:focus {
  box-shadow: none;
}
.resetPwd input:hover {
  box-shadow: none;
  border-color: #66afe9;
}
.resetPwd input.disabled {
  background: #dedede;
  cursor: default;
}
.resetPwd input.disabled:hover {
  border-color: #ccc;
}

.resetPwd a.disabled,
.resetPwd a.disabled:hover,
.resetPwd a.disabled:focus,
.resetPwd a.disabled:active,
.resetPwd .message-bar a.disabled:hover,
.resetPwd .message-bar a.disabled:focus,
.resetPwd .message-bar a.disabled:active,
.resetPwd .message-bar a.disabled {
  pointer-events: none;
  color: #aaa;
}

.resetPwd .form-group label {
  font-weight: normal;
  position: absolute;
  left: 20px;
  top: 58px;
  font-size: 1.5rem;
  transition: all 0.3s;
  color: #2c3e50;
  cursor: text;
}
.resetPwd .focus label,
.resetPwd .hastext label {
  top: 47px;
  font-size: 90%;
  color: #aaaaaa;
}

.resetPwd .captcha input {
  padding-right: 150px;
}
.resetPwd .captcha img {
  position: absolute;
  top: 45px;
  right: 5px;
  width: 140px;
  height: 46px;
  border-radius: 3px;
  cursor: pointer;
}

.resetPwd .message-bar {
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
.resetPwd .message-bar .glyphicon {
  padding: 20px;
  font-size: 2em;
  margin-right: 10px;
  margin-left: 10px;
}
.resetPwd .message-bar div {
  flex: 1;
  padding-right: 40px;
  margin: 10px 0;
}
.resetPwd .message-bar p {
  margin: 3px;
}
.resetPwd .message-bar a {
  cursor: pointer;
  color: #1b98e0;
}

.resetPwd .email-code {
  display: flex;
  align-items: stretch;
  height: 96px;
  justify-content: space-between;
}
.resetPwd .email-code input {
  width: 50%;
}
.resetPwd .email-code button {
  width: 49%;
  border: 1px solid #d3dcdc;
  background-color: rgba(242,247,247,0.5);
  transition: all 0.3s ease;
}
.resetPwd .email-code button:hover {
  background-color: rgba(232,241,242,0.8);
}
.resetPwd .email-code button.disabled{
  pointer-events: none;
  color: gray;
}

.resetPwd .pw input{
  padding-right: 60px;
}
.resetPwd .pw .glyphicon{
  position: absolute;
  top: 40px;
  right: 0;
  padding: 20px;
  font-size: 1.5em;
}

.resetPwd .sex-form{
  display: flex;
}
.resetPwd .sex-form div{
  display: flex;
}
.resetPwd .sex-form input{
  margin: 0;
}
.resetPwd span{
  margin: 0 20px 0 4px;
  white-space: nowrap;
}
.resetPwd .sex-form span:first-child{
  font-weight: bold;
  margin-right: 10px;
  margin-left: 10px;
}

.resetPwd .btn {
  width: 100%;
  height: 5.5rem;
  border: none;
  background-color: #b8bedd;
  color: white;
  transition: all 0.3s ease;
}
.resetPwd .btn:hover {
  background-color: #73abc2;
  color: white;
}

.dialog-wrapper{
  padding-top: 40px;
  padding-bottom: 30px;
}
</style>
