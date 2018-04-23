<template>
  <div class="hc-wrapper">
    <div class="title-wrapper">
      <div class="title-bar">
        <div v-for="text in titletext" :key="text.id">{{text}}</div>
      </div>
      <div class="navbutton">
        <span class="glyphicon glyphicon-arrow-right"></span>
      </div>
    </div>
    <div class="content-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"homeComponent",
  props:{title:String},
  data(){
    return{

    }
  },
  computed:{
    titletext(){
      let ret=new Array()
      for(let i=0;i<this.title.length;i++){
        ret.push(this.title.charAt(i))
      }
      console.log(ret)
      return ret
    }
  }
}
</script>

<style lang="less">
.hc-wrapper{
  display: flex;
  &:hover .title-wrapper .navbutton{
    left: 12px;
  }
}
.hc-wrapper .title-wrapper{
  background-color: #56718f;
  border-radius: 5px;
  margin-right: 20px;
  position: relative;

  .title-bar {
    font-size: 175%;
    font-family: "等线";
    height: 60%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    color: white;
    margin-top: 10px;
    justify-content: space-between;
  }

  .navbutton{
    position: absolute;
    font-size: 150%;
    bottom: 10px;
    left: -30px;
    color: white;
    transition: left 0.3s ease;
  }
  
}
.hc-wrapper .content-bar{
  flex: 1;
}
.hc-wrapper .content-bar ul{
  list-style: none;
  margin: 0;
  li{
    border-bottom: 2px solid #e8f1f2;
  }
  li:first-child{
    border-top: 2px solid #e8f1f2;
  }
}
</style>
