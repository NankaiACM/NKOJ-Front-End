<template>
  <div id="contest-rank-container-out" class="container-fluid">
    <div id="contest-rank-container-in" class="container-fluid">
      <div class="person-rank-container" v-for="(person, index) in persons" :key="index" v-if="isNaN(limit) ? true : (index < limit)">
        <img class="per-img" :src="`${preUrl}/api/avatar/` + person.user_id"/>
        <div class="per-cnt-ctn">
          <div class="luck">
            <span class="line"><span class="split-mius">#</span><span :style="t()">{{index + 1}}</span></span><br>
            <span class="line nick" :title="'nikename'"><span class="split-mius l"></span>{{person.nickname}}<span class="split-mius r"></span></span><br>
            <span class="line"><span class="split-mius l"></span>fraction<span class="split-mius r">{{person.score}}</span></span>
          </div>
        </div>
        <div class="pro-table">
          <div class="pro-item" v-for="(item, x) in problems" :key="x"
            :class="{'ac': person[item['problem_id']] === 100}"
            :title="'[' + item['problem_id'] + ']' + item.title + ': ' + (person[item['problem_id']] || 0)">
            <span :style="tt()">{{item['problem_id']}}</span>
            <span>{{(person[item['problem_id']] || 0)}}</span>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div id="draw-container" @click="toMyRank" v-if="userData">
      <div class="plate">
        我的排名
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'oiRank',
  props: ['limit'],
  data: function () {
    return {
      persons: [],
      p: [],
      howmany: 10,
      userData: undefined,
      preUrl: noPointHost,
      problems: []
    }
  },
  computed: {
  },
  methods: {
    t: function () {
      let b = {
        'color':'#'+(~~(Math.random()*16777215)).toString(16),
        'fontSize': '1.41em'
      }
      return b
    },
    tt () {
      return {'color':'#'+(~~(Math.random()*16777215)).toString(16), 'opacity': .6}
    },
    getProblems () {
      this.$http.get(`${noPointHost}/api/contest/${this.$route.params.contestid}`)
        .then(res => {
          this.problems = res.body.data.problems
          this.getOiRanks()
        })
    },
    getOiRanks () {
      this.$http.get(`${noPointHost}/api/contest/${this.$route.params.contestid}/oirank`)
        .then(res => {
          this.persons = res.body.data
        })
    }
  },
  mounted: async function () {
    this.$nextTick(function () {
      this.getProblems()
    })
  }
}
</script>
<style>
#contest-rank-container-out {
  align-items: center;
  width: 100%;
  padding: 8em 4em;
}
#contest-rank-container-out,#contest-rank-container-in {
  width: auto;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: #555;
  user-select: none;
}

.person-rank-container {
  width: auto;
  margin-bottom: 3em;
  float: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.person-rank-container img.per-img {
  width: 7em;
  height: 7em;
  border-radius: 50%;
  vertical-align: middle;
  margin: 0 4em;
}

.person-rank-container div.per-cnt-ctn,.pro-table {
  vertical-align: middle;
  min-height: 7em;
  width: auto;
}

.split-mius {
  color: #6cf;
  margin: 0 1em;
  line-height: 1.41em;
  font-size: 2em;
  transition: all 1s;
  position: relative;
}

.split-mius.r::after,.split-mius.l::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.split-mius.l::after {
  content: ' ';
}

.luck:hover .split-mius {
  color: #ddd;
}

.luck:hover .split-mius.l {
  color: pink;
}

.luck .line:hover {
  cursor: pointer;
}

.luck .line.nick {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 20em;
}

.pro-table {
  max-width: 250px;
  box-sizing: content-box;
}
.pro-item {
  width: 46px;
  height: 46px;
  line-height: 46px;
  margin: 2px;
  box-sizing: content-box;
  outline: solid 0.1px #e8f1f2;
  border-collapse: collapse;
  float: left;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.pro-item span {
  line-height: 23px;
  font-size: 12px;
}

.pro-item.ac {
  background: #70c1b3;
  color: #fff;
}

#contest-rank-container-in .pagination>.active>a,
#contest-rank-container-in .pagination>.active>a:hover,
#contest-rank-container-in .pagination>.active>a:active,
#contest-rank-container-in .pagination>.active>a:focus {
  background: rgba(0, 100, 148, 0.78);
  border: rgba(0, 100, 148, 0.5) solid 1px;
}

#draw-container {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  position: fixed;
  top: 72px;
  left: -200px;
  opacity: 0;
  transition: all 1s;
  cursor: pointer;
}

#draw-container::after {
  content: '>';
  position: absolute;
  width: 2em;
  height: 100%;
  top: 0;
  left: 100%;
  background: #3886ab;
}

.plate {
  width: 100%;
  height: 100%;
  background: #006494;
}

.test1:hover {
}

.rank-gray:hover #draw-container {
  opacity: 1;
  left: 0;
}

@keyframes luckright {
  from {
    padding-left: 2em;
    opacity: .1;
    color: none;
  }
  to {
    padding-left: 0em;
    opacity: 1;
    color: greenyellow;
  }
}

@keyframes popteam {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
