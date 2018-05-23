<template>
<div id="userPageAvatar">
  <h4 align="left">修改头像</h4>
  <img id="croimg" :src="avatarUrl" ref="img">
  <div id="upf">选择图片<input type="file" id="upbtn" @change="fileChange" ref="input"></div>
  <div id="ups" @click="updateUserAvatar">上传</div>
</div>
</template>
<script>
import Cropper from 'cropperjs'
export default {
  name: 'user-page-avatar',
  data: function () {
    return {
      cropprt: {}
    }
  },
  methods: {
    cropperIint: function () {
      const image = document.querySelector('#croimg')
      const cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        crop: function (event) {
          console.log(event.detail.x)
        }
      })
    },
    fileChange: function (e) {
      const refs = this.$refs
      const elInput = refs.input
      const elImg = refs.img
      const reader = new FileReader()
      reader.onload = (e) => {
        const src = e.target.result
        elImg.src = src
      }
      if (elInput.files && elInput.files[0]) {
        reader.readAsDataURL(elInput.files[0])
      }
    },
    updateUserAvatar: function (e) {
      let data = new FormData()
      data.append('avatar', this.$refs.input.files[0])
      console.log(data)
      this.$http.post(`${window.noPointHost}/api/u/update`,
        data,
        {crossDomain: true, credentials: true})
        .then((res) => {
          alert('ok')
          window.location.reload()
        }, e => {
          console.log('upload fail')
        })
      e.preventDefault()
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
#userPageAvatar {
  position: fixed;
  background: white;
  z-index: 4;
  display: flex;
  padding: 2em 3em;
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  h4 {
    color: #16aad8;
  }
  img {
    height: 300px;
    width: 300px;
    border-radius: 50%;
    border: 2px darkgray solid;
    margin: 2em 0;
    object-fit: cover;
  }
  #upf, #ups {
    position: relative;
    cursor: pointer;
    width: 5em;
    height: 2em;
    line-height: 2em;
    text-align: center;
    border: 1px solid #16aad8;
    color: #16aad8;
  }
  #upf {
    border-radius: 4px 4px 0 0;
  }
  #ups {
    border-top: none;
    border-radius: 0 0 4px 4px;
  }
  #upbtn {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
  }
}
</style>
