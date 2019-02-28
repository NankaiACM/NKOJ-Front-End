<template>
  <div id="ver" class="ver alert bga">
    <a style="font-weight: bold" href="https://github.com/NankaiACM">来 Github ！ Star 和 Fork 我们喵<span
      style="color:red">❤</span>~ </a>
    <br>
    <a href="https://github.com/NankaiACM/NKOJ-Front-End">Front End: </a><span class="badge badge-green">{{fromNow(frontend.date)}}</span>
    By <span class="badge badge-orange" data-toggle="popover" data-placement="top" title="详情"
             :data-content="frontend.message">{{frontend.author}}</span>
    <br>
    <a href="https://github.com/NankaiACM/NKOJ-Back-End">Back End: </a><span class="badge badge-yellow">{{fromNow(backend.date)}}</span>
    By <span class="badge badge-pink" data-toggle="popover" data-placement="top" title="详情"
             :data-content="backend.message">{{backend.author}}</span>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>

export default {
  name: 'ver',
  data: function () {
    return {
      frontend: {},
      backend: {},
      apiUrl: '/api/version'
    }
  },
  methods: {
    formJson: function (str) {
      const dateMessage = str.split('Date:   ')[1].split('\n')
      const [date, ...message] = dateMessage
      return {
        date: new Date(date),
        author: str.split('Author: ')[1].split('<')[0],
        message: message.join('\n')
      }
    },
    fromNow: function (timestamp) {
      return this.$dayjs(timestamp).fromNow()
    }
  },
  mounted: function () {
    let slf = this
    slf.$nextTick(function () {
      slf.$http.get(window.noPointHost + slf.apiUrl)
        .then(function (res) {
          const data = res.body.data
          this.frontend = this.formJson(data.frontend)
          this.backend = this.formJson(data.backend)
        })
      window.$(function () {
        window.$('[data-toggle="popover"]').popover({trigger: 'hover'})
      })
    })
  }
}
</script>
<style lang="less" scoped>
  .ver {
    position: fixed;
    right: 0;
    bottom: 0;
    text-align: left;
  }

  .bga {
    background: rgba(217, 237, 247, 0.7);
  }

  .badge {
    color: #1b98e0;
  }

  .badge-green {
    background-color: palegreen;
  }

  .badge-yellow {
    background-color: lightyellow;
  }

  .badge-orange {
    background-color: #FAAA9E;
  }

  .badge-pink {
    background-color: lightpink;
  }
</style>
