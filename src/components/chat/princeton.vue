<template>
  <div id="princeton">
    <div id="huiban"><div id="html-container" class="ptin" v-html="danmakusHTML"></div></div>
    <div id="pt-ctl">
      <div class="pt-in-ctl">
        <textarea class="ptin" v-model="danmaku" @keyup.enter="ptsend" placeholder="DA ZE">
        </textarea>
        <span class="limit-hit">{{danmaku.length}}/{{limit_hit}}</span>
      </div>
      <div class="pt-btns">
        <div class="hook-btn" :class="{'onhook': this.bot.isOnHook}" @click="bot.isOnHook = !bot.isOnHook">hook</div>
        <div class="hit-btn" :class="{'notban': this.danmaku !== ''}" @click="ptsend">发射电波</div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
export default {
  name: 'princeton',
  data: function () {
    return {
      danmaku: '',
      danmakus: [],
      limit_hit: 140,
      princeton: 0,
      url: 'ws://111.231.98.20:8001',
      hisurl: 'http://111.231.98.20/api/danmaku',
      bot:{
        url: 'http://www.tuling123.com/openapi/api',
        key: '797f060721db48dca531d74bbc847af9',
        id: '',
        isOnHook: false,
        last: '锟斤拷'
      }
    }
  },
  methods: {
    ptinit: function () {
      this.princeton = new WebSocket(this.url)
      this.princeton.onopen = this.ptopen
      this.princeton.onmessage = this.ptmsg
      this.princeton.onclose = this.ptcls
      this.princeton.onerror = this.pterro
      this.princeton.onpong = this.ptpong
      this.danmakus = []
    },
    ptopen: function (evt) {
      console.log('pt open')
      console.info(evt)
      this.$http.get(this.hisurl)
        .then(function (res) {
          console.log(res)
          this.danmakus = [...this.dealhis(res.body.data), ...this.danmakus]
        }, function (e) {
          console.log(e)
        })
    },
    ptpong: function () {
      var slf = this
      for (var i in slf.princeton.rmt) {
        clearTimeout(slf.princeton.rmt[i])
      }
      slf.princeton.rmt = []
      console.log('清除了定时器')
      slf.princeton.rmt.push = setTimeout(function () {
        console.log('失恋了')
        console.log(slf.princeton)
        slf.princeton.close()
        console.log('尝试重启')
        slf.ptinit()
      },30000)
    },
    ptmsg: function (evt) {
      console.log('pt msg')
      console.log('type:'+(typeof evt.data))
      if (typeof evt.data === 'string') {
        console.log('rec:' + evt.data)
        var dtmp = this.dealable(evt.data)
        console.log('after deal:' + dtmp)
        this.danmakus.push(dtmp)
        if (this.bot.isOnHook) {
          if (dtmp.indexOf(this.bot.last) === -1) {
            setTimeout(this.botalk, 1000, dtmp)
          }
        }
      } else if (evt.data instanceof ArrayBuffer) {
        console.log('rec ArrayBuffer')
      } else if (evt.data instanceof Blob) {
        console.log('rec Blob')
        console.info(new Date())
        this.ptpong()
      }
    },
    ptcls: function (evt) {
      console.log('pt close')
    },
    pterro: function (evt) {
      console.log(evt)
      console.log('the msg:')
      console.log(this.danmaku)
      console.log('maybe fail to send')
    },
    ptsend: function (str) {
      var sendmsg = this.danmaku || str
      this.danmaku = ''
      if (sendmsg === '\n' || sendmsg === '') return 0
      console.info('tring to send:' + sendmsg)
      this.bot.last = sendmsg
      this.princeton.send(sendmsg)
    },
    botalk: function (str) {
      var vm = this
      vm.$http.get(vm.bot.url + '?key=' +vm.bot.key + '&info=' + str + '&userid=' + this.bot.id)
        .then(function (res) {
          var jsn = res.data
          var ret = jsn.text
          console.log('bot feedback:' + ret)
          vm.ptsend(ret)
        }, function (e) {
          console.log(e)
        })
    },
    dealhis: function (his) {
      var ret = []
      for (let i in his) {
        var str = ''
        str += his[i].nickname
        str += ': '
        str +=his[i].message
        ret.push(str)
      }
      return ret
    },
    dealable: function (raw) {
      var lbl = document.createElement('div')
      lbl.innerHTML = raw
      return lbl.innerHTML
    }
  },
  computed: {
    danmakusHTML: function () {
      return '<div class="dpic">' + this.danmakus.join('</div><div class="dpic">') + '</div>'
    }
  },
  watch: {
    danmaku: function (n, o) {
      if (n.length > this.limit_hit) {
        this.danmaku = o
      }
    }
  },
  mounted: function (){
    this.$nextTick(function () {
      this.ptinit()
      this.bot.id = (~~(Math.random()*(1<<24))).toString(16)
    })
  },
  beforeDestroy: function() {
    this.princeton.close()
    for (var i in this.princeton.rmt) {
      clearTimeout(this.princeton.rmt[i])
    }
  }
}
</script>
<style>
#princeton {
  background: #f8f8f8;
  border-radius: .41em;
  padding: 2em;
}

#pt-ctl {
  padding: 0;
}

.pt-in-ctl {
  position: relative;
}

.ptin {
  resize: none;
  width: 100%;
  height: 56px;
  border: 1px solid #eaeaea;
  background: #fff;
  border-radius: 4px;
  padding: .41em;
  overflow: hidden;
  font-size: 12px;
}

.ptin::-webkit-input-placeholder {
  color: #ccc;
}

.ptin:focus {
  border-color: #6cf;
  outline: 0;
  box-shadow: none;
}

#princeton .limit-hit {
  position: absolute;
  font-size: 12px;
  line-height: 12px;
  color: #ccc;
  bottom: 1em;
  right: 1em;
}

#huiban {
  display: flex;
  flex-direction: column-reverse;
  height: auto;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1em;
}

#huiban::-webkit-scrollbar {
  width: 5px;
  height: 9px;
}

#huiban::-webkit-scrollbar-track {
  background: #ccc;
}

#huiban::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #bbb;
}

#huiban #html-container {
  padding: 1em;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
  overflow-y: visible;
  color: #233;
  height: 300px;
}

#huiban #html-container div.dpic {
  transition: all .41s;
}

#huiban #html-container div.dpic:hover {
  cursor: pointer;
  background: #eee;
  border-radius: .41em;
}

.pt-btns {
  position: relative;
  margin-top: 1em;
  height: 2em;
}

.hit-btn,.hook-btn {
  display: block;
  position: absolute;
  min-width: 7em;
  height: 2.5em;
  line-height: 2.5em;
  text-align: center;
  font-size: 12px;
  clear: both;
  background: #ccc;
  color: #fff;
  border-radius: .41em;
  transition: all .41s;
  cursor: not-allowed;
}

.hit-btn {
  right: 0;
}

.hook-btn {
  left: 0;
}

.notban {
  cursor: pointer;
}

.hit-btn.notban,.hook-btn.onhook {
  background: #5cf;
}

.hit-btn.notban:hover,.hook-btn.onhook:hover {
  background: #6cf;
}

.hook-btn {
  cursor: pointer;
}
</style>
