<template>
  <div>
    <div class="active-contest">
      <h5 class="contest-title">Active Contests</h5>
      <div class="active-contest-list">
        <ul>
          <li v-for="(activeContest,index) in activeContests" :key=activeContest.id
            is="contests-list-box"  @onclickbar="changeStatusInActive" :id="index"
            :isOpen="(index==activeContestOpen)" :name=activeContest.name :time=activeContest.time
            :isActive=true></li>
        </ul>
      </div>
    </div>
    <div class="pased-contest">
      <h5 class="contest-title">Ended Contests</h5>
      <div class="pased-contest-list">
        <ul>
          <li v-for="(archivedContest,index) in archivedContests" :key=archivedContest.id
            is="contests-list-box"  @onclickbar="changeStatusInArchived" :id="index"
            :isOpen="(index==archivedContestOpen)" :name=archivedContest.name :time=archivedContest.time
            :isActive=false></li>
        </ul>
      </div>
    </div>
    <div class="a-wrapper">
      <a class="contest-link">Show All Contests</a>
    </div>
  </div>
</template>

<script>
import ContestsListBox from './contestComponents/contestsListBox.vue'

export default {
  name: 'contestPage',
  components: {
    ContestsListBox
  },
  data () {
    return {
      activeContestOpen: -1,
      archivedContestOpen: -1,
      activeContests: [
        {name: 'A Contest Name', time: 'Feb 10th, 12:30 pm'},
        {name: 'A Contest Name', time: 'Feb 11th, 12:30 pm'},
        {name: 'Another Contest Name', time: 'Feb 12th, 12:30 pm'},
        {name: 'B Contest Name', time: 'Feb 13th, 12:30 pm'}
      ],
      archivedContests: [
        {name: 'A Contest Name', time: 'Nov 10th 2017, 12:30 pm'},
        {name: 'A Contest Name', time: 'Dec 11th 2017, 12:30 pm'},
        {name: 'Another Contest Name', time: 'Feb 9th, 12:30 pm'},
        {name: 'B Contest Name', time: 'Feb 1st, 12:30 pm'},
        {name: 'A Contest Name', time: 'Nov 10th 2017, 12:30 pm'},
        {name: 'A Contest Name', time: 'Dec 11th 2017, 12:30 pm'},
        {name: 'Another Contest Name', time: 'Feb 9th, 12:30 pm'},
        {name: 'B Contest Name', time: 'Feb 1st, 12:30 pm'}
      ]
    }
  },
  methods: {
    changeStatusInActive (id) {
      if (this.activeContestOpen == id) this.activeContestOpen = -1
      else {
        this.activeContestOpen = id
        this.archivedContestOpen = -1
      }
    },
    changeStatusInArchived (id) {
      if (this.archivedContestOpen == id) this.archivedContestOpen = -1
      else {
        this.archivedContestOpen = id
        this.activeContestOpen = -1
      }
    }
  }
}
</script>

<style scoped>
.active-contest,.pased-contest{
  padding: 10px 0 0;
}
h5{
  padding: 10px 0;
  margin: 0;
  font-size: 125%;
  font-weight: 500;
  text-align: left;
}
.contest-title{
  margin-left: 10px;
}
.a-wrapper{
  margin: 10px 0;
  padding: 10px 0;
  box-sizing: border-box;
  display: block;
}
a.navigation{
  font-size: 110%;
	color: #87CEFA;
	text-decoration: none;
  cursor: pointer;
}
a.navigation:hover{
  color: #7bbfea;
}
ul{
  width: 100%;
  margin: 0;
  padding: 0;
	list-style: none;
}
</style>
