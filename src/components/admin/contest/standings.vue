<template>
<div>
  <h3>导出比赛榜单（json格式）</h3>
  <p>输入打星选手用户名(形如c1042_1_名字)及学校，逗号分隔，每行一个。注意：用户名只有完全匹配才可以否则不会被标记为打星选手</p>
  竞赛ID<input type="number" class="form-control" placeholder="Contest ID" v-model="contestID">
  <div style="height:10rem; width: 100%; margin-top:1rem; margin-bottom:1rem;">
  <textarea placeholder="c1042_1_张三,NKU
c1042_2_李四,TJU"
    style="height:100%;width:100%;" v-model="nameListRaw">
  </textarea>
  </div>
  <button class="btn btn-primary" @click="getStandings" :disabled="coldTime!==0">
    <span v-if="coldTime!==0">(冷却时间{{coldTime}}s)</span>
    <span v-else>生成榜单</span>
  </button>
  <a v-if="isRes" :href="standingsURL" :download="contestID+'.json'">下载</a>
  <p v-if="isRes">{{message}}</p>
</div>
</template>
<script>
export default {
  name: 'standings',
  data: function () {
    return {
      coldTime: 0,
      contestID: 1001,
      accountNum: 0,
      nameListRaw: '',
      isRes: false,
      message: '',
      standingsURL: ''
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
    getStandings () {
      let vm = this
      vm.setColdTime()
      let nameList = vm.nameListRaw === '' ? [] : vm.nameListRaw.replace(' ', '').split(/[(\r\n)\r\n]+/)
      console.log(nameList)
      for (let i = 0; i < nameList.length; i++) {
        const p = nameList[i].split(/,|，/)
        if (p.length !== 2 || p[0] === '' || p[1] === '') {
          vm.message = '错误：打星选手输入格式有误，请不要输入多余的空行'
          console.error(vm.message)
          vm.isRes = true
          return
        }
        nameList[i] = {nickname: p[0], school: p[1]}
      }
      console.log(nameList)
      vm.$http.post(
        window.noPointHost + '/api/admin/contest/nkpc/standings/',
        {nameList: nameList, cid: parseInt(vm.contestID)}
      ).then(
        res => {
          console.log(res)
          vm.message = `code: ${res.body.code}, message: ${res.body.message} ` + JSON.stringify(res.body.error)
          vm.standingsURL = 'data:text/json;charset=UTF-8,' + encodeURIComponent(JSON.stringify(res.body.data))
        },
        err => {
          vm.message = JSON.stringify(err)
          console.error(err)
        }
      )
      vm.isRes = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
