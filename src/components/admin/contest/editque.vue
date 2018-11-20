<template>
  <div id="editque">
    <h3>添加/删除竞赛的题目</h3>
    <ul>
      <li v-for="(it, pos) in ques" :key="pos">
        pid: {{it.pid}} ac: {{it.ac}} all: {{it.all}}
        <button @click="rm(it.pid)">从比赛中删除</button>
      </li>
    </ul>
    <addrm subitem="题目ID" supitem="比赛ID" add-a-p-i="/problem/add/" rm-a-p-i="/problem/remove/">
    </addrm>
  </div>
</template>
<script>
import addrm from './addrm'
export default {
  name: 'editque',
  data () {
    return {
      ques: []
    }
  },
  components: {
    addrm
  },
  mounted () {
    this.f5data()
  },
  methods: {
    f5data () {
      if (this.$route.params.id) {
        this.$http.get(`${noPointHost}/api/admin/contest/${this.$route.params.id}`)
          .then(function (res) {
            console.log(res)
            this.ques = res.body.data.problems
          })
      }
    },
    rm (pid) {
      this.$http.get(window.noPointHost + '/api/admin/contest/' + this.$route.params.id + '/problem/remove/' +pid)
        .then(function (r) {
            this.$store.commit('setNotify', {
              title: 'ok',
              message: JSON.stringify(r.body) + '\n'
            })
            this.f5data()
          }, function (e) {
            this.$store.commit('setNotify', {
              title: 'failed',
              message: JSON.stringify(r.body) + '\n'
            })
            this.f5data()
          })
    }
  }
}
</script>
<style scoped>
#editque{
  position: relative;
  min-height: 100%;
}
</style>
