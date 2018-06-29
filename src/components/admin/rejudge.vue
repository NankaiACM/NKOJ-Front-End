<template>
  <div id="rejudge" class="bginputbg">
    <h3>重新评测</h3>
    <div id="bginput" :class="{gray: solutionId === ''}">
      <div class="b">
        <input placeholder="solution id" class="i" v-model="solutionId">
        <div class="r" @click="rejudge">rejudge</div>
      </div>
      <div class="c" v-if="isRes">{{resMsg}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rejudge',
  data: function () {
    return {
      solutionId: '',
      isRes: false
    }
  },
  methods: {
    rejudge: function () {
      const vm = this
      if (vm.solutionId === '') return
      vm.$http.get(window.noPointHost + '/api/judge/rejudge/' + vm.solutionId)
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
