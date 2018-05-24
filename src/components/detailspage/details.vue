<template>
<div id="details">
  <div class="details-container container-fluid">
    <div>
      <h3>
        <span class="glyphicon glyphicon-screenshot"></span> 提交编号
        <router-link :to="{path: '/details/' + o.solution_id}">{{solution_id}}</router-link>
      </h3>
      <div class="alert alert-info">
        提交时间: {{o.when}} / 用时: {{o.time}} ms / 内存: {{o.memory}} byte / 代码长度: {{o.code_size}}
      </div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-edit"></span> 题号
        <router-link :to="{path: '/problem/' + o.problem_id}">{{o.problem_id}}</router-link>
      </h3>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-search"></span> 评测结果</h3>
      <div class="alert alert-info">
        {{o.msg_en}} <br>
        {{o.msg_cn}} <br>
      </div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-console"></span> 编译信息</h3>
      <div class="alert alert-info">{{o.compile_info}}</div>
    </div>
    <div v-if="evaluateNodes.length !== 1">
      <h3><span class="glyphicon glyphicon-th"></span> 测试点信息</h3>
      <div class="clearfix">
      <div v-for="(item, index) in evaluateNodes"
           v-if="item.stdin !== '0x3df67d'"
           :key="index"
           class="eva-node alert alert-info">
        <div>
          NO.{{index}}<br>
          <span>输入</span>
          <pre>{{item.stdin}}</pre>
          <span>正确输出</span>
          <pre>{{item.stdout}}</pre>
          <span>程序输出</span>
          <pre>{{item.execout}}</pre>
        </div>
      </div>
      </div>
      <div></div>
    </div>
    <div>
      <h3><span class="glyphicon glyphicon-pencil"></span> 代码内容&nbsp;<button type="button" class="btn btn-info"><span class="glyphicon glyphicon-play" title="在线运行"></span></button></h3>
      <div>
        <pre>{{o.code}}</pre>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'details-page',
  data: function () {
    return {
      solution_id: -1,
      casesNum: 0,
      o: {
        'solution_id': -1,
        'user_id': -1,
        'problem_id': 0,
        'status_id': 0,
        'language': 0,
        'code_size': 0,
        'time': 0,
        'memory': 0,
        'when': '',
        'msg_short': '',
        'msg_en': '',
        'msg_cn': '',
        'nickname': 'NULL',
        'canViewOutput': false,
        'compile_info': 'segmentFault',
        'code': 'function(){}();'
      },
      evaluateNodes: [{
        stdin: '0x3df67d',
        stdout: '',
        execout: ''
      }]
    }
  },
  methods: {
    initView: function () {
      const vm = this
      const solutionId = vm.$route.params.solutionId
      if (!solutionId) {
        alert('参数错误')
        return console.erro(vm.$route.params)
      }
      console.log(solutionId)
      vm.solution_id = solutionId
      vm.getO()
    },
    getO: function () {
      const vm = this
      vm.$http.get(window.noPointHost + '/api/status/detail/' + vm.solution_id)
        .then(function (res) {
          const data = res.body.data
          if (!data) return console.info('error')
          vm.o = data
          vm.casesNum = data.cases || 1
          if (data.canViewOutput) vm.getOutput(1)
        })
    },
    getOutput: function (caseId) {
      const vm = this
      vm.$http.get(window.noPointHost + '/api/status/detail/' + vm.solution_id + '/case/' + caseId)
        .then(function (res) {
          if (res.body.code !== 0) return 0
          vm.evaluateNodes.push(res.body.data)
          if (caseId < vm.casesNum) vm.getOutput(caseId + 1)
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  }
}
</script>
<style lang="less">
.details-container {
  padding: 2em 3em;
  background: rgba(255, 255, 255, 0.7);
}
.eva-node {
  padding: 1em;
}
</style>
