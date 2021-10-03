<template lang="pug">
a-space(direction="vertical", style="width: 100%;")
  a-card(title="比赛标题", hoverable)
    a-input(v-model:value="contestDetail.title")
  a-card(title="开始日期和时间", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-space
      a-date-picker(v-model:value="contestDetail.start")
      a-time-picker(v-model:value="contestDetail.start")
  a-card(title="结束日期和时间", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-space
      a-date-picker(v-model:value="contestDetail.end")
      a-time-picker(v-model:value="contestDetail.end")
  a-card(title="比赛描述", hoverable)
    a-space(direction="vertical", style="width: 100%;")
      a-alert(message="latex 数学公式请使用 `` 包裹, 例如 `@(1/2[1-(1/2)^n])/(1-(1/2))=s_n@`.")
      a-alert(message="latex 及 latex 数学公式使用帮助 请查阅 markdown-it-latex, markdown-it-mathjax.")
      a-tabs
        a-tab-pane(tab="编辑", key="1")
          a-textarea(v-model:value="contestDetail.description", :auto-size="{ minRows: 5 }")
        a-tab-pane(tab="预览", key="2")
          div(v-html="descriptionRender")
  a-card(title="附加文件", hoverable)
    a-space(direction="vertical", style="width: 100%;")
      a-alert(message="上传新的文件将会覆盖原文件")
      a-tabs
        a-tab-pane(tab="原始数据", key="1")
          pre {{ contestDetail.file }}
        a-tab-pane(tab="预览", key="2")
          div(v-html="fileRender")
        a-tab-pane(tab="上传", key="3")
          a-space
            a-upload(v-model:fileList="fileList", @change="onlyOneFile", :beforeUpload="beforeUpload")
              a-button
                a-icon(type="upload")
  a-card(title="Extra")
    a-select(v-model:value="contestDetail.extra")
      a-select-option(:value="1") true
      a-select-option(:value="0") false
  a-card(title="私密模式")
    a-select(v-model:value="contestDetail.private")
      a-select-option(:value="1") true
      a-select-option(:value="0") false
  a-card(title="perm 魔法数字")
    a-alert(message="默认为 '(1,0,0,0,0)'")
    br
    a-space
      a-select(v-for="(item, idx) in contestDetail.permArray", v-model:value="contestDetail.permArray[idx]", :key="idx")
        a-select-option(:value="1") 1
        a-select-option(:value="0") 0
  a-card(title="赛制")
    a-select(v-model:value="contestDetail.rule")
      a-select-option(value="acm") acm
      a-select-option(value="oi") oi
  a-button(type="primary", @click="diffAndSaveBasic", style="float: right;")
    template(#icon)
      a-icon(type="save")
    | 保存比赛基础数据
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import Component from 'vue-class-component'
import moment from 'moment'
import { createTwoFilesPatch } from 'diff'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { apiContestDetail, apiContestEditSave } from '@/typescript/api'
import { getNKPCUrl } from '@/typescript/objFormatUrl'
import markdownIt from '@/typescript/markdown'
import { ContestRule } from '@/typescript/constant'
import { Modal } from 'ant-design-vue'
import Vue from 'vue'
import { ContestDetailReturnInterface, ContestEditSaveRequestInterface } from '@/types/interface'

class ContestEditData {
  title: string;

  permArray: (number)[];

  start: moment.Moment; // date and time, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS

  end: moment.Moment; // like above

  private: number;

  extra: number;

  rule: ContestRule; // 'acm', 'oi'

  file: string | undefined;

  description: string;

  constructor (ctd?: ContestDetailReturnInterface) {
    // ugly :-(
    if (ctd) {
      this.title = ctd.title || ''
      this.permArray = ctd.perm.slice(1, -1).split(',').map((item) => Number(item))
      this.start = moment(ctd.start) // utc 时间默认转化为本地时间
      this.end = moment(ctd.end)
      this.private = Number(ctd.private)
      this.extra = Number(ctd.extra)
      this.rule = ctd.rule as ContestRule
      this.file = ctd.file
      this.description = ctd.description
    } else {
      this.title = ''
      this.permArray = [1, 0, 0, 0, 0]
      this.start = moment() // 默认本地时间
      this.end = moment()
      this.private = 1
      this.extra = 0
      this.rule = ContestRule.ACM
      this.file = ''
      this.description = ''
    }
  }

  toContestEditSaveReqObj (originFileObj: File): ContestEditSaveRequestInterface {
    const cESReq: ContestEditSaveRequestInterface = {
      title: this.title,
      extra: Boolean(this.extra),
      perm: `(${this.permArray.join(',')})`,
      start: this.start.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
      end: this.end.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
      private: Boolean(this.private),
      rule: this.rule,
      description: this.description,
      file: originFileObj
    }
    return cESReq
  }
}

const BasicProps = Vue.extend({
  props: {
    contestId: {
      type: Number,
      required: true
    }
  }
})

@Component
export default class extends BasicProps {
  loading = false;

  contestDetail = new ContestEditData();

  preContestDetail = new ContestEditData();

  fileList = [] as (File)[];

  onlyOneFile () {
    if (this.fileList.length > 0) {
      this.fileList = this.fileList.slice(-1)
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.contestDetail.file = fileReader.result as string
      }
      fileReader.readAsText(this.fileList[0])
    }
  }

  beforeUpload (file: File) {
    this.fileList = [...this.fileList, file]
    return false
  }

  mounted () {
    this.$nextTick(async () => {
      await this.loadData()
    })
  }

  async loadData () {
    this.loading = true
    try {
      const ctd = await apiContestDetail(this.contestId)
      this.preContestDetail = new ContestEditData(ctd)
      this.contestDetail = new ContestEditData(ctd)
    } catch (e) {
      // do nothing
    }
    this.loading = false
  }

  async diffAndSaveBasic () {
    const oldStr = JSON.stringify(this.preContestDetail, null, 2)
    const newStr = JSON.stringify(this.contestDetail, null, 2)
    const diffString = createTwoFilesPatch('file', 'file', oldStr, newStr, undefined, undefined, { context: Math.max(oldStr.split('\n').length, newStr.split('\n').length) })
    Modal.confirm({
      title: '确认修改信息',
      onOk: async () => {
        const cESReq = this.contestDetail.toContestEditSaveReqObj(this.fileList[0])
        try {
          await apiContestEditSave(this.contestId, cESReq)
          await this.loadData()
        } catch (e) {
          // do nothing
        }
      },
      onCancel () {
        // do nothing
      },
      content: new Vue({
        render: (createElement) => {
          return createElement(
            'div',
            {
              domProps: {
                innerHTML: Diff2Html.html(diffString, {
                  drawFileList: false,
                  matching: 'lines',
                  outputFormat: 'side-by-side'
                })
              }
            })
        }
      }),
      class: 'diff-save'
    })
  }

  get nkpcUrl (): string {
    return getNKPCUrl(this.contestId)
  }

  get descriptionRender (): string {
    return markdownIt.render(this.contestDetail.description || '')
  }

  get fileRender (): string {
    return markdownIt.render(this.contestDetail.file || '')
  }
}
</script>
<style>
.diff-save {
  min-width: 800px;
  max-height: 800px;
}
</style>
