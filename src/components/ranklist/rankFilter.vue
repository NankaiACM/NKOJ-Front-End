<template>
  <div id="rank-filter-base" class="container-fluid">
    <ul class="nav nav-pills" id="rank-bar-control">
      <li  v-for="(item, index) in menu" :key="index" class="navbar-right"><a class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{item.text}}<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li v-for="(ii, kk) in item.option" :key="kk"><a>
            {{ii.text}}
          </a></li>
          <li role="separator" class="divider"></li>
          <li><a><span class="glyphicon glyphicon-search" aria-hidden="true"></span> {{item.selected}}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'rankFilter',
  data: function () {
    return {
      menu: {
        sort: {
          text: 'Sort By',
          option: [
            {text: 'amount of submission', key: 'submit'}
          ],
          selected: 'submit'
        },
        view: {
          text: 'View By',
          option: [
            {text: 'table', key: 'table'}
          ],
          selected: 'table'
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';

#rank-filter-base {
  display: flex;
  align-items: center;
  height: @filterheight;
  z-index: 1;
  background: #fff;
  #rank-bar-control {
    width: 100%;
    .dropdown-toggle {
      cursor: pointer;
      color: #777;
    }
    .dropdown-menu {
      a {
        cursor: pointer;
      }
    }
  }
}
</style>


