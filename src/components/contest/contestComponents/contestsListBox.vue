<template>
<li class="contest-list-view" v-on:click="changeStatus">
    <div class="contest-tab-expander">
        <div class="contest-name" v-text=name></div>
        <div class="contest-time" v-text=time></div>
        <div class="contest-item-button">
            <a v-if="active == 0" class="psR psL active" v-on:click.stop="viewThis">View Details</a>
            <a v-else-if="active == 1" class="psR psL disabled">Upcoming</a>
            <a v-else class="psR psL disabled">Ended</a>
            <button v-if="active == 1" class="btn" v-on:click.stop="" style="visibility: hidden;">You cannot see this</button>
            <button v-else-if="active == 0" class="btn" v-on:click.stop="enterThis">Enter</button>
            <button v-else-if="active == -1" class="btn" v-on:click.stop="viewProblems">View Problems</button>
        </div>
    </div>
    <collapse-transition>
      <div class="collapse-wrap" v-show="isOpen">
        <div class="contest-detail">
          <div class="contest-detail-title">Contest Detail</div>
          <p v-html="description">
          </p>
        </div>
      </div>
    </collapse-transition>
</li>
</template>

<script>
// contest框
import collapseTransition from './collapseTransition'

export default {
  name: 'ContestsBox',
  components: {
    collapseTransition
  },
  props: {
    isOpen: Boolean,
    id: Number,
    contestid: String,
    name: String,
    time: String,
    active: Number,
    description: String
  },
  methods: {
    changeStatus () {
      this.$emit('onclickbar', this.id)
    },
    viewThis () {
        this.$router.push('/NKPC/' + this.contestid)
    },
    signUpThis () {
        this.$router.push('/NKPC/' + this.contestid)
    },
    viewProblems () {
        this.$router.push('/NKPC/' + this.contestid)
    },
    enterThis () {
        this.viewThis()
    }
  }
}

</script>

<style scoped>
.contest-list-view{
    background: white;
	display: inline-block;
	width: 100%;
	border: 1px solid #C2C7D0;
	border-radius: 10px;
    list-style-type: none;
    margin-bottom: 15px;
	cursor: pointer;
}
.contest-list-view:hover{
    border-color: #39424e;
}
.contest-tab-expander{
    padding: 15px 20px;
    height: auto;
    display: flex;
    align-items: baseline;
    -moz-box-align: center;
    -webkit-box-align: center;
}
.contest-name{
    flex: 2;
    text-align: left;
    margin-right: 20px;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    font-weight: 700;
    white-space: nowrap;
    box-sizing: border-box;
}
.contest-time{
    text-align: right;
    padding-left: 7.5px;
    padding-right: 7.5px;
    box-sizing: border-box;
    display: block;
    /* white-space: pre; */
    white-space: nowrap;
    flex: 1;
    font-size: 80%;
    font-weight:500;
}
.psR{
    padding-right: 15px;
}
.psL{
    padding-left: 15px;
}
.contest-item-button .active {
	color: #c3b091;
	text-decoration: none;
    transition: 0.3s color ease;
    font-size: 80%;
    display: inline;
}
.contest-item-button .active:hover{
    color: #8c6238;
}
.contest-item-button .disabled {
	color: #C2C7D0;
	text-decoration: none;
    font-size: 80%;
    display: inline;
}
.btn{
    background-color: #87CEFA;
	border-radius: 2px;
    border: 1px solid #7bbfea;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08),inset 0 -1px 4px rgba(151,159,175,0.2);
    color: white;
    line-height: 18px;
    font-size: 14px;
    padding: 10px 15px;
    cursor: pointer;
    display: inline;
}
.btn:hover{
    background-color: #7bbfea;
}
.contest-item-button .btn{
    width: 170px;
}
.contest-detail{
    border-top: 1px solid #f0f0f0;
    margin: 0 15px;
    padding: 15px 7.5px 20px;
    overflow: hidden;
    transition: 0.5s height ease;
}
.contest-detail-title{
    text-align: left;
    font-weight: 700;
}
.contest-detail p{
    margin: 15px 0 0;
    text-align: left;
}
</style>
