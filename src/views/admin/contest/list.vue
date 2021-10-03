<template lang="pug">
a-table(:data-source="contestArray", :rowKey="(item) => item.contest_id")
  a-table-column(key="contest_id", title="Contest ID", data-index="contest_id")
  a-table-column(key="title", title="Title", data-index="title")
  a-table-column(key="start", title="Start", data-index="during")
    template(slot-scope="text, record")
      span {{ JSON.parse(text)[0] }}
  a-table-column(key="end", title="End", data-index="during")
    template(slot-scope="text, record")
      span {{ JSON.parse(text)[1] }}
  a-table-column(key="perm", title="Perm", data-index="perm")
  a-table-column(key="private", title="Private", data-index="private")
    template(slot-scope="text, record")
      span {{ text }}
  a-table-column(key="action", title="Action")
    template(slot-scope="text, record")
      a-button(type="link", @click="$router.push({ name: '查看比赛', params: { contestId: Number(record.contest_id) }})") 查看
      a-divider(type="vertical")
      a-button(type="link", @click="$router.push({ name: '编辑比赛', params: { contestId: Number(record.contest_id) }})") 编辑
      a-divider(type="vertical")
      a-button(type="danger", @click="showDeleteConfirm(record)") 删除
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Modal } from 'ant-design-vue'
import {
  apiContestsListAll,
  apiContestDelete
} from '@/typescript/api'
import { ContestsListContestSimpleEntity } from '@/types/interface'

@Component
export default class ContestList extends Vue {
  contestArray: (ContestsListContestSimpleEntity)[] = [];

  loading = true;

  pageSize = 10;

  mounted () {
    this.$nextTick(async () => {
      try {
        this.contestArray = await apiContestsListAll(this.pageSize)
      } catch (e) {
        // do nothing
      }
      this.loading = false
    })
  }

  // eslint-disable-next-line class-methods-use-this
  showDeleteConfirm (record: ContestsListContestSimpleEntity) {
    // so ugly callback chain
    Modal.confirm({
      title: `确认删除比赛 ${record.contest_id} ？`,
      icon: 'exclamation',
      content: `比赛标题：${record.title}`,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => {
        // 第一次确认
        Modal.confirm({
          title: `最后一次确认删除比赛 ${record.contest_id} ？`,
          icon: 'exclamation',
          content: `比赛标题：${record.title}`,
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk: async () => {
            // 第二次确认, 最终确认
            this.loading = true
            try {
              await apiContestDelete(record.contest_id)
              this.contestArray = await apiContestsListAll(this.pageSize)
            } catch (e) {
              // do nothing
            }
            this.loading = false
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      },
      onCancel () {
        console.log('Cancel')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.ant-list-item-meta-description {
  white-space: pre-wrap;
}
.n-affix {
  padding: 1em;
  margin: 1em 0;
}
.n-margin {
  margin: 2em 0;
}
</style>
