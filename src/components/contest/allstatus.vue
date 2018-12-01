<template>
  <div class="allstatus">
  <div class="line" v-for="(it, id) in status" :key="id">
    <div class="item" v-for="(ht, ky, hd) in it" :key="hd">
      {{ht}}
    </div>
  </div>
  </div>
</template>

<script>
import {contestStatus} from './virtualApi.js'
export default {
  name: 'contestallstatus',
  props: ['contestid'],
  data () {
    return {
      status: [],
      pool: []
    }
  },
  methods: {
    async updatestatus () {
      let newstatus = await contestStatus(this.$http, this.contestid, this.status[0] ? this.status[0].solution_id : 0)
      if (newstatus) console.log(this.status = newstatus.concat(this.status))
    }
  },
  mounted () {
    console.log(this.contestid)
    this.updatestatus()
    this.pool.push(setInterval(this.updatestatus, 3000))
  },
  beforeDestroy () {
    for (let it of this.pool) clearInterval(it)
  }
}
</script>

<style scoped>
.line {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.item {
  text-align: left;
}
</style>

