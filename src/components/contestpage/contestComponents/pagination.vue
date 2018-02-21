<template>
  <div class="pagination-bar">
    <div class="page-button-area">
      <a class="contest-link" v-text="'<上一页'"></a>
    </div>
    <ul id="pagination-list">
      <li class="other-page front" @click="prePages"><a v-text="'<='">…</a>
      </li><transition-group :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <li v-for="number in pNumber" :key="number" :class="{current:(number==currentNumber)},currentNumber" 
        :data-index="number">
          <a>{{number}}</a>
      </li></transition-group><li @click="bkPages" class="other-page back"><a v-text="'=>'"></a></li>
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
            insertIndex:[],
            eraseIndex:[],
        }
    },
    methods:{
        prePages(){
            var fir=this.pNumber[0]
            var times=fir-1>3?3:fir-1
            this.eraseIndex.splice(0,this.eraseIndex.length)
            this.insertIndex.splice(0,this.insertIndex.length)
            for(var i=1;i<=times;i++){
                this.eraseIndex.push(this.pNumber[6])
                this.pNumber.splice(-1,1)
                this.insertIndex.push(fir-i)
                this.pNumber.splice(0,0,fir-i)
            }
        },
        bkPages(){
            var lst=this.pNumber[6]
            var times=this.allPages-lst>3?3:this.allPages-lst
            this.eraseIndex.splice(0,this.eraseIndex.length)
            this.insertIndex.splice(0,this.insertIndex.length)
            for(var i=1;i<=times;i++){
                this.eraseIndex.push(this.pNumber[0])
                this.pNumber.splice(0,1)
                this.insertIndex.push(i+lst)
                this.pNumber.splice(6,0,i+lst)
            }
        },
        beforeEnter: function(el) {
            el.style.width=0
            el.style.margin=0
            el.style.paddingLeft=0
            el.style.paddingRight=0
        },
        enter: function(el,done){
            var eachTime=150
            var startTime=70
            var delay=this.insertIndex.findIndex(function(value, index, arr){
                return el.dataset.index==value
            })*(eachTime-startTime)
            console.log(delay)
            setTimeout(function () {
                Velocity(el,
                    { marginLeft: "3px", marginRight:"3px", padding: "3px",width:"30px"},
                    { duration: eachTime, complete: done})}
            ,delay)
        },
        leave: function(el,done){
            var eachTime=150
            var startTime=70
            var delay=this.eraseIndex.findIndex(function (value,index,arr) {
                return el.dataset.index==value
            })*(eachTime-startTime)
            console.log(delay)
            setTimeout(function () {
                Velocity(el,
                    {width:'0px',paddingLeft:'0px',paddingRight:'0px',marginLeft: '0px', marginRight:'0px'},
                    {duration: eachTime,complete: done})}
            ,delay)
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
    display: inline-block;
    box-sizing: border-box;
    margin: 0 3px;
    padding: 3px;
    width: 30px;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08),inset 0 -1px 4px rgba(151,159,175,0.2);
    background-color: #87CEFA;
    color: white;
    overflow: hidden;
}
#pagination-list li:hover{
    background-color: #f3d7b5;
}
#pagination-list li a{
    display: inline-block;
}
.page-button-area{
    flex: 1;
    display: block;
    white-space: nowrap;
}
</style>
