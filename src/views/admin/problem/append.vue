<template lang="pug">
a-space(style="width: 100%;", direction="vertical")
  a-alert(message="添加题目后请在题目编辑中为题目添加输入输出数据和编辑 Special Judge 配置.")
  ProblemEdit(@problemDataSubmit="problemAdd")
</template>
<script lang="ts">
import Component from 'vue-class-component'
import { ProblemEditClass } from '@/typescript/class'
import { Modal } from 'ant-design-vue'
import { apiProblemAdd } from '@/typescript/api'
import ProblemEdit from './edit.vue'
import Vue from 'vue'

@Component({
  components: {
    ProblemEdit
  }
})
export default class extends Vue {
  // eslint-disable-next-line class-methods-use-this
  async problemAdd (problemData: ProblemEditClass) {
    try {
      const pARet = await apiProblemAdd(problemData)
      Modal.confirm({
        title: '下一步',
        content: `题目 ${pARet.problem_id} 已创建, 请选择下一步`,
        okText: '编辑 Special Judge 配置',
        cancelText: '添加输入输出数据',
        onOk: () => {
          this.$router.push({ name: '题目编辑', params: { problemId: String(pARet.problem_id), tabName: 'sp' } })
        },
        onCancel: () => {
          this.$router.push({ name: '题目编辑', params: { problemId: String(pARet.problem_id), tabName: 'io' } })
        }
      })
    } catch (e) {
      // do nothing
    }
  }
}
</script>
