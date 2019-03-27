<template>
  <div id="details">
    <div class="details-container container-fluid">
      <div>
        <h3>
          <span class="glyphicon glyphicon-screenshot"></span> 提交 {{solution_id}} 至
          <router-link :to="{path: '/problem/' + o.problem_id}">{{o.problem_id}}</router-link>
          <span>[shared:
            <span v-if="!o.shared">no<span class="a" @click="$router.addShare(vm, solution_id, o)">&lt;add&gt;</span></span>
            <span v-if="o.shared">yes<span class="r" @click="$router.removeShare(vm, solution_id, o)">&lt;remove&gt;</span></span>
            ]
          </span>
        </h3>
        <div class="alert alert-info">
          时间: {{new Date(o.when).toLocaleString()}}<br>
          用时: {{o.time}} ms<br>
          内存: {{o.memory}} kB <br>
          代码长度: {{o.code_size}} byte
        </div>
      </div>
      <div>
        <h3><span class="glyphicon glyphicon-search"></span>评测结果</h3>
        <div class="alert alert-info">
          {{o.msg_en}} / {{o.msg_cn}} <br>
          分数: {{o.score}}
        </div>
      </div>
      <div>
        <h3><span class="glyphicon glyphicon-console"></span> 编译信息</h3>
        <div class="alert alert-info"><samp style="white-space: pre-wrap">{{o.compile_info || '无输出'}}</samp></div>
      </div>
      <div>
        <h3><span class="glyphicon glyphicon-pencil"></span> 代码
          <small><span class="glyphicon glyphicon-edit"></span></small>
        </h3>
        <div>
          <pre>{{o.code}}</pre>
        </div>
      </div>
      <div v-if="evaluateNodes.length !== 1">
        <h3><span class="glyphicon glyphicon-th"></span> 测试点信息</h3>
        <div class="clearfix">
          <div v-for="(item, index) in evaluateNodes"
               v-if="item.stdin !== '0x3df67d'"
               :key="index"
               class="eva-node">
            <h4> NO.{{index}}</h4>
            <div class=" alert alert-info">
              <div class="poly-container">
                <div class="poly-row">
                  <div class="poly-col">
                    <div>单点信息</div>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <div class="alert"  v-if="o.detail[index - 1]" :class="o.detail[index - 1].result === 'accepted' ? 'alert-success' : 'alert-danger'">
                      time: {{o.detail[index - 1].time}} ms <br>
                      extra: {{o.detail[index - 1].extra}} <br>
                      memory: {{o.detail[index - 1].memory}} kb <br>
                      result: {{o.detail[index - 1].result}} <br>
                      statuscode: {{o.detail[index - 1].status}} <br>
                      exitcode: {{o.detail[index - 1].exitcode}} <br>
                    </div>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <div>标准输入</div>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <pre>{{item.stdin}}</pre>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <div>标准输出</div>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <pre>{{item.stdout}}</pre>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <div>程序输出</div>
                  </div>
                </div>
                <div class="poly-row">
                  <div class="poly-col">
                    <pre>{{item.execout}}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {statusHash} from '../status/map.js'
export default {
  name: 'details-page',
  data: function () {
    return {
      statusHash: statusHash,
      solution_id: -1,
      casesNum: 0,
      share: false,
      o: {
        solution_id: -1,
        user_id: -1,
        problem_id: 0,
        status_id: 0,
        language: 0,
        code_size: 0,
        time: 0,
        memory: 0,
        when: '',
        msg_short: '',
        msg_en: '',
        msg_cn: '',
        nickname: 'NULL',
        canViewOutput: false,
        compile_info: 'segmentFault',
        code: 'function(){}();'
      },
      evaluateNodes: [{
        stdin: '0x3df67d',
        stdout: '',
        execout: ''
      }]
    }
  },
  computed: {
    vm: function () {
      return this
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
          // if (caseId < vm.casesNum) vm.getOutput(caseId + 1)
          vm.getOutput(caseId + 1)
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
}
</script>
<style lang="less" scoped>
  .a, .r {
    margin: 0 .5em;
    cursor: pointer;
  }

  .details-container {
    padding: 2em 3em;
    background: rgba(255, 255, 255, 0.7);
  }

  .eva-node {
    padding: 1em;
  }

  .eva-node > .alert {
    // padding-top: 0em;
    // why do these? 
  }

  .alert-info {
    background: rgba(217, 237, 247, 0.23);
  }

  @media (min-width: 576px) {
    .poly-container {
      padding: 1.5rem;
      margin-right: 0;
      margin-left: 0;
    }
  }

  .poly-container {
    position: relative;
    padding: 1rem;
    margin: 1rem -15px 0;
    width: 100%;
  }

  .poly-row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    margin-top: .5em;
    margin-bottom: .5em;
  }

  @media (min-width: 576px) {
    .poly-col {
      -ms-flex-preferred-size: 0;
      flex-basis: 0;
      -ms-flex-positive: 1;
      flex-grow: 1;
      max-width: 100%;
    }
  }

  .poly-col {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .poly-col > pre {
    height: 100%;
  }
</style>
