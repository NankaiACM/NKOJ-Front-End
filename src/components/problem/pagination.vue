<template>
  <div class="pagination-container">
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li v-if="viewing !== 1">
          <a aria-label="Previous" @click="previous()">
            上一页
          </a>
        </li>
        <li id="first-page-num" v-if="viewing > 5" :class="{'active': viewing === 1}" @click="jump(1)">
          <a>
            1
          </a>
        </li>
        <li id="left-dot" v-if="viewing > 5">
          <a>
            ...
          </a>
        </li>
        <li v-for="(item, index) in num_list" :key="index" :class="{'active':viewing === item}" @click="jump(item)">
          <a>
            {{item}}
          </a>
        </li>
        <li id="right-dot" v-if="viewing < all_pages -5">
          <a>
            ...
          </a>
        </li>
        <li id="last-page-num" v-if="viewing < all_pages -5" :class="{'active':viewing === all_pages}"
            @click="jump(all_pages)">
          <a>
            {{all_pages}}
          </a>
        </li>
        <li v-if="viewing !== all_pages">
          <a aria-label="Next" @click="next()">
            下一页
          </a>
        </li>
      </ul>
      <div class="jump-pager pagination navbar-right">
        共{{all_pages}}页/{{last}}个，跳至
        <input type="text" class="jump-input" :placeholder="jump_input" v-model="jump_input"
               @keyup.enter="jump(jump_input)">
        页
      </div>
    </nav>
  </div>
</template>
<script>
  export default {
    name: 'problems-pagination',
    props: ['pagesize', 'last'],
    data: function () {
      return {
        viewing: 1
      }
    },
    methods: {
      rang: function (zjcs) {
        return [zjcs - 2, zjcs - 1, zjcs, zjcs + 1, zjcs + 2]
      },
      previous: function () {
        if (this.viewing > 1) {
          this.viewing--
        }
      },
      next: function () {
        if (this.viewing < this.all_pages) {
          this.viewing++
        }
      },
      getPage: function () {
      },
      jump: function (v) {
        console.log(this.all_pages)
        if (v >= 1 && v <= this.all_pages) {
          this.viewing = v
        }
      }
    },
    computed: {
      jump_input: function () {
        return ~~(this.last / this.pagesize)
      },
      all_pages: function () {
        console.log(this.last, this.pagesize, 'all pages')
        return 100
      },
      num_list: function () {
        console.log(this.viewing)
        if (this.viewing <= 5) {
          return [1, 2, 3, 4, 5]
        }
        if (this.viewing > this.all_pages - 5) {
          return this.rang(this.all_pages - 2)
        }
        console.log('大坟墓守护者')
        return this.rang(this.viewing)
      }
    },
    watch: {
      'viewing': function (newv, oldv) {
        this.$emit('viewingleap', {viewing: newv})
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
