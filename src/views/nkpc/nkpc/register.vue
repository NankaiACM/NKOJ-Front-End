<template lang="pug">
#register.container.is-fullhd
  user-check
    template(v-slot:userok) 获取用户信息成功, 如果还没有成功注册比赛, 请填写下表完成比赛注册.
  .field
    label.label 姓名
    .control
      input.input(type="text",v-model="fullname",v-bind:class="nameok ? 'is-success' : ''")
  .field
    label.label 学号
    .control
      input.input(type="text",v-model="studentid",v-bind:class="idok ? 'is-success' : ''")
  .field
    label.label 性别
    .control
      .select
        select(v-model="gender")
          option(value=1) 女
          option(value=2) 男
          option(value=3) 其他
  .field
    label.label 学院
    .control
      input.input(type="text",v-model="college")
  .field
    label.label 电话
    .control
      input.input(type="text",v-model="phone",v-bind:class="phoneok ? 'is-success' : ''")
  .field
    label.label QQ
    .control
      input.input(type="text",v-model="qq",v-bind:class="qqok ? 'is-success' : ''")
  //-
    .field
      label.label 邮箱
        input.input(type="email",v-model="email",v-bind:class="emailok ? 'is-success' : ''")
  .field
    label.label 政治面貌
    .control
      .select
        select(v-model="political")
          option 群众
          option 共青团员
          option 中共预备党员
          option 中共党员
  .field
    .control
      button.button.is-primary(@click="submit()") 提交
</template>
<script lang="js">
import { fetchBase } from '@/typescript/api'
import ObjFormatUrl from '@/typescript/objFormatUrl'

export default {
  name: 'nkpcregisterpage',
  data () {
    return {
      fullname: '',
      studentid: '',
      gender: '',
      college: '',
      qq: '',
      email: '',
      political: '',
      phone: '',
      userstatus: 1
    }
  },
  computed: {
    idok () {
      return /^\d+$/.test(this.studentid)
    },
    nameok () {
      return this.fullname.length > 1
    },
    emailok () { // 在本例中未有使用
      /* eslint-disable-next-line */
      return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.email);
    },
    qqok () {
      return /^\d{5,13}$/.test(this.qq)
    },
    phoneok () {
      return /^\d{11}$/.test(this.phone)
    }
  },
  methods: {
    async submit () {
      if (!this.idok || !this.nameok || !this.qqok || !this.phoneok) {
        this.$message('似乎有什么地方不太对, 请检查一下下数据 QwQ')
        return
      }
      try {
        // TODO: move api to api.ts
        const res = await fetchBase(ObjFormatUrl.contestSign, {
          method: 'POST',
          body: JSON.stringify({
            gender: this.gender,
            institute: this.college,
            phone: this.phone,
            qq: this.qq,
            real_name: this.fullname,
            student_number: this.studentid
          })
        })
        this.$message(`注册成功, 这是你的注册信息：<br><pre>${JSON.stringify(res.data, null, 2)}</pre>`)
      } catch (e) {
        this.$message('注册失败', e)
        /* eslint-disable-next-line */
        console.dir(e);
      }
    }
  }
}
</script>
<style lang="css" scoped>
#register {
  background: rgba(255, 255, 255, 0.82);
  padding: 2em;
}

#register .input, #register .select select {
  background: none;
}
</style>
