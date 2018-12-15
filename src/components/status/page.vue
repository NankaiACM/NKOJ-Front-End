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
            <th>shared</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="list">
          <tr v-for="(status, index) in afterFilterStatusList" :key="index">
            <td class="hidden-xs idbox">
              <span :class="{'has-contest' : status.contest_id}">{{status.solution_id}}<span v-if="status.contest_id">({{status.contest_id}})</span></span>
              <span v-if="isAdmin" class="rejudge glyphicon glyphicon-repeat" @click="notify.mptdex = index" title="rejudge this"></span>
              <transition name="mptfade">
                <span v-if="notify.mptdex === index" class="mptboard">
                  <span>rejudge:{{status.solution_id}}</span>
                  <span>
                    <span class="reok glyphicon glyphicon-ok" @click="rejudge(status.solution_id)"></span>
                    <span class="rerm glyphicon glyphicon-remove" @click="notify.mptdex = -1"></span>
                  </span>
                </span>
              </transition>
            </td>
            <td>
              <router-link :to="{path:'/space/uid/'+status.user_id}">
                <span>{{status.nickname}}</span>
              </router-link>
            </td>
            <td>
              <router-link :to="{path:'/problem/'+status.problem_id}">
                <span class="label label-info">{{status.problem_id}}</span>
              </router-link>
            </td>
            <td>
              <router-link
                :class="['btn btn-sm status',getStatusClass(status.status_id)]"
                :style="'background-color: '+status.color"
                type="button"
                :to="{path:'/details/'+status.solution_id}"
                tag="button"
              >
                {{getStatusText(status.status_id) || status.msg_en}}
              </router-link>
            </td>
            <td>{{lang_hash[status.language]}}</td>
            <td>
              {{status.code_size}} byte
              <router-link v-if="status.code_id" :to="{path:'/code/'+status.code_id}">
                <span class="label label-default">
                <i class="glyphicon glyphicon-eye-open"></i>
              </span>
              </router-link>
            </td>
            <td>{{status.time}} ms</td>
            <td>{{status.memory}} kB</td>
            <td :title="new Date(status.when).toLocaleString()">{{moment(status.when).fromNow()}}</td>
            <td>
              <span class="share">
                <span v-if="status.shared">yes <span v-if="status.user_id === myId" class="rm" @click="$router.removeShare(vm, status.solution_id, status)">x</span></span>
                <span v-if="!status.shared">no <span v-if="status.user_id === myId" class="add" @click="$router.addShare(vm, status.solution_id, status)">+</span></span>
              </span>
            </td>
          </tr>
        </transition-group>
      </table>
      <infinite-loading @infinite="infiniteHandler" v-if="isInfinite===true" class="no-more" ref="infinite">
          <span slot="no-more">
            There is no more status :) | 都已经全被你知道了啦QAQ
          </span>
      </infinite-loading>
      <div id="load-btn-box" v-if="isBtn">
        <div class="load-btn"><span class="glyphicon glyphicon-refresh"></span>
        </div>
      </div>
    </div>
    <notify :title="notify.title" :message="notify.message" :count="notify.count"></notify>
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import notify from '../shell/notify'
import {statusMap, langHash} from './map.js'
import {statusSearchStr, statusSearchData} from '../contest/virtualApi.js'
import moment from 'moment'

// const moment = () => import(webpackChunkName: "moment" */ 'moment')

export default {
  name: 'status',
  props: ['isFilter', 'isInfinite', 'isBtn', 'apiUrl'],
  data: function () {
    return {
      notify: {
        title: '',
        message: '',
        count: '',
        mptdex: -1
      },
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
        last: -1,
        nickname: ''
      },
      maxId: -1,
      minId: -1
    }
  },
  methods: {
    clearData: function () {
      this.filter.last = -1
      this.maxId = -1
      this.minId = -1
      this.details.datas = []
      this.statusList = []
      /* bug
      console.log(this.$refs.infinite)
      window.emit = this.$refs.infinite.$emit
      this.$refs.infinite.$emit('$InfiniteLoading:reset')
      */
      // 替代
      window.location.reload()
    },
    rejudge: function (solutionId) {
      const vm = this
      vm.$http.get(window.noPointHost + '/api/judge/rejudge/' + solutionId)
        .then(function (res) {
          vm.notify.title = 'rejudge status'
          vm.notify.message = JSON.stringify(res.body)
          vm.notify.count++
          vm.notify.mptdex = -1
        }, function (e) {
          vm.notify.title = 'rejudge status: error'
          vm.notify.message = JSON.stringify(e.body)
          vm.notify.count++
          vm.notify.mptdex = -1
        })
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
      let index = -1
      for (let i = list.length - 1; i >= 0; i--) {
        if (list[i]['solution_id'] > this.maxId) break
        index = i
      }
      if (index !== -1) list.splice(index, list.length - index) // js 引用
    },
    removeHiger: function (list) {
      let index = -1
      for (let i = 0; i < list.length; i++) {
        if (list[i]['solution_id'] < this.minId) break
        index = i
      }
      if (index !== -1) list.splice(0, index)
    },
    infiniteHandler: function ($state) {
      // if ($state.complete) $state.complete()
      // if ($state.loaded) $state.loaded()
      let vm = this
      if (vm.statusList.length === 0) {
        console.log('第一次向魔法机发起状态请求')
        vm.$http.get(vm.apiUrl + '?' + (vm.$route.params.querryString ? vm.$route.params.querryString : '') )
          .then(function (res) {
            if (!res.body.data) {
              console.log('init feedback erro')
              if ($state.complete) $state.complete()
              return -1
            }
            vm.statusList = res.body.data
            vm.maxId = vm.statusList[0]['solution_id']
            vm.minId = vm.statusList[vm.statusList.length - 1]['solution_id']
            if ($state.loaded) $state.loaded()
          }, function (e) {
            console.log('init get erro')
          })
        return 0
      }
      let from = vm.statusList.length
      let limit = vm.filter.limit
      console.log('向魔法机请求更久远的数据')
      vm.$http.get(vm.apiUrl + '/' + from + '/' + limit + '?' + (vm.$route.params.querryString ? vm.$route.params.querryString : ''))
        .then(function (res) {
          let tmp = vm.statusList
          if (!res.body.data) {
            console.log('infinite feedback erro')
            if ($state.complete) $state.complete()
            return -1
          }
          const min = res.body.data[res.body.data.length - 1]['solution_id']
          if (min === vm.minId) if ($state.complete) $state.complete()
          vm.removeHiger(res.body.data)
          vm.minId = min
          tmp = tmp.concat(res.body.data)
          vm.statusList = tmp
          if ($state.loaded) $state.loaded()
        }, function (e) {
          console.log('infinite erro')
          if ($state.complete) $state.complete()
        })
    },
    hook: function () {
      let vm = this
      if (vm.statusList.length === 0) return -1
      let till = vm.statusList[0].solution_id
      vm.$http.get(vm.apiUrl + '/' + till + '?' + (vm.$route.params.querryString ? vm.$route.params.querryString : ''))
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
          vm.statusList = res.body.data.concat(vm.statusList)
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
    notify
  },
  watch: {
    maxId: function (n, o) {
      console.log('new maxId: ' + n)
    },
    '$route': function (n, o) {
      console.log(this.$route.params.querryString)
      let vm = this
      for (let i in vm.pool) {
        window.clearInterval(vm.pool[i])
      }
      vm.clearData()
      vm.pool.push(window.setInterval(vm.hook, 10000))
    }
    /* 不需要再跟 state 通信了
    ,
    '$store.state.statusFilter': {
      deep: true,
      handler: function (n, o) {
        for (let i in this.filter) {
          this.filter[i] = n[i]
        }
        console.log('deepsee2')
        console.log(this.filter.status)
      }
    } */
  },
  computed: {
    myId: function () {
      return this.$store.state.userData['user_id']
    },
    vm: function () {
      return this
    },
    isAdmin: function () {
      if (!this.$store.state.userData.o) return false
      if (!this.$store.state.userData.o.perm) return false
      return this.$store.state.userData.o.perm.ADD_PROBLEM === '1'
    },
    afterFilterStatusList: function () {
      const filter = this.filter
      const lmap = ['problemID', 'userID', 'status', 'lang']
      const rmap = ['problem_id', 'user_id', 'status_id', 'language']
      console.log(JSON.stringify(filter))
      console.log(this.statusList)
      const ans = this.statusList.filter(function (v) {
        for (let index in lmap) {
          if (filter[lmap[index]] !== '') {
            if (filter[lmap[index]].toString() !== v[rmap[index]].toString()) {
              console.log(filter[lmap[index]], v[rmap[index]])
              return false
            }
          }
        }
        return true
      })
      console.log(ans)
      return ans
    }
  }
}
</script>
<style lang="less" scoped>
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
    font-weight: 500;
    color: #2cbfec;
    border-bottom: 0;
    height: 3em;
    text-align: center;
  }

  .list-enter-active, .list-leave-active {
    transition: all .41s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
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
    border-radius: 0;
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

  .no-more {
    margin: 2em auto;
  }

  .idbox {
    position: relative;
  }

  .mptboard {
    position: absolute;
    left: 0;
    background: #fff;
    box-shadow: 0 0 3px 3px #ccc;
    padding: .5em 1em;
    z-index: 141;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mptfade-enter-active, .mptfade-leave-active {
    transition: all .41s;
    opacity: 1;
  }

  .mptfade-enter, .mptfade-leave-to {
    opacity: 0;
  }

  .add, .rm, .rejudge,
  .reok, .rerm{
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    transition: all .41s;
    &:hover {
      transform: rotate(360deg);
      background: #d0e5f2;
      border-radius: 50%;
    }
  }

  .has-contest {
    color: green;
  }

  .reok:hover {
    color: #c24f4a;
    transform: rotate(0);
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
