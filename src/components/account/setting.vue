<template>
<div id="setting">
  <h3>
    个人信息
      <button type="button" class="btn trans" v-if="isEdit" @click="cancleInfo">取消</button>
      <button type="button" class="btn trans" v-if="!isEdit" @click="editInfo">编辑</button>
      <button type="button" class="btn trans" v-if="isEdit" @click="updateInfo">保存</button>

  </h3>
  <div class="row">
    <div class="userPageInfo col-sm-12">
      <div class="row">
        <div class="col-sm-3 col-sm-offset-1 picol">
          <img :src="avatarUrl" id="userPagePicture">
          <div class="k s"><div class="l">ac</div><div class="r">{{ac}}</div></div>
          <div class="k a"><div class="l">all submit</div><div class="r">{{all}}</div></div>
        </div>
        <div class="col-sm-7">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-3 control-label">用户排名</label>
              <div class="col-sm-9">
                <input class="form-control" placeholder="1" v-model="rank" disabled>
              </div>
            </div>
            <div v-for="(item, index) in dislist"  :key="index" class="form-group has-feedback" :class="{'has-error': item.e !== ''}">
              <label class="col-sm-3 control-label">{{item.text}}</label>
              <div class="col-sm-5">
                <input class="form-control"
                       :placeholder="item.placeholder"
                       v-model="n[item.key]"
                       :disabled="!isEdit"
                       @focus="item.e = ''"
                />
              </div>
              <div v-if="item.e !== ''" class="control-label col-sm-4 e">
                {{item.e}}
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-3 control-label">性别</label>
              <div class="col-sm-5">
                <label v-for="(item, index) in genderlist" :key="index" class="radio-inline">
                  <input type="radio" :value="index" v-model="n.gender" :disabled="!isEdit">{{item.text}}
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">注册时间</label>
              <div class="col-sm-9">
                <input class="form-control" placeholder="1111-11-11" v-model="timeSignUp" disabled/>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">上次登陆</label>
              <div class="col-sm-9">
                <input class="form-control" placeholder="1111-11-11" v-model="timeSignIn" disabled/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'user-page',
  data: function () {
    return {
      timeSignUp: '1111-11-11',
      timeSignIn: '1111-11-11',
      rank: '',
      ac: 0,
      all: 0,
      isEdit: false,
      o: {},
      n: {
        nickname: '',
        words: '',
        school: '',
        email: '',
        gender: 0,
        real_name: '',
        qq: '',
        phone: ''
      }, // 可更改选项放置在次
      genderlist: [
        {text: '男'},
        {text: '女'},
        {text: '不想透露'},
        {text: '秀吉/朝日/??'}],
      dislist: {
        nickname: {text: '昵称', placeholder: 'user name', key: 'nickname', e: ''},
        words: {text: '签名', placeholder: 'それには何もない', key: 'words', e: ''},
        school: {text: '学校', placeholder: '南开大学', key: 'school', e: ''},
        email: {text: '邮箱', placeholder: '12345678@outlook.com', key: 'email', e: ''},
        qq: {text: 'QQ', placeholder: '12345678', key: 'qq', e: ''},
        phone: {text: '手机', placeholder: '12345678', key: 'phone', e: ''},
        'real_name': {text: '真实姓名', placeholder: '', key: 'real_name', e: ''}
      }
    }
  },
  methods: {
    exitShow: function () {
      this.isUpdateAvatar = false
    },
    editInfo: function (e) {
      e.preventDefault()
      this.isEdit = true
    },
    cancleInfo: function (e) {
      this.isEdit = false
      this.init()
    },
    updateInfo: function () {
      console.log('updata')
      const apiUrl = window.noPointHost + '/api/user/update'
      const ndata = this.n
      const odata = this.o
      const udata = {}
      for (let i in ndata) {
        if (odata[i] === null) {
          if (ndata[i] === '') continue
        }
        if (ndata[i] !== odata[i]) {
          udata[i] = ndata[i]
        }
      }
      if (JSON.stringify(udata) === '{}') {
        console.log('没有更新')
        this.isEdit = false
        return 0
      }
      // 清空错误信息
      for (let i in this.dislist) {
        this.dislist[i].e = ''
      }
      this.$http.post(apiUrl, udata)
        .then(function (res) {
          if (res.body.code === 0) {
            console.log('大概更新成功')
            this.isEdit = false
            this.reinit()
          } else {
            console.log('大失败')
            // 使错误信息通过dislist反馈到视图上
            const error = res.body.error
            const vm = this
            for (let i in error) {
              const item = error[i]
              vm.dislist[item.name].e = item.name + ': ' + item.message
            }
          }
        }, function (e) {
          console.log('更新失败')
          console.log(e)
        })
    },
    reinit: function () {
      // 请考虑是否进行数据清理
      // 重新请求用户数据
      const vm = this
      this.$router.checkUser(vm.$store, function () {
        // 成功获取用户数据
        console.log('似乎完成了用户数据请求')
        vm.init()
        console.log('更新数据成功')
      }, function (e) {
        // 用户未登录
        console.log('用户未登录')
      }, function (e) {
        // api请求失败
        console.log('api 请求失败')
        console.log(e)
      })
    },
    init: function () {
      console.log('init user')
      this.o = this.$store.state.userData.o // 由后端返回的全部用户数据
      this.rank = this.o.rank ? this.o.rank : '锟斤拷' // 尚未包含此数据
      this.timeSignUp = '锟斤拷' // 尚未包含此数据
      this.timeSignIn = this.o.last_login
      // 录入可变数据
      const ndata = this.n
      for (let i in ndata) {
        ndata[i] = this.o[i]
      }
      this.n = ndata
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init()
    })
  },
  computed: {
    isChange: function () {
      return this.$store.state.userData['user_id']
    },
    avatarUrl: function () {
      return `${window.noPointHost}/api/avatar/` + this.o['user_id']
    }
  },
  watch: {
    isChange: function () {
      console.log('Data change[from userPage]')
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
#setting {
  .trans {
    background: none;
    color: #939da6;
    border: solid 1px #939da6;
    transition: all .41s;
    float: right;
    margin-left: 2em;
  }
  .trans:hover {
    color: #85B7D9;
    border: solid 1px #85B7D9;
  }
}
.userPageInfo{
  .row {
    .k {
      margin-bottom: 2em;
      .l, .r {
        width: 8em;
        display: inline;
        padding: .5em 1em;
        border: 1px solid;
        border-radius: 4px 0 0 4px;
      }
      .r {
        width: 2em;
        border-left: 0;
        border-radius: 0 4px 4px 0;
      }
    }
    .k.s {
      .l, .r {
        border-color: #c24f4a;
        color: #c24f4a;
      }
    }
    .k.a {
      .l, .r {
        border-color: #1e88e5;
        color: #1e88e5;
      }
    }
    .e {
      height: 100%;
      text-align: center;
    }
  }
  .picol {
    display: flex;
    flex-direction: column;
    align-items: center;
    #userPagePicture{
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 2px solid darkgray;
      cursor: pointer;
      object-fit: cover;
      margin: 4em;
    }
  }
  .form-control[disabled],
  .form-control[readonly],
  fieldset[disabled] .form-control {
    color: #000;
    background: none;
    border: none;
    cursor: text;
    box-shadow: none;
  }
  .form-control {
    background: none;
  }
  form {
    label {
      font-weight: normal;
    }
  }
}
#acProblems{
  cursor: pointer;
  float:left;
  height: 2em;
  width: 6em;
  line-height: 2em;
  text-align: center;
  margin: 0 .75em .5em 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
