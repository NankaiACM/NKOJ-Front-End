<template>
  <div class="question-filter-base status-filter container-fluid">
    <ul class="nav nav-pills">
      <li role="presentation">
        <input type="text" class="form-control" placeholder="problem ID" v-model="filter.problemID" >
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
          <li v-for="status in dropdata.status" :key="status.value"><a @click="setSF('status',status.value)" href="#">
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
          <li v-for="lang in dropdata.lang" :key="lang.value"><a @click="setSF('lang',lang.value)" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="filter.lang===lang.value"></span>
            {{lang.lang}}
            </a>
          </li>
          <li role="separator" class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{filter.lang}}</a></li>
        </ul>
      </li>
      <li role="presentation" class="navbar-right"><a href="#" class="text-muted" @click="setSF('submit',1)">Submit</a></li>
    </ul>
  </div>
</template>
<script>
var status_map = [...require('../../../static/status_map.json')]
export default {
  data: function () {
    return {
      filter: {
        problemID: '',
        userID: '',
        status: '',
        lang: '',
        index: 1,
        submit: 0,
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
  mounted: function () {
    this.$nextTick(function(){
      this.filter = this.$store.state.statusFilter
      console.log(this.filter)
    })
  },
  methods: {
    setSF: function (key,value) {
      console.log(key+value)
      this.$store.commit({
        type: 'setSFilter',
        key: key,
        value: value
        })
    }
  },
  watch: {
    '$store.state.statusFilter': {
      deep: true,
      handler: function (n, o) {
        this.filter = n
        console.log(this.filter.status)
      }
    }
  }
}
</script>
<style lang="less">
@import '../../less/global.less';

.question-filter-base {
    height: @filterheight;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.status-filter .nav {
    width: 100%;
}

.status-filter input {
    width: 8em;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    outline: none;
}

.status-filter .form-control:focus {
  box-shadow: none;
  outline: none;
}
</style>


