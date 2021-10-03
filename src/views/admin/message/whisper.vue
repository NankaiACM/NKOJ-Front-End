<template lang="pug">
div
  a-form
    a-form-item(label="用户 ID", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-space
        a-input-number(v-model:value="whisperPackage.uid", @change="setNickname")
        a-spin(:spinning="nicknameLoading", size="small")
          a-space
            a-avatar(:src="avatarSrc", size="small")
            div {{ nickname }}
    a-form-item(label="私信标题", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-tooltip(placement="right")
        template(#title) TITLE
        a-input(v-model:value="whisperPackage.title")
          template(#prefix)
            a-icon(type="notification")
    a-form-item(label="私信内容", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-textarea(rows="4", v-model:value="whisperPackage.message")
    a-form-item(:wrapper-col="{ span: 12, offset: 5 }")
      a-button(type="primary", html-type="submit", @click="whisper", :loading="loading") 发送
</template>
<script lang="ts">
import Component from 'vue-class-component'
import { getAvatarImageSrc } from '@/typescript/objFormatUrl'
import Vue from 'vue'
import {
  apiWhisper,
  apiUserInformation
} from '@/typescript/api'
import { AdminWhisperRequestInterface, UserInformationReturnInterface } from '@/types/interface'

@Component
export default class extends Vue {
  loading = false;

  whisperPackage: AdminWhisperRequestInterface = {
    uid: -1,
    title: '',
    message: ''
  };

  nickname = ''

  nicknameLoading = false

  async whisper () {
    this.loading = true
    try {
      await apiWhisper(this.whisperPackage)
    } catch (e) {
      // do nothing
    }
    this.loading = false
  }

  async setNickname () {
    this.nicknameLoading = true
    try {
      const userInformation: UserInformationReturnInterface = await apiUserInformation(this.whisperPackage.uid)
      this.nickname = userInformation.nickname
    } catch (e) {
      // do nothing
    }
    this.nicknameLoading = false
  }

  get avatarSrc () : string {
    const ret = getAvatarImageSrc(this.whisperPackage.uid)
    return ret
  }
}
</script>
