<template>
  <div class="dropmenu">
    <button type="button" @click.prevent="isMenuOpen=!isMenuOpen">
      <span class="caret" :class="{'open':isMenuOpen}"></span>
    </button>
      <ul class="dd-menu">
        <slot></slot>
      </ul>
  </div>
</template>

<script>
export default {
  name:'dropmenu',
  props:{userData:Object},
  data(){
    return{
      isMenuOpen:false,
    }
  },
  watch:{
    isMenuOpen:function(newValue,oldValue){
      let menu = document.querySelector("ul.dd-menu")
      if(newValue){
        menu.style.display="block"
        Velocity(menu,{opacity:['1','0'],scale:['1','0.9']},{duration:150})
        console.log("out")
      }
      else{
        Velocity(menu,{opacity:['0','1'],scale:['0.9','1']},{duration:150,complete: function(){
          menu.style.display="none"
        }})
      }
    }
  }
}
</script>

<style scoped>
.dropmenu{
    display: inline-block;
}
.dropmenu button{
    background-color:unset;
    padding-left:10px;
    height: 30px;
    color: #939da6;
    transition: color 0.3s ease;
}
.dropmenu button:hover{
    color: #13293d;
}
.dropmenu button span{
    transition: transform 0.3s ease;
}
.dropmenu .open{
    transform: rotate(180deg);
}
.dropmenu .dd-menu {
	box-shadow: rgba(31,53,78,.11) 0 0 2px 1px,rgba(0,0,0,.05) 0 2px 7px;
    border-radius: 4px;
    top: 65px;
    right: 10px;
    padding: 13px 20px;
    position: absolute;
    z-index: 3;
    width: 200px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    opacity: 0;
    transform: scale(.9);
    display: none;
}
.dropmenu .dd-menu::before {
	content: '';
	position: absolute;
	top: -9px;
	left: 50%;
	margin-left: 47px;
	border-radius: 0 0 5px 0;
	width: 17px;
	height: 17px;
	opacity: .1;
	background: #0b0c0e;
	transform: rotate(-135deg);
}
.dropmenu .dd-menu::after {
	content: '';
	position: absolute;
	top: -8px;
	left: 50%;
	margin-left: 47px;
	border-radius: 0 0 5px 0;
	width: 17px;
	height: 17px;
	background: #fff;
	transform: rotate(-135deg);
}
.dropmenu .dd-menu li{
  white-space: nowrap;
}
.dropmenu .dd-menu li.nickname span{
  font-weight: 700;
  max-width: 140px;
  text-overflow: ellipsis;
}
.dropmenu .dd-menu li hr{
  margin: 10px 0;
  width: 110%;
  left: -5%;
  position: relative;
}
.dropmenu .dd-menu li.link::before{
  content: '';
	width: 5px;
	height: 5px;
  display: block;
  position: absolute;
  background-color: #fff;
  top: 40%;
  left: -2%;
  border-radius: 2px;
  transition: background-color 0.5s;
}
.dropmenu .dd-menu li.link{
  transition: padding-left 0.3s;
  position: relative;
  cursor: pointer;
}
.dropmenu .dd-menu li.link:hover{
  padding-left: 5%;
}
.dropmenu .dd-menu li.link:hover::before{
  background-color: #939da6;
}
.dropmenu .dd-menu li.link a{
  color: #687683;
  text-decoration: none;
  line-height: 200%;
  transition: all 0.5s;
}
.dropmenu .dd-menu li.link a:hover,
.dropmenu .dd-menu li.link a:focus,
.dropmenu .dd-menu li.link a:active,
.dropmenu .dd-menu li.link:hover a,
.dropmenu .dd-menu li.link:focus a,
.dropmenu .dd-menu li.link:active a{
  color: #13293d;
}
.dropmenu .dd-menu li.lst-login{
  color:#a9b0b1;
  font-size: 80%;
}
</style>
