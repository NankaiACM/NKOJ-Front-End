<template lang="pug">
#coding.container.is-fullhd
  .box.has-height-animate
    div.block.has-height-animate(ref="anbox")
      user-check(ref="usercheck")
        template(v-slot:userok)
          .level
            .level-left 检查用户状态成功.
            .level-right.a.button.is-primary.is-right(@click="$refs.usercheck.close(),\
              $refs.anbox.style.maxHeight='0px',\
              $refs.anbox.style.margin='0'"
              ) 关闭
    article.media
      .media-left
        figure.img.is-64o64
          img.is-loading(:src="`${publicPath}img/avatar.jpg`")
      .media-content
        .content
          strong {{annouce.title}}
          small {{annouce.since}}
          p {{annouce.content}}
  article.message(:class="submitted.length === 0 ? 'is-warning' : 'is-success'")
    .message-body
      .media
        span.media-left 您已提交：
        .-media-right.tags(style="flex: 1 1 auto")
            span.submitted(v-if="submitted.length === 0") 暂无
            span.tag.is-success.submitted(v-for="p in submitted",:key="p") {{' ' + p + ' '}}
  .field.is-grouped
    .control
      .select
        select(v-model="mypid",@change="ch()")
          option(
            v-for="(it,index,key) in contest.problems",
            :value="it['problem_id']",:key="index",
            :class="(submitted && submitted.indexOf && (~submitted.indexOf(it['problem_id']))) ?\
              'has-background-warning has-text-grey-dark' : ''"
            ) [{{ getIndex(index) }}] {{key}} {{it['problem_id']}} : {{it.title}}
    .control
      .select
        select(v-model="lang")
          option(v-for="(it,index,key) in LangMap",:value="it.value") {{it.lang}}
    .control
      button.button.is-primary(@click="codeok = !codeok") {{ codeok ? '关闭' : '我要提交'}}
      a.button.is-success(:href="getMyStatusUrl()", target='_blank', v-if="!codeok", style="margin-left: 1rem") 提交记录
    transition(enter-active-class="animated bounceInRight",leave-active-class="animated bounceOutRight")
      .control(v-if="codeok")
        button.button.is-warning(@click="submit()") 提交
  .field.has-height-animate(:class="codeok ? 'has-height-600px' : 'has-height-0px'")
    transition(enter-active-class="animated bounceInUp",leave-active-class="animated fadeOutDown")
      .control(v-if="codeok")
        textarea.textarea.is-primary#code(v-model="code")
  table.table.is-fullwidth.is-text-center
    thead
      tr
        th.has-text-primary cases
        th.has-text-danger time
        th.has-text-danger memory
        th special judge
        th detail judge
        th level
        th ac
        th all submit
    tbody
      tr
        td.has-text-primary {{problem['cases']}}
        td.has-text-danger {{problem['time_limit']}} ms
        td.has-text-danger {{problem['memory_limit'] / 1024 > 64 ? (problem['memory_limit'] / 1024) + ' MB' : problem['memory_limit'] + ' KB' }}
        td
          .level
            .tags.has-addons.level-item
              .tag spj
              .tag(:class="problem['special_judge'] ? 'is-danger' :'is-primary'") {{Boolean(problem['special_judge'])}}
        td
          .level
            .tags.has-addons.level-item
              .tag dtj
              .tag(:class="problem['detail_judge'] ? 'is-danger' : 'is-primary'") {{problem['detail_judge']}}
        td(title="这是假的, 还是看题目排序吧") {{problem['level']}}
        td {{problem['ac']}}
        td {{problem['all']}}
  .content#markdown-here(v-html="markdown")
  .tags(v-for="(item, index) in problem.tags")
    span.tag.is-success.is-medium {{item.name}}
</template>
<script>
import { LangMap } from '@/typescript/constant'
import markdownIt from '@/typescript/markdown'
import store from '@/views/nkpc/store'
import 'markdown-it-latex/dist/index.css'
import format from 'string-format'
import pidOrders from '@/typescript/pidOrder'
import {
  fetchBase, apiContestDetail, apiMessageAnnouncement, apiProblemInformation
} from '@/typescript/api'
import objFormatUrl, { STATUS_BASE_URL } from '@/typescript/objFormatUrl'

export default {
  name: 'nkpccodingpage',
  props: {
    cid: {
      required: true
    },
    pid: {
      required: false
    }
  },
  data () {
    return {
      annouce: {
        title: '通告获取中...',
        content: '电波传送中...',
        since: '正在正则化时间向量...'
      },
      contest: {},
      markdown: '',
      problem: {},
      submitted: [],
      codeok: false,
      code: '',
      lang: 1,
      /* eslint-disable-next-line */
      waifu: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAM1BMVEXMzMzKysqWlpbExMS7u7vHx8eysrKampqdnZ2ZmZnCwsKoqKi2trakpKShoaG+vr6srKxM8yeWAAAA/UlEQVR42u3Su46FMAxFUdvkDQH+/2vHIcVcUYw0RYor7VVwTFzYgggAAAAAAAAAAAAA4L90PqPnm84zby1RbRPRbl09ihV9tSTVcnncVj0WiGNKyLEEj7pZeLXUwr0/0T0W0DHlOOVMIqFIDn7UpOlsjS1iOkfd7oULqKpdIltNNYq0nPL20dpvf+l7OWSFMcUdWb3utXtIsvTRinY9Z7nJCnOKljEyZC1hfIEjt98F0vnU17pfMEfLvAqHZ5T4sVsNMq9ClxXmjy5JVeTKW27v3dKp6lHCfssCc0ows8Pr3XZ971bN+nNJzibr6V8tAAAAAAAAAAAAAMBX+QEytwU/4NOHhQAAAABJRU5ErkJggg==',
      mypid: this.pid,
      oldpid: this.pid,
      whatineed: ['cases', 'time_limit'],
      tags: ['detail_judge', 'special_judge'],
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
    getIndex (i) {
      return String.fromCharCode(65 + i)
    },
    thisWaifuDoseNotExist () {
      this.waifu = `//www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 1e5)}.jpg`
      return this.waifu
    },
    async thisAnnouceExist () {
      try {
        const res = await apiMessageAnnouncement()
        if (res[0]) {
          [this.annouce] = res
        }
      } catch (e) {
        this.$message('获取通告失败', e)
      }
    },
    async thisContestExist () {
      try {
        const res = await apiContestDetail(this.cid)
        this.contest = res
        if (pidOrders[this.cid]) {
          const mp = pidOrders[this.cid]
          this.contest.problems = this.contest.problems.sort((a, b) => (mp[a.problem_id].charCodeAt() || 0) - (mp[b.problem_id].charCodeAt() || 0))
        }
        if (!this.pid) {
          this.$router.push({ name: 'coding', params: { cid: this.cid, pid: res.problems[0].problem_id } })
        }
        // TODO: move api to api.ts
        const submitted = (await fetchBase(format(objFormatUrl.submitted, { cid: this.cid }), { method: 'GET' })).data
        this.submitted = submitted || []
      } catch (e) {
        this.$message('获取比赛信息失败', e)
      }
      return true
    },
    thisMarkMathjaxLatexExist (obj) {
      let markdown = ''
      Object.keys(obj).forEach((i) => {
        markdown += `### ${i.replace(/\b\w/g, (l) => l.toUpperCase())}\n${obj[i]}\n`
      })
      return markdownIt.render(markdown)
    },
    async submit () {
      if (!this.codeok) return
      try {
        // TODO: move api to api.ts
        const res = await fetchBase(objFormatUrl.judge, {
          method: 'POST',
          body: JSON.stringify({
            pid: this.pid * 1,
            lang: this.lang * 1,
            code: this.code
          })
        })
        if (res.code !== 0) {
          throw res.error
        }
        this.$solutionTrace(res.data.solution_id)
        this.$message('提交成功')
        this.codeok = false
      } catch (e) {
        this.$message('提交失败', e)
      }
    },
    thisUrlDoseNotExist () {
      if (!this.cid) {
        this.$router.push({ name: 'coding', params: { cid: 1022 } })
        return false
      }
      return true
    },
    async thisProblemExist () {
      console.log(this.pid)
      const newpid = this.pid
      if (this.mypid !== newpid) this.mypid = newpid
      try {
        if (!newpid) throw new Error('无法获取题目id')
        this.problem = await apiProblemInformation(newpid)
        this.markdown = this.thisMarkMathjaxLatexExist(this.problem.content)
      } catch (e) {
        this.$message('获取题目失败', e)
      }
    },
    async thisCodingPageDoseNotExist () {
      if (!this.thisUrlDoseNotExist()) return false
      this.thisWaifuDoseNotExist()
      await this.thisAnnouceExist()
      if (!(await this.thisContestExist())) return false
      this.thisProblemExist()
      return true
    },
    ch () {
      if (document.readyState !== 'complete') {
        this.$message('<div class="has-text-danger">页面尚未加载完成, 为了节约你的流量, 请稍后再试, 或强制F5刷新.</div>')
        this.mypid = this.oldpid
        return
      }
      this.$router.push({ name: 'coding', params: { cid: this.cid, pid: this.mypid } })
    },
    getMyStatusUrl () {
      return `${STATUS_BASE_URL}/uid=${store.state.user.data.user_id}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.thisCodingPageDoseNotExist()
    })
  },
  computed: {
    LangMap: () => LangMap
  },
  watch: {
    mypid (n, o) {
      this.oldpid = o
    },
    pid (n) {
      if (n === undefined) this.thisCodingPageDoseNotExist()
      else this.thisProblemExist()
    }
  }
}
</script>
<style lang="scss" scoped>
.is-text-center {
  & th, & td{
    vertical-align: middle !important;
    text-align: center !important;
    align-items: center !important;
    align-content: center !important;
  }
}
.is-64o64 {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}
#code {
  @extend .has-height-600px;
}
#markdown-here {
  color: black;
}
.has-height-animate {
  transition: height 1s,max-height 1s;
  max-height: 1410px;
}
.has-height-600px {
  height: 600px;
}
.has-height-0px {
  height: 0px !important;
}
.no-wrap {
  display: inline-block;
  margin: 0 1rem 0 0;
}
.is-grouped {
  width: 100%;
}
</style>
