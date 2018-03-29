<template>
<div class="pagination-container">
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li v-if="num.viewing !== 1">
        <a aria-label="Previous" @click="previous()">
            上一页
        </a>
      </li>
      <li id="first-page-num" v-if="num.viewing > 5" :class="{'active': num.viewing === 1}" @click="jump(1)">
        <a>
          1
        </a>
      </li>
      <li id="left-dot" v-if="num.viewing > 5">
        <a>
            ...
        </a>
      </li>
      <li v-for="(item, index) in num_list" :key="index" :class="{'active':num.viewing === item}"  @click="jump(item)">
        <a>
          {{item}}
        </a>
      </li>
      <li id="right-dot" v-if="num.viewing < num.all_pages -5">
        <a>
            ...
        </a>
      </li>
      <li id="last-page-num" v-if="num.viewing < num.all_pages -5" :class="{'active':num.viewing === num.all_pages}" @click="jump(num.all_pages)">
        <a>
          {{num.all_pages}}
        </a>
      </li>
      <li v-if="num.viewing !== num.all_pages" >
        <a aria-label="Next" @click="next()">
            下一页
        </a>
      </li>
    </ul>
    <div class="jump-pager pagination navbar-right">
      共{{num.all_pages}}页/{{num.last}}个，跳至
      <input type="text" class="jump-input" :placeholder="num.jump_input" v-model="num.jump_input" @keyup.enter="jump(num.jump_input)">
      页
    </div>
  </nav>
</div>
</template>
<script>
export default {
  name: 'problems-pagination',
  data: function() {
    return {
      num: {
        viewing: 1,
        jump_input: ~~(114514/20),
        last: 114514,
        all_pages: ~~(114514/20)
      }
    }
  },
  methods: {
    rang: function (zjcs) {
      return [zjcs-2,zjcs-1,zjcs,zjcs+1,zjcs+2]
    },
    previous: function () {
      if(this.num.viewing > 1){
        this.num.viewing--
      }
    },
    next: function () {
      if(this.num.viewing < this.num.all_pages){
        this.num.viewing++
      }
    },
    getPage: function () {
    },
    jump: function (v) {
      if(v>=1 && v<=this.num.all_pages){
        this.num.viewing = v
      }
    }
  },
  computed: {
    num_list: function () {
      console.log(this.num.viewing)
      if(this.num.viewing <= 5){
        return [1,2,3,4,5]
      }
      if(this.num.viewing > this.num.all_pages-5){
        return this.rang(this.num.all_pages-2)
      }
      console.log('大坟墓守护者')
      return this.rang(this.num.viewing)
    }
  },
  watch: {
    'num.viewing': function (newv,oldv) {
      this.$emit('viewingleap',{viewing: newv})
    }
  }
}
</script>
<style>
.pagination-container {
  line-height: 40px;
  padding: 0 2em;
  min-width: 400px;
  width: 100%;
}

.pagination {
  display: inline-block;
}

.jump-pager {
  float: right;
  font-size: 12px;
  line-height: 40px;
  color: #99a2aa;
  float: right;
}

.jump-input {
  border: 1px solid #ccd0d7;
  text-align: center;
  border-radius: 4px;
  width: 60px;
  height: 30px;
  margin: 0 5px;
  padding: 0 10px;
}

.pagination-container a {
  cursor: pointer;
}
</style>
