<template>
  <div class="allstatus">
    <table class="table table-hover">
      <thead>
        <th v-for="(ht, ky, hd) in status[0]" :key="hd">
          {{ky}}
        </th>
      </thead>
      <tbody>
  <tr class="line" v-for="(it, id) in status" :key="id">
    <th>{{it['solution_id']}}</th>
    <td class="item" v-for="(ht, ky, hd) in it" :key="hd" v-if="ky !== 'solution_id'">
      {{ht}}
    </td>
  </tr>
  </tbody>
  </table>
  </div>
</template>

<script>
import {contestStatus, contestData} from './virtualApi.js'
export default {
  name: 'contestallstatus',
  props: ['contestid'],
  data () {
    return {
      status: [],
      pool: [],
      o: [],
      isLoading: false
    }
  },
  methods: {
    async updatestatus () {
      let newstatus = await contestStatus(this.$http, this.contestid, this.status[0] ? this.status[0].solution_id : 0, this.o.startime, this.o.endtime)
      if (newstatus) this.status = newstatus.concat(this.status)
    }
  },
  async mounted () {
    this.updatestatus()
    this.o = await contestData(this.$http, this.contestid)
    this.pool.push(setInterval(this.updatestatus, 3000))
  },
  beforeDestroy () {
    for (let it of this.pool) clearInterval(it)
  }
}
</script>
<style scoped>
th {
  text-align: center;
}
</style>

