<template>
<div id="rankPage" class="container-fulid row">
  <div id="list-box" class="media-list col-md-10 col-md-offset-1">
  <div class="user-cell media bar-cell">
    <div class="media-left media-middle">
      <div class="bar-img-place">
      </div>
    </div>
    <div class="media-body media-middle bar-right">
      <div v-for="(item, index) in tableHead" :key="index" :class="item.class" :title="item.text" v-html="getItemHtml(item.text)">
      </div> 
    </div>
  </div>
  <div class="user-cell media" v-for="(cell, index) in ranklist" :key="index">
    <div class="media-left media-middle">
      <div class="user-img">
      </div>
    </div>
    <div class="media-body media-middle">
      <div class="item no">
        #
      </div>
      <div class="item nickname" title="nickname">
        nicknamecvjklxcjvkljzcxvjklzjclkjvlzkjxcvlkjzlxckjvlkzjlxckvjzlcxjvl
      </div>
      <div class="item solved">
        solved
      </div>
      <div class="item solved">
        submit
      </div>
      <div class="item ratio">
        Ratio
      </div>
    </div>
  </div>
  </div>
</div>
</template>
<style lang="less">
.bar-img-place {
  width: 50px;
  height: 50px;
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
  border-left: 1px solid rgba(33, 150, 243, 0.6);
  border-right: 1px solid rgba(244, 67, 54, 0.6);
}
.bar-right .item > span:nth-of-type(odd) {
  color: #ec8e8e;
}
.bar-right .item > span:nth-of-type(even) {
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
  background: url(https://pic4.zhimg.com/da8e974dc_xl.jpg) no-repeat center;
  background-size: contain;
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
  width: 20em;
}
.user-cell .media-body {
  min-height: 100%;
  width: auto;
}
</style>
<script>
export default {
  name: "rankPage",
  data: function() {
    return {
      tableHead: [
        { class: 'item no', text: '#' },
        { class: 'item nickname', text: 'nickname' },
        { class: 'item solved', text: 'solved' },
        { class: 'item submit', text: 'submit' },
        { class: 'item ratio', text: 'ratio' }
      ],
      ranklist: [
        {
          nickname: "hhh"
        },
        {
          nickname: "hhh"
        },
        {
          nickname: "hhh"
        },
        {
          nickname: "hhh"
        }
      ]
    }
  },
  methods: {
    getItemHtml: function (str) {
      var ret=str.split('').join('</span><span>');
      return '<span>'+ret+'</span>'
    }
  }
}
</script>