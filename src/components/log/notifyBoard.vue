<template lang="pug">
a-space(direction="vertical")
  a-card(v-for="(item, index) in logs", hoverable)
    notifyContent(:debugMessage="item.debugMessage", :userMessage="item.userMessage")
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import NotifyContent from './notifyContent.vue'
import { logStore } from './log'

@Component({
  components: {
    NotifyContent
  }
})
export default class extends Vue {
  get logs () {
    return logStore.state.props
  }
}
</script>
