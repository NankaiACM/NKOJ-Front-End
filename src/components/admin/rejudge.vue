<template>
  <div id="rejudge" class="bginputbg">
    <h3>重新评测答案</h3>
    <div id="bginput" :class="{gray: solutionId === ''}">
      <div class="b">
        <input placeholder="solution id" class="i" v-model="solutionId">
        <div class="r" @click="rejudgeSolution">rejudge</div>
      </div>
      <div class="c" v-if="isRes">{{resMsg}}</div>
    </div>
    <h3>重新评测题目</h3>
    <div id="bginput" :class="{gray: problemId === ''}">
      <div class="b">
        <input placeholder="problem id" class="i" v-model="problemId">
        <div class="r" @click="rejudgeProblem">rejudge</div>
      </div>
    </div>
    <div class="c" v-if="isRes">{{resMsg}}</div>
  </div>
</template>
<script>
export default {
  name: 'rejudge',
  data: function () {
    return {
      solutionId: '',
      problemId: '',
      isRes: false
    }
  },
  methods: {
    rejudgeSolution: function () {
      const vm = this
      if (vm.solutionId === '') return
      vm.$http.get(window.noPointHost + '/api/judge/rejudge/' + vm.solutionId)
        .then(function (res) {
          console.log(JSON.stringify(res))
          vm.isRes = true
          vm.resMsg = JSON.stringify(res.body)
        })
    },
    rejudgeProblem: function () {
      const vm = this
      if (vm.problemId === '') return
      vm.$http.get(window.noPointHost + '/api/judge/rejudge/:pid' + vm.problemId)
        .then(function (res) {
          console.log(JSON.stringify(res))
          vm.isRes = true
          vm.resMsg = JSON.stringify(res.body)
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import './bginput.less';
</style>
