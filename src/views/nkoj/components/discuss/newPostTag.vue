<template>
  <div id="new-post" class="">
    <div class="id-line" v-if="usrLog">
      <img class="id-img" alt="usr" :src="imgUrl">
      <div class="id-id" to=""> me</div>
    </div>
    <div class="button-line">
      <div class="post-btn">
        <router-link to="/discuss/new" tag="div" v-if="usrLog"><span class="glyphicon glyphicon-plus"></span> new post</router-link>
        <div @click="logIn" v-else>Sign In</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newPost',
  data: function () {
    return {
      tmp: ''
    }
  },
  methods: {
    logIn: function () {
      document.querySelector('#loginBtn').click()
    }
  },
  computed: {
    imgUrl: function () {
      return window.noPointHost + '/api/avatar/' + this.$store.state.userData.user_id
    },
    usrLog: function () {
      return this.$store.getters.usrLogGet
    }
  }
}
</script>
<style lang="less">
#new-post {
  margin-top: 0;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  height: auto;
  .id-line {
    padding: 1em 2em;
    border-bottom: 1px solid #efefef;
    height: 5em;
    display: grid;
    grid-template-columns: 3em auto;
    align-items: center;
    grid-column-gap: 1em;
    .id-img {
      height: 3em;
      width: 3em;
      border-radius: 50%;
    }
    .id-id {
      height: 1em;
      text-align: left;
    }
  }
  .button-line {
    padding: 1em 2em;
    .post-btn {
      height: 3em;
      line-height: 3em;
      border-radius: 4px;
      border: 1px solid #efefef;
      cursor: pointer;
      transition: all .41s;
      text-align: center;
    }
    .post-btn:hover {
      box-shadow: 0 0 4px 1px #eee;
    }
  }
}
</style>
