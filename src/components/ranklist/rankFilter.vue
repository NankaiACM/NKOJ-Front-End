<template>
  <div id="rank-filter-base" class="container-fluid">
    <ul class="nav nav-pills" id="rank-bar-control">
      <li class="navbar-right" @click="filterCommit('viewBy','me')"><a>my rank</a></li>
      <li  v-for="(item, index) in menu" :key="index" class="navbar-right"><a class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{item.text}}<span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li v-for="(ii, kk) in item.option" :key="kk" @click="filterCommit(item.key,ii.key)"><a>
            {{ii.text}}
          </a></li>
          <li role="separator" class="divider"></li>
          <li><a><span class="glyphicon glyphicon-search" aria-hidden="true"></span> {{key2text(item.key, $store.state.rankFilter[item.key])}}</a></li>
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
        time: {
          text: 'Time Filter',
          key: 'timeBy',//sortby
          option: []
        },
        view: {
          text: 'View By',
          key: 'viewBy',
          option: [
            {text: 'table', key: 'table'},
            {text: 'bar3D', key: 'bar3d'}
          ]
        }
      }
    }
  },
  methods: {
    filterCommit: function (key, value) {
      this.$store.commit({
        type: 'setRFilter',
        key: key,
        value: value
      })
    },
    key2text: function (keyBy, keyOp) {
      var menu = this.menu
      for (var i in menu) {
        if (menu[i].key !== keyBy) continue
        var Ops = menu[i].option
        for (var j in Ops) {
          if (Ops[j].key !== keyOp) continue
          return Ops[j].text
        }
      }
      var UILS = ['NULL', 'null', 'undefined']
      var rndIndx = Math.floor(Math.random() * UILS.length + 1) - 1
      return UILS[rndIndx]
    }
  },
  computed: {
    TFOps: function () {
      return this.$store.getters.rankFTOpsGet
    }
  },
  watch: {
    TFOps: function (n, o) {
      this.menu.time.option = n
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
    a {
      color: #777;
      cursor: pointer;
    }
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


