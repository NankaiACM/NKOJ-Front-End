<template>
<div id="discuss-page" class="container-fluid row">
  <div id="discuss-list" class="col-md-5 col-lg-5 col-md-offset-1 col-lg-offset-2">
    <discuss-cell  v-for="(item, index) in list" :key="index" :item="item">
      <div slot="more-art" class="more-art">更多</div>
      <div slot="more-rep" class="more-rep">更多</div>
    </discuss-cell>
    <pagination id="discuss-nav"></pagination>
  </div>
  <div id="sider-list" class="col-md-5 col-lg-3">
    <new-post></new-post>
  </div>
</div>
</template>
<script>
import discussCell from './discuss/discussCell.vue'
import pagination from './problemslistpage/pagination.vue'
import newPost from './discuss/newPost.vue'
export default {
  name: 'discussPage',
  data: function() {
    return {
      list: [{
        id: '123',//讨论的id
        title: '这是标题',
        article: 'no words<br>w<br>w<br>w<br>w',
        nodes: ['a','b'],
        sponsor: 'cc',//发起
        terminator: 'dd',//最后回复,
        s_ttamp: '1523177873441',//发起时间戳
        t_ttamp: '1523177873441',//最后回复时间戳
        v_c: '100',//查看量
        r_c: '100',//回复量
      },{
        id: '123',//讨论的id
        title: '这是标题',
        article: 'no words<br>w<br>w<br>w<br>w',
        nodes: ['a','b'],
        sponsor: 'cc',//发起
        terminator: 'dd',//最后回复,
        s_ttamp: '1523177873441',//发起时间戳
        t_ttamp: '1523177873441',//最后回复时间戳
        v_c: '100',//查看量
        r_c: '100',//回复量
      },{
        id: '123',//讨论的id
        title: '这是标题',
        article: 'no words<br>w<br>w<br>w<br>w',
        nodes: ['a','b'],
        sponsor: 'cc',//发起
        terminator: 'dd',//最后回复,
        s_ttamp: '1523177873441',//发起时间戳
        t_ttamp: '1523177873441',//最后回复时间戳
        v_c: '100',//查看量
        r_c: '100',//回复量
      }]
    }
  },
  methods: {},
  components: {
    discussCell,
    pagination,
    newPost
  }
}
</script>
<style lang="less">
#discuss-page {
  background: #fdfdfd;
}

#discuss-list {
  padding-top: 60px;
  .onepiece {
    .main-article {
      position: relative;
      .markdown-box {
        width: 100%;
        height: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .more-art {
        position: absolute;
        right: 0;
        bottom: .5em;
        font-size: .9em;
        color: #999;
        cursor: pointer;
        transition: all .41s;
      }
      .more-art:hover {
        color: #666;
      }
    }
    .rep-line {
      height: 2.5em;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rep-line:active {
      height: auto;
    }
    .more-rep {
      padding: .5em 0;
      margin: 0 2em;
      font-size: .8em;
      color: #999;
      cursor: pointer;
      transition: all .41s;
    }
    .more-rep:hover {
      color: #666;
    }
  }
  #discuss-nav {
    margin-bottom: 60px;
    li.active {
      a {
        background: #515151;
        color: #fff;
        border: 1px solid #747474;
      }
    }
    li {
      a {
        color: #233;
      }
    }
  }
}

#sider-list {
  padding-top: 60px;
}
</style>
