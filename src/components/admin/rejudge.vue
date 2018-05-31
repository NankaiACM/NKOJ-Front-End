<template>
<div id="rejudge" :class="{gray: solutionId === ''}">
  <div class="b">
    <input placeholder="solution id" class="i" v-model="solutionId">
    <div class="r" @click="rejudge">rejudge</div>
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
#rejudge {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  .b {
    display: flex;
    flex-direction: row;
    margin-bottom: 4em;
    .i {
      height: 40px;
      border: 1px solid #1e88e5;
      outline: none;
      border-radius: 4px 0 0 4px;
      border-right: none;
      padding: .4em 1em;
    }
    .r {
      width: 100px;
      height: 40px;
      line-height: 40px;
      background: #1e88e5;
      color: #d0e5f2;
      border-radius: 0 4px 4px 0;
      text-align: center;
      cursor: pointer;
      transition: all .41s;
      &:hover {
        background: #2cbfec;
      }
    }
  }
  &.gray {
    .i {
      border-color: #999;
    }
    .r {
      color: #fff;
      background: #999;
      &:hover {
        background: #999;
      }
    }
  }
  .c {
    max-width: 80%;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 40px;
  }
}
</style>
