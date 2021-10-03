<template lang="pug">
div
  a-table(:dataSource="problemsArray", :loading="loading", rowKey="problem_id")
    a-table-column(key="problem_id", title="题目 ID", data-index="problem_id")
    a-table-column(key="title", title="标题", data-index="title")
    a-table-column(key="special_judge", title="Special Judge", data-index="special_judge")
    a-table-column(key="detail_judge", title="Detail Judge", data-index="detail_judge")
      template(slot-scope="text, record") {{ text }}
    a-table-column(key="cases", title="样例数", data-index="cases")
    a-table-column(key="time_limit", title="时间限制（ms）", data-index="time_limit")
    a-table-column(key="memory_limit", title="内存限制（kB）", data-index="memory_limit")
    a-table-column(key="level", title="困难等级", data-index="level")
    a-table-column(key="operation", title="操作")
      template(slot-scope="text, record")
        a-button(@click="$router.push({ name: '题目编辑', params: { problemId: record.problem_id, tabName: 'basic' } })") 编辑题目
</template>
<script lang="ts">
import Component from 'vue-class-component'
import { apiProblemsListAll } from '@/typescript/api'
import Vue from 'vue'
import { ProblemsListProblemSampleEntity } from '@/types/interface'

@Component
export default class extends Vue {
  problemsArray = [] as Array<ProblemsListProblemSampleEntity>;

  loading = false;

  pageSize = 20;

  mounted () {
    this.$nextTick(async () => {
      this.loading = false
      try {
        this.problemsArray = await apiProblemsListAll(this.pageSize)
      } catch (e) {
        // do nothing
      }
      this.loading = false
    })
  }
}
</script>
