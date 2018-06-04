<template>
<div id="edituser">
  <h3>添加/删除竞赛的用户</h3>
  <div class="b">
    <div class="c">
      <span>竞赛ID</span><input class="r" placeholder="竞赛 ID" value="1007" id="info2">
      <span>用户ID</span><input class="r" placeholder="用户 ID" value="1" id="info3">
      <div class="a" @click="add">添加</div><div class="d" @click="rm">删除</div>
    </div>
  </div>
  <notify :title="notify.title" :message="notify.message" :count="notify.count"></notify>
</div>
</template>
<script>
export default {
  name: 'edituser',
  data: function () {
    return {
      notify: {
        title: '',
        message: '',
        count: ''
      }
    }
  },
  methods: {
    add: function () {
    },
    rm: function () {
    }
  }
}
</script>
<style lang="less" scoped>
#edituser {
  position: relative;
  min-height: 100%;
  .b {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    flex-direction: column;
    input {
      outline: none;
    }
    .c {
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      padding: 3em 1em;
      display: grid;
      grid-template-columns: 200px 200px;
      grid-template-rows: auto;
      align-items: center;
      justify-items: center;
      grid-row-gap: 2em;
      grid-column-gap: 2em;
      .r {
        border-bottom: 1px solid #e5e5e5;
        position: relative;
      }
      .a, .d {
        border: 1px solid #e5e5e5;
        padding: .4em 1em;
        border-radius: 4px;
        cursor: pointer;
      }
      .a {
        justify-self: end;

        &:hover {
          color: #2cbfec;
          border-color: #2cbfec;
        }
      }
      .d {
        justify-self: start;
        &:hover {
          color: #c24f4a;
          border-color: #c24f4a;
        }
      }
    }
  }
}
</style>
