<template>
<div class="stream">
  <it v-for="(item, index) in items" :key="index" :it="item"></it>
</div>
</template>

<script>
import it from './item'
export default {
  name: 'stream.vue',
  components: {it},
  props: ['items']
}
</script>

<style scoped>

</style>
