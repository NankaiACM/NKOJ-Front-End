<script>
export default {
  name: 'message-block',
  data () {
    return {}
  },
  props: ['id', 'title', 'content', 'type'],
  mounted () {
    setTimeout(this.deleteSelf, 15000)
  },
  computed: {
    isError () {
      return this.$props.error
    }
  },
  methods: {
    deleteSelf () {
      return this.$parent.$parent.deleteMessage(this.$props.id)
    },
    handleClick () {
      if (this.type === 'refresh') { return this.$router.go(0) }
      return this.deleteSelf()
    }
  }
}
</script>
<!-- vue-loader's scoped css won't work with style-loader -->
<style scoped lang="scss">
@import './message.scss';
$type: (error: #cd0930, warning: goldenrod, success: forestgreen);

@each $name, $color in $type {
  @include message-node ($name, $color);
}
</style>

<template>
<div :id="$options.name" :class="[$options.name, `is-${type}`]" @click="handleClick">
  <div style="display: flex; font-weight: 700">
    <div v-html="title"></div>
    <div class="delete" style="margin-left: auto" @click="deleteSelf"></div>
  </div>
  <div class="content" v-html="content"></div>
</div>
</template>
