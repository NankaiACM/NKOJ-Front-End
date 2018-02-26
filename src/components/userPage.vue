<template>
<div id="userPage">
  <div class="row">
    <div id="userHead" class="col-sm-3">
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <a class="navbar-brand">用户头像</a>
        </div>
        <form class="navbar-form navbar-right userNavForm">
          <button class="btn btn-info">上传</button>
        </form>
      </nav>
      <img src="../assets/userPicture.jpg" class="img-rounded col-sm-10" id="userPagePicture">
    </div>
    <div id="userInformation" class="col-sm-7">
      <nav class="navbar navbar-default" role="navigation">
        <div class="navbar-header">
          <a class="navbar-brand">个人信息</a>
        </div>
        <form class="navbar-form navbar-right userNavForm">
          <button class="btn btn-info">编辑</button>
          <button class="btn btn-success">保存</button>
        </form>
      </nav>
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">用户ID</label>
          <div class="col-sm-8">
            <input class="form-control" placeholder="Saurus"/>
          </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">用户排名</label>
            <div class="col-sm-8">
              <input class="form-control" placeholder="1"/>
            </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">个人签名</label>
          <div class="col-sm-8">
            <input class="form-control" placeholder="それには何もない"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">学校</label>
          <div class="col-sm-8">
            <input class="form-control" placeholder="南开大学"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">邮箱</label>
          <div class="col-sm-8">
            <input class="form-control" placeholder="2238454358@qq.com"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">注册时间</label>
          <div class="col-sm-8">
            <input class="form-control" placeholder="1111-11-11"/>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">上次登陆</label>
          <div class="col-sm-8">
            <input class="form-control" placeholder="1111-11-11"/>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row userAchieve">
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
export default {
  name: 'user-page',
  data: function () {
    return {
      userACproblems: ['1001', '1002', '1003','1001', '1002', '1003','1001', '1002', '1003','1001', '1002', '1003']
    }
  }
}
</script>

<style scoped>
#userHead, #userInformation{
  background: white;
  padding-bottom: 20px;
  padding-left: 0;
  padding-right: 0;
  margin-top: 20px;
}
#userPage .row{
  margin-left: 20px;
}
#userInformation{
  margin-left: 20px;
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
#userPagePicture{
  border: lightgray solid;
  margin: 20px;
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
.userNavForm{
  margin-right: 10px;
}
</style>
