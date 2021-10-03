<script>
import { setTimeout } from 'timers'
import format from 'string-format'
import { fetchBase } from '@/typescript/api'
import objFormatUrl from '@/typescript/objFormatUrl'

export default {
  name: 'message-block',
  data () {
    return {
      r: {
        msg_en: 'Querying'
      }
    }
  },
  props: ['id', 'sid'],
  mounted () {
    this.queryResult()
    setTimeout(this.deleteSelf, 15000)
  },
  computed: {
    title () {
      if (this.r.msg_en === 'Querying') return '正在查询结果...'
      return `[${this.r.problem_id}] ${this.r.msg_en}`
    },
    content () {
      return `提交${this.$props.sid}: ${this.r.msg_cn} ${this.r.time !== undefined ? `<br/> 时间 ${this.r.time} ms, 内存 ${this.r.memory} kb` : ''}`
    },
    icon () {
      return '<i></i>'
    },
    typeClass () {
      return `is-${this.r.msg_en.toLowerCase().replace(/\s/g, '-')}`
    }
  },
  methods: {
    deleteSelf () {
      return this.$parent.$parent.deleteMessage(this.$props.id)
    },
    handleClick () {
      window.open(`/status/uid=${this.$store.uid}`, '_blank')
      if (this.r.msg_short === 'RU') return
      this.deleteSelf()
    },
    async queryResult () {
      const start = performance.now()
      const ret = await fetchBase(format(objFormatUrl.detail, { sid: this.sid }), { method: 'GET' })
      if (ret.code === 0) {
        const r = ret.data
        const gap = performance.now() - start
        // Object.keys(r).forEach((k) => this.$set(this.r, k, r[k]));
        // vue3 does not need Vue.set anymore
        Object.keys(r).forEach((k) => { this.r[k] = r[k] })
        if (r.msg_short === 'RU') {
          requestAnimationFrame(() => setTimeout(this.queryResult, gap + 500))
        }
      } else {
        const r = ret.error[0]
        this.$set(this.r, 'msg_en', r.name + r.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import './message.scss';

$type: (
  running: #6cf,
  accepted: #228b22,
  presentation-error: lighten(#228b22, 10),
  wrong-answer: #cd0930,
  syscall-not-allowed: #FF5722,
  function-limit-exceed: #FF5722,
  output-limit-exceed: sandybrown,
  memory-limit-exceed: sandybrown,
  time-limit-exceed: sandybrown,
  compile-error: #048,
  runtime-error: #9932cc,
  system-error: grey,
);

@each $name, $color in $type {
  @include message-node ($name, $color);
}

</style>

<template>
<div :id="$options.name" :class="[$options.name, typeClass]" @click="handleClick">
  <div style="display: flex"><b v-html="title"> </b>
    <div class="delete" style="margin-left: auto" @click.stop="deleteSelf"></div>
  </div>
  <div class="content" v-html="content"></div>
</div>
</template>
