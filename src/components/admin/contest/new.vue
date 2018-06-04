<template>
<div id="new">
  <h3>添加新竞赛 <span class="up" @click="submit">上传</span></h3>
  <form id="newpc" enctype="multipart/form-data">
    <span>比赛标题</span><input placeholder="title" type="text" name="title" value="">
    <span>神秘数字</span><input placeholder="perm" type="text" name="perm" value="(1,0,0,0,0)">
    <span>开始时间</span><input placeholder="start" type="datetime-local" name="start">
    <span>结束时间</span><input placeholder="end" type="datetime-local" name="end">
    <span>权限设置</span><input placeholder="private" type="checkbox" name="private" value="false">
    <span>上传markdown文件</span>
    <div>
      <label for="upfile" class="upf">{{filename}}</label>
      <input id="upfile" @change="handFile" placeholder="markdown文件" name="file" type="file">
    </div>
    <span>比赛描述</span><textarea placeholder="description" type="text" name="description" value=""></textarea>
  </form>
</div>
</template>

<script>
export default {
  name: 'new',
  data: function () {
    return {
      filename: '点击选择markdown文件'
    }
  },
  methods: {
    submit: function () {
      const form = document.querySelector('#newpc')
      const fromData = new FormData(form)
      this.$http.post(window.noPointHost + '/api/admin/contest/', fromData)
        .then(function (r) {
          console.log(JSON.stringify(r))
        }, function (e) {
          console.log(JSON.stringify(e))
        })
    },
    handFile: function (e) {
      const file = e.target.files[0] || e.dataTransfer.files[0]
      this.filename = file.name
    }
  }
}
</script>
<style lang="less" scoped>
#new {
  * {
    transition: all .41s;
  }
  .up {
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: .4em 1em;
    float: right;
    cursor: pointer;
    &:hover {
      border-color: #2cbfec;
      color: #2cbfec;
    }
  }
}
#newpc {
  margin-top: 3em;
  display: grid;
  grid-template-columns: 15em auto;
  grid-template-rows: repeat(6,5em) auto;
  justify-content: center;
  align-items: center;
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
