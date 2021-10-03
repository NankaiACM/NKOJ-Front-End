<template>
<div id="report">
  <h3>用户举报</h3>
  <h4>未处理</h4>
  <div class="untreate">
    <div v-for="(item, index) in untreate" :key="index">
      <div class="item">
        <div>编号</div>
        <div>{{item['report_id']}}</div>
        <div>举报者</div>
        <div>{{item.reporter}}</div>
        <div>type</div>
        <div>{{item.type}}</div>
        <div>which</div>
        <div>{{item.which}}</div>
        <div>举报时间</div>
        <div>{{item.when}}</div>
        <div class="d">处理</div>
        <div class="s">
          <div class="y" @click="approve(item['report_id'])">认可</div>
          <div class="n" @click="decline(item['report_id'])">拒绝</div>
        </div>
      </div>
    </div>
  </div>
  <h4>全部举报</h4>
  <div class="all">
    <div v-for="(item, index) in all" :key="index + 'e'">
      <div class="item">
        <div>编号</div>
        <div>{{item['report_id']}}</div>
        <div>举报者</div>
        <div>{{item.reporter}}</div>
        <div>type</div>
        <div>{{item.type}}</div>
        <div>which</div>
        <div>{{item.which}}</div>
        <div>举报时间</div>
        <div>{{item.when}}</div>
        <div>处理者</div>
        <div>{{item.handler}}</div>
        <div class="d">处理结果</div>
        <div class="s">
          <div v-if="item.result === null" class="w">未处理</div>
          <div v-else-if="item.result === true" class="y">认可举报</div>
          <div v-else class="n">拒绝举报</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'report',
  data: function () {
    return {
      untreate: [],
      all: []
    }
  },
  methods: {
    fetchData: function () {
      this.$http.get(window.noPointHost + '/api/admin/report/all')
        .then((res) => {
          if (res.body.code === 0) {
            this.all = res.body.data
          }
          this.$store.commit('setNotify', {
            title: '获取全部举报',
            message: res.body.message
          })
        }, (e) => {
          this.$store.commit('setNotify', {
            title: '获取全部举报失败',
            message: JSON.stringify(e)
          })
        })
      this.$http.get(window.noPointHost + '/api/admin/report')
        .then((res) => {
          if (res.body.code === 0) {
            this.untreate = res.body.data
          }
          this.$store.commit('setNotify', {
            title: '获取未处理的举报',
            message: res.body.message
          })
        }, (e) => {
          this.$store.commit('setNotify', {
            title: '获取未处理的举报失败',
            message: JSON.stringify(e)
          })
        })
    },
    approve: function (id) {
      this.operator(window.noPointHost + '/api/admin/report/approve/' + id)
    },
    decline: function (id) {
      this.operator(window.noPointHost + '/api/admin/report/decline/' + id)
    },
    operator: function (url) {
      this.$http.get(url)
        .then((res) => {
          if (res.body.code === 0) {
            this.fetchData()
          }
          this.$store.commit('setNotify', {
            title: '操作结果',
            message: res.body.message
          })
        }, (e) => {
          this.$store.commit('setNotify', {
            title: '操作失败',
            message: JSON.stringify(e)
          })
        })
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.fetchData()
    })
  }
}
</script>
<style lang="less" scoped>
.cell(@yuki) {
  display: grid;
  grid-template-columns: 6em auto;
  grid-column-gap: 1em;
  grid-row-gap: .5em;
  margin: 1em 2em;
  border-radius: 4px;
  border: 1px solid #efefef;
  box-shadow: 0 0 3px #efefef;
  padding: 1em 2em;
  &:hover {
    border: 1px solid @yuki;
    box-shadow: 0 0 6px @yuki;
  }
  .d {
    color: #2cbfec;
  }
  .s {
    display: flex;
    justify-content: space-around;
    .btns(@sanae) {
      color: @sanae;
      border: 1px solid @sanae;
      border-radius: 4px;
      padding: .5em 1em;
      cursor: pointer;
      &:hover {
        color: darken(@sanae, 5%);
        border-color: darken(@sanae, 5%);
        box-shadow: 0 0 3px @sanae;
      }
    }
    .y {
      .btns(#4cae4c);
    }
    .n {
      .btns(#ffa8a8);
    }
    .w {
      .btns(lighten(#2cbfec, 5%));
    }
  }
}
#report {
  .untreate, .all {
    display: flex;
    flex-wrap: wrap;
  }
  .untreate .item {
    .cell(#ffa8a8);
  }
  .all .item {
    .cell(#2cbfec);
  }
}
</style>
