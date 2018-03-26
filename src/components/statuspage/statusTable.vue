<template>
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
        <button :class="['btn btn-sm',status.statusClass]" type="button" class="btn btn-primary" data-toggle="modal" data-target="#status-details" @click="setDetailsRunId(status.run_id)">
            {{status.statusText}}
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
    <infinite-loading @infinite="infiniteHandler" v-if="!isNotInfinite">
      <span slot="no-more">
        There is no more status :( at bottom
    </span>
    </infinite-loading>
    <div v-if="isNotInfinite===true">
      v
    </div>
  </tbody>
</table>
</template>
<script>
import InfiniteLoading from "vue-infinite-loading"
export default {
  name: "statusTable",
  props: ['filter',"statusList", "isNotInfinite"],
  data: function() {
    return {}
  },
  methods: {
    infiniteHandler: function($state) {
      var _this = this
      var _start = _this.filter.index * _this.filter.page_length
      _this.filter.index++
      var _end = _this.filter.index * _this.filter.page_length
      this.$http.get("/static/status.json").then(function(res) {
        if (!res.body.data.length) {
          $state.complete()
          return -1
        }
        _this.statusList = _this.statusList.concat(res.body.data)
        $state.loaded();
        console.log(_this.statusList.length)
      })
    }
  },
  components: {
    InfiniteLoading
  }
};
</script>
<style>

</style>
