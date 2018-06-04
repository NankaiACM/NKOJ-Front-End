<template>
<div id="datas">
  <h3>比赛信息
    <span class="search">
      <input placeholder="竞赛 ID" type="text" v-model="id" id="info">
      <span class="get" @click="getPC">Get</span>
      <span class="edit" @click="edtPC">Edit</span>
    </span>
  </h3>
  <div class="blog" v-if="!isEdit">
    <div class="section" v-for="(item, key, index) in o" :key="index">
      <span class="l">{{key}}</span><span class="r">{{item}}</span>
    </div>
  </div>
  <div class="blog" v-if="isEdit">
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
  .blog {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    margin: 3em 0;
    padding: 2em 0;
  }
  .section {
    margin: 0 3em;
    padding: 2em 0;
    border-bottom: 1px solid #e5e9ef;
    position: relative;
    height: auto;
    display: grid;
    grid-template-columns: 30% 70%;
    &:first-child {
      border-top: 1px solid #c24f4a;
    }
    &:last-child {
      border-bottom: 1px solid #1e88e5;
    }
    .l, .r {
      padding: 0 1em;
      color: #233;
    }
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
      height: 1px;
      width: 1px;
      transition: all 1.41s;
    }
    &:hover {
      &::after {
        background: #2cbfec;
        width: 100%;
      }
    }
  }
}
</style>
