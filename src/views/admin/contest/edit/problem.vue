<template lang="pug">
a-transfer(:rowKey="item => item.key",
  :dataSource="problemsArray",
  :targetKeys="targetArray"
  :filterOption="filterOption",
  :showSelectAll="false",
  :titles="['题库', '已加入比赛的题目']",
  :showSearch="true",
  :operations="['加入比赛', '移出比赛']",
  @change="change")
  template(#children="{ onItemSelect, filteredItems, selectedKeys, direction }")
    a-table(
      :dataSource="filteredItems",
      rowKey="key",
      :loading="problemsLoading",
      pageSize="50",
      :rowSelection="getRowSelection(selectedKeys, onItemSelect)",
      :pagination="{ pageSize: PAGE_SIZE }")
      a-table-column(key="problem_id", title="题目 ID", data-index="problem_id")
      a-table-column(key="title", title="标题", data-index="title")
      a-table-column(v-if="direction === 'left'", key="contest_id", title="关联比赛", data-index="contest_id")
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import Component from 'vue-class-component'
import Vue from 'vue'
import { apiContestProblemAdd, apiContestProblemRemove, apiProblemsListAll } from '@/typescript/api'
import { ContestAdminDetailProblemEntity, ProblemsListProblemSampleEntity } from '@/types/interface'

interface PLPSTransferEntry extends ProblemsListProblemSampleEntity {
  key: string;
  disabled: boolean;
}

const ProblemProps = Vue.extend({
  props: {
    contestId: {
      type: Number,
      required: true
    },
    contestProblems: {
      type: Array,
      required: true
    }
  }
})

// eslint-disable-next-line no-use-before-define
@Component<ContestProblem>({
  watch: {
    contestProblems: {
      handler (nv: Array<ContestAdminDetailProblemEntity>) {
        nv.forEach((item: ContestAdminDetailProblemEntity) => {
          this.targetArray.push(String(item.pid))
        })
      },
      immediate: true
    }
  }
})
class ContestProblem extends ProblemProps {
  problemsArray = [] as (PLPSTransferEntry)[];

  targetArray = [] as (string)[];

  problemsLoading = false;

  PAGE_SIZE = 20;

  mounted () {
    this.$nextTick(async () => {
      this.problemsLoading = true
      try {
        const pl = await apiProblemsListAll(this.PAGE_SIZE)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.problemsArray = pl.map((item: any) => {
          item.key = String(item.problem_id)
          // 题目操作限制
          item.disabled = (item.contest_id !== null) && (item.contest_id !== this.contestId)
          return item
        }) as (PLPSTransferEntry)[]
      } catch (e) {
        // do nothing
      }
      this.problemsLoading = false
    })
  }

  // eslint-disable-next-line class-methods-use-this
  filterOption (inputValue: string, item: PLPSTransferEntry) {
    return item.title.startsWith(inputValue) || item.problem_id === Number(inputValue)
  }

  // eslint-disable-next-line class-methods-use-this
  change (targetKeys: Array<string>, direction: string, moveKeys: Array<string>) {
    this.targetArray = targetKeys
    if (direction === 'right') {
      // 添加到比赛中
      moveKeys.forEach(async (value: string) => {
        try {
          await apiContestProblemAdd(this.contestId, Number(value))
        } catch (e) {
          this.targetArray = this.targetArray.filter((it) => it !== value) // 不放入右侧表格
          // do nothing other
        }
      })
    } else if (direction === 'left') {
      // 从比赛中删除
      moveKeys.forEach(async (value: string) => {
        try {
          await apiContestProblemRemove(this.contestId, Number(value))
          const it = this.problemsArray.find((item) => item.key === value)
          if (it?.contest_id) { it.contest_id = undefined }
        } catch (e) {
          this.targetArray.push(value) // 放回右侧表格
          // do nothing other
        }
      })
    } else {
      // em...wtf?! Σ(っ °Д °;)っ
    }
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line @typescript-eslint/ban-types
  getRowSelection (selectedKeys: Array<string>, onItemSelect: Function) {
    return {
      getCheckboxProps: (item: PLPSTransferEntry) => ({ disabled: item.disabled }),
      onSelect: (item: PLPSTransferEntry, selected: boolean) => { onItemSelect(item.key, selected) },
      selectedRowKeys: selectedKeys
    }
  }
}

export default ContestProblem
</script>
