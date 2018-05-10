<template>
  <div class="hc-wrapper">
    <div class="title-wrapper">
      <div class="title-bar">
        {{title}}
      </div>
      <!--div class="navbutton">
        <span class="glyphicon glyphicon-list"></span>
      </div-->
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
}
</script>

<style lang="less">
.hc-wrapper{
  display: flex;
  flex-direction: column;
  &:hover .title-wrapper .navbutton{
    display: none;
  }
}
.hc-wrapper .title-wrapper{
  position: relative;

  .title-bar {
    font-size: 150%;
    line-height: 40px;
    font-family: "等线";
    display: flex;
    padding: 10px;
    justify-content: flex-start;
    padding: 0;
    height: auto;
    &::before{
      content: '';
      width: 5px;
      height: 16px;
      margin: 12px 10px;
      background-color: #87CEEB;
      display: inline-block;
    }
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
  padding: 0 2px;
  &>*{
    border-bottom: 1px solid #e6e5eb;
  }
  &>:first-child{
    border-top: 1px solid #cccccc;
  }
}
</style>
