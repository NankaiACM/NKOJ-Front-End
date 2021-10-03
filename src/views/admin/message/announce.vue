<template lang="pug">
div
  a-form(layout="vertical", :model="message")
    a-form-item(label="公告标题")
      a-textarea.n-margin(placeholder="编辑公告标题", rows="1", v-model:value="message.title")
    a-form-item(label="公告内容")
      a-textarea.n-margin(placeholder="编辑公告内容", :auto-size="{ minRows: 4, maxRows: 6 }", v-model:value="message.message")
    a-form-item
      a-button(type="primary", @click="send", :loading="formLoading") 发送公告
  a-list.n-margin(itemLayout="vertical", :dataSource="announceArray", bordered, :pagination="pagination", :loading="listLoading")
    //- template(#renderItem="{ item, index }")
    template(slot="renderItem", slot-scope="item, index")
      a-list-item(key="message_id")
        template(#actions)
          a-button(type="danger", @click="withdraw(item.message_id)") 撤回
        a-list-item-meta(:description="new Date(item.since).toLocaleString()")
          template(#title) {{ item.title }}
          template(#avatar)
            a-avatar(size="large") {{ item['message_id'] }}
        p {{ item.content }}
</template>
<script lang="ts">
import {
  apiMessageAnnouncement,
  apiMessageAll,
  apiMessageWithdraw
} from '@/typescript/api'
import Component from 'vue-class-component'
import Vue from 'vue'
import { AnnouncementReturnInterface, MessageRequestInterface } from '@/types/interface'

@Component
export default class extends Vue {
  announceArray: AnnouncementReturnInterface[] = []

  message: MessageRequestInterface = {
    title: '',
    message: ''
  }

  pagination = {
    pageSize: 10
  }

  formLoading = false

  listLoading = true;

  mounted () {
    this.$nextTick(async () => {
      this.listLoading = true
      try {
        this.announceArray = await apiMessageAnnouncement()
      } catch (e) {
        // do nothing
      }
      this.listLoading = false
    })
  }

  async send () {
    this.formLoading = true
    try {
      await apiMessageAll(this.message)
      this.formLoading = false
      this.listLoading = true
      try {
        this.announceArray = await apiMessageAnnouncement()
      } catch (e) {
        // do nothing
      }
      this.listLoading = false
    } catch (e) {
      // do nothing
    }
    this.formLoading = false
  }

  async withdraw (messageId: number) {
    this.formLoading = true
    try {
      await apiMessageWithdraw(messageId)
      try {
        this.announceArray = await apiMessageAnnouncement()
      } catch (e) {
        // do nothing
      }
    } catch (e) {
      // do nothing
    }
    this.formLoading = false
  }
}
</script>
