<template>
  <div id="newPost">
    <div class="topHeader" :class="{active: title !== ''}">
      <input class="tlIn" v-model="title" type="text" placeholder="title: a sentence of clear question.">
      <button class="tlBtn" @click="upload">发布问题</button>
    </div>
    <mavon-editor
      id="marktor"
      :ishljs="true"
      @save="upload"
      v-model="content">
    </mavon-editor>
  </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'newPost',
  data: function () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    upload: function () {
      console.log(this.title)
      console.log(this.content)
      this.$router.uploadPost(this, this.id)
      return 0
    }
  }
}
</script>
<style lang="less" scoped>
#newPost {
  background: rgba(255, 255, 255, 1);
  padding: 2em;
  box-shadow: 0 0px 3px 1px shade(#efefef, 5%);
  min-height: 100%;
  .topHeader {
    font-size: 18px;
    margin: 0 0 2em 0;
    grid-template-columns: auto 7em;
    display: grid;
    @cc: #ccc;
    .tlIn, .tlBtn {
      outline: none;
      border: 1px solid @cc;
      padding: .5em 1em;
      border-radius: 4px 0 0 4px;
      background: none;
    }
    .tlBtn {
      border-radius: 0 4px 4px 0;
      border-left: none;
      text-align: center;
    }
    &.active {
      .tlIn, .tlBtn {
        border-color: darken(@cc, 25%);
        color: darken(@cc, 50%);
      }
      .tlBtn {
        &:hover, &:active {
          color: #fff;
          background: darken(@cc, 25%);
        }
      }
    }
  }
  #marktor {
    z-index: 2;
  }
}
</style>
