<template>
<div>
    <div class="title-wrapper">
      <h4>Nankai University Freshman<br>Programming Contest 2017</h4>
    </div>
  <div class="block-wrapper">
    <h5>Start In</h5><hr>
    <div class="wrapper timers">
      <div class="timer">
        <span class="timer-number">{{startIn.ds}}</span>
        <span v-if="startIn.ds!=1">days</span>
        <span v-else>day</span>
      </div>
      <div class="timer">
        <span class="timer-number">{{startIn.hrs}}</span>
        <span v-if="startIn.hrs!=1">hrs</span>
        <span v-else>hour</span>
      </div>
      <div class="timer">
        <span class="timer-number">{{startIn.mins}}</span>
        <span v-if="startIn.mins!=1">mins</span>
        <span v-else>min</span>
      </div>
      <div class="timer">
        <span class="timer-number">{{startIn.secs}}</span>
        <span v-if="startIn.secs!=1">secs</span>
        <span v-else>sec</span>
      </div>
    </div>
  </div>
  <div class="block-wrapper about">
    <h5>About</h5><hr>
    <div class="wrapper">
    <p>(Example 'about' copied from other webs.)</p>
    <p>随着5G商用步伐越来越近，迫切需要挖掘能够体现5G能力、商用初期可投入应用的创新业务来助力5G商用。本次大赛旨在向全
      社会及各行业广泛征集5G应用，发挥行业的需求引领作用，发掘企业及个人的创新设计，集思广益，力争孵化一批5G特色应用，
      为5G规模试验和商用奠定基础。</p>
    <p>大赛面向公众开放，广泛征集面向5G增强移动宽带、低功耗广覆盖、低时延高可靠应用场景，体现5G性能的创新应用参赛。大赛
      采取自由报名、公开遴选的方式，鼓励参赛者以团队或个人的方式参加。参赛项目应根据大赛要求准备材料，具体提交方式和要求
      将在IMT-2020(5G)推进组网站（http://www.imt-2020.org.cn）公布。</p>
    <p>大赛将设立组委会及秘书处，根据透明的比赛规则评选出获奖项目，IMT-2020(5G)推进组还将择优推荐申报国家科技重大专项。</p>
    </div>
  </div>
  <div class="block-wrapper rule">
    <h5>Rules</h5><hr>
    <div class="wrapper">
    <p>(Example 'rules' copied from other webs.)</p>
      <p>1.作品主题：弘扬中华优秀传统文化艺术，反映时代风貌，展示当代高校大学生积极进取精神风采。</p>
      <p>2.作品要求：</p>
      <p>（1）作品类型：书法（含软笔、硬笔、篆刻等）和绘画（中国画、水粉、水彩、素描、油画、刀画等）作品均可，作品创作日期须
        为2017年9月1日以后。湖北省内外高校学生均可投稿，投稿一律使用真名。</p>
      <p>（2）作品规格</p>
      <p>书法类作品：毛笔书法投寄作品原件，竖式作品，尺寸为6尺整张以内（高度不超过180 cm，宽度不超过97 cm）；小字作品尺寸为4
        尺整纸以内。手卷作品尺寸高度不超过35cm，长度不超过248cm。册页作品尺寸每页高宽不超过40cm，页数不超过12页，不符合尺寸要
        求者不予评选。手卷、册页作品入围决赛数量原则上不超过总入围数量的百分之五。所有作品须另附释文。不提倡装裱。</p>
      <p>硬笔类作品长宽不限。所有作品须另附释文。不提倡装裱。绘画类作品规格不限，提倡竖幅作品，不建议装裱，不提倡使用玻璃制框。</p>
      <p>...</p>
    </div>
  </div>
  <div class="wrapper block-wrapper blue-border">
    <span class="sentence">Finish reading? Maybe you want to…</span>
    <button class="btn">Sign Up Now!</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'contestDetail',
  data () {
    return {
      nowTime: new Date(),
      startTime: '2018/05/01 00:00:00'
    }
  },
  computed: {
    startIn: function () {
      var date3 = new Date(this.startTime).getTime() - new Date(this.nowTime).getTime() // 时间差的毫秒数
      // ------------------------------
      // 计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000))
      // 计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      var seconds = Math.floor(leave3 / 1000)
      // TODO: replace and remove setTimeout next
      // eslint-disable-next-line vue/no-async-in-computed-properties
      setTimeout(() => {
        this.nowTime = new Date()
      }, 100)
      return {
        ds: days,
        hrs: hours,
        mins: minutes,
        secs: seconds
      }
    }
  }
}

</script>

<style scoped>
.title-wrapper{
  border-bottom: 2px solid #87CEFA;
  padding: 10px 0;
}
h5{
  color: #008fd1;
  font-size: 1.3em;
}
hr{
  width: 50px;
  padding: 0;
  margin: 0;
  border: 2px solid #eff1f3;
}
.timers{
  display: flex;
  justify-content: center;
  align-items: center;
}
.timer{
  display: flex;
  align-items: center;
  width: 90px;
  flex-direction: column ;
  border: 3px solid #87CEFA;
  border-radius: 5px;
  margin: 0 10px;
  padding: 5px;
}
.timer-number{
  font-size: 45px;
  line-height: 50px;
  flex: 1;
  text-align: right;
}
.wrapper{
  margin: 30px 0 10px;;
  width: 100%;
}
p{
  text-align: left;
}
.btn{
    background-color: #87CEFA;
    border-radius: 3px;
    border: 2px solid white;
    color: white;
    line-height: 18px;
    font-size: 14px;
    padding: 10px 15px;
    cursor: pointer;
    display: inline-block;
    width: 130px;
}
.btn:hover{
    background-color: white;
    color: #7bbfea;
}
.sentence{
  font-size: 1.2em;
  display: block;
  margin-bottom: 20px;
  color: white;
}
.blue-border{
  background-color: #87CEFA;
  border-radius: 10px;
}
</style>
