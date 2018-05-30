<template>
<div id="space">
  <div id="h">
    <div class="a-wrp">
      <img class="avatar" :src="imgUrl">
    </div>
    <div class="basic">
      <div class="n">{{o.nickname}}<span class='g' v-if="isAdmin"> [管]</span></div>
      <div class="w">{{o.words}}</div>
    </div>
  </div>
  <div class="section">
    <h3>TA的AC</h3>
    <router-link
      class="a"
      v-for="(item, index) in o.ac"
      :key="index"
      :to="{path: '/problem/' + item}"
    >
      {{item}}
    </router-link>
  </div>
  <div class="section">
    <h3>TA的提交</h3>
    <router-link
      class="a"
      v-for="(item, index) in o.all"
      :key="index"
      :to="{path: '/problem/' + item}"
    >
      {{item}}
    </router-link>
  </div>
  <div class="section">
    <h3>联系TA</h3>
  </div>
</div>
</template>
<script>
export default {
  name: 'space',
  props: ['method'],
  data: function () {
    return {
      uid: '',
      nickname: '',
      urlHash: {
        nickname: '/api/u/info/',
        uid: '/api/u/'
      },
      apiUrl: '',
      o: {}
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log(this.method)
      this[this.method] = this.$route.params[this.method]
      console.log(this[this.method])
      this.apiUrl = window.noPointHost + this.urlHash[this.method] + this[this.method]
      console.log(this.apiUrl)
      this.$http.get(this.apiUrl)
        .then(function (res) {
          console.log(res)
          this.o = res.body.data
        })
    })
  },
  computed: {
    isAdmin: function () {
      if (!this.o.perm) return false
      return this.o.perm.ADD_PROBLEM === '1'
    },
    imgUrl: function () {
      return window.noPointHost + '/api/avatar/' + this.o.user_id
    }
  }
}
</script>
<style lang="less" scoped>
  #space {
    background: rgba(255,255,255,.7);
    padding-bottom: 3em;
  }
#h {
  box-sizing: border-box;
  width: 100%;
  height: 141px;
  padding: 3em 2em 1em 2em;
  border-bottom: 1px solid #eee;
  .a-wrp {
    float: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar {
      width: 64px;
      height: 64px;
      object-fit: cover;
      border: 4px solid #eee;
      border-radius: 50%;
    }
  }
  .basic {
    float: left;
    margin-left: 2em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .n {
      color: #233;
      font-size: 18px;
      font-weight: 700;
      .g {
        color: #c24f4a;
      }
    }
  }
}
.section {
  margin: 0 3em;
  padding: 1em 0;
  border-bottom: 1px solid #eee;
  a.a {
    display: inline-block;
    margin: .5em 1em;
    padding: .5em 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-decoration: none;
    transition: all .41s;
    &:hover {
      color: #2cbfec;
      border-color: #2cbfec;
    }
  }
}
</style>
