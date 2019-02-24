<template>
<!--一些css设定在contest.vue中-->
  <div>
    <div class="contest-wrapper">
      <h5 class="contest-title">All Contests</h5>
      <div class="contest-list">
        <ul>
          <li v-for="(allContest,index) in allContests" :key="allContest.id"
            is="contests-list-box"  @onclickbar="changeStatusInAll" :id="index"
            :contestid="allContest.contest_id.toString()"
            :isOpen="(index==isContestOpen)" :name="allContest.title" :time="allContest.during"
            :active="allContest.active"></li>
        </ul>
      </div>
    </div>
    <pagination class="pagination"/>
  </div>
</template>

<script>
import pagination from "./contestComponents/pagination.vue";
import ContestsListBox from './contestComponents/contestsListBox.vue'
import dayjs from 'dayjs'
import marked from 'marked'

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
        /* old format: {name: 'A Contest Name', time: 'Nov 10th 2017, 12:30 pm'}, */
      ],
    }
  },
  methods:{
    changeStatusInAll (id) {
      if (this.isContestOpen == id) this.isContestOpen = -1
      else this.isContestOpen = id
    },
  },
  mounted () {
    this.$nextTick(function () {
      this.$http.get(`${noPointHost}/api/contests/`)
        .then(function (res) {
          res = res.body.data.list
          for (let it of res) {
            console.log(it)
            var a, b
            try {
              [a, b] = JSON.parse(it.during)
              console.log(a, b)
            } catch (e) {
              a = NaN
              b = NaN
            }
            it.during = dayjs(a).format('YYYY-MM-DD h:mm') + '\n ~ \n' + dayjs(b).format('YYYY-MM-DD h:mm')
            console.log(it.description)
            it.description = marked(it.description)
            it.a = a
            it.b = b
            if (dayjs().isBetween(a, b)) {
              it.active = 0
            } else if (dayjs().isBefore(a)) {
              it.active = 1
            } else {
              it.active = -1
            }
            this.allContests.push(it)
          }
          this.allContests.sort(function (l, r) {
            return new Date(r.a).getTime() - new Date(l.a).getTime()
          })
        })
    })
  }
}
</script>

<style>

</style>
