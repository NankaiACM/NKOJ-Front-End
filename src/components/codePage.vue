<template>
  <div id="code-page" class="container-fluid">
    <div class="editor-container col-md-12 animated zoomIn">
      <editor v-model="code" @init="editorInit" :lang="lang" theme="terminal" width="100%" height="100%"></editor>
    </div>
  </div>
</template>
<script>
import editor from 'vue2-ace-editor'
export default {
  name: 'codePage',
  data: function () {
    return {
      code: '',
      lang: 'c_cpp',
      lang_map:{//mode select in https://github.com/ajaxorg/ace/tree/master/lib/ace/mode
        "1":"c_cpp",
        "2":"c_cpp",
        "3":"pascal",
        "4":"java",
        "5":"c_cpp",
        "6":"javascript"
      }
    }
  },
  methods: {
    editorInit: function () {
      for(var item in this.lang_map){
        require(`brace/mode/${this.lang_map[item]}`)
        console.log(this.lang_map[item])
      }
      require('brace/theme/terminal')
    },
    initView: function () {
      var code_id=this.$route.params.id
      if(!code_id)
        return console.erro(this.$route.params)
      this.$http.get('/static/code.json',{
        id: code_id
      }).then((res)=>{
          console.log(res.body.data)
          res=res.body.data
          this.lang=this.lang_map[res.lang]
          this.code=res.code
        },(error)=>{
          console.error('un catch')
          console.info(error)
      })
    }
  },
  components: {
    editor
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initView()
    })
  }
}
</script>
<style>
#code-page {
  padding: 0;
  margin: 0;
  background: #333;
}

.editor-container {
  width: 100%;
  height: 100%;
  padding: 3em 4em;
  margin: 0;
}

#code-page .ace_editor {
  margin: 0;
  border-top: 2em solid #000;
  border-right: 2em solid #000;
  border-bottom: 2em solid #000;
  box-shadow: 0 0 30em 0em #000;
}
</style>
