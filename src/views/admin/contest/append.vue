<template lang="pug">
a-space(direction="vertical", style="width: 100%;")
  a-alert(message="请在创建比赛后在比赛编辑中添加题目. 对于私密比赛的题目, 请先将题面空白的题目添加到比赛中后, 再编辑题目题面.", type="warning")
  a-card(title="比赛标题", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-input(v-model:value="title")
  a-card(title="perm 魔法数字（无特殊情况保持默认）", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-space
      a-select(v-for="(item, idx) in perm", v-model:value="perm[idx]", :key="idx")
        a-select-option(:value="1") 1
        a-select-option(:value="0") 0
  a-card(title="开始日期和时间", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-space
      a-date-picker(v-model:value="start")
      a-time-picker(v-model:value="start")
  a-card(title="结束日期和时间", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-space
      a-date-picker(v-model:value="end")
      a-time-picker(v-model:value="end")
  a-card(title="秘密模式", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-select(v-model:value="private")
      a-select-option(:value="1") true
      a-select-option(:value="0") false
  a-card(title="赛制", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-select(v-model:value="rule")
      a-select-option(value="acm") acm
      a-select-option(value="oi") oi
  a-card(title="markdown 文件（可不选）", hoverable)
    template(#extra)
      a-tag(color="blue") 可选
    a-tabs
      a-tab-pane(tab="选择文件", key="1")
        a-space
          a-upload(v-model:fileList="fileList", @change="onlyOneFile", :beforeUpload="beforeUpload")
            a-button
              a-icon(type="upload")
      a-tab-pane(tab="预览", key="2")
        div(v-html="fileRender")
  a-card(title="比赛描述（支持支持 html, latex 的 markdown）", hoverable)
    template(#extra)
      a-tag(color="red") 必填
    a-space(direction="vertical", style="width: 100%;")
      a-alert(message="latex 数学公式请使用 `` 包裹, 例如 `@(1/2[1-(1/2)^n])/(1-(1/2))=s_n@`.")
      a-alert(message="latex 及 latex 数学公式使用帮助 请查阅 markdown-it-latex, markdown-it-mathjax.")
      a-tabs
        a-tab-pane(tab="编辑", key="1")
          a-textarea(v-model:value="description", :auto-size="{ minRows: 5 }")
        a-tab-pane(tab="预览", key="2")
          div(v-html="markdownRender")
  a-button(type="primary", size="large", style="float: right;", :loading="loading", @click="submit") 创建比赛
</template>
<script lang="ts">
import Component from 'vue-class-component'
import moment from 'moment'
import { Modal } from 'ant-design-vue'
import 'markdown-it-latex/dist/index.css'
import { apiContestCreate } from '@/typescript/api'
import markdownIt from '@/typescript/markdown'
import { ContestRule } from '@/typescript/constant'
import Vue from 'vue'
import { ContestCreateRequestInterface } from '@/types/interface'

@Component
export default class extends Vue {
  title = '';

  perm = [1, 0, 0, 0, 0];

  start = moment();

  end = moment();

  private = 1; // need trans to boolean

  rule = ContestRule.ACM;

  fileList = [] as (File)[];

  filePlaneText = '';

  description = '';

  loading = false;

  onlyOneFile (): void {
    if (this.fileList.length > 0) {
      this.fileList = this.fileList.slice(-1)
      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.filePlaneText = fileReader.result as string
      }
      fileReader.readAsText(this.fileList[0])
    }
  }

  beforeUpload (file: File) {
    this.fileList = [...this.fileList, file]
    return false
  }

  async submit (): Promise<void> {
    this.loading = true
    try {
      const ccIn: ContestCreateRequestInterface = {
        title: this.title,
        perm: `(${this.perm.join(',')})`,
        start: this.start.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS), // <input type="datetime-local" step="1" /> YYYY-MM-DDTHH:mm:ss
        end: this.end.format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
        private: Boolean(this.private),
        rule: this.rule,
        file: this.fileList[0],
        description: this.description
      }
      const ccReturn = await apiContestCreate(ccIn)
      const router = this.$router
      Modal.success({
        title: '创建比赛成功',
        content: `比赛 ${ccReturn.contest_id} 已被创建`,
        onOk () {
          router.push({ name: '比赛列表' })
        },
        okText: '前往比赛列表'
      })
    } catch (e) {
      // do nothing
    }
    this.loading = false
  }

  get markdownRender () {
    return markdownIt.render(this.description || '')
  }

  get fileRender () {
    return markdownIt.render(this.filePlaneText || '')
  }
}
</script>
