<template lang="pug">
a-card(:title="'比赛 ID: ' + contestId", hoverable, :loading="loading")
  a-tabs
    a-tab-pane(tab="比赛基础数据", key="1")
      BasicManager(:contestId="contestId")
    a-tab-pane(tab="比赛题目管理", key="2")
      a-space(direction="vertical", style="width: 100%;")
        a-alert(type="warning",message="为防止题目泄露, 请先将题面空白的题目添加到比赛中后, 再编辑题目题面.")
        a-alert(type="warning", message="比赛题目添加删除单独进行, 即时生效.")
        a-alert(type="warning", message="题目不能被重复添加到不同的比赛, 如有需要, 请先将题目移出前一个比赛.")
        ProblemManager(:contestId="contestId", :contestProblems="contestProblems")
    a-tab-pane(tab="比赛选手管理", key="3")
      PlayerManager(:contestId="contestId", :contestPlayers="contestPlayers")
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import Component from 'vue-class-component'
import { apiContestAdminDetail } from '@/typescript/api'
import BasicManager from './basic.vue'
import ProblemManager from './problem.vue'
import PlayerManager from './player.vue'
import Vue from 'vue'
import { ContestAdminDetailParticipantsEntity, ContestAdminDetailProblemEntity } from '@/types/interface'

const EditProps = Vue.extend({
  props: {
    contestId: {
      type: Number,
      required: true
    }
  }
})

@Component({
  components: {
    BasicManager,
    ProblemManager,
    PlayerManager
  }
})
export default class extends EditProps {
  loading = false;

  contestProblems: Array<ContestAdminDetailProblemEntity> = [];

  contestPlayers: Array<ContestAdminDetailParticipantsEntity> = [];

  mounted () {
    this.$nextTick(async () => {
      await this.loadData()
    })
  }

  async loadData () {
    this.loading = true
    try {
      const ctd = await apiContestAdminDetail(this.contestId)
      this.contestProblems = ctd.problems || []
      this.contestPlayers = ctd.participants || []
    } catch (e) {
      // do nothing
    }
    this.loading = false
  }
}
</script>
