<template>
<div id="new">
  <h3>添加新竞赛 <span class="up" @click="submit">上传</span></h3>

</div>
</template>

<script>
export default {
  name: 'new',
  data: function () {
    return {
    }
  },
  methods: {
    submit: function () {
      const form = document.querySelector('#newpc')
      const fromData = new FormData(form)
      this.$http.post(window.noPointHost + '/api/admin/contest/', fromData)
        .then(function (r) {
          console.log(JSON.stringify(r))
          this.notify.message = JSON.stringify(r.body)
          this.notify.count++
        }, function (e) {
          console.log(JSON.stringify(e))
          this.notify.message = JSON.stringify(e.body)
          this.notify.count++
        })
    },
    handFile: function (e) {
      const file = e.target.files[0] || e.dataTransfer.files[0]
      this.filename = file.name
    }
  }
}
</script>
<style lang="less" scoped>
#new {
  * {
    transition: all .41s;
  }
  .up {
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: .4em 1em;
    float: right;
    cursor: pointer;
    &:hover {
      border-color: #2cbfec;
      color: #2cbfec;
    }
  }
}
</style>
