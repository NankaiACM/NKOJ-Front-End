<template>
  <div id="editor">
    <form class="blg" enctype="multipart/form-data">
      <div class="section">
        <span class="l">比赛标题</span>
        <div class="r"><input placeholder="title" type="text" name="title" value=""></div>
      </div>
      <div class="section">
        <span class="l">神秘数字</span>
        <div class="r"><input placeholder="perm" type="text" name="perm" value="(1,0,0,0,0)"></div>
      </div>
      <div class="section">
        <span class="l">开始时间</span>
        <div class="r"><input placeholder="start" type="datetime-local" name="start"></div>
      </div>
      <div class="section">
        <span class="l">结束时间</span>
        <div class="r"><input placeholder="end" type="datetime-local" name="end"></div>
      </div>
      <div class="section">
        <span class="l">权限设置</span>
        <div class="r"><input placeholder="private" type="checkbox" name="private" value="false"></div>
      </div>
      <div class="section">
        <span class="l">上传markdown文件</span>
        <div class="r">
          <label for="upfile" class="upf">{{filename}}</label>
          <input id="upfile" @change="handFile" placeholder="markdown文件" name="file" type="file">
        </div>
      </div>
      <div class="section">
        <span class="l">比赛描述</span>
        <div class="r"><textarea placeholder="description" type="text" name="description" value=""></textarea></div>
      </div>
    </form>
    <notify :title="notify.title" :message="notify.message" :count="notify.count"></notify>
  </div>
</template>

<script>
export default {
  name: 'editor',
  data: function () {
    return {
      filename: '点击选择markdown文件',
      notify: {
        title: 'new contest status',
        message: '',
        count: 0
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import './blg.less';
#editor {
  input {
    outline: none;
  }
  input[type="text"] {
    border-bottom: 1px solid #ccc;
    transition: all .41s;
  &:focus, &:hover {
    border-bottom: 1px solid #2cbfec;
    }
  }
  input[type="file"] {
    position: fixed;
    visibility: hidden;
  }
  input[type="datetime-local"] {
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  textarea {
    min-width: 35em;
    min-height: 10em;
    padding: .4em 1em;
    margin: .5em 0;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:hover, &:focus {
      border-color: #2cbfec;
    }
  }
  .upf {
    width: auto;
    height: 100%;
    padding: .4em 1em;
    cursor: pointer;
    background: #f1f1f1;
    border-radius: 4px;
    &:hover {
      background: #e2e2e2;
    }
  }
}
</style>
