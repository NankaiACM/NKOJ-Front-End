<template>
  <div id="app2">
    <div class="navbar" :class="{'show-head':headShowing}">
      <a class="navbar-brand"><img src="./assets/logo.png"></a>
      <ul>
        <li><a>Problems</a></li>
        <li><a>Status</a></li>
        <li><a>Rank</a></li>
        <li><a class="btn btn-ghost">LOG IN</a></li>
        <li><a class="btn btn-default">SIGN UP</a></li>
      </ul>
    </div>
    <div class="bg-blue band-with-40padding first-band">
      <div class="margin-t-b-40 title-box">
        <div class="shader shader-top"></div>
        <div class="color-white bg-blue">
          <h2>Nankai University Freshman Programming Contest 2017</h2>
          <span>Start Time: 2017/05/01 16:00:00</span>
        </div>
        <div class="shader shader-bottom"></div>
      </div>
      <div class="time-bar">
        <div class="width-80-center setflex padding-t-20">
          <hr class="color-white hrsize-2 flex-1">
          <div class="color-white margin-l-r-20 word">Before End</div>
          <hr class="color-white hrsize-2 flex-1">
        </div>
        <div class="timers margin-20">
          <div class="timer timer-first">
            <div class="bg-white"><div>04</div></div>
            <span class="unit">hrs</span>
          </div>
          <div class="timer">
            <div class="bg-white"><div>47</div></div>
            <span class="unit">mins</span>
          </div>
          <div class="timer">
            <div class="bg-white"><div>25</div></div>
            <span class="unit">secs</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white band-with-80padding">
      <h3>Problems</h3>
      <div class="container padding-t-40">
        <ul>
          <li>
            <div class="problem-list">
              <div><div class="number">A</div>Fantastic Girlfriend And White Album</div>
              <hr>
              <div class="status"><span class="not-submit">Not submit yet</span></div>
            </div>
          </li>
          <li>
            <div class="problem-list">
              <div><div class="number">B</div>Touhou Project</div>
              <hr>
              <div class="status"><span class="trying">trying...</span></div>
            </div>
          </li>
          <li>
            <div class="problem-list">
              <div><div class="number">C</div>Osu! ver.2</div>
              <hr>
              <div class="status"><span class="accept">has accepted!</span></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App2',
  data(){
    return{
      headShowing: false,
    }
  },
  methods:{
    handleScroll(){
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrolled > 15){
        this.headShowing=true;
      }
      else{
        this.headShowing=false;
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      window.addEventListener('scroll', this.handleScroll);
    })
  },
}
</script>

<style>
.bg-blue, .title-box .shader{
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
.band-with-80padding{
    padding-top: 80px;
    padding-bottom: 80px;
}
.padding-t-20{
    padding-top: 20px;
}
.band-with-40padding{
    width: 100%;
}
.first-band{
    padding-top: 110px;
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
    margin: 8rem 20% 6rem;
    border: 10px solid #e8f1f2;
    overflow: visible;
}
.title-box .shader{
    width: 88%;
    position: relative;
    height: 20px;
    left: 6%;
}
.title-box .shader-top{
    top: -15px;
}
.title-box .shader-bottom{
    bottom: -15px;
}
.title-box div.bg-blue{
    padding: 3rem 0 0.5rem;
    margin-bottom: 10px;
    font-family: "微软雅黑";
}
.title-box h2{
    font-size: 3rem;
    letter-spacing: 0.1rem;
    text-align: center;
    line-height: 1.2em;
    margin-top: 0;
    margin-bottom: 20px;
    padding: 0;
}
.title-box span{
    width: 100%;
    font-size: 2rem;
    letter-spacing: 0.08rem;
    text-align: center;
    display: block;
}





.time-bar span{
    letter-spacing: 0.08em;
}
.time-bar .timers{
    display: flex;
    justify-content: center;
}
.time-bar .timer{
    display: inline-block;
}
.time-bar .timer-first{
    margin-left: 7rem;
}
.timer .bg-white{
    border-radius: 10px;
    display: inline-block;
    height: 8rem;
    width: 8rem;
    font-size: 4rem;
    line-height: 8rem;
    color: #1b98e0;
    vertical-align: bottom;
}
.timer .bg-white div{
    text-align: center;
}
.timer .unit{
    color: #e8f1f2;
    font-size: 2rem;
    margin-left: 10px;
    line-height: 2rem;
    width: 6rem;
    display: inline-block;
    vertical-align: bottom;
}
.time-bar .word{
    color: #e8f1f2;
    font-size: 2rem;
    position: relative;
    top: 5px;
}






.navbar{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding: 60px 8%;
    transition: all 0.5s ease;
    z-index: 1;
    background: #1b98e0;
}
.show-head{
    background: #13293d;
    padding: 10px 8%;
}
.navbar-brand{
    height: 50px;
    padding: 0px 10px;
    float: left;
}
.navbar-brand img{
    height: 50px;
    display: block;
}
.navbar ul{
    float: right;
    margin: 0;
    padding: 0;
    list-style: none;
}
.navbar ul li{
    float: left;
    display: block;
}
.navbar ul li a{
    margin: 7px 1rem;
    line-height: 36px;
    font-weight: 400;
    color: #e8f1f2;
    display: block;
    text-decoration: none;
    cursor: pointer;
}
.navbar ul li a:hover{
    text-decoration: none;
}
.navbar ul li a::after{
    content: '';
    transition: all 550ms cubic-bezier(.45,1,.32,1);
    width: 100%;
    height: 2px;
    transform: scale(0,1);
    background: #7bbfea;
    display: block;
}
.navbar ul li a:hover::after{
    transform: scale(1,1);
}
.navbar ul li a.btn{
    padding: 0 2rem;
    position: relative;
    top: -1px;
}
.navbar ul li a.btn-ghost{
    border: 2px solid #e8f1f2;
    border-color: #e8f1f2;
    background: transparent;
    color: #e8f1f2;
    transition: all 0.3s ease;
} 
.navbar ul li a.btn-ghost:hover{
    border-color: #247ba0;
}
.navbar ul li a.btn-default{
    border: 2px solid #e8f1f2;
    background: #e8f1f2;
    color: #1b98e0;
    transition: all 0.3s ease;
}
.navbar ul li a.btn-default:hover{
    background: #247ba0;
    color: #e8f1f2;
    border-color: #247ba0;
}
.navbar ul li a.btn::after{
    visibility: hidden;
}




.band-with-80padding h3{
    text-align: center;
    color: #13293d;
    font-size: 3rem;
}
.container ul{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    padding: 0;
}
.container ul li{
    display: block;
    display: flex;
    align-items: stretch;
}
.problem-list{
    border: 1px solid #d3dcdc;
    border-radius: 3px;
    padding: 20px;
    transition: all 0.5s ease;
    margin: 20px;
    width: 30rem;
    letter-spacing: 0.1rem;
    font-size: 1.5rem;
    line-height: 3rem;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}
.problem-list:hover{
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
    border-color: #e8f1f2;
}
.problem-list .number{
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 1.4rem;
    background: #1b98e0;
    color: #e8f1f2;
    line-height: 2.8rem;
    font-size: 1.4rem;
    text-align: center;
    display: inline-block;
    margin-right: 1rem;
}
.problem-list hr{
    margin-top: 10px;
    margin-bottom: 10px;
    color: #d3dcdc;
    border-top: 1px solid #d3dcdc;
    width: 80%;
}
.problem-list .status{
    text-align: right;
    width: 100%;
}
.problem-list .status span{
    float: right;
    padding: 0 1rem;
    border-radius: 5px;
    color: #e8f1f2;
}
.problem-list .status span.not-submit{
    background: #247ba0;
}
.problem-list .status span.trying{
    background: #ba921a;
}
.problem-list .status span.accept{
    background: #70c1b3;
}
</style>
