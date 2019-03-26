<template>
  <div>
    <acmrank v-if="rule==='acm'"/>
    <oirank v-if="rule==='oi'"/>
  </div>
</template>
<script>
import acmrank from './acmrank.vue'
import oirank from './oirank.vue'
export default {
  name: 'allrank',
  data () {
    return {
      rule: '',
    }
  },
  components: {
    acmrank,
    oirank,
  },
  mounted () {
    this.$nextTick(function () {
      this.$http.get(`${noPointHost}/api/contest/${this.$route.params.contestid}`)
        .then(res => {
          this.rule = res.body.data.rule
        })
    })
  }
}
</script>

