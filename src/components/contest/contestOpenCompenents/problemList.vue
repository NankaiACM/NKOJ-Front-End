<template>
  <div class="problem-list" @click="pushTo">
    <div><div class="number">{{questionNumber}}</div>{{problemName}}</div>
    <hr>
    <span>{{ac}} / {{all}}</span>
    <div class="status">
      <span v-if="status==0" class="not-submit">Not submit yet</span>
      <span v-if="status==1" class="trying">trying...</span>
      <span v-if="status==2" class="accept">accepted!</span>
    </div>
    <span v-if="spj" class="not-submit" title="special judge">spj</span>
    <span v-if="dtj" class="trying" title="detail judge">dtj</span>
  </div>
</template>

<script>
export default {
  name:'problemList',
  props:{
    status: Number,
    problemName: String,
    problemIndex: Number,
    id: String,
    ac: Number,
    all: Number,
    spj: Boolean,
    dtj: Boolean
  },
  data(){
    return{
      
    }
  },
  methods: {
    pushTo () {
      this.$router.push('/problem/' + this.id)
    }
  },
  computed:{
    questionNumber(){
      return String.fromCharCode(this.problemIndex+65);
    }
  },
}
</script>

<style>
.problem-list{
    border: 1px solid #d3dcdc;
    border-radius: 3px;
    padding: 20px;
    transition: all 0.5s ease-out;
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
    background: #f0f6f6;
}
.problem-list:hover{
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.3);
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
    margin-bottom: 20px;
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
