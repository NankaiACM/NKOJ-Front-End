<template>
  <div id="allcontest">
    <ul>
      <li v-for="(it, pos) in all" :key="pos">
        {{it.contest_id}} {{it.title}} {{it.during}}
        <router-link :to="'/admin/getpc/' + it.contest_id">比赛数据</router-link>
        <router-link :to="'/admin/edituser/' + it.contest_id">编辑用户</router-link>
        <router-link :to="'/admin/editque/' + it.contest_id">增删题目</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'allcontest',
  data () {
    return {
      all: []
    }
  },
  mounted () {
    this.$http.get(`${noPointHost}/api/contests`)
      .then((res) => {
        res = res.body.data.list
        this.all = res
      })
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
