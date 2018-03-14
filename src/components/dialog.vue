<template>
  <transition name="veil" :css="false" @enter="enter" @leave="leave">
    <div class="shadow-veil" v-on:click="$emit('exit')">
      <div class="dialog-field" @click.stop>
        <h5>登录</h5><hr>
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
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loginPage',
  data(){
    return{
      loginAccount: '',
      loginPassword: '',
      tempPassword: '',
      loginMessage: ''
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
      })
    },
    loginAttempt: function (event) {
      rsaEncrypt(this.loginPassword, this.passwordEncrypt)
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
  padding: 2rem 3rem;
}
.dialog-field h5{
  font-size: 2rem;
  font-weight: bold;
}

</style>
