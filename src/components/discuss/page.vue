<template>
  <div id="discuss">
    <div class="wrp">
      <div>
        <div class="head"><div class="title">Top Discuss</div><div class="tag active">0</div></div>
        <stream :items="list"></stream>
      </div>
      <div><new-post></new-post></div>
    </div>
  </div>
</template>
<script>
import stream from './stream'
import newPost from './newPost'
export default {
  name: 'discuss',
  components: {stream, newPost},
  data: function () {
    return {
      list: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$http.get(window.noPointHost + '/api/posts/0')
        .then(function (r) {
          if (r.body.code === 0) {
            this.list = r.body.data.list
          }
        })
    })
  }
}
</script>
<style lang="less" scoped>
  #discuss {
    background: rgba(255, 255, 255, .8);
    padding: 3em 2em;
    .wrp {
      display: grid;
      grid-template-columns: auto 300px;
      .head {
        display: grid;
        grid-template-columns: auto 5em;
        margin-bottom: 1em;
        .title, .tag {
          padding: .5em;
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          border-bottom: 1px solid #ccc;
        }
        .tag {
          text-align: center;
          &.active {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            border-top: 3px solid #2cbfec;
          }
        }
      }
    }
  }
</style>
