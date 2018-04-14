<template>
  <div id="new-post" class="media">
    <div class="id-line">
      <router-link class="media-left media-middle id-img" to=""><img class="id-img" alt="usr" :src="tmp"></router-link>
      <router-link class="media-body media-middle id-id" to="">me</router-link>
    </div>
    <div class="button-line">
      <div class="post-btn"><div class="glyphicon glyphicon-plus btn-icon media-middle"></div>new post</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'newPost',
  data: function () {
    return {
      tmp: 'https://scontent-atl3-1.cdninstagram.com/vp/a20896b90863479914f873af2708210e/5B60AB24/t51.2885-19/s150x150/15803553_930150850418977_1876360934042107904_a.jpg'
    }
  }
}
</script>
<style lang="less">
#new-post {
  margin: 2em;
  margin-top: 0;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background: #fff;
  .id-line {
    padding: 1em 2em;
    border-bottom: 1px solid #efefef;
    height: 5em;
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
    height: 5em;
    padding: 1em 2em;
    .post-btn {
      height: 3em;
      line-height: 3em;
      border-radius: 4px;
      border: 1px solid #efefef;
      cursor: pointer;
      transition: all .41s;
      .btn-icon {
        margin: .5em;
        margin-top: -.1em;
      }
    }
    .post-btn:hover {
      box-shadow: 0 0 5px 1px #eeeeee;
    }
  }
}
</style>
