<template>
  <div class="question-filter-base status-filter">
    <div class="l">
      <input type="text" class="l" placeholder="problem ID" v-model="filter.problemID" >
      <input type="text" class="l" placeholder="user ID" v-model="filter.userID">
    </div>
    <div class="r">
      <div class="menubox">
        <div class="text" @click="box.status = true">status</div>
        <div class="bg" v-if="box.status" @click="box.status = box.lang = false"></div>
        <div class="menu" v-if="box.status">
          <div v-for="(status, index) in dropdata.status"
               :key="index"
               class="item"
               @click="setFilter('status',status.value)" >
            <span class="glyphicon glyphicon-ok" v-if="filter.status===status.value"></span>
            {{status.status}}
          </div>
          <div class="item">
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
            {{filter.status}}
          </div>
        </div>
      </div>
      <div class="menubox">
        <div class="text" @click="box.lang = true">language</div>
        <div class="bg" v-if="box.lang" @click="box.lang = box.status = false"></div>
        <div class="menu" v-if="box.lang">
          <div v-for="lang in dropdata.lang" :key="lang.value">
            <div @click="setFilter('lang',lang.value)" class="item">
            <span class="glyphicon glyphicon-ok" v-if="filter.lang===lang.value"></span>
            {{lang.lang}}
            </div>
          </div>
          <div class="item">
            <span class="glyphicon glyphicon-search"></span>
            {{filter.lang}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {statusMap, langMap} from './map.js'
export default {
  data: function () {
    return {
      filter: {},
      box: {
        status: false,
        lang: false
      },
      dropdata: {
        status: statusMap,
        lang: langMap
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.filter = this.$store.state.statusFilter // 浅拷贝
      console.log(this.filter)
    })
  },
  methods: {
    setFilter: function (key, value) {
      if (this.filter[key] !== value) {
        this.filter[key] = value
        return 0
      }
      this.filter[key] = ''
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';
.base() {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.question-filter-base {
  height: @filterheight;
  .base();
  justify-content: space-between;
  .l {
    input {
      width: 8em;
      margin: 0 1em;
      border: 0;
      border-radius: 0;
      box-shadow: none;
      outline: none;
      background: none;
    }
  }
  .r {
    .base();
    .menubox {
      position: relative;
      .bg {
        position: fixed;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0;
        z-index: 1;
      }
      .text {
        width: 8em;
        padding: .5em 1em;
        margin: .5em 1em;
        border-radius: 4px;
        border: 1px solid rgba(255,255,255,0);
        cursor: pointer;
        &:hover {
          border: 1px solid #6cf;
        }
      }
      .menu {
        width: auto;
        min-width: 100%;
        position: absolute;
        background: #fff;
        border-radius: 4px;
        padding: 4px;
        box-shadow: 0 0 4px #ccc;
        z-index: 2;
        .item {
          padding: .5em;
          cursor: pointer;
          border-radius: 4px;
          &:hover {
            background: #eee;
          }
        }
      }
    }
  }
}
</style>
