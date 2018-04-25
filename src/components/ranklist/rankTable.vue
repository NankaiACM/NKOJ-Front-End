<template>
  <div id="list-box" class="media-list col-md-10 col-md-offset-1">
  <div class="user-cell media bar-cell">
    <div class="media-left media-middle">
      <div class="bar-img-place" @click="css.tablesort = 'myrank'">
      </div>
    </div>
    <div class="media-body media-middle bar-right">
      <div v-for="(item, index) in tableHead" :key="index"
      :class="[item.cclass, css.tablesort === item.text ? 'rainbow' : '']"
      :title="item.text"
      @click="sortCommit(item.key, item.text)"
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
  data: function() {
    return {
      tableHead: [
        { cclass: 'item no', text: '#', key: 'null' },
        { cclass: 'item nickname', text: 'nickname', key: 'null' },
        { cclass: 'item solved', text: 'solved', key: 'solved' },
        { cclass: 'item submit', text: 'submit', key: 'submit' },
        { cclass: 'item ratio', text: 'ratio', key: 'ratio' }
      ],
      css: {tablesort:'solved'}
    }
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    getItemHtml: function (str) {
      var ret=str.split('').join('</span><span>');
      return '<span>'+ret+'</span>'
    },
    sortCommit: function (val, text) {
      if (val === 'null') return
      this.css.tablesort = text
      console.log(text)
      this.$store.commit({
        type: 'setRFilter',
        key: 'sortBy',
        value: val
      })
    }
  }
}
</script>
<style lang="less" scoped>
.bar-img-place {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.bar-right {
  margin: 10px;
}

.bar-right .item {
  font-weight: 800;
  font-size: 1;
  font-family: '微软雅黑';
  height: 25px !important;
  line-height: 25px !important;
  cursor: pointer;
}
.bar-right .item.rainbow > span:nth-of-type(odd) {
  color: #ec8e8e;
}
.bar-right .item.rainbow > span:nth-of-type(even) {
  color: #a8a8a8;
}
#list-box {
  margin-top: 5em;
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
  height: 100%;
  line-height: 100%;
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


