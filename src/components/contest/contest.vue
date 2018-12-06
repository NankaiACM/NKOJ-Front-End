<template>
  <div>
    <div class="contest-wrapper">
      <h5 class="contest-title">Active Contests</h5>
      <div class="contest-list">
        <ul>
          <li v-for="(activeContest,index) in activeContests" :key="activeContest.id"
            is="contests-list-box"  @onclickbar="changeStatusInActive" :id="index"
            :contestid="activeContest.contest_id.toString()"
            :isOpen="(index==activeContestOpen)" :name="activeContest.title" :time="activeContest.during"
            :active="0" :description="activeContest.description"></li>
        </ul>
      </div>
    </div>

    <!-- comming -->
    <div class="contest-wrapper">
      <h5 class="contest-title">Upcoming Contests</h5>
      <div class="contest-list">
        <ul>
          <li v-for="(comming, index) in commings" :key="comming.id"
            is="contests-list-box"  @onclickbar="changeStatusInCommings" :id="index"
            :contestid="comming.contest_id.toString()"
            :isOpen="(index==commingContestOpen)" :name="comming.title" :time="comming.during"
            :active="1" :description="comming.description"></li>
        </ul>
      </div>
    </div>

    <div class="contest-wrapper">
      <h5 class="contest-title">Ended Contests</h5>
      <div class="contest-list">
        <ul>
          <li v-for="(archivedContest,index) in archivedContests" :key="archivedContest.id"
            is="contests-list-box"  @onclickbar="changeStatusInArchived" :id="index"
            :contestid="archivedContest.contest_id.toString()"
            :isOpen="(index==archivedContestOpen)" :name="archivedContest.title" :time="archivedContest.during"
            :active="-1" :description="archivedContest.description"></li>
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
import moment from 'moment'
import marked from 'marked'
export default {
  name: 'contestPage',
  components: {
    ContestsListBox
  },
  data () {
    return {
      activeContestOpen: -1,
      archivedContestOpen: -1,
      commingContestOpen: -1,
      activeContests: [
        /* old format:  {name: 'A Contest Name', time: 'Feb 10th, 12:30 pm'}, */
      ],
      archivedContests: [
        /* old format: {name: 'A Contest Name', time: 'Nov 10th 2017, 12:30 pm'}, */
      ],
      commings: [],
      contests: []
    }
  },
  methods: {
    changeStatusInActive (id) {
      if (this.activeContestOpen == id) this.activeContestOpen = -1
      else {
        this.activeContestOpen = id
        this.archivedContestOpen = -1
        this.commingContestOpen = -1
      }
    },
    changeStatusInArchived (id) {
      if (this.archivedContestOpen == id) this.archivedContestOpen = -1
      else {
        this.archivedContestOpen = id
        this.activeContestOpen = -1
        this.commingContestOpen = -1
      }
    },
    changeStatusInCommings (id) {
      if (this.commingContestOpen == id) this.commingContestOpen = -1
      else {
        this.commingContestOpen = id
        this.activeContestOpen = -1
        this.archivedContestOpen = -1
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.$http.get(`${noPointHost}/api/contests/`)
        .then(function (res) {
          console.log(res)
          res = res.body.data
          this.contests = res.list
          for (let it of this.contests) {
            console.log(it)
            var a, b
            try {
              [a, b] = JSON.parse(it.during)
              console.log(a, b)
            } catch (e) {
              a = NaN
              b = NaN
            }
            it.during = moment(a).format('YYYY-MM-DD HH:mm') + '\n ~ \n' + moment(b).format('YYYY-MM-DD HH:mm')
            console.log(it.description)
            it.description = marked(it.description)
            it.a = a
            it.b = b
            if(moment().isBetween(a, b)) {
              this.activeContests.push(it)
            } else if (moment().isBefore(a)) {
              this.commings.push(it)
            } else {
              this.archivedContests.push(it)
            }
          }
          this.archivedContests.sort(function (l, r) {
            return new Date(r.a).getTime() - new Date(l.a).getTime()
          })
        })
    })
  }
}
</script>

<style>
</style>
