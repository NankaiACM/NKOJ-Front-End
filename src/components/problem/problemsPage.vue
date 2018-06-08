<template>
<div id="problem">
  <div class="wrp">
    <div class="head">
      <div></div>
      <div>编号</div>
      <div>题目名称</div>
      <div>通过率</div>
    </div>
    <div class="line" v-for="problem in problemList" v-bind:key="problem.id">
      <div class="status">
        <span
          :class="{
            'glyphicon':true,
            'glyphicon-star-empty':true,
            'pro-status-star':problem.isStar
          }">
        </span>
        <span
          :class="{
            'glyphicon':true,
            'glyphicon-minus-sign':problem.state==='none',
            'glyphicon-refresh':problem.state==='on',
            'glyphicon-ok':problem.state==='ac'
          }">
        </span>
      </div>
      <div>
        <router-link :to="{path:'problem/'+problem.problem_id}">
          {{problem.problem_id}}
        </router-link>
      </div>
      <div>
        <router-link :to="{path:'problem/'+problem.problem_id}">
          {{problem.title}}
        </router-link>
      </div>
      <div>
        {{problem.ac}} / {{problem.all}}
      </div>
    </div>
  </div>
  <problems-pagination @viewingleap="handleViewing" :pagesize="this.pageSize" :last="this.total"></problems-pagination>
</div>
</template>
<script>
import ProblemsPagination from './pagination.vue'
import questionFilter from './questionFilter.vue'
export default {
  name: 'component-problems',
  props: ['user_pros_msg'],
  data: function () {
    return {
      filter: [],
      rawList: [],
      problemList: [],
      starlist: [],
      aclist: [],
      onlist: [],
      pageSize: 20,
      queryleft: 0,
      queryright: 50,
      viewing: 1, // >=1
      total: 1
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.filter = this.$store.state.filter
      this.initView()
    })
  },
  methods: {
    initView: function () {
      console.log(this.queryright)
      this.$http.get(`${window.noPointHost}/api/problems/list/${this.queryleft}/${this.queryright}`)
        .then(function (res) {
          this.rawList = res.body.data.list
          this.total = res.body.data.served
          this.raw2listrender()
        })
    },
    stateAstarRender: function (tmp) {
      for (let x in tmp) {
        if (!tmp.hasOwnProperty(x)) continue
        let item = tmp[x]
        tmp[x].isStar = false
        tmp[x].state = 'none'
        if (this.starlist.indexOf(item.problem_id) !== -1) {
          tmp[x].isStar = true
        }
        if (this.aclist.indexOf(item.problem_id) !== -1) {
          item[x].state = 'ac'
        }
        else if (this.onlist.indexOf(item.problem_id) !== -1) {
          item[x].state = 'on'
        }
      }
      return tmp
    },
    raw2listrender: function () {
      let left = (this.viewing - 1) * this.pageSize
      if (left > this.total) left = this.total
      else if (left < 0) left = 0
      let right = this.viewing * this.pageSize
      if (right > this.total) right = this.total
      else if (right < 0) right = 0
      const tmp = this.rawList.slice(left, right)
      this.problemList = this.stateAstarRender(tmp)
      console.log(tmp)
    },
    handleViewing: function (newv) {
      console.info(newv.viewing)
      this.viewing = newv.viewing
      this.raw2listrender()
    }
  },
  watch: {
    user_pros_msg: function (newv, oldv) {
      this.starlist = newv.star
      this.aclist = newv.ac
      this.onlist = newv.on
    },
    'this.$store.state.filter': {
      deep: true,
      handler: function (n, o) {
        this.filter = n
        // this.problemList = []
        // this.initView()
      }
    }
  },
  components: {
    ProblemsPagination,
    questionFilter
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';
#problem {
  margin-top: 60px;
  padding: 1em 2em 3em 2em;
  background: rgba(255,255,255,.8);
  .wrp {
    width: 100%;
    .head, .line {
      display: grid;
      grid-template-columns: 50px 80px auto 50px;
      grid-column-gap: 2rem;
    }
    .head {
      padding: 1em 30px;
      font-size: 16px;
      color: #2cbfec;
      border-bottom: 1px solid rgba(241,241,241,.8);
    }
    .line {
      padding: 1em 30px;
      color: #233;
      align-items: center;
      &:hover {
        background: #f1f1f1;
      }
      a {
        color: #233;
      }
      .status {
        display: flex;
        flex-direction: column;
        text-align: center;
        span {
          font-size: 18px;
          padding: 4px 0;
          color: #ccc;
          cursor: pointer;
          &:hover {
            color: #2cbfec;
          }
        }
      }
    }
  }
}
</style>
