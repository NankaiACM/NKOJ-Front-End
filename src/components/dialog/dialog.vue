<template>
  <transition name="veil" :css="false" @enter="enter" @leave="leave">
    <div class="shadow-veil" v-on:click="$emit('exit')">
      <div class="dialog-field" @click.stop>
        <span class="glyphicon glyphicon-remove"></span>
        <slot></slot>
        <div><div class="title-bar">
          <div class="title">登录</div>
          <div class="subtitle">由此登录，开启今日的ACM之旅吧~</div>
        </div><hr>
        <form>
          <div class="form-group" :class="{'hastext':loginAccount!='','focus':focusing==1}">
            <label>用户名或邮箱</label>
            <input type="text" class="form-control" v-model="loginAccount" @focus="focusing=1" @blur="focusing=0">
          </div>
          <div class="form-group" :class="{'hastext':loginPassword!='','focus':focusing==2}">
            <label>密码</label>
            <input type="password" class="form-control" v-model="loginPassword" @focus="focusing=2" @blur="focusing=0">
          </div>
          <div class="form-group message-bar">
            <p>{{loginMessage}}</p>
          </div>
          <div class="form-group">
            <button class="btn" v-on:click="loginAttempt">登陆</button>
          </div>
        </form>
        <div class="text">没有帐号？立刻<a>注册</a>！</div></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'dialogWrap',
  data(){
    return{
      loginAccount: '',
      loginPassword: '',
      tempPassword: '',
      loginMessage: '',
      focusing: 0,
    }
  },
  methods:{
    passwordEncrypt: function (password) {
      this.tempPassword = password
      var loginPackege = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      loginPackege.password = this.tempPassword
      loginPackege.user = this.loginAccount
      this.$http.post('http://111.231.98.20:8000/api/u/login', loginPackege,  {crossDomain : true, xhrFields: {withCredentials : true}}).then( (res) => {
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
        var mb=document.querySelector(".message-bar")
        if(mb.style.height==0){
          Velocity(mb,
            {height: '2rem'},
            {duration:300})
          Velocity(mb,
            {color: '#ff0000'},
            {duration:300})
        }
      })
    },
    loginAttempt: function (event) {
      var inputs = document.querySelectorAll("input")
      for(var i=0;i<inputs.length;i++){
        inputs[i].disabled=true;
        inputs[i].style.backgroundColor = "#ededed"
      }
      rsaEncrypt(this.loginPassword, this.passwordEncrypt)
      for(var i=0;i<inputs.length;i++){
        inputs[i].disabled=false;
        inputs[i].style.backgroundColor = "#ffffff"
      }
      event.preventDefault()
    },
    enter(el,done){
      let div1 = document.querySelector("div.shadow-veil")
      Velocity(div1,
        {backgroundColor: "#000000" ,backgroundColorAlpha: [0.5,0]},
        {duration: 300,complete: done})
      let div2 = document.querySelector("div.dialog-field")
      Velocity(div2,
        {scale: [1,0.8],opacity: [1,0]},
        {duration: 300,complete: done})
    },
    leave(el,done){
      let div1 = document.querySelector("div.shadow-veil")
      Velocity(div1,
        {backgroundColor: "#000000" ,backgroundColorAlpha: 0},
        {duration: 300,complete: done})
      let div2 = document.querySelector("div.dialog-field")
      Velocity(div2,
        {scale: [0.8,1],opacity: [0,1]},
        {duration: 300,complete: done})
    }
  }
}
</script>

<style>
.shadow-veil{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}


.dialog-field{
  width: 35rem;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem 2.5rem;
}
.dialog-field .glyphicon-remove{
  position: absolute;
  right: 15px;
  top: 15px;
  color: #d3dce6;
  cursor: pointer;
  transition: all 0.3s ease;
}
.dialog-field .glyphicon-remove:hover{
  color: #9facbd;
}


.dialog-field .title-bar{
  padding: 1.5rem 0;
}
.dialog-field .title-bar .title{
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 10px;
}
.dialog-field .title-bar .subtitle{
  color: #aaaaaa;
}
.dialog-field hr{
  margin: 0;
}


.dialog-field .form-group{
  position: relative;
  margin: 30px 0;
}
.dialog-field .form-group input{
  box-shadow: none;
  padding: 2.8rem 20px 0.7rem;
  height: auto;
  border-radius: 7px;
}
.dialog-field input:focus{
  box-shadow: none;
}
.dialog-field input:hover{
  box-shadow: none;
  border-color: #66afe9;
}
.dialog-field .form-group label{
  font-weight: normal;
  position: absolute;
  left: 20px;
  top: 1.8rem;
  font-size: 1.5rem;
  transition: all 0.3s;
  color: #2c3e50;
}
.dialog-field .focus label, .dialog-field .hastext label{
  top: 0.7rem;
  font-size: 90%;
  color: #aaaaaa;
}


.dialog-field .message-bar{
  margin: -15px;
  height: 0;
  overflow: hidden;
  font-size: 1.4rem;
  color: white;
  line-height: 2rem;
}



.form-group button{
  width: 100%;
  height: 5.5rem;
  border-radius: 7px;
  border: none;
  background-color: #b8bedd;
  color: white;
}
.form-group button:hover{
  background-color: #c4c9e3;
  color: white;
}
.form-group button:focus, .form-group button:active{
  background-color: #a8adc9;
  color: white;
}


.text{
  padding: 0.5rem 0;
  margin-top: -20px;
}
.text a{
  cursor: pointer;
}
</style>
