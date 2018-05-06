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
        <infinite-loading @infinite="infiniteHandler" v-if="isInfinite==true">
          <span slot="no-more">
            There is no more status :( at bottom
        </span>
        </infinite-loading>
      </tbody>
    </table>
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
var status_map = [...require('../../../static/status_map.json')]
export default {
  name: 'statusPage',
  props: ['isFilter','isInfinite','isBtn','apiUrl'],
  data: function() {
    return {
      statusList: [],
      status_map: status_map,
      details: {
        solution_id: "-1"
      },
      filter: {
        problemID: '',
        userID: '',
        status: '',
        lang: '',
        index: 1,
        submit: 0,
        page_length: 20
      }
    }
  },
  methods: {
    setDetailsRunId: function(solution_id) {
      this.details.solution_id = solution_id
    },
    getStatus: function() {
      console.log(this.filter)
      var _this = this
      this.filter.index = 1
      this.$http.post(this.apiUrl, {
        'queryleft': 1,
        'queryright': this.filter.page_length
      }).then(function (res) {
        if (!res.body.data) {
          console.log('abort')
          console.log(res)
          return
        }
        _this.statusList = res.body.data
        console.log(res.body.data[0])
      },function (res) {
        console.log(res)
      })
    },
    getStatusClass: function(status_id) {
      var res = "label-default"
      this.status_map.map(item => {
        if (item.value === status_id)
          res = item.label_class
      })
      return res
    },
    getStatusText: function(status_id) {
      var res = "unknow"
      this.status_map.map(item => {
        if (item.value === status_id)
          res = item.status
      })
      return res
    },
    infiniteHandler: function($state) {
      var _this = this
      var _start = _this.filter.index * _this.filter.page_length
      _this.filter.index++
      var _end = _this.filter.index * _this.filter.page_length
      this.$http.post(this.apiUrl,{
         'queryleft': _start,
         'queryright': _end
      }).then(function(res) {
        console.log(res.body)
        if (!res.body.data) {
          console.log('erro')
          return
        }
        if (!res.body.data.length) {
          if ($state.complete) $state.complete()
          return -1
        }
        _this.statusList = _this.statusList.concat(res.body.data)
        if ($state.loaded) $state.loaded()
        console.log(_this.statusList.length)
      })
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getStatus()
    })
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
