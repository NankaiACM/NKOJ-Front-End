<template lang="pug">
transition(enter-active-class="animated zoomIn",leave-active-class="animated zoomOut")
  .box(v-if="!isclose")
    article.media
      .media-content
        .content(v-if="userstatus === 1")
          progress.progress.is-info(max="100")
          p 正在检查用户信息, 请先左右横跳一下……
        .content(v-else-if="userstatus === 3")
          progress.progress.is-danger(max="50")
          p
            | 检查用户信息失败, 请先前往
            a.a.is-link.has-text-danger(href="http://acm.nankai.edu.cn",target="_blank") 主站
            |  注册 \ 登录.
            | 并刷新此页.
        .content(v-else-if="userstatus === 2")
          slot(name="userok")
</template>
<script>
/* eslint-disable camelcase */
import { apiSelfProfile } from '@/typescript/api'

export default {
  name: 'usercheck',
  data () {
    return {
      userstatus: 1,
      isclose: false
    }
  },
  methods: {
    async checkUser () {
      try {
        const { user_id } = await apiSelfProfile()
        this.userstatus = 2
        this.$store.uid = user_id
      } catch (e) {
        this.$message('获取用户信息失败', e)
        this.userstatus = 3
      }
    },
    close () {
      this.isclose = true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.checkUser()
    })
  }
}
</script>
