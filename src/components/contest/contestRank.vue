<template>
  <div id="contest-rank-container-out" class="container-fluid">
    <div id="contest-rank-container-in" class="container-fluid">
      <div v-for="(person, index) in persons" :key="index" class="person-rank-container">
        <img class="per-img" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3374441262,1576405698&fm=27&gp=0.jpg"/>
        <div class="per-cnt-ctn media-body container">
          <div class="luck">
          <span class="line"><span class="split-mius">#</span><span :style="t()">{{index + 1}}</span></span><br>
          <span class="line nick" :title="'nikename'"><span class="split-mius l"></span>nick name dfadsfasdfasdfdfdfadsfasdfsdf<span class="split-mius r"></span></span><br>
          <span class="line"><span class="split-mius l"></span>solved<span class="split-mius r"></span></span><br>
          <span class="line"><span class="split-mius l"></span>fraction<span class="split-mius r"></span></span>
          </div>
        </div>
        <div class="pro-table  media-body container">
          <div v-for="(item, index) in person.list" :key="index" class="pro-item" :class="{'ac':person.ac.indexOf(item)!=-1}">
            {{String.fromCharCode('A'.charCodeAt()+index)}}
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
      <problems-pagination @viewingleap="handleViewing"></problems-pagination>
    </div>
    <div id="draw-container" @click="toMyRank" v-if="userData">
      <div class="plate">
        我的排名
      </div>
    </div>
  </div>
</template>
<script>
import ProblemsPagination from '../problem/pagination'
export default {
  name: 'contestRank',
  props: ['userData'],
  data: function () {
    return {
      persons: [
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,2,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,3,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,4,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]},
        {list:[0,1,2,3,4,5,6,7,8,9],ac:[0,1,2,3,4,9]}
      ],
      viewing: 1,
      queryleft: 1,
      queryright: 20,
      pageSize: 20
    }
  },
  methods: {
    t: function () {
      let b = {
        'color':'#'+(~~(Math.random()*16777215)).toString(16),
        'fontSize': '1.41em'
      }
      return b
    },
    handleViewing: function (newv) {
      this.viewing = newv.viewing
      this.queryleft = (newv.viewing - 1) * this.pageSize + 1 +1000
      this.queryright = this.queryleft + this.pageSize - 1
    },
    toMyRank: function() {
      console.log(this.userData)
    }
  },
  components: {
    ProblemsPagination
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
  content: '/';
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
.luck .line:hover .split-mius.l::after {
  content: '/';
}

.luck .line:hover .split-mius.r::after {
  content: '<';
  animation: luckright .72s ease-out 0s 1;
  color: greenyellow;
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
