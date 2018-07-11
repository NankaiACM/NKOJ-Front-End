<template>
<div id="avatar">
  <h3 align="left">
    我的头像
    <button type="button" class="btn trans" v-if="!isChange" @click="isChange = true">更换头像</button>
    <button type="button" class="btn trans" v-if="isChose" @click="updateUserAvatar">上传</button>
    <button type="button" class="btn trans" v-if="isChange" @click="isChose = isChange = false">取消</button>
  </h3>
  <div class="r">
    <label id="upf" for="upbtn" v-if="isChange && !isChose"><div class="c">选择图片</div></label>
    <img id="croimg" v-if="!isChose" :src="avatarUrl" ref="img">
    <div class="clip-wrp" v-if="isChose"><img id="clip" ref="clip"></div>
    <div class="pre-wrp" v-if="isChose"></div>
  </div>
  <input type="file" id="upbtn" @change="fileChange" ref="input">
</div>
</template>
<script>
import Cropper from 'cropperjs'
// const Cropper = () => import(/* webpackChunkName: "cropper" */ 'cropperjs')
export default {
  name: 'user-page-avatar',
  data: function () {
    return {
      cropprt: {},
      isChange: false,
      isChose: false
    }
  },
  methods: {
    cropperIint: function () {
      const image = document.querySelector('#clip')
      const cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        viewMode: 1,
        preview: '.pre-wrp',
        background: false,
        crop: function (event) {
        }
      })
      this.cropprt = cropper
    },
    fileChange: function (e) {
      this.isChose = true
      const refs = this.$refs
      const elInput = refs.input
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target.result
        refs.clip.src = src
        this.cropperIint()
      }
      if (elInput.files && elInput.files[0]) {
        reader.readAsDataURL(elInput.files[0])
      }
    },
    updateUserAvatar: function (e) {
      const vm = this
      vm.cropprt.getCroppedCanvas().toBlob(function (blob) {
        let data = new FormData()
        data.append('avatar', blob)
        vm.$http.post(`${window.noPointHost}/api/u/update`,
          data,
          {crossDomain: true, credentials: true})
          .then(res => {
            alert('ok')
            window.location.reload()
          }, e => {
            console.log('upload fail')
          })
      }, 'image/jpeg')
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.cropperIint()
    })
  },
  computed: {
    avatarUrl: function () {
      return window.noPointHost + '/api/avatar/' + this.$store.state.userData['user_id']
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../node_modules/cropperjs/dist/cropper.css';
#avatar {
  .trans {
    background: none;
    float: right;
    border: solid 1px #939da6;
    transition: all .41s;
    outline: none;
    user-select: none;
    margin: 0 1em;
    &:hover {
      color: #2cbfec;
      border: solid 1px #2cbfec;
    }
  }
  .r {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    #upf {
      width: 300px;
      height: 300px;
      background: #f1f1f1;
      margin: 0 1em;
      border-radius: 6px;
      cursor: pointer;
      .c {
        height: 20px;
        line-height: 20px;
        position: relative;
        top: 50%;
        margin-top: -10px;
        width: 100%;
        text-align: center;
      }
    }
    #croimg, .clip-wrp, .pre-wrp {
      height: 300px;
      width: 300px;
      margin: 2em 0;
      object-fit: cover;
      margin: 0 1em;
      img {
        max-width: 100%;
      }
    }
    #croimg, .pre-wrp {
      overflow: hidden;
      border-radius: 50%;
      border: 2px darkgray solid;
    }
  }
  #upbtn {
    visibility: hidden;
  }
}
</style>
