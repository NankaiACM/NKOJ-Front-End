<template>
<div id="details" class="container">
  <div class="col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 details-container">
    <div>
      <h3>
        <span class="glyphicon glyphicon-screenshot"></span>提交编号：
        <router-link :to="{path: 'details/' + solution_id}">{{solution_id}}</router-link>
      </h3>
      <div class="alert alert-info">
        提交时间：{{when_str}} / 用时：{{time}}ms / 内存：{{memory}}byte
      </div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-edit"></span>题号：
        <router-link :to="{path: 'problem/' + problem_id}">{{problem_id}}</router-link>
      </h3>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-search"></span>评测结果</h3>
      <div class="alert alert-info">{{status_str}}</div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-console"></span>编译信息和编译器输出</h3>
      <div class="alert alert-info">{{compile_str}}</div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-th"></span>测试点信息</h3>
      <div class="clearfix">
      <div v-for="(item, index) in evaluate_nodes" class="eva-node alert alert-info" :key="index">
        <div>
          {{index}}
          <div>{{item.status_str}}</div>
          <div>{{item.memory_str}}byte</div>
          <div>{{item.time_str}}ms</div>
        </div>
      </div>
      </div>
      <div></div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-pencil"></span>代码内容&nbsp;<button type="button" class="btn btn-info"><span class="glyphicon glyphicon-play" title="在线运行"></span></button></h3>
      <div>
        <pre>
        {{code_str}}
        </pre>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'details-page',
  data: function() {
    return {
      /**_id从服务器请求，*_str在客户端渲染*/
      solution_id: -1,
      problem_id: 1001,
      status_id: -1,
      lang_id: -1,
      time: -1, //总运行时间
      memory: -1, //总内存消耗
      timestamp: 1514736000000, //毫秒级
      when_str: '20180101',
      status_str: 'compile eeeerro', //评测结果字符串
      compile_str: 'eeeeerro', //编译输出字符串，从服务器请求
      code_str: '(function(){})()',
      evaluate_nodes: [{
        status_id: -1,
        memory: -1,
        time: -1,
        status_str: 'eeeerro',
        memory_str: '1048',
        time_str: '1048',
        in_str: 'hello world', //输入字符串
        in_down: '', //输入文件下载地址
        out_str: 'hello world', //输出字符串
      },{
        status_id: -1,
        memory: -1,
        time: -1,
        status_str: 'eeeerro',
        memory_str: '1048',
        time_str: '1048',
        in_str: 'hello world', //输入字符串
        in_down: '', //输入文件下载地址
        out_str: 'hello world', //输出字符串
      }]
    }
  },
  methods: {
    initView: function() {
      var solution_id = this.$route.params.solution_id
      if (!solution_id) {
        alert('参数错误')
        return console.erro(this.$route.params)
      }
      console.log(solution_id)
      this.solution_id = solution_id
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.initView()
    })
  }
}
</script>
<style lang="less">
.details-container {
  text-align: left;
  margin-top: 4em;
  margin-bottom: 4em;
}
ul {
  padding-left: 2em;
}
.eva-node {
  width: 10em;
  height: 10em;
  padding: 1em;
  margin: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
  float: left;
  flex-direction: column;
}
</style>
