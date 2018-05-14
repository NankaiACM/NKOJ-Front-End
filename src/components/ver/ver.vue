<template>
  <div id="ver">
    前端版本: {{frontend}}
    <br>
    后端版本: {{backend}}
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
export default {
  name: 'ver',
  data: function () {
    return {
      frontend: '',
      backend: '',
      apiUrl: '/api/version'
    }
  },
  methods: {
    getCommit: function (str) {
      str = str.split('commit')[1]
      str = str.split('\nAuthor')[0]
      return str
    },
    getDate: function (str) {
      str = str.split('Date:   ')[1]
      str = str.split('\n\n    ')[0]
      return new Date(str).toLocaleDateString()
    }
  },
  mounted: function () {
    let slf = this
    slf.$nextTick(function () {
      console.log('mounted')
      slf.$http.get(window.noPointHost + slf.apiUrl)
        .then(function (res) {
          console.log('向魔法机请求魔法阶级情报')
          const akari = res.body.data
          console.log(akari)
          for (let i in akari) {
            slf[i] = slf.getCommit(akari[i]).substr(0, 8) + ' '
            slf[i] += slf.getDate(akari[i])
          }
        }, function (e) {
          console.log('请求魔法机魔法阶级失败')
        })
    })
  }
}
</script>
<style lang="less" scoped>
#ver {
  position: fixed;
  right: 0;
  bottom: 0;
  color: #ccc;
  pointer-events: none;
}
</style>
