<template>
  <div class="question-filter-base container-fluid">
    <ul class="search-bar-control nav nav-pills">
      <li role="presentation" class="col-sm-6">
        <input @keyup.enter="setFilter('Keywords',keywords)" v-model="keywords" type="text" class="form-control"
               placeholder="IDs, titles and then hit enter | 输入题目id, 标题, 然后按下回车">
      </li>
      <li role="presentation" class="dropdown navbar-right" v-for="(item, index) in initData.item" :key="index">
        <a class="dropdown-toggle aitem" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          {{ item.name }}
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li v-for="(li, lindex) in item.props" :key="lindex"><a @click="setFilter(item.name,li)" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="$store.state.problemFilter[item.name]===li"></span>
            {{ li }}
          </a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{$store.state.problemFilter[item.name]}}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'questionFilter',
  data: function () {
    return {
      keywords: '',
      initData: {
        item: [
          {
            name: 'Difficulty',
            props: ['NULL']
          },
          {
            name: 'Status',
            props: ['NULL']
          },
          {
            name: 'Tags',
            props: ['NULL']
          }
        ]
      }
    }
  },
  methods: {
    setFilter: function (key, value) {
      this.$store.commit({
        type: 'setProblemFilter',
        key: key,
        value: value
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';

.question-filter-base {
  display: flex;
  align-items: center;
  height: @filterheight;
  z-index: 1;
  .aitem {
    color: #233;
    background: none;
    border: 1px solid rgba(255,255,255,0);
    &:hover, &:active, &:focus {
      background: none;
      border: 1px solid #6cf;
      border-radius: 4px;
    }
  }
}

.search-bar-control {
  width: 100%;
}

.search-bar-control input.form-control {
  border: none;
  box-shadow: none;
  border-radius: 0;
  transition: all 1s;
  background: none;
}

.search-bar-control input.form-control:focus,
.search-bar-control input.form-control:active {
}
</style>
