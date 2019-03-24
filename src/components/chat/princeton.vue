<template>
  <div id="princeton" class="home-component">
    <home-component :title="'聊天室'">
      <hr class="hr">
      <div class="danmaku-wrapper">
        <div>
          <div id="huiban" class="ptin html-container" v-html="danmakusHTML"></div>
        </div>
        <div id="pt-ctl">
          <div class="pt-in-ctl">
        <textarea class="ptin" v-model="danmaku" @keyup.enter="ptsend" placeholder="DA ZE">
        </textarea>
            <span class="limit-hit">{{danmaku.length}}/{{limit_hit}}</span>
          </div>
          <div class="pt-btns">
            <div class="hook-btn" :class="{'onhook': this.bot.isOnHook}" @click="bot.isOnHook = !bot.isOnHook">hook
            </div>
            <div class="hit-btn" :class="{'notban': this.danmaku !== ''}" @click="ptsend">发射电波</div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </home-component>
  </div>
</template>
<script>
import homeComponent from '../home/homeComponent.vue'
export default {
  name: 'princeton',
  components: {homeComponent},
  data: function () {
    return {
      danmaku: '',
      danmakus: [],
      limit_hit: 140,
      princeton: 0,
      url: 'ws://222.30.51.68',
      hisurl: noPointHost + '/api/danmaku',
      bot: {
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
      const ws = new WebSocket(this.url)
      ws.binaryType = 'arraybuffer'
      ws.onopen = this.ptopen
      ws.onmessage = this.ptmsg
      ws.onclose = this.ptcls
      ws.onerror = this.pterro
      this.princeton = ws
      this.danmakus = []
    },
    ptopen: function (evt) {
      console.log('pt open')
      // console.info(evt)
      this.$http.get(this.hisurl)
        .then(function (res) {
          // console.log(res)
          this.danmakus = [...this.dealhis(res.body.data), ...this.danmakus]
          this.danmakus = this.danmakus.reverse()
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
      }, 30000)
    },
    ptmsg: function (evt) {
      console.log('pt msg')
      console.log('type:' + (typeof evt.data))
      console.log(evt)
      if (typeof evt.data === 'string') {
        console.log('rec:' + evt.data)
        var dtmp = this.dealable(evt.data)
        console.log('after deal:' + dtmp)
        this.danmakus.push(dtmp)
        if (this.bot.isOnHook) {
          if (dtmp.indexOf(this.bot.last) === -1) {
            console.log('call bot')
            setTimeout(this.botalk, 1000, dtmp)
          }
        }
      } else if (evt.data instanceof ArrayBuffer) {
        console.log('rec ArrayBuffer')
        this.formMessage(evt.data)
      } else if (evt.data instanceof Blob) {
        console.log('rec Blob')
      }
      this.ptpong()
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
      if (typeof str !== 'string') str = ''
      var sendmsg = this.danmaku || str
      this.danmaku = ''
      if (sendmsg === '\n' || sendmsg === '') return 0
      console.info('tring to send:' + sendmsg)
      this.bot.last = sendmsg
      this.princeton.send(sendmsg)
    },
    botalk: function (str) {
      var vm = this
      vm.$http.get(vm.bot.url + '?key=' + vm.bot.key + '&info=' + str + '&userid=' + this.bot.id)
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
        str += his[i].message
        ret.push(str)
      }
      return ret
    },
    dealable: function (raw) {
      var lbl = document.createElement('div')
      lbl.innerHTML = raw
      return lbl.innerHTML
    },
    formMessage: function (arr) {
      var blob = new Uint8Array(arr)
      var type = blob[0]
      if (type !== 0x02) return
      var admin = blob[1]
      var color = blob[2]
      var ulen = blob[3]
      var mlen = blob[3 + ulen]
      var decoder = new TextDecoder('utf-8')
      var user = decoder.decode(blob.slice(4, 4 + ulen))
      var message = this.dealable(decoder.decode(blob.slice(5 + ulen, 5 + ulen + mlen)))
      let n = `<span class="user-${color}">${admin ? '[管]' : ''}${user}</span>: ${message}`
      this.danmakus = [n, ...this.danmakus]
      // Color Schema: https://github.com/hukl/Smyck-Color-Scheme/blob/master/colors

      if (this.bot.isOnHook) { // call bot talk
        let dtmp = message
        if (dtmp.indexOf(this.bot.last) === -1) {
          setTimeout(this.botalk, 1000, dtmp)
        }
      }
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
  mounted: function () {
    this.$nextTick(function () {
      this.ptinit()
      this.bot.id = (~~(Math.random() * (1 << 24))).toString(16)
    })
  },
  beforeDestroy: function () {
    this.princeton.close()
    for (var i in this.princeton.rmt) {
      clearTimeout(this.princeton.rmt[i])
    }
  }
}
</script>
<style>
.danmaku-wrapper {
  opacity: 0.9;
  border-radius: .41em;
  padding: 2em;
  max-width: 380px;
  margin: auto;
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
  background: none;
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

#huiban.html-container {
  padding: 1em;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
  overflow-y: visible;
  color: #233;
  height: 300px;
}

#huiban.html-container div.dpic {
  transition: all .41s;
}

#huiban.html-container div.dpic:hover {
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
  background: none;
  font-weight: 500;
  color: rgb(44, 62, 80);
  border: 1px #6cf solid;
  border-radius: 0.41em;
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
  background: #8df;
  color: white;
}

.hit-btn.notban:hover,.hook-btn.onhook:hover {
  background: #6df;
  color: white;
}

.hook-btn {
  cursor: pointer;
}

.user-0 {
  color: #000000;
}

.user-1 {
  color: #C75646;
}

.user-2 {
  color: #8EB33B;
}

.user-3 {
  color: #D0B03C;
}

.user-4 {
  color: #4E90A7;
}

.user-5 {
  color: #C8A0D1;
}

.user-6 {
  color: #218693;
}

.user-7 {
  color: #B0B0B0;
}

.user-8 {
  color: #5D5D5D;
}

.user-9 {
  color: #E09690;
}

.user-10 {
  color: #CDEE69;
}

.user-11 {
  color: #FFE377;
}

.user-12 {
  color: #9CD9F0;
}

.user-13 {
  color: #FBB1F9;
}

.user-14 {
  color: #77DFD8;
}

.user-15 {
  color: #F7F7F7;
}
</style>
