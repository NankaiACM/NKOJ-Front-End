<template>
<div id="userPage">
  <div class="shadow" v-if="isUpdateAvatar" v-on:click="exitShow"></div>
  <user-page-avatar v-if="isUpdateAvatar"></user-page-avatar>
  <div class="row">
    <div class="userPageInfo col-sm-10">
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <a class="navbar-brand">个人信息</a>
        </div>
        <form class="navbar-form navbar-right userNavForm">
          <button class="btn btn-info" @click="editInfo" >编辑</button>
          <button class="btn btn-success">保存</button>
        </form>
      </nav>
      <div class="row">
        <div class="col-sm-3">
          <img src="../assets/userPicture.jpg" class="col-sm-10 img-circle"
               id="userPagePicture" @click="updateAvatar">
        </div>
        <div class="col-sm-7">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">用户昵称</label>
              <div class="col-sm-8">
                <input class="form-control" placeholder="Saurus" v-model="nickname" :disabled="!isEdit"/>
              </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">用户排名</label>
                <div class="col-sm-8">
                  <input class="form-control" placeholder="1" v-model="rank" disabled>
                </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">个人签名</label>
              <div class="col-sm-8">
                <input class="form-control" placeholder="それには何もない" v-model="words" :disabled="!isEdit"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">学校</label>
              <div class="col-sm-8">
                <input class="form-control" placeholder="南开大学" v-model="school" :disabled="!isEdit"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">邮箱</label>
              <div class="col-sm-8">
                <input class="form-control" placeholder="2238454358@qq.com" v-model="email" :disabled="!isEdit"/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">注册时间</label>
              <div class="col-sm-8">
                <input class="form-control" placeholder="1111-11-11" v-model="timeSignUp" disabled/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">上次登陆</label>
              <div class="col-sm-8">
                <input class="form-control" placeholder="1111-11-11" v-model="timeSignIn" disabled/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-10" id="userAchieve">
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <a class="navbar-brand">AC题目</a>
        </div>
      </nav>
      <div v-for="problem in userACproblems" id="acProblems">{{problem}}</div>
    </div>
  </div>
</div>
</template>

<script>
import userPageAvatar from './userPageAvatar'
export default {
  components: {userPageAvatar},
  name: 'user-page',
  data: function () {
    return {
      userACproblems: ['1001', '1002', '1003','1001', '1002', '1003','1001', '1002', '1003','1001', '1002', '1003'],
      isUpdateAvatar: false,
      nickname: '',
      rank: '',
      words: '',
      school: '',
      email: '',
      timeSignUp: '1111-11-11',
      timeSignIn: '1111-11-11',
      isEdit: false
    }
  },
  methods: {
    updateAvatar: function (event) {
      this.isUpdateAvatar = true
      event.preventDefault()
    },
    exitShow: function() {
      this.isUpdateAvatar = false
    },
    editInfo: function (e) {
      e.preventDefault()
      this.isEdit = true
    }
  }
}
</script>

<style scoped>
#userPage .row{
  margin-left: 20px;
}
.userPageInfo{
  background: white;
  margin-top: 20px;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 20px;
}
#userAchieve{
  margin-top: 20px;
  margin-left: 0;
  padding: 0;
  background: white;
}
#userAchieve h3{
  margin-left: 20px;
}
#acProblems{
  float:left;
  padding: 5px 50px;
  margin: 10px;
  background: #5cae4c;
  border: #4cae4c solid;
  border-radius: 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: white;
}
.shadow{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.6;
  background: black;
  z-index: 3;
}
#userPagePicture{
  width: 200px;
  height: 200px;
  border-radius: 200px;
  border: 2px solid darkgray;
}
.userNavForm{
  margin-right: 10px;
}
</style>
