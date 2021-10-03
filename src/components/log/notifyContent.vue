<template lang="pug">
div
  div(style="white-space: pre-wrap; overflow: auto;") {{ userMessage }}
  a-button(type="link", @click="switchDebugShow") 调试信息 {{ new Date().toLocaleString() }}
  pre(v-if="showDebugMessage", v-html="debugMessage", style="max-height: 600px;")
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import Component from 'vue-class-component'
import Vue from 'vue'

const notifyContentProps = Vue.extend({
  props: {
    userMessage: {
      type: String,
      required: true
    },
    debugMessage: {
      type: String,
      required: true
    }
  }
})

@Component
export default class extends notifyContentProps {
  showDebugMessage = false

  switchDebugShow () : boolean {
    this.showDebugMessage = !this.showDebugMessage
    return this.showDebugMessage
  }
}
</script>
