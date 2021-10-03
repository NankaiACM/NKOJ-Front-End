<template lang="pug">
div
  a-table(:dataSource="solutionArray",
    :columns="columns",
    :pagination="pagination",
    @change="change",
    :rowKey="item => item['solution_id'] + item.when",
    :loading="loading")
    template(slot="action" slot-scope="text, record")
      a-space
        a-button(@click="rejudge(record.solution_id)") 重新评测
        a-button
          a(:href="myGetDetailUrl(record.solution_id)", target="_blank") 查看
</template>
<script lang="ts">
import Component from 'vue-class-component'
import { apiRejudge, apiStatusRangeStream, apiStatusStream } from '@/typescript/api'
import { Modal } from 'ant-design-vue'
import { getDetailUrl } from '@/typescript/objFormatUrl'
import Vue from 'vue'
import { StatusStreamReturnInterfacee } from '@/types/interface'

@Component
export default class extends Vue {
  solutionArray = [] as Array<StatusStreamReturnInterfacee>;

  pagination = {};

  loading = false;

  columns = [{
    title: '解题编号',
    dataIndex: 'solution_id'
  }, {
    title: '用户名',
    dataIndex: 'nickname'
  }, {
    title: '评测结果',
    dataIndex: 'msg_cn'
  }, {
    title: '运行时间',
    dataIndex: 'time',
    customRender (text: string) {
      return `${text} ms`
    }
  }, {
    title: '运行内存',
    dataIndex: 'memory',
    customRender (text: string) {
      return `${text} kB`
    }
  }, {
    title: '时间',
    dataIndex: 'when',
    customRender (text: string) {
      return new Date(text).toLocaleString()
    }
  }, {
    title: '题目',
    dataIndex: 'problem_id'
  }, {
    title: '可选操作',
    scopedSlots: {
      customRender: 'action'
    }
  }];

  mounted () {
    this.$nextTick(async () => {
      this.loading = true
      try {
        this.solutionArray = await apiStatusStream()
      } catch (e) {
        // do nothing
      }
      this.loading = false
    })
  }

  async change (p: { current: number; pageSize: number }) {
    const [cur, ps] = [p.current, p.pageSize]
    if (cur === Math.ceil(this.solutionArray.length / (ps * 1.0))) {
      this.loading = true
      try {
        const ret = await apiStatusRangeStream(this.solutionArray.length, ps * 2)
        this.solutionArray = this.solutionArray.concat(ret)
      } catch (e) {
        // do nothing
      }
      this.loading = false
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async rejudge (solutionId: number) {
    try {
      const rRet = await apiRejudge(solutionId)
      Modal.confirm({
        title: '评测结果',
        content: `${rRet.json.result}; memory: ${rRet.json.memory} kB; time: ${rRet.json.time} ms`,
        okText: '查看详细结果',
        onOk () {
          window.open(getDetailUrl(solutionId))
        }
      })
    } catch (e) {
      // do nothing
    }
  }

  // eslint-disable-next-line class-methods-use-this
  myGetDetailUrl (solutionId: number) {
    return getDetailUrl(solutionId)
  }
}
</script>
