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
        <router-link :to="{path:'/problem/'+problem.problem_id}">
          {{problem.problem_id}}
        </router-link>
      </div>
      <div>
        <router-link :to="{path:'/problem/'+problem.problem_id}">
          {{problem.title}}
        </router-link>
      </div>
      <div>
        {{problem.ac}} / {{problem.all}}
      </div>
    </div>
  </div>
  <problems-pagination @viewingleap="handleViewing" :pagesize="this.pageSize" :last="this.total" :index="this.index"></problems-pagination>
</div>
</template>
<script>
// import problemsPagination from './pagination.vue'
// import questionFilter from './questionFilter.vue'
import matchSorter from 'match-sorter'
// const matchSorter = () => import(
//   /* webpackChunkName: "match-sorter" */
//   'match-sorter')

export default {
  name: 'component-problems',
  props: ['user_pros_msg', 'index'],
  components: {
    problemsPagination: () => import(/* webpackChunkName: "problem" */ './pagination.vue'),
    questionFilter: () => import(/* webpackChunkName: "problem" */ './questionFilter.vue')
  },
  data: function () {
    return {
      rawNetList: [],
      rawNetTotal: 1,
      problemList: [],
      starlist: [],
      aclist: [],
      onlist: [],
      pageSize: 20
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  },
  computed: {
    kWords: function () {
      return this.$store.getters.keyWordsGet
    },
    rawList: function () {
      return matchSorter(this.rawNetList, this.kWords, {
        keys: ['title', 'problem_id']
      })
    },
    total: function () {
      return this.rawList.length
    },
    queryleft: function () {
      return 20 * Number(this.index - 1)
    },
  },
  methods: {
    initView: function () {
      this.$http.get(`${window.noPointHost}/api/problems/list/${this.queryleft}/${this.pageSize}`)
        .then(function (res) {
          this.rawNetList = res.body.data.list
          this.rawNetTotal = res.body.data.served
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
        } else if (this.onlist.indexOf(item.problem_id) !== -1) {
          item[x].state = 'on'
        }
      }
      return tmp
    },
    raw2listrender: function () {
      // let left = (this.index-1) * this.pageSize
      // if (left > this.total) left = this.total
      // else if (left < 0) left = 0
      // let right = this.index * this.pageSize
      // if (right > this.total) right = this.total
      // else if (right < 0) right = 0
      // const tmp = this.rawList.slice(left, right)
      this.problemList = this.stateAstarRender(this.rawList)
    },
    handleViewing: function (newv) {
      this.$router.push('/problems/' + (newv.viewing))
    }
  },
  watch: {
    user_pros_msg: function (newv, oldv) {
      this.starlist = newv.star
      this.aclist = newv.ac
      this.onlist = newv.on
    },
    rawList: function (n, o) {
      this.raw2listrender()
    },
    kWords: function () {
      console.log('happen')
    },
    index: function () {
      this.initView()
    }
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
        background: #fff;
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
