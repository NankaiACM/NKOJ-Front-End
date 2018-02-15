<template>
<div id="Problems" class="container-fluid">
  <table id="problemTable" class="table table-hover">
    <caption>problems</caption>
    <thead>
      <tr>
        <th class="problemTableHeaderCol1">编号</th>
        <th class="problemTableHeaderCol2">题目名称</th>
        <th class="problemTableHeaderCol3">通过率</th>
      </tr>
    </thead>
    <tbody>
      <tr id="problemRow" v-for="problem in problemList" v-bind:key="problem.id">
        <td class="problemTableCol1">
          <router-link :to="{path:'problem/'+problem.problemsID}">
            {{problem.problemsID}}
          </router-link>
        </td>
        <td class="problemTableCol2">
          <router-link :to="{path:'problem/'+problem.problemsID}">
            {{problem.problemsName}}
          </router-link>
        </td>
        <td class="problemTableCol3" v-text="problem.problemsRatio"></td>
      </tr>
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">
            There is no more problems :(
          </span>
      </infinite-loading>
    </tbody>
  </table>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'component-problems',
  data: function() {
    return {
      problemList: []
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initView()
    })
  },
  methods: {
    initView: function() {
      this.$http.get('/static/problemsData.json').then(function(res) {
        this.problemList = res.body.data
      })
    },
    infiniteHandler: function($state) {
      this.$http.get('/static/problemsData.json').then(function(res) {
        if (!res.body.data.length) return -1
        this.problemList = this.problemList.concat(res.body.data)
        console.log(this.problemList.length)
        $state.loaded()
      })
    }
  },
  components: {
    InfiniteLoading
  }
}
</script>
<style>
#Problems {
  text-align: left;
  background: #fff;
  padding: 2em 4em;
}

#Problems td a {
  color: #2c3e50;
}

/*
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
*/
</style>
