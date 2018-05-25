<template>
  <div id="status-page">
    <div class="container-fluid table-container">
      <table id="statusTable" class="table table-hover">
        <thead class="thread-height">
        <tr>
          <th class="hidden-xs">run id</th>
          <th>nickname</th>
          <th>problem id</th>
          <th>result</th>
          <th>language</th>
          <th>code length</th>
          <th>time</th>
          <th>memory</th>
          <th>submit time</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(status, index) in statusList" :key="index">
          <td class="hidden-xs">{{status.solution_id}}</td>
          <td>
            <router-link :to="{path:'user/'+status.user_id}">
              <span>{{status.nickname}}</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{path:'problem/'+status.problem_id}">
              <span class="label label-info">{{status.problem_id}}</span>
            </router-link>
          </td>
          <td>
            <router-link
              :class="['btn btn-sm status',getStatusClass(status.status_id)]"
              :style="'background-color: '+status.color"
              type="button"
              :to="{path:'details/'+status.solution_id}"
              tag="button"
            >
              {{getStatusText(status.status_id) || status.msg_en}}
            </router-link>
          </td>
          <td>{{lang_hash[status.language]}}</td>
          <td>
            {{status.code_size}} byte
            <router-link v-if="status.code_id" :to="{path:'code/'+status.code_id}">
              <span class="label label-default">
              <i class="glyphicon glyphicon-eye-open"></i>
            </span>
            </router-link>
          </td>
          <td>{{status.time}} ms</td>
          <td>{{status.memory}} kB</td>
          <td :title="new Date(status.when).toLocaleString()">{{moment(status.when).fromNow()}}</td>
        </tr>
        </tbody>
      </table>
      <infinite-loading @infinite="infiniteHandler" v-if="isInfinite===true">
          <span slot="no-more">
            There is no more status :) | 都已经全被你知道了啦QAQ
          </span>
      </infinite-loading>
      <div id="load-btn-box" v-if="isBtn">
        <div class="load-btn"><span class="glyphicon glyphicon-refresh"></span>
        </div>
      </div>
    </div>
    <status-details :datas="details.datas" v-if="showdt" @rmdt="showdt = false"></status-details>
  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading'
  import StatusDetails from './details.vue'
  import moment from 'moment'

  var {statusMap, langMap, langHash} = require('./map.json')
  export default {
    name: 'statusPage',
    props: ['isFilter', 'isInfinite', 'isBtn', 'apiUrl'],
    data: function () {
      return {
        pool: [],
        statusList: [],
        status_map: statusMap,
        lang_hash: langHash,
        details: {
          datas: []
        },
        filter: {
          problemID: '',
          userID: '',
          status: '',
          lang: '',
          limit: 150, // 单次请求最大量
          last: -1
        },
        showdt: false,
        maxId: -1,
        minId: -1
      }
    },
    methods: {
      setDetails: function (solution) {
        this.details.datas = solution
        this.showdt = true
      },
      getStatusClass: function (statusId) {
        statusId = statusId.toString()
        let status = 'label-default'
        this.status_map.some(item => item.value === statusId && (status = item.label_class))
        return status
      },
      getStatusText: function (statusId) {
        statusId = statusId.toString()
        let status = 'Unknow'
        this.status_map.some(item => item.value === statusId && (status = item.status))
        return status
      },
      removeLower: function (list) {
        var index = -1
        for (let i = list.length - 1; i >= 0; i--) {
          if (list[i]['solution_id'] > this.maxId) break
          index = i
        }
        if (index !== -1) list.splice(index, list.length - index) // js 引用
      },
      infiniteHandler: function ($state) {
        // if ($state.complete) $state.complete()
        // if ($state.loaded) $state.loaded()
        let vm = this
        if (vm.statusList.length === 0) {
          console.log('第一次向魔法机发起状态请求')
          vm.$http.get(vm.apiUrl)
            .then(function (res) {
              if (!res.body.data) {
                console.log('init feedback erro')
                return -1
              }
              vm.statusList = res.body.data
              vm.maxId = vm.statusList[0]['solution_id']
              if ($state.loaded) $state.loaded()
            }, function (e) {
              console.log('init get erro')
            })
          return 0
        }
        let from = vm.statusList.length
        let limit = vm.filter.limit
        console.log('向魔法机请求更久远的数据')
        vm.$http.get(vm.apiUrl + '/' + from + '/' + limit)
          .then(function (res) {
            var tmp = vm.statusList
            if (!res.body.data) {
              console.log('infinite feedback erro')
              if ($state.loaded) $state.loaded() // must call this
              return -1
            }
            const min = res.body.data[res.body.data.length - 1]['solution_id']
            if (min === vm.minId) if ($state.complete) $state.complete()
            vm.minId = min
            vm.removeLower(res.body.data)
            tmp = tmp.concat(res.body.data)
            vm.statusList = tmp
            vm.maxId = vm.statusList[0]['solution_id']
            if ($state.loaded) $state.loaded()
          }, function (e) {
            console.log('infinite erro')
          })
      },
      hook: function () {
        let vm = this
        if (vm.statusList.length === 0) return -1
        let till = vm.statusList[0].solution_id
        vm.$http.get(vm.apiUrl + '/' + till)
          .then(function (res) {
            if (!res.body.data) {
              console.log('无返回')
              return 0
            }
            vm.removeLower(res.body.data)
            if (res.body.data.length === 0) {
              console.log('没有新的更新')
              return 0
            }
            var tmp = res.body.data
            tmp = tmp.concat(vm.statusList)
            vm.statusList = tmp
            vm.maxId = vm.statusList[0]['solution_id']
            console.log('魔法状态更新')
          }, function (e) {
            console.log(JSON.stringify(e))
          })
      },
      moment: moment
    },
    mounted: function () {
      let vm = this
      this.$nextTick(function () {
        vm.pool.push(window.setInterval(vm.hook, 10000))
      })
    },
    beforeDestroy: function () {
      let vm = this
      console.log('清理魔法池')
      console.log(vm.pool)
      for (let i in vm.pool) {
        window.clearInterval(vm.pool[i])
      }
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
      },
      maxId: function (n, o) {
        console.log('new maxId: ' + n)
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
    background: rgba(255, 255, 255, 0.7);
    padding: 0;
    min-height: 100%;
    margin-top: @filterheight;
  }

  .table-container {
    font-size: 0.5em;
    min-width: 600px;
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

  .table-container .table-hover tbody tr:hover {
    background: rgba(255, 255, 255, 0.8);
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
    transition: all 1.41s, outline 0.1s;
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
    transition: all 1s cubic-bezier(.17, .67, .83, .67);
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

  .status {
    border: none;
  }

  @media (min-width: 768px) {
  }

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
