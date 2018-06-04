<template>
<div id="datas">
  <h3>比赛信息
    <span class="search">
      <input placeholder="竞赛 ID" type="text" v-model="id" id="info">
      <span class="get" @click="getPC">Get</span>
      <span class="edit" @click="edtPC">Edit</span>
    </span>
  </h3>
  <div class="blg" v-if="!isEdit">
    <div class="section" v-for="(item, key, index) in o" :key="index">
      <span class="l">{{key}}</span><span class="r">{{item}}</span>
    </div>
  </div>
  <div class="blg" v-if="isEdit">
    <div class="section">
      <span class="l"></span><span class="r"></span>
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
      o: {},
      isEdit: false
    }
  },
  methods: {
    getPC: function () {
      this.isEdit = false
      this.$http.get(window.noPointHost + '/api/admin/contest/' + this.id)
        .then(function (r) {
          console.log(JSON.stringify(r))
          this.o = r.body.data
        }, function (e) {
          console.log(JSON.stringify(e))
        })
    },
    edtPC: function () {
      console.log('edit')
      this.isEdit = true
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
