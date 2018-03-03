<template>
  <div id="app2">
    <div class="bg-blue band-with-40padding">
      <div class="margin-t-b-40 title-box">
        <div class="color-white bg-blue">
          <h2>Nankai University Freshman Programming Contest 2017</h2>
          <span>Start Time: 2017/05/01 16:00:00</span>
        </div>
      </div>
      <div class="band-with-40padding time-bar">
        <div class="timer margin-20-percent">
          <div class="bg-white padding-15"><div>04</div></div>
          <span class="unit">hrs</span>
        </div>
        <div class="timer">
          <div class="bg-white padding-15"><div>47</div></div>
          <span class="unit">mins</span>
        </div>
        <div class="timer">
          <div class="bg-white padding-15"><div>25</div></div>
          <span class="unit">secs</span>
        </div>
        <div class="width-80-center setflex">
          <hr class="color-white hrsize-2 flex-1">
          <span class="color-white font-2em margin-l-r-20">Before End</span>
          <hr class="color-white hrsize-2 width-10">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App2',
  data(){
      return{

      }
  },
}
</script>

<style>
.bg-blue{
    background-color: #1b98e0;
}
.bg-white{
    background-color: #e8f1f2;
}
.band-with-40padding, .padding-t-b-40, .padding-t-40{
    padding-top: 40px;
}
.band-with-40padding, .padding-t-b-40, .padding-b-40{
    padding-bottom: 40px;
}
.band-with-40padding{
    width: 100%;
}
.padding-15{
    padding-top: 15px;
    padding-bottom: 15px;
}
.padding-15{
    padding-left: 15px;
    padding-right: 15px;
}
.margin-t-b-40{
    margin-top: 40px;
    margin-bottom: 40px;
}
.margin-l-r-20, .margin-20{
    margin-left: 20px;
    margin-right: 20px;
}
.margin-20{
    margin-top: 20px;
    margin-bottom: 20px;
}
.margin-20-percent{
    margin-left: 20%;
}
.width-80-center{
    width: 80%;
    margin: auto;
}
.width-10{
    width: 10%;
}
.color-white{
    color: #e8f1f2;
}
.font-2em{
    font-size: 2em;
}
.hrsize-2{
    border: 1px solid #e8f1f2;
}
.flex-1{
    flex: 1;
}
.setflex{
    display: flex;
}
.title-box{
    margin-left: 30%;
    margin-right: 20%;
    border: 10px solid #e8f1f2;
    overflow: visible;
}
.title-box div{
    margin-top: 50px;
    width: 120%;
    position: relative;
    right: 20%;
    padding: 10px 0;
    margin-bottom: 10px;
    font-family: "微软雅黑";
}
.title-box h2{
    font-size: 3.8em;
    letter-spacing: 0.08em;
    line-height: 1.2em;
    margin-top: 0;
    margin-bottom: 20px;
    padding: 0;
}
.title-box span{
    font-size: 2em;
    letter-spacing: 0.08em;
}
.time-bar span{
    letter-spacing: 0.08em;
}
.timer{
    display: inline-block;
}
.timer .bg-white{
    border-radius: 10px;
    display: inline-block;
    height: 2em;
    width: 2em;
    font-size: 4em;
    color: #1b98e0;
    vertical-align: bottom;
}
.timer .bg-white div{
    text-align: center;
}
.timer .unit{
    color: #e8f1f2;
    font-size: 2.2em;
    margin-left: 20px;
    line-height: 1em;
    width: 3em;
    display: inline-block;
    vertical-align: bottom;
}
</style>
