<template>
<div id="problemPage" >
  <h2 align="left" class="col-sm-12">{{problemContent.problemsID}}: {{problemContent.problemsName}}</h2>
  <div class="col-sm-6" id="problemDescription">
    <div>
      <h4 align="left">题目描述</h4>
      <pre>{{problemContent.problemsDescription}}</pre>
    </div>
    <div>
      <h4 align="left">输入格式</h4>
      <pre>{{problemContent.inputDescription}}</pre>
    </div>
    <div>
      <h4 align="left">输出格式</h4>
      <pre>{{problemContent.outputDescription}}</pre>
    </div>
    <div>
      <h4 align="left">数据范围</h4>
      <pre>{{problemContent.limitDescription}}</pre>
    </div>
    <div>
      <h4 align="left">样例输入</h4>
      <pre>{{problemContent.sampleInput}}</pre>
    </div>
    <div>
      <h4 align="left">样例输出</h4>
      <pre>{{problemContent.sampleOutput}}</pre>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'problems-page',
  data: function () {
    return {
      problemContent: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  methods: {
    initView: function () {
      var _this = this
      this.$http.get('/static/problemsMoreData.json').then(function (res) {
        res.body.data.forEach(function (val) {
          console.log(val)
          if (val.problemsID === _this.$route.params.id) {
            _this.problemContent = val
          }
        })
      })
    }
  }
}
</script>

<style scoped>
#problemPage pre{
  text-align: left;
  background: white;
  margin-bottom: 30px;
}
#problemPage h4{
  font-weight: bold;
}
#problemDescription{
  margin-top: 20px;
  background: white;
  padding: 20px;
  margin-left: 20px;
}
#problemPage h2{
  background: white;
  padding: 10px;
  margin: 0;
  font-weight: bolder;
}
</style>
