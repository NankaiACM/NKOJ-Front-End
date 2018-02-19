<template>
<div id="status-page" class="container-fluid">
  <ul class="nav nav-pills">
    <li role="presentation">
      <input type="text" class="form-control" placeholder="problem ID" v-model="filter.problemID">
    </li>
    <li role="presentation">
      <input type="text" class="form-control" placeholder="user ID" v-model="filter.userID">
    </li>
    <li role="presentation" class="dropdown">
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
        <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{filter.status}}</a></li>
      </ul>
    </li>
    <li role="presentation" class="dropdown">
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
    <li role="presentation"><a href="#" class="text-muted" @click="getStatus">Submit</a></li>
  </ul>
  <table id="statusTable" class="table">
    <caption>status</caption>
    <thead>
      <th>run id</th>
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
        <td v-for="item in status">{{item}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
export default {
  name: 'statusPage',
  data: function() {
    return {
      statusList: [],
      filter: {
        problemID: '',
        userID: '',
        status: '',
        lang: ''
      },
      dropdata: {
        status: [{
            "value": "107",
            "status": "Accepted"
          },
          {
            "value": "102",
            "status": "Wrong Answer"
          },
          {
            "value": "108",
            "status": "Presentation Error"
          },
          {
            "value": "101",
            "status": "Compilation Error"
          },
          {
            "value": "103",
            "status": "Runtime Error"
          },
          {
            "value": "105",
            "status": "Time Limit Exceeded"
          },
          {
            "value": "104",
            "status": "Memory Limit Exceeded"
          },
          {
            "value": "106",
            "status": "Output Limit Exceeded"
          },
          {
            "value": "109",
            "status": "Function Limit Exceeded"
          },
          {
            "value": "100",
            "status": "Judging"
          },
          {
            "value": "118",
            "status": "System Error"
          }
        ],
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
      this.$http.get('/static/status.json', {
        "problemsID": _this.filter.problemID,
        "userID": _this.filter.userID,
        "status": _this.filter.status,
        "lang": _this.filter.lang
      }).then(function(res) {
        _this.statusList = res.body.data
      })
    }
  },
  mounted: function() {
    this.$nextTick(function () {
      this.getStatus()
    })
  }
}
</script>
<style>
#status-page {
  text-align: left;
  background: #fff;
  padding: 2em 4em;
  min-height: 100%;
}
</style>
