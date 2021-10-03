<template lang="pug">
div.cc-container
  a-spin(:spinning="spinning")
    a-card(v-if="check", hoverable, bordered, style="width: 300px;")
      template(#cover)
        img(:src="avatarSrc")
      a-card-meta(:title="signInPackage.user")
        template(#description)
          a-row(justify="end")
            a-button(type="primary", shape="round", size="large", @click="logout") 注销
              a-icon(type="logout")
    a-form(v-else, :labelCol="{ span: 9 }", :wrapperCol="{ span: 9 }", style="max-width: 800px; min-width: 600px;")
      a-form-item(label="用户名或邮箱")
        a-input(v-model:value="signInPackage.user")
          template(#suffix)
            a-avatar(:src="avatarSrc", size="small")
      a-form-item(label="密码")
        a-input-password(v-model:value="signInPackage.password")
      a-form-item(v-if="needCaptcha", label="验证码")
        a-input(v-model:value="signInPackage.captcha")
          template(#suffix)
            img(@error="captchaLoadError", :src="captchaSrc", @load="captchaLoad", height="30px", width="90px")
          template(#addonAfter)
            a-icon(type="reload", style="cursor: pointer;", @click="captchaReset")
      a-form-item(:wrapperCol="{ offset: 9, span: 9 }")
        a-button(type="default", :loading="loading", @click="signIn") 登录
</template>

<style scoped>
.cc-container {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import Component from 'vue-class-component'
import store, { SET_USER_CHECK_BOOLEAN, SET_USER_DATA_USERINFORMATION } from '@/views/admin/store'
import { getAvatarImageSrc, newCaptchaImageSrc } from '@/typescript/objFormatUrl'
import {
  apiSignIn,
  apiSelfProfile,
  apiLogout
} from '@/typescript/api'
import publicKey from '@/typescript/idRsa.pub'
import forge from 'node-forge'
import Vue from 'vue'
import { SignInRequestInterface, UserInformationReturnInterface } from '@/types/interface'

@Component
export default class extends Vue {
  signInPackage: SignInRequestInterface = {
    captcha: '',
    password: '',
    user: ''
  };

  spinning = true;

  loading = false;

  needCaptcha = false;

  captchaSrc = newCaptchaImageSrc();

  mounted () {
    this.$nextTick(async () => {
      if (store.state.user.check) {
        this.signInPackage.user = (store.state.user.data as UserInformationReturnInterface).nickname
      } else {
        try {
          const selfProfile = await apiSelfProfile() // 检查是不是已经持有登录凭据
          store.commit(SET_USER_DATA_USERINFORMATION, selfProfile) // 更新当前用户信息
          this.signInPackage.user = (store.state.user.data as UserInformationReturnInterface).nickname
          store.commit(SET_USER_CHECK_BOOLEAN, true) // 更新用户校验状态
        } catch (e) {
          // do nothing
        }
      }
      this.spinning = false
    })
  }

  async signIn () {
    try {
      const pck: SignInRequestInterface = { ...this.signInPackage }
      pck.password = forge.util.encode64(forge.pki.publicKeyFromPem(publicKey).encrypt(pck.password)) // 公钥加密
      const selfProfile = await apiSignIn(pck)
      store.commit(SET_USER_DATA_USERINFORMATION, selfProfile) // 更新当前用户信息
      store.commit(SET_USER_CHECK_BOOLEAN, true) // 更新用户校验状态
    } catch (e) {
      this.captchaReset()
    }
  }

  async logout () {
    this.spinning = true
    try {
      await apiLogout()
      window.location.reload()
    } catch (e) {
      // do nothing
    }
    this.spinning = false
  }

  /**
   * 不需要验证码
   * 隐藏验证码输入项目
   */
  captchaLoadError () {
    this.captchaReset()
  }

  /**
   * 显示验证码输入项目
   */
  captchaLoad () {
    this.needCaptcha = true
  }

  /**
   * 重新加载验证码
   */
  captchaReset () {
    this.captchaLoad()
    this.captchaSrc = newCaptchaImageSrc()
  }

  get avatarSrc () {
    return getAvatarImageSrc(this.signInPackage.user)
  }

  get check () {
    return store.state.user.check
  }
}
</script>
