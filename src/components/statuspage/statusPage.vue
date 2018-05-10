<template>
<div id="status-page">
  <div class="container-fluid table-container">
    <table id="statusTable" class="table table-hover">
      <thead class="thread-height">
        <tr>
          <th class="hidden-xs">run id</th>
          <th>user id</th>
          <th>problem id</th>
          <th>result</th>
          <th>language</th>
          <th>memory</th>
          <th>time</th>
          <th>code length</th>
          <th>submit time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="status in statusList" :key="status.solution_id">
          <td class="hidden-xs">{{status.solution_id}}</td>
          <td>
            <router-link :to="{path:'user/'+status.nickname}">
              <span class="label label-info">{{status.nickname}}</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{path:'problem/'+status.problem_id}">
              <span class="label label-info">{{status.problem_id}}</span>
            </router-link>
          </td>
          <td>
            <button :class="['btn btn-sm',getStatusClass(status.status_id)]" type="button" class="btn btn-primary" data-toggle="modal" data-target="#status-details" @click="setDetailsRunId(status.solution_id)">
                {{getStatusText(status.status_id)}}
            </button>
          </td>
          <td>{{status.language}}</td>
          <td>
            {{status.code_size}}&nbsp;&nbsp;
            <router-link v-if="status.code_id" :to="{path:'code/'+status.code_id}">
              <span class="label label-default">
              <i class="glyphicon glyphicon-eye-open"></i>
            </span>
            </router-link>
          </td>
          <td>{{status.time}}</td>
          <td>{{status.memory}}</td>
          <td>{{new Date(status.when).toLocaleString()}}</td>
        </tr>
      </tbody>
    </table>
    <infinite-loading @infinite="infiniteHandler" v-if="isInfinite==true">
          <span slot="no-more">
            There is no more status :( at bottom
          </span>
    </infinite-loading>
    <div id="load-btn-box" v-if="isBtn">
      <div class="load-btn" @click="getStatus"><span class="glyphicon glyphicon-refresh"></span>
      </div>
    </div>
  </div>
  <status-details :solution_id="details.solution_id"></status-details>
</div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import StatusDetails from './details.vue'
var statusMap = [...require('../../../static/status_map.json')]
export default {
  name: 'statusPage',
  props: ['isFilter', 'isInfinite', 'isBtn', 'apiUrl'],
  data: function () {
    return {
      statusList: [],
      status_map: statusMap,
      details: {
        solution_id: '-1'
      },
      filter: {
        problemID: '',
        userID: '',
        status: '',
        lang: '',
        pckgln: 410, // 单次请求最大量
        l: 1, // min id
        r: 4 // max id
      },
      max: -1
    }
  },
  methods: {
    hookmax: function () {
      let vm = this
      vm.$http.post(vm.apiUrl, {
        queryleft: 41,
        queryright: 42
      }).then(function (res) {
        let x = res.body.max
        if (x === vm.filter.max) return
        vm.max = x
      }, function (e) {
        console.log('fatal erro')
      })
    },
    setDetailsRunId: function (solutionId) {
      this.details.solution_id = solutionId
    },
    getStatus: function (left, right) {
      let vm = this
      if (left <= 0) {
        left = 1
      }
      vm.$http.post(vm.apiUrl, {
        'queryleft': left,
        'queryright': right
      }).then(function (res) {
        if (!res.body.data) {
          console.log('状态魔法机返回错误')
          console.info(left, right)
          console.log(JSON.stringify(res))
          return -1
        }
        // ID应从大到小排序
        var tmp = this.statusList.concat(res.body.data)
        tmp = tmp.sort((l, r) => r.solution_id - l.solution_id)
        vm.statusList = tmp
        vm.filter.l = Math.min(left, vm.filter.l)
        vm.filter.r = Math.max(right, vm.filter.r)
        return 0
      }, function (e) {
        console.log('发向状态魔法机的请求错误')
        console.log(JSON.stringify(e))
        return -1
      })
      // 应当将两个回调函数返回值返回
    },
    getStatusClass: function (statusId) {
      var res = 'label-default'
      this.status_map.map(item => {
        if (item.value === statusId) {
          res = item.label_class
        }
      })
      return res
    },
    getStatusText: function (statusId) {
      var res = 'unknow'
      this.status_map.map(item => {
        if (item.value === statusId) {
          res = item.status
        }
      })
      return res
    },
    infiniteHandler: function ($state) {
      // 获取更小id的status
      var vm = this
      var left = vm.filter.l - vm.filter.pckgln
      var right = vm.filter.l - 1
      if (left <= 0) left = 1
      if (right < left) return $state.complete()
      if (vm.getStatus(left, right) === -1) { // 事实上并不会产生 -1
        if ($state.complete) $state.complete() // 有待考究
      } else {
        if ($state.loaded) $state.loaded()
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      let vm = this
      vm.getStatus()
      setInterval(vm.hookmax, 3000)
    })
  },
  beforeDestroy: function () {
    clearInterval(this.hookmax)
  },
  components: {
    InfiniteLoading,
    StatusDetails
  },
  watch: {
    '$store.state.statusFilter.submit': function (n, o) {
      this.filter = this.$store.state.statusFilter
    },
    'filter.submit': function () {
      this.getStatus()
    },
    max: function (n, o) {
      if (n < o) {
        console.log('魔法机抛出魔法错误') // 这个输出应该只会在数据库清空时有可能出现
      }
      // 获取更大id的status
      console.log('响应魔法机的魔力更新')
      this.getStatus(this.filter.l, n)
    }
  }
}
</script>
<style lang="less">
@import '../../less/global.less';

a:focus {
  text-decoration: none;
}

#status-page {
    text-align: left;
    background: #fff;
    padding: 0;
    min-height: 100%;
}

.table-container {
    font-size: 0.5em;
    min-width: 600px;
    border: 2px solid #e8f1f2;
}

.table-container table.table td {
    vertical-align: middle;
    border: none;
    text-align: center;
}

#statusTable th {
    font-size: 1.2em;
    border-bottom: 0;
    height: 3em;
    text-align: center;
}

.table-container table.table tr {
    transition: all 0.41s;
}

#statusTable td a:hover {
    text-decoration: none;
}

.table-container td span.label {
    padding: 0.2em 0.6em;
    font-size: 100%;
}

.table-container td button.btn {
    font-size: 80%;
    border-radius: 0.25em;
    font-weight: 700;
    transition: all 1.41s,outline 0.1s;
}

.table-container td button.btn:hover {
    outline: 3px solid #ccc;
}

.infinite-loading-container {
  width: 100%;
}

#load-btn-box {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.load-btn {
  width: 50px;
  height: 50px;
  color: #ccc;
  transition: all 1s cubic-bezier(.17,.67,.83,.67);
}

.load-btn:hover {
  border-radius: 50%;
  background: #87b7cb;
  color: #fff;
  box-shadow: 1px 1px 1px #ccc;
}

.load-btn span {
  width: 50px;
  height: 50px;
  padding: 10px;
  font-size: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  transform-origin: center center;
  transition: all 1s;
}

.load-btn span:hover {
  transform: rotate(180deg);
}

@media (min-width: 768px) {}

@media (min-width: 992px) {
  .table-container {
    font-size: inherit;
  }
  #status-page .nav {
    font-size: inherit;
  }
  #status-page .nav input {
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .table-container {
    font-size: inherit;
  }
}
</style>
