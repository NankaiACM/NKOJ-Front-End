<template>
  <div id="rejudge" class="bginputbg">
    <h3>重新评测答案</h3>
    <div id="bginput" :class="{gray: solutionId === ''}">
      <div class="b">
        <input placeholder="solution id" class="i" v-model="solutionId">
        <div class="r" @click="rejudgeSolution">rejudge</div>
      </div>
    </div>
    <h3>重新评测题目(十分耗时严禁多次点击)</h3>
    <div id="bginput" :class="{gray: problemId === ''}">
      <div class="b">
        <input placeholder="problem id" class="i" v-model="problemId">
        <button class="r" @click="rejudgeProblem" :disabled="coldTime!==0">
          <span v-if="coldTime!==0">(冷却时间{{coldTime}}s)</span>
          <span v-else>rejudge</span>
        </button>
      </div>
    </div>
    <div class="c" v-if="isRes">
      <p v-for="(msg, index) in resMsg" :key="index">{{msg}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rejudge',
  data: function () {
    return {
      solutionId: '',
      problemId: '',
      isRes: false,
      coldTime: 0
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
    rejudgeSolution: function () {
      const vm = this
      if (vm.solutionId === '') return
      vm.$http.get(window.noPointHost + '/api/judge/rejudge/' + vm.solutionId)
        .then(function (res) {
          console.log(JSON.stringify(res))
          vm.isRes = true
          let resMsgList = [`
            code: ${res.body.code}, message: ${res.body.message}, \
            result: ${res.body.data.json.result}, time: ${res.body.data.json.time} \
            memory: ${res.body.data.json.memory}, status: ${res.body.data.json.time}`]
          const resList = res.body.data.json.detail
          for (let i = 0, len = resList.length; i < len; i++) {
            resMsgList.push(JSON.stringify(resList[i]))
          }
          vm.resMsg = resMsgList
        })
    },
    rejudgeProblem: function () {
      const vm = this
      if (vm.problemId === '') return
      vm.setColdTime()
      vm.$http.get(window.noPointHost + '/api/judge/rejudge/problem/' + vm.problemId)
        .then(function (res) {
          console.log(JSON.stringify(res))
          vm.isRes = true
          // vm.resMsg = JSON.stringify(res.body)
          let resMsgList = [`code: ${res.body.code}, message: ${res.body.message}`]
          const resList = res.body.data.resultArr
          for (let i = 0, len = resList.length; i < len; i++) {
            const tmp = resList[i]
            resMsgList.push(`Solution ID: ${tmp.sid}, result: ${JSON.stringify(tmp.result)}, score: ${tmp.score}\
            time: ${tmp.time}, memory: ${tmp.score}, status: ${tmp.status}`)
          }
          vm.resMsg = resMsgList
          console.log(resMsgList.join('\n'))
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import './bginput.less';
</style>
