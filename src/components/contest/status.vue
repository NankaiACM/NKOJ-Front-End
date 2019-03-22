<template>
  <div class="statusboard">
    <div v-for="(it, id) in status" v-if="id < 20 && it['solution_id']" :key="id" class="statuscard"
      :class="'s' + ((it['msg_en'] || '').toString().replace(/\s*/g, '').toLowerCase().substr(0, 4))">
      <span v-for="(ht, hd) in whatineed" :key="hd" :title="ht.replace(/_*/g, '') + ':'"
        :class="ht.replace(/\_*/g, '')">
        {{it[ht]}}
        {{' '}}
        {{ht === 'code_size' ? 'byte' : ht === 'time' ? 'ms' : ht === 'memory' ? 'kB' : ''}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'conteststatus',
  props: ['status'],
  data () {
    return {
      whatineed: ['solution_id', 'nickname', 'problem_id', 'msg_en', 'code_size', 'memory', 'time', 'when']
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.statusboard {
  background: #fff;
  padding: 1em 2em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.statuscard {
  display: flex;
  flex-direction: column;
  width: 241px;
  margin: .5em;
  padding: 1em;
  text-align: center;
  color: white;
  border-radius: .5em;
  cursor: pointer;
}
.solutionid {
  background: #fff;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  line-height: 2.5em;
}
.fatal {
  background: red;
  .solutionid {
    color: red;
  }
}
.sucess {
  background: #44aae5;
  .solutionid {
    color: #44aae5;
  }
}
.warning {
  background: #999;
  .solutionid {
    color: #999;
  }
}
.waiting {
  background: mediumturquoise;
  .solutionid {
    color: mediumaquamarine;
  }
}
.sacce {
  .sucess;
}
.swron, .stime, .smemo, .soutp, .sfunc, .ssyst, .srunt {
  .fatal;
}
.spres, .scomp {
  .warning;
}
.sjudg, .srunn {
  .waiting;
}
</style>

