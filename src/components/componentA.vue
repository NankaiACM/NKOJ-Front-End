<template>
    <div class="hello">
      <h1>题库</h1>
      <ul id="problemlist" v-for="problem in problemList" v-bind:key="problem.problemID">
        <a id="haha" href="https://www.bilibili.com/"><li>
          <span>Problem ID:{{problem.problemsID}}</span >
          <span id="test">{{problem.problemsName}}</span>
        </li> </a>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'component-a',
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
      this.$http.options.root = '.'
      this.$http.get('/static/problemsData.json').then(function (res) {
        _this.problemList = res.body.data
        console.log(_this.problemList)
      })
    }
  }
}
</script>

<style scoped>
h1 {
  color: #42b983;
}
#haha:link,#haha:visited,#haha:hover,#haha:active{
  color: black;
}
ul{
  list-style: none;
}
ul li:hover{
  background: lightgray;
  cursor: pointer;
}
#test{
  float:right;
}
.hello{
  padding: 0 30px;
}
#problemlist{
  text-align: left;
}
</style>
