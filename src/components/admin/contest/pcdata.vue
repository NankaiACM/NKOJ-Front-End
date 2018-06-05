<template>
<div id="datas">
  <h3>比赛信息
    <span class="search">
      <input placeholder="竞赛 ID" type="text" v-model="id" id="info">
      <span class="get" @click="getPC">Get</span>
      <router-link :to="'/admin/editpc/' + this.id" class="edit">Edit</router-link>
    </span>
  </h3>
  <div class="blg">
    <div class="section" v-for="(item, key, index) in o" :key="index">
      <span class="l">{{key}}</span><span class="r">{{item}}</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'datas',
  data: function () {
    return {
      id: '1001',
      o: {}
    }
  },
  methods: {
    getPC: function () {
      this.$http.get(window.noPointHost + '/api/admin/contest/' + this.id)
        .then(function (r) {
          console.log(JSON.stringify(r))
          this.o = r.body.data
        }, function (e) {
          console.log(JSON.stringify(e))
        })
    }
  }
}
</script>
<style lang="less" scoped>
#datas {
  .search {
    float: right;
    font-size: 16px;
    &:hover {
      #info, .get, .edit {
        border-color: #2cbfec;
      }
    }
    #info, .get, .edit {
      float: left;
      display: inline-block;
      background: none;
      outline: none;
      border: 1px solid #ccc;
      padding: .4em 1em;
      border-radius: 4px 0 0 4px;
    }
    .get, .edit {
      cursor: pointer;
      border-radius: 0;
      border-left: none;
      text-decoration: none;
      color: #233;
      &:hover {
        color: #2cbfec;
      }
    }
    .edit {
      border-radius: 0 4px 4px 0;
    }
  }
  @import './blg.less';
}
</style>
