<template>
  <transition name="veil" :css="false" @enter="enter" @leave="leave">
    <div class="shadow-veil" v-on:click="$emit('exit')">
      <div class="dialog-field" @click.stop>
        <span class="glyphicon glyphicon-remove" @click="$emit('exit')"></span>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'dialogWrap',
  data(){
    return{

    }
  },
  methods:{
    enter(el,done){
      let div1 = document.querySelector("div.shadow-veil")
      Velocity(div1,
        {backgroundColor: "#000000" ,backgroundColorAlpha: [0.5,0]},
        {duration: 300,complete: done})
      let div2 = document.querySelector("div.dialog-field")
      Velocity(div2,
        {scale: [1,0.8],opacity: [1,0]},
        {duration: 300,complete: done})
    },
    leave(el,done){
      let div1 = document.querySelector("div.shadow-veil")
      Velocity(div1,
        {backgroundColor: "#000000" ,backgroundColorAlpha: 0},
        {duration: 300,complete: done})
      let div2 = document.querySelector("div.dialog-field")
      Velocity(div2,
        {scale: [0.8,1],opacity: [0,1]},
        {duration: 300,complete: done})
    }
  }
}
</script>

<style>
.shadow-veil{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}


.dialog-field{
  width: 35rem;
  background: #fff;
  border-radius: 1rem;
  padding: 10px 25px;
}
.dialog-field .glyphicon-remove{
  position: absolute;
  right: 15px;
  top: 15px;
  color: #d3dce6;
  cursor: pointer;
  transition: all 0.3s ease;
}
.dialog-field .glyphicon-remove:hover{
  color: #9facbd;
}
</style>
