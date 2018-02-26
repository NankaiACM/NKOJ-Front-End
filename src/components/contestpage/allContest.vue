<template>
<!--一些css设定在contest.vue中-->
  <div>
    <div class="contest-wrapper">
      <h5 class="contest-title">All Contests</h5>
      <div class="contest-list">
        <ul>
          <li v-for="(allContest,index) in allContests" :key=allContest.id
            is="contests-list-box"  @onclickbar="changeStatusInAll" :id="index"
            :isOpen="(index==isContestOpen)" :name=allContest.name :time=allContest.time
            :isActive=false></li>
        </ul>
      </div>
    </div>
    <pagination class="pagination"/>
  </div>
</template>

<script>
import pagination from "./contestComponents/pagination.vue";
import ContestsListBox from './contestComponents/contestsListBox.vue'

export default {
  name:'allContest',
  components:{
    pagination,
    ContestsListBox,
  },
  data(){
    return{
      isContestOpen: -1,
      allContests: [
        {name: 'A Contest Name', time: 'Nov 10th 2017, 12:30 pm'},
        {name: 'A Contest Name', time: 'Dec 11th 2017, 12:30 pm'},
        {name: 'Another Contest Name', time: 'Feb 9th, 12:30 pm'},
        {name: 'B Contest Name', time: 'Feb 1st, 12:30 pm'},
        {name: 'A Contest Name', time: 'Nov 10th 2017, 12:30 pm'},
        {name: 'A Contest Name', time: 'Dec 11th 2017, 12:30 pm'},
        {name: 'Another Contest Name', time: 'Feb 9th, 12:30 pm'},
        {name: 'B Contest Name', time: 'Feb 1st, 12:30 pm'}
      ],
    }
  },
  methods:{
    changeStatusInAll (id) {
      if (this.isContestOpen == id) this.isContestOpen = -1
      else this.isContestOpen = id
    },
  }
}
</script>

<style>

</style>
