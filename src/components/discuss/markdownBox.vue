<template>
  <div class="markdown-box" v-html="markdownHTML">
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'markdown-box',
  props: ['mdstr'],
  computed: {
    markdownHTML: function () {
      return marked(this.mdstr)
    }
  }
}
</script>
