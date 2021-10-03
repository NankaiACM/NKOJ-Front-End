<template lang="pug">
a-space(direction="vertical", style="width: 100%;")
  a-alert(message="为了避免泄题, 私密比赛的题目请先添加题面空白的题目到比赛中后, 再进行题面编辑.")
  a-card(title="部分基础数据", hoverable)
    a-form(layout="vertical")
      a-form-item(label="题目 ID", v-if="problemId !== -1")
        a-input(disable, v-model:value="problemId", disabled)
      a-form-item(label="标题")
        a-input(v-model:value="problemData.title")
      a-form-item(label="标签")
        a-input-search(v-model:value="newTagStr", placeholder="input new tag", enterButton="添加", @search="addNewTag")
          template(#addonBefore)
            a-tag(v-for="(tag, index) in problemData.tags", :key="tag", @close="removeTag(tag)", closable) {{ tag }}
    a-row
      a-col(:span="6")
        span 数据组数（与题目数据对应）
        br
        a-input-number(v-model:value="problemData.cases")
      //- a-col(:span="6")
      //-   span 最大核心数
      //-   br
      //-   a-input-number(v-model:value="problemData.max_core")
      a-col(:span="6")
        span 困难等级
        br
        a-input-number(v-model:value="problemData.level")
      a-col(:span="6")
        span 时间限制（ms）
        br
        a-input-number(v-model:value="problemData.time_limit")
      a-col(:span="6")
        span 内存限制（kB）
        br
        a-input-number(v-model:value="problemData.memory_limit")
      //- a-col(:span="6")
      //-   span 输出限制（kB）
      //-   br
      //-   a-input-number(v-model:value="problemData.max_output")
    br
    a-row
      a-col(:span="6")
        span 类型（无特殊默认）
        br
        a-input-number(v-model:value="problemData.type")
      a-col(:span="6")
        span Special Judge
        br
        a-select(v-model:value="problemData.special_judge_string")
            a-select-option(value="0") 无
            a-select-option(value="1") Compare
            a-select-option(value="2") Interactive
      a-col(:span="6")
        span Detail Judge
        br
        a-select(v-model:value="problemData.detail_judge_string")
            a-select-option(value="true") True
            a-select-option(value="false") False
  a-alert(message="latex 数学公式请使用 `` 包裹, 例如 `@(1/2[1-(1/2)^n])/(1-(1/2))=s_n@`.")
  a-alert(message="latex 及 latex 数学公式使用帮助 请查阅 markdown-it-latex, markdown-it-mathjax.")
  a-card(title="题目描述", hoverable)
    a-tabs
      a-tab-pane(key="1", tab="编辑")
        a-textarea(v-model:value="problemData.description", :autoSize="{ minRows: 25 }")
      a-tab-pane(key="2", tab="预览")
        div(v-html="descriptionRender")
  a-card(title="输入描述", hoverable)
    a-tabs
      a-tab-pane(key="1", tab="编辑")
        a-textarea(v-model:value="problemData.input", :autoSize="{ minRows: 5 }")
      a-tab-pane(key="2", tab="预览")
        div(v-html="inputRender")
  a-card(title="输出描述", hoverable)
    a-tabs
      a-tab-pane(key="1", tab="编辑")
        a-textarea(v-model:value="problemData.output", :autoSize="{ minRows: 5 }")
      a-tab-pane(key="2", tab="预览")
        div(v-html="outputRender")
  a-alert(message="输入样例、输出样例建议使用 markdown 代码块语法处理, 例如 ```0 0 0 1```.")
  a-card(title="输入样例", hoverable)
    a-tabs
      a-tab-pane(key="1", tab="编辑")
        a-textarea(v-model:value="problemData.sample_input", :autoSize="{ minRows: 5 }")
      a-tab-pane(key="2", tab="预览")
        div(v-html="sampleInputRender")
  a-card(title="输出样例", hoverable)
    a-tabs
      a-tab-pane(key="1", tab="编辑")
        a-textarea(v-model:value="problemData.sample_output", :autoSize="{ minRows: 5 }")
      a-tab-pane(key="2", tab="预览")
        div(v-html="sampleOutputRender")
  a-card(title="题目提示", hoverable)
    a-tabs
      a-tab-pane(key="1", tab="编辑")
        a-textarea(v-model:value="problemData.hint", :autoSize="{ minRows: 5 }")
      a-tab-pane(key="2", tab="预览")
        div(v-html="hintRender")
  a-form-item
    a-button(@click="click", type="primary") 提交
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import Component from 'vue-class-component'
import markdownIt from '@/typescript/markdown'
import { ProblemEditClass } from '@/typescript/class'
import 'markdown-it-latex/dist/index.css'
import Vue from 'vue'

const EditProps = Vue.extend({
  props: {
    problemId: {
      type: Number,
      required: false,
      default: -1
    },
    preProblemData: {
      type: Object,
      required: false,
      default: () => { return new ProblemEditClass() }
    }
  }
})

// eslint-disable-next-line no-use-before-define
@Component<ProblemEdit>({
  watch: {
    preProblemData: {
      handler (nv: Record<string, unknown>) {
        try {
          this.problemData = JSON.parse(JSON.stringify(nv))
        } catch (err) {
          console.log(err)
        }
      },
      immediate: true
    }
  }
})
export default class ProblemEdit extends EditProps {
  problemData = new ProblemEditClass();

  newTagStr = '';

  removeTag (tag: string) {
    this.problemData.tags = this.problemData.tags?.filter((item) => item !== tag)
  }

  addNewTag () {
    if (this.problemData.tags) {
      this.problemData.tags.push(this.newTagStr)
    }
    this.newTagStr = String()
  }

  click () {
    this.$emit('problemDataSubmit', this.problemData)
  }

  get descriptionRender () : string { return markdownIt.render(this.problemData.description) }
  get inputRender () : string { return markdownIt.render(this.problemData.input) }
  get outputRender () : string { return markdownIt.render(this.problemData.output) }
  get sampleInputRender () : string { return markdownIt.render(this.problemData.sample_input) }
  get sampleOutputRender () : string { return markdownIt.render(this.problemData.sample_output) }
  get hintRender () : string { return markdownIt.render(this.problemData.hint) }
}
</script>
