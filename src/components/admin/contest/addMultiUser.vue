<template>
<div id="addMultiUser">
  <h3>为私有竞赛批量添加临时用户</h3>
  <p>设置竞赛ID和用户数后，点击按钮生成临时用户，下方将显示用户名和密码，密码只显示一次，
    <strong>临时用户无法从前台找回密码，注意一定要及时保存！</strong></p>
  为竞赛<input type="number" placeholder="Contest ID" class="addui" v-model="contestID">
  添加<input type="number" placeholder="Account number" class="addui" v-model="accountNum">个用户
  <button class="btn btn-primary addui" @click="addUser" :disabled="coldTime!==0">
    <span v-if="coldTime!==0">(冷却时间{{coldTime}}s)</span>
    <span v-else>生成用户</span>
  </button>
  <template v-if="isRes">
    <div class="panel panel-success" style="margin-top: 3rem;">
      <div class="panel-heading">res</div>
      <div class="panel-body"><p>{{message}}</p></div>
      <table class="table" style="margin:0.5rem;">
        <tr><th>UserID</th><th>Username</th><th>Password</th></tr>
	<tbody>
        <tr v-for="(user, index) in resMsg" :key="index">
          <td>{{user.user_id}}</td>
          <td>{{user.username}}</td>
          <td>{{user.password}}</td>
        </tr>
	</tbody>
      </table>
    </div>
  </template>
</div>
</template>

<script>
export default {
  name: 'addMultiUser',
  data: function () {
    return {
      coldTime: 0,
      contestID: 1001,
      accountNum: 0,
      isRes: false
    }
  },
  methods: {
    setColdTime () {
      let vm = this
      vm.coldTime = 10
      let func = function () {
        vm.coldTime--
        if (vm.coldTime !== 0) {
          setTimeout(func, 1000)
        }
      }
      if (vm.coldTime <= 0) {
        vm.coldTime = 0
      } else {
        setTimeout(func, 1000)
      }
    },
    addUser () {
      let vm = this
      if (vm.accountNum === 0) return
      vm.setColdTime()
      vm.$http.get(window.noPointHost + '/api/admin/user/addmulti/' + vm.contestID + '/' + vm.accountNum)
        .then(function (res) {
          console.log(JSON.stringify(res))
          vm.isRes = true
          vm.message = `code: ${res.body.code}, message: ${res.body.message} ` + JSON.stringify(res.body.error)
          let resMsgList = []
          const resList = res.body.data.resUser
          for (let i = 0, len = resList.length; i < len; i++) {
            resMsgList.push({
              user_id: resList[i].user_id,
              username: resList[i].username,
              password: resList[i].password
            })
          }
          vm.resMsg = resMsgList
        })
      vm.isRes = true
    }
  }
}
</script>

<style>
.addui {
  height: 4rem;
  margin: 0.5rem;
  padding: 0.5rem;
}
</style>
