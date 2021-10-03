<template lang="pug">
a-table(:dataSource="reportArray", :loading='loading', :rowKey="(item) => item.report_id")
  a-table-column(key="report_id", title="举报 ID", data-index="report_id")
  a-table-column(key="status", title="处理状态")
    template(slot-scope="text, record")
      a-tag(color="green", v-if="record.isHandled") 已处理
      a-tag(color="red", v-else) 待处理
  a-table-column(key="reporter", title="举报用户", data-index="reporter")
  a-table-column(key="reportee", title="被举报用户", data-index="reportee")
  a-table-column(key="type", title="举报类型", data-index="type")
  a-table-column(key="which", title="举报内容", data-index="which")
  a-table-column(key="handler", title="处理者", data-index="handlerStr")
  a-table-column(key="when", title="举报时间", data-index="whenStr")
  a-table-column(key="result", title="处理结果")
    template(slot-scope="text, record")
      a-select(:disabled="record.isHandled", v-model:value="record.resultSelected", @select="select(record.report_id, record.resultSelected, record)")
        a-select-option(value="notYet") 选择以进行处理
        a-select-option(value="accepted") 认可
        a-select-option(value="rejected") 驳回
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
/* eslint-disable camelcase */
import Component from 'vue-class-component'
import { apiReportAll, apiReportApprove, apiReportDecline } from '@/typescript/api'
import { Modal } from 'ant-design-vue'
import Vue from 'vue'
import { ReportReturnInterface } from '@/types/interface'
// import { getWhisperUrl } from '@/typescript/objFormatUrl'

enum REPORT_TABLE_SELECT_VALUE {
  NOYET = 'notYet',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

class ReportTableEntiry implements ReportReturnInterface {
  report_id: number;

  reporter: number;

  reportee: number;

  type: number;

  which: number;

  whichUrl: string; // Whisper url

  handler?: number | null;

  isHandled: boolean;

  handlerStr: string; // uid or '未处理'

  result?: boolean | null;

  resultSelected: string; // 'accepted', 'rejected', 'notYet'

  when: string;

  whenStr: string; // LocaleString

  constructor (report: ReportReturnInterface) {
    this.report_id = report.report_id
    this.reporter = report.reporter
    this.reportee = report.reportee
    this.type = report.type
    this.which = report.which
    // this.whichUrl = getWhisperUrl(report.which);
    this.whichUrl = String(report.which)
    this.handler = report?.handler
    this.isHandled = !!report?.handler
    this.handlerStr = report?.handler ? String(report.handler) : '未处理'
    this.result = report?.result
    if (report?.result != null) {
      this.resultSelected = report.result === true ? REPORT_TABLE_SELECT_VALUE.ACCEPTED : REPORT_TABLE_SELECT_VALUE.REJECTED
    } else {
      this.resultSelected = REPORT_TABLE_SELECT_VALUE.NOYET
    }
    this.when = report.when
    this.whenStr = new Date(report.when).toLocaleString()
  }
}

@Component
export default class extends Vue {
  reportArray = [] as ReportTableEntiry[];

  loading = false;

  mounted () {
    this.$nextTick(async () => {
      this.loading = true
      try {
        const rArray = await apiReportAll()
        this.reportArray = rArray.map((item) => new ReportTableEntiry(item))
      } catch (e) {
        // do nothing
      }
      this.loading = false
    })
  }

  // eslint-disable-next-line class-methods-use-this
  select (report_id: number, value: string, record: ReportTableEntiry) {
    if (value === REPORT_TABLE_SELECT_VALUE.ACCEPTED) {
      Modal.confirm({
        title: `处理举报 ${report_id}`,
        content: '确认认可该举报？',
        async onOk () {
          try {
            await apiReportApprove(report_id)
          } catch (e) {
            // do nothing
          }
        },
        onCancel () {
          record.resultSelected = REPORT_TABLE_SELECT_VALUE.NOYET
        }
      })
    } else if (value === REPORT_TABLE_SELECT_VALUE.REJECTED) {
      Modal.confirm({
        title: `处理举报 ${report_id}`,
        content: '确认拒绝该举报？',
        async onOk () {
          try {
            await apiReportDecline(report_id)
          } catch (e) {
            // do nothing
          }
        },
        onCancel () {
          record.resultSelected = REPORT_TABLE_SELECT_VALUE.NOYET
        }
      })
    }
  }
}
</script>
