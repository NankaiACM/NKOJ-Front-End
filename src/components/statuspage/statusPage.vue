<template>
<div id="status-page">
  <ul class="nav nav-pills">
    <li role="presentation">
      <input type="text" class="form-control" placeholder="problem ID" v-model="filter.problemID">
    </li>
    <li role="presentation">
      <input type="text" class="form-control" placeholder="user ID" v-model="filter.userID">
    </li>
    <li role="presentation" class="dropdown navbar-right">
      <a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
        status
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <li v-for="status in dropdata.status"><a @click="setStatus(status.value)" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.status===status.value"></span>
            {{status.status}}
            </a>
        </li>
        <li role="separator" class="divider"></li>
        <li>
          <a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{filter.status}}</a>
        </li>
      </ul>
    </li>
    <li role="presentation" class="dropdown navbar-right">
      <a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
        language
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <li v-for="lang in dropdata.lang"><a @click="setLang(lang.value)" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.lang===lang.value"></span>
            {{lang.lang}}
            </a>
        </li>
        <li role="separator" class="divider"></li>
        <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{filter.lang}}</a></li>
      </ul>
    </li>
    <li role="presentation" class="navbar-right"><a href="#" class="text-muted" @click="getStatus">Submit</a></li>
  </ul>
  <div class="container-fluid table-container">
    <table id="statusTable" class="table table-hover">
      <caption></caption>
      <thead>
        <th class="hidden-xs">run id</th>
        <th>user id</th>
        <th>problem id</th>
        <th>result</th>
        <th>language</th>
        <th>memory</th>
        <th>time</th>
        <th>code length</th>
        <th>submit time</th>
      </thead>
      <tbody>
        <tr v-for="status in statusList">
          <td class="hidden-xs">{{status.run_id}}</td>
          <td>
            <router-link :to="{path:'user/'+status.user_id}">
              <span class="label label-info">{{status.user_id}}</span>
            </router-link>
          </td>
          <td>
            <router-link :to="{path:'problem/'+status.problem_id}">
              <span class="label label-info">{{status.problem_id}}</span>
            </router-link>
          </td>
          <td>
            <button
              :class="['btn btn-sm',getStatusClass(status.status)]"
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#status-details"
              @click="setDetailsRunId(status.run_id)">
                {{getStatusText(status.status)}}
            </button>
          </td>
          <td>{{status.lang}}</td>
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
          <td>{{new Date(status.timestamp*1).toLocaleString()}}</td>
        </tr>
        <infinite-loading @infinite="infiniteHandler">
          <span slot="no-more">
            There is no more status :( at bottom
        </span>
        </infinite-loading>
      </tbody>
    </table>
  </div>
  <status-details :run_id="details.run_id"></status-details>
</div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import StatusDetails from './details.vue'
export default {
  name: 'statusPage',
  data: function() {
    var status_map = [{
        "value": "107",
        "status": "Accepted",
        "label_class": "btn-success"
      },
      {
        "value": "102",
        "status": "Wrong Answer",
        "label_class": "btn-danger"
      },
      {
        "value": "108",
        "status": "Presentation Error",
        "label_class": "btn-warning"
      },
      {
        "value": "101",
        "status": "Compilation Error",
        "label_class": "btn-danger"
      },
      {
        "value": "103",
        "status": "Runtime Error",
        "label_class": "btn-danger"
      },
      {
        "value": "105",
        "status": "Time Limit Exceeded",
        "label_class": "btn-warning"
      },
      {
        "value": "104",
        "status": "Memory Limit Exceeded",
        "label_class": "btn-warning"
      },
      {
        "value": "106",
        "status": "Output Limit Exceeded",
        "label_class": "btn-warning"
      },
      {
        "value": "109",
        "status": "Function Limit Exceeded",
        "label_class": "btn-warning"
      },
      {
        "value": "100",
        "status": "Judging",
        "label_class": "btn-info"
      },
      {
        "value": "118",
        "status": "System Error",
        "label_class": "btn-warning"
      }
    ]
    return {
      statusList: [],
      status_map: status_map,
      details:{
        run_id: "-1"
      },
      filter: {
        problemID: '',
        userID: '',
        status: '',
        lang: '',
        index: 0,
        page_length: 20
      },
      dropdata: {
        status: status_map,
        lang: [{
          "value": "1",
          "lang": "C99"
        }, {
          "value": "2",
          "lang": "C++ 98"
        }, {
          "value": "3",
          "lang": "Free Pascal"
        }, {
          "value": "4",
          "lang": "Java (JDK6)"
        }, {
          "value": "5",
          "lang": "C++14"
        }]
      }
    }
  },
  methods: {
    setDetailsRunId: function(run_id){
      this.details.run_id = run_id
    },
    setStatus: function(status) {
      if (this.filter.status === status) status = ''
      this.filter.status = status
    },
    setLang: function(lang) {
      if (this.filter.lang === lang) lang = ''
      this.filter.lang = lang
    },
    getStatus: function() {
      var _this = this
      this.filter.index = 0
      this.$http.get('/static/status.json', {
        "problemsID": _this.filter.problemID,
        "userID": _this.filter.userID,
        "status": _this.filter.status,
        "lang": _this.filter.lang,
        "start": 0,
        "end": this.filter.page_length
      }).then(function(res) {
        _this.statusList = res.body.data
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
      this.$http.get('/static/status.json').then(function(res) {
        if (!res.body.data.length) {
          $state.complete()
          return -1
        }
        _this.statusList = _this.statusList.concat(res.body.data)
        $state.loaded()
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
  }
}
</script>
<style lang="less">
@barheight: 61px;

#status-page {
  text-align: left;
  background: #fff;
  padding: 0;
  min-height: 100%;
}

#status-page .nav {
  position: fixed;
  padding: 1em 4em;
  left: 0;
  top: @barheight;
  background: inherit;
  right: 0;
  font-size: .5em;
  border-bottom: 1px solid #e8f1f2;
}

#status-page .nav input {
  width: 8em;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.table-container {
  padding: 6em 2em;
  font-size: .5em;
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
  transition: all .41s;
}

#statusTable td a:hover {
  text-decoration: none;
}

.table-container td span.label {
  padding: .2em .6em .2em;
  font-size: 100%;
}

.table-container td button.btn {
  font-size: 80%;
  border-radius: .25em;
  font-weight: 700;
  transition: all 1.41s,outline .1s;
}

.table-container td button.btn:hover {
  outline: 3px solid #ccc;
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
  .table-container {
    padding: 6em 4em;
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
    padding: 6em 10em;
    font-size: inherit;
  }
}
</style>
