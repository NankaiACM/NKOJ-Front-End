<template>
  <div>
    <table border="1" id="problemTable" cellspacing="3">
      <tr>
        <th class="problemTableHeaderCol1">编号</th>
        <th class="problemTableHeaderCol2">题目名称</th>
        <th class="problemTableHeaderCol3">通过率</th>
      </tr>
      <tr id="problemRow" v-for="problem in problemList" v-bind:key="problem.problemsID">
        <td class="problemTableCol1" v-text="problem.problemsID"></td>
        <td class="problemTableCol2" v-text="problem.problemsName"></td>
        <td class="problemTableCol3" v-text="problem.problemsRatio"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'component-problems',
  data: function () {
    return {
      problemList: []
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
      this.$http.get('/static/problemsData.json').then(function (res) {
        _this.problemList = res.body.data
      })
    }
  }
}
</script>

<style>
#problemTable{
  width: 100%;
  padding: 20px;
  mso-cellspacing: 2px;
  border: 1px black;
}
td[class$=Col1]{
  width: 5%;
}
td[class$=Col3]{
  width: 8%;
}
td[class^=problemTable]{
  text-align: left;
  font-size: 0.9em;
  padding: 10px;
  cursor: pointer;
  border-width: 1px;
  border-color: black;
  border-radius: 2px;
}
#problemTable th {
  padding:5px 15px 5px 6px;
  background-color: deepskyblue;
  border:1px solid deepskyblue;
  text-align:left;
  color:#fff;
  border-radius: 5px;
}
#problemTable tr:nth-child(odd) {
  background-color: rgb(230, 245, 245)
}
#problemTable tr:nth-child(even) {
  background-color:#fff;
}
#problemRow:hover{
  background-color: lightgray;
}
</style>
