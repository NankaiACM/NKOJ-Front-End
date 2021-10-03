<template>
  <div class="notice" style="z-index: 1000">
    <transition-group name="list">
      <component :is="msgType(message.type)"
        v-for="message in messages" v-bind="message" :key="message.id">
      </component>
    </transition-group>
  </div>
</template>

<script>
import Block from './block.vue'
import Loader from './loader.vue'

export default {
  name: 'message-list',
  data () {
    return {
      messageID: 0,
      messages: [],
      messagefunc: undefined
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('message', this.receiveMsg)
      document.body.insertBefore(this.$el, document.body.firstChild)
    })
  },
  beforeUnmount () {
    window.removeEventListener('message', this.receiveMsg)
  },
  methods: {
    pushMessage (payload) {
      this.messages.push({
        id: this.messageID += 1,
        ...payload
      })
    },
    deleteMessage (id) {
      for (let i = 0; i < this.messages.length; i += 1) {
        if (this.messages[i].id === id) {
          this.messages.splice(i, 1)
          return
        }
      }
    },
    receiveMsg (e) {
      const { data } = e
      switch (data.type) {
        case 'notice':
          this.pushMessage(data.payload)
          break
        case 'event':
          break
        case 'loader':
          this.pushMessage({ ...data.payload, type: 'loader' })
          break
        case 'login':
          break
        default:
          break
      }
    },
    msgType (type) {
      if (type === 'loader') return Loader
      return Block
    }
  }
}
</script>

<style scoped>
.notice {
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  width: 300px;
  max-width: 100%;
  background: transparent;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: stretch;
  pointer-events: none;
  padding-bottom: 5vh;
}

.list-enter-active, .list-leave-active {
transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateX(100%);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
