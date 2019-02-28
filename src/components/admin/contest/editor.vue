<template>
  <div id="editor">
    <form class="blg" enctype="multipart/form-data" id="pcform">
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
        <span class="l">编辑题目</span>
        <div class="r">
          <router-link tag="a" :to="'/admin/editque/' + id" class="upf" target="_blank">点击前往</router-link>
        </div>
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
  props: ['url'],
  data: function () {
    return {
      filename: '点击选择markdown文件',
      notify: {
        title: 'new contest status',
        message: '',
        count: 0
      },
      id: ''
    }
  },
  methods: {
    handFile: function (e) {
      const file = e.target.files[0] || e.dataTransfer.files[0]
      this.filename = file.name
    },
    submit: function () {
      const form = document.querySelector('#pcform')
      const formData = new FormData(form)
      formData.set('private', document.querySelector('input[name=private]').checked)
      this.$http.post(window.noPointHost + '/api/admin/contest/' + this.id, formData)
        .then(function (r) {
          console.log(JSON.stringify(r))
          this.notify.title = 'save status:'
          this.notify.message = JSON.stringify(r.body)
          this.notify.count++
        }, function (e) {
          console.log(JSON.stringify(e))
          this.notify.title = 'save status:[erro]'
          this.notify.message = JSON.stringify(e.body)
          this.notify.count++
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.url === 'new') return 0
      this.id = this.url
      this.$http.get(window.noPointHost + '/api/admin/contest/' + this.url)
        .then(function (r) {
          console.log(r)
          r = r.body.data
          document.querySelector('input[name=title]').value = r.title
          document.querySelector('textarea[name=description]').value = r.description
          document.querySelector('input[name=perm]').value = r.perm
          document.querySelector('input[name=private]').checked = r.private
          var s = JSON.stringify(r.during.toString())
          s = s.replace(/\"/g, '')
          s = s.replace(/\\/g, '')
          s = s.replace('[', '')
          s = s.replace(']', '')
          s = s.replace('(', '')
          s = s.replace(')', '')
          if (s.indexOf(',') !== -1) {
            s = s.split(',')
            console.log(s)
            if (s[0].length !== 0) {
              document.querySelector('input[name=start]').value = this.$dayjs(s[0]).toISOString().substr(0, 23)
            }
            if (s[1].length !== 0) {
              document.querySelector('input[name=end]').value = this.$dayjs(s[1]).toISOString().substr(0, 23)
            }
          }
          this.notify.title = 'fetch contest state:'
          this.notify.message = JSON.stringify(r)
          this.notify.count++
        }, function (e) {
          this.notify.title = 'fetch contest state:[erro]'
          this.notify.message = JSON.stringify(e)
          this.notify.count++
        })
    })
  }
}
</script>
<style lang="less" scoped>
@import './blg';
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
    color: #333;
    text-decoration: none;
    &:hover {
      background: #e2e2e2;
    }
  }
}
</style>
