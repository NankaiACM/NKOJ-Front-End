<template>
<div id="status-page">
  <div class="question-filter-base container-fluid" v-if="isFilter==true">
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
          <li v-for="status in dropdata.status" :key="status.value"><a @click="setStatus(status.value)" href="#">
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
          <li v-for="lang in dropdata.lang" :key="lang.value"><a @click="setLang(lang.value)" href="#">
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
  </div>
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
export default {
  name: 'statusPage',
  props: ['isFilter','isInfinite','isBtn','apiUrl'],
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
      /* 
        status in statusList
        {
          "solution_id": 1,
          "nickname": 1,
          "problem_id": 1001,
          "status_id": null,
          "language": 0,
          "code_size": null,
          "time": null,
          "memory": null,
          "when": "2018-03-25T13:34:47.887Z",
          "ipaddr_id": 10
        }
      */
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
    setDetailsRunId: function(solution_id) {
      this.details.solution_id = solution_id
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
      this.filter.index = 1
      this.$http.post(this.apiUrl, {
      /*
        "problemsID": _this.filter.problemID,
        "userID": _this.filter.userID,
        "status": _this.filter.status,
        "language": _this.filter.language,
        "start": 0,
        "end": this.filter.page_length
      */
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
      /*
        "problemsID": _this.filter.problemID,
        "userID": _this.filter.userID,
        "status": _this.filter.status,
        "lang": _this.filter.lang,
        "start": 0,
        "end": this.filter.page_length
      */
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
  }
}
</script>
<style lang="less">
@import '../../less/global.less';

#status-page {
    text-align: left;
    background: #fff;
    padding: 0;
    min-height: 100%;
}

.question-filter-base {
    position: fixed;
    left: 0;
    right: 0;
    top: @barheight;
    height: @filterheight;
    border-bottom: 1px solid #e8f1f2;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#status-page .nav {
    background: inherit;
    font-size: 0.5em;
    width: 100%;
}

#status-page .nav input {
    width: 8em;
    border: 0;
    border-radius: 0;
    box-shadow: none;
}

.table-container {
    padding: 6em 2em;
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
    font-weight: 200;
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
