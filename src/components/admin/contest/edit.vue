<template>
<div id="edit">
  <h3>修改比赛信息<span class="up" @click="save">保存</span></h3>
  <editor :url="$route.params.id" ref="editor"></editor>
</div>
</template>
<script>
import editor from './editor'
export default {
  name: 'edit',
  components: {editor},
  methods: {
    save: function () {
      this.$refs.editor.submit()
    }
  }
}
</script>
<style lang="less" scoped>
#edit {
  @import './btn';
}
</style>
