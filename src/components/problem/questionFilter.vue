<template>
  <div class="question-filter-base container-fluid">
    <ul class="search-bar-control nav nav-pills">
      <li role="presentation" class="col-sm-6">
        <input @keyup.enter="setFilter('Keywords',keywords)" v-model="keywords" type="text" class="form-control" placeholder="IDs,titles,or description">
      </li>
      <li role="presentation" class="dropdown navbar-right" v-for="(item, index) in initData.item" :key="index">
        <a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          {{ item.name }}
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li v-for="(li, lindex) in item.props" :key="lindex"><a @click="setFilter(item.name,li)" href="#">
            <span class="glyphicon glyphicon-ok" aria-hidden="true" v-if="$store.state.filter[item.name]===li"></span>
            {{ li }}
          </a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{$store.state[item.name]}}</a></li>
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
            props: ['弱虫', '大角虫', '王虫']
          },{
            name: 'Status',
            props: ['TODO', 'Solved']
          },{
            name: 'Tags',
            props: ['TODO']
          }
        ]
      }
    }
  },
  methods: {
    setFilter: function (key, value) {
      this.$store.commit({
        type: 'setXFilter',
        key: key,
        value: value
      })
    },
  },
  mouted: function () {
    this.$nextTick(()=>{
    })
  }
}
</script>
<style lang="less">
@import '../../less/global.less';

.question-filter-base {
  display: flex;
  align-items: center;
  height: @filterheight;
  z-index: 1;
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
