<template>
  <div id="contest-rank-container-out" class="container-fluid">
    <div id="contest-rank-container-in" class="container-fluid">
      <vue-loading type="spin" color="black" :size="{ width: '50px', height: '50px' }" v-if="!persons || persons.length<=0"/>
      <div v-for="(person, index) in persons" :key="index" v-if="isNaN(limit) ? true : (index < limit)" class="person-rank-container">
        <img class="per-img" :src="`${preUrl}/api/avatar/` + person.uid"/>
        <div class="per-cnt-ctn media-body container">
          <div class="luck">
          <span class="line"><span class="split-mius">#</span><span :style="t()">{{index + 1}}</span></span><br>
          <span class="line nick" :title="'nikename'"><span class="split-mius l"></span>{{person.nickname}}<span class="split-mius r"></span></span><br>
          <span class="line"><span class="split-mius l"></span>solved<span class="split-mius r">{{person.allac}} / {{o.problems.length}}</span></span><br>
          <span class="line"><span class="split-mius l"></span>fraction<span class="split-mius r">{{person.alltime}}</span></span>
          </div>
        </div>
        <div class="pro-table  media-body container">
          <div v-for="(item, index) in o.problems" :key="index" class="pro-item" :class="{'ac': person.one.has(item['problem_id']), 'secret': person.secret.has(item['problem_id'])}"
          :title="item.title + ': ' + 
          '[penalty: ' + (person.add.has(item['problem_id']) ? (~~(person.add.get(item['problem_id']) / 1000 / 60 /20) + ' * 20m') : 'No penalty') + '], ' +
          '[ac: ' + (person.one.has(item['problem_id']) ? (~~(person.one.get(item['problem_id']) / 1000 / 60) +  'm | ' + hms(person.one.get(item['problem_id']))) : person.secret.has(item['problem_id']) ? 'secret' : 'Not yet') + ']'">
            {{item['title'][0]}}
          </div>
        </div>
        <div class="clearfix"></div>
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
import {rankList} from './virtualApi.js'
import vueLoading from 'vue-loading-template'
export default {
  name: 'acmrank',
  props: ['limit'],
  components: {
    vueLoading
  },
  data: function () {
    return {
      persons: [
      ],
      p: [],
      howmany: 10,
      userData: undefined,
      preUrl: noPointHost
    }
  },
  methods: {
    hms: function (t) {
      t = ~~(t / 1000)
      return ~~(t / 60 / 60) + ' h ' + ~~((t % 3600) / 60) + ' m ' + t % 60 + 's'
    },
    t: function () {
      let b = {
        'color':'#'+(~~(Math.random()*16777215)).toString(16),
        'fontSize': '1.41em'
      }
      return b
    },
    toMyRank: function() {
    }
  },
  mounted: async function () {
    /* this api seems do not work
    this.$nextTick(function () {
      this.$http.get(`${noPointHost}/api/contest/${this.$route.params.contestid}/user`)
        .then(function (res) {
          res = res.body.data
          this.persons = res
          console.log('rank', res)
        })
    })
    */
    let tar = await rankList(this.$http, this.$route.params.contestid)
    this.persons = tar[0]
    this.o = tar[1]
  }
}
</script>
<style scoped>
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
}

.person-rank-container img.per-img {
  float: left;
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
}

.pro-item.ac {
  background: #70c1b3;
  color: #fff;
}

.pro-item.secret {
  background: rgb(235, 235, 116);
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
