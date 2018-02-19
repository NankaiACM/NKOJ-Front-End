<template>
  <div class="pagination-bar">
    <div class="page-button-area">
      <a class="contest-link" v-text="'<上一页'"></a>
    </div>
    <ul id="pagination-list">
      <li class="other-page front"><a @click="prePages">…</a></li>
      <transition-group name="page-list">
      <li v-for="number in pNumber" :key="number" :class="{current:(number==currentNumber)}">
          <a>{{number}}</a>
      </li></transition-group><li class="other-page back"><a @click="bkPages">…</a></li>
    </ul>
    <div class="page-button-area">
      <a class="contest-link" v-text="'下一页>'"></a>
    </div>
  </div>
</template>

<script>
export default {
    name: 'pagination',
    data(){
        return{
            pNumber:[1,2,3,4,5,6,7],
            allPages: 14,
            currentNumber:2,
        }
    },
    methods:{
        prePages(){
            var fir=this.pNumber[0]
            for(var i=1;i<=3 && i<fir;i++){
                this.pNumber.splice(0,0,fir-i)
                this.pNumber.splice(-1,1)
            }
        },
        bkPages(){
            var lst=this.pNumber[6]
            for(var i=1;i<=3 && i+lst<=this.allPages;i++){
                this.pNumber.splice(0,1)
                this.pNumber.splice(6,0,i+lst)
            }
        }
    }
}
</script>

<style scoped>
.pagination-bar{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 350px;
    overflow: hidden;
}
#pagination-list li.current{
    background-color: #83fcd8;
    color: #2c3e50;
    pointer-events: none;
}
#pagination-list li{
    display: inline;
    box-sizing: border-box;
    margin: 0 3px;
    padding: 3px;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08),inset 0 -1px 4px rgba(151,159,175,0.2);
    background-color: #87CEFA;
    color: white;
}
#pagination-list li:hover{
    background-color: #f3d7b5;
}
#pagination-list li a{
    width: 20px;
    display: inline-block;
}
.page-button-area{
    flex: 1;
    display: block;
    white-space: nowrap;
}
.page-list-enter-active, .page-list-leave-active {
  transition: all 1s;
}
.page-list-enter, .page-list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
