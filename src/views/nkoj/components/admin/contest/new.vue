<template>
<div id="new">
  <h3>添加新竞赛 <span class="up" @click="submit">上传</span></h3>
  <editor url="new" ref="editor"></editor>
</div>
</template>

<script>
import editor from './editor'
export default {
  name: 'new',
  data: function () {
    return {
    }
  },
  methods: {
    submit: function () {
      this.$refs.editor.submit()
    }
  },
  components: { editor }
}
</script>
<style lang="less" scoped>
#new {
  @import './btn';
}
</style>
