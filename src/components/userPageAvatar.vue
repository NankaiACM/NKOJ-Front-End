<template>
<div id="userPageAvatar">
  <h4 align="left">修改头像</h4><hr>
  <div class="row"><img :src="src" ref="img"></div>
  <label><input type='file' @change="fileChange" ref="input"></label>
  <button class="btn btn-info" @click="updateUserAvatar">上传</button>
</div>
</template>

<script>
export default {
  name: 'user-page-avatar',
  data: function () {
    return {
    }
  },
  methods: {
    fileChange: function (e) {
      const refs = this.$refs
      const elInput = refs.input
      const elImg = refs.img
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target.result;
        elImg.src = src;
      };
      if (elInput.files && elInput.files[0]) {
        reader.readAsDataURL(elInput.files[0]);
      }
    },
    updateUserAvatar: function (e) {
      let data = new FormData();
      data.append('avatar', this.$refs.input.files[0]);
      console.log(data)
      this.$http.post('http://111.231.98.20:8000/api/u/update', data,  {crossDomain : true, credentials : true}).then( (res) => {
        console.log(res)
      })
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
#userPageAvatar{
  position:absolute;
  background: white;
  width: 50%;
  padding: 20px;
  margin: 10% 30%;
  z-index: 4;
  border-radius: 10px;
}
#userPageAvatar img{
  margin-top: 20px;
  margin-bottom: 20px;
  height: 300px;
  width: 300px;
  border: 2px darkgray solid;
}
#userPageAvatar h4{
  padding: 10px 0;
  margin: 0;
  font-weight: bold;
  color: #16aad8;
}
#userPageAvatar hr{
  width: 60px;
  padding: 0;
  margin: 0;
  border: 2px solid #eff1f3;
}
</style>
