<template>
  <div id="princeton">
    <div id="huiban"><div id="html-container" v-html="dankmusHTML"></div></div>
    <div id="pt-ctl">
      <div class="pt-in-ctl">
        <textarea class="ptin" v-model="dankmu" @keyup.enter="ptsend" placeholder="DA ZE">
        </textarea>
        <span class="limit-hit">{{dankmu.length}}/{{limit_hit}}</span>
      </div>
      <div class="pt-btns">
        <div class="hook-btn" :class="{'onhook': this.bot.isOnHook}" @click="bot.isOnHook = !bot.isOnHook">hook</div>
        <div class="hit-btn" :class="{'notban': this.dankmu !== ''}" @click="ptsend">发射电波</div>
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
      dankmu: '',
      dankmus: [],
      limit_hit: 140,
      princeton: 0,
      url: 'ws://111.231.98.20:8001',
      bot:{
        url: 'http://www.tuling123.com/openapi/api',
        key: '0c4268644cdd47169b9966949e3dd707',
        id: '',
        isOnHook: false
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
    },
    ptopen: function (evt) {
      console.log('pt open')
      console.info(evt)
    },
    ptpong: function () {
      var slf = this
      clearTimeout(self.princeton.rmt)
      self.princeton.rmt = setTimeout(function () {
        console.log('失恋了')
        console.log(slf.princeton)
        slf.princeton.close()
        console.log('尝试重启')
        slf.ptinit()
      },40000)
    },
    ptmsg: function (evt) {
      console.log('pt msg')
      console.log('type:'+(typeof evt.data))
      if (typeof evt.data === 'string') {
        console.log('rec:' + evt.data)
        this.dankmus.push(evt.data)
        if (this.bot.isOnHook) {
          this.botalk(evt.data)
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
      console.log(this.dankmu)
      console.log('maybe fail to send')
    },
    ptsend: function () {
      var sendmsg = this.dankmu
      this.dankmu = ''
      if (sendmsg === '\n' || sendmsg === '') return 0
      console.info('tring to send:' + sendmsg)
      this.princeton.send(sendmsg)
    },
    botalk: function (str) {
      console.log(str)
      this.$http.post(this.bot.url, {
          'key': this.bot.key,
          'info': str,
          'userid': '123'
        })
        .then(function (res) {
          var jsn = eval('(' + res.data + ')')
          var ret = jsn.text
          this.ptsend(ret)
        }, function (e) {
          console.log(e)
        })
    }
  },
  computed: {
    dankmusHTML: function () {
      return '<div class="dpic">' + this.dankmus.join('</div><div class="dpic">') + '</div>'
    }
  },
  watch: {
    dankmu: function (n, o) {
      if (n.length > this.limit_hit) {
        this.dankmu = o
      }
    }
  },
  mounted: function (){
    this.$nextTick(function () {
      this.ptinit()
    })
  },
  beforeDestroy: function() {
    this.princeton.close()
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


