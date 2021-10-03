<template>
  <div id="post">
    <div class="wrp">
      <div v-for="(item, index) in os" :key="index">
        <cell :item="item" :pos="index" @reload="reload"></cell>
      </div>
    </div>
  </div>
</template>
<script>
import cell from './cell.vue'
export default {
  name: 'post',
  data: function () {
    return {
      os: []
    }
  },
  components: {
    cell
  },
  methods: {
    reload: function () {
      this.$http.get(window.noPointHost + '/api/post/' + this.$route.params.id)
        .then(function (r) {
          if (r.body.code !== 0) return console.log('code', r.body.code)
          if (r.body.data.length < 1) return console.log('none')
          this.os = r.body.data
        })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.reload()
    })
  }
}
</script>
<style lang="less" scoped>
#post {
  padding: 4em 2em 6em 2em;
  background: rgba(255,255,255,.9);
  display: flex;
  flex-direction: column;
  .wrp {
    max-width: 960px;
    min-width: 760px;
    justify-self: center;
    align-self: center;
  }
}
</style>
