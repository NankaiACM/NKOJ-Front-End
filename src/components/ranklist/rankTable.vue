<template>
  <div id="list-box" class="media-list">
  <div class="user-cell media bar-cell thread-height">
    <div class="media-left media-middle">
      <div class="bar-img-place" @click="css.tablesort = 'myrank'">
      </div>
    </div>
    <div class="media-body media-bottom bar-right">
      <div class="media-bottom"
      v-for="(item, index) in tableHead" :key="index"
      :class="[item.cclass, css.tablesort === item.text ? 'rainbow' : '']"
      :title="item.text"
      v-html="getItemHtml(item.text)">
      </div>
    </div>
  </div>
  <div class="user-cell media" v-for="(cell, index) in rankdata" :key="index">
    <div class="media-left media-middle">
      <div class="user-img">
      </div>
    </div>
    <div class="media-body media-middle">
      <div class="item no">
        {{index + 1}}
      </div>
      <div class="item nickname" title="nickname">
        {{cell.nickname}}
      </div>
      <div class="item solved">
        {{cell.solved}}
      </div>
      <div class="item solved">
        {{cell.submit}}
      </div>
      <div class="item ratio">
        {{parseInt(cell.solved/cell.submit*10000)/100}} %
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'rankTable',
  props: ['rankdata'],
  data: function () {
    return {
      tableHead: [
        { cclass: 'item no', text: '#', key: 'null' },
        { cclass: 'item nickname', text: 'nickname', key: 'null' },
        { cclass: 'item solved', text: 'solved', key: 'solved' },
        { cclass: 'item submit', text: 'submit', key: 'submit' },
        { cclass: 'item ratio', text: 'ratio', key: 'ratio' }
      ],
      css: {tablesort: 'solved'}
    }
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    getItemHtml: function (str) {
      var ret = str.split('').join('</span><span>')
      return '<span>' + ret + '</span>'
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../less/global.less';

.bar-img-place {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.bar-right {
  margin: 10px;
}

.bar-right .item.rainbow > span:nth-of-type(odd) {
  color: #ec8e8e;
}

.bar-right .item.rainbow > span:nth-of-type(even) {
  color: #a8a8a8;
}

#list-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(https://sfault-avatar.b0.upaiyun.com/463/156/46315654-5a6edd4a8f67e) no-repeat center;
  background-size: auto;
}

.user-cell {
  width: auto;
  display: table;
  margin-bottom: 1em;
}

.user-cell .item {
  display: block;
  float: left;
  margin-right: 3em;
}

.user-cell .no {
  width: 4em;
}

.user-cell .submit,
.user-cell .solved,
.user-cell .ratio {
  width: 6em;
}

.user-cell .nickname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 10em;
}

.user-cell .media-body {
  min-height: 100%;
  width: auto;
}
</style>


