<template>
<div>
  <slot>
  </slot>
  <div id="mayoi" :class="mayoiclass">
    <div class="btnup" @click="sCls('normal')">
      <span class="glyphicon glyphicon-chevron-up"></span>
    </div>
    <div class="btnnb" @click="sCls('minb')">
      <span class="glyphicon glyphicon-chevron-down"></span>
    </div>
    <input @keyup.enter="hit" v-model="user_cmd_lines.inputing"/>
    <pre id="display">{{screen.display}}</pre>
  </div>
</div>
</template>
<script>
class Screen {
  constructor (name) {
    this.name = name
    this.screenbuffer = ''
  }
}
export default {
  name: 'mayoi',
  data: function () {
    return {
      dobikey: 'mayoi',
      version: '0.1.34279',
      mayoiclass: 'minb',
      user_cmd_lines: {
        history: ['history'],
        staticmpt: 'mayoi:/#',
        prompt: 'mayoi:/#',
        inputing: 'mayoi:/#',
        run: '',
        isGetLine: false,
        getLines: [''],
        promise: function (argc, argv, envp) {
        }
      },
      screen: {
        display: 'mayoi shell 0.1.34279\ncopyright (c) mayoi\n',
        pos: 0,
        count: 0,
        screens: [new Screen('default')]
      },
      sys: {
        bin: {
          'echo': {
            name: 'echo',
            func: function (argc, argv, evnp) {
              var vm = evnp[0]
              if (argc === 2) {
                var ret = `${argv[1]}\n`
                vm.screen_add_str(ret)
                return ret
              }
            }
          },
          'not_found': {
            name: 'not_found',
            func: function (argc, argv, envp) {
              var vm = envp[0]
              var ret = `mayoi: ${argv[0]}: command not found\n`
              vm.screen_add_str(ret)
              return ret
            }
          },
          'date': {
            name: 'date',
            func: function (argc, argv, envp) {
              var vm = envp[0]
              var ret = (new Date()).toString()
              ret += '\n'
              vm.screen_add_str(ret)
              return ret
            }
          },
          'mayoi': {
            name: 'mayoi',
            func: function (argc, argv, envp) {
              var vm = envp[0]
              var ret = `mayoi ${vm.version}\n`
              vm.screen_add_str(ret)
              return ret
            }
          },
          'history': {
            name: 'history',
            func: function (argc, argv, envp) {
              var vm = envp[0]
              if (argc !== 1) {
                var badArgument = argv[1]
                var badRet = `mayoi: history: ${badArgument}: numeric argument required\n`
                vm.screen_add_str(badRet)
                return badRet
              }
              var ret = vm.user_cmd_lines.history.join('\n')
              vm.screen_add_str(ret)
              return ret
            }
          },
          'clear': {
            name: 'clear',
            func: function (argc, argv, envp) {
              var vm = envp[0]
              var ret = vm.screen.display
              vm.screen.screens[vm.screen.pos].screenbuffer = ''
              vm.screen.count++
              return ret
            }
          },
          'getline': {
            name: 'getline',
            func: function (argc, argv, envp) {
              // argv[1]:prompt
              var vm = envp[0]
              var mpt = argc > 1 ? argv[1] : '?:'
              vm.user_cmd_lines.isGetLine = true
              var promise = function (c, v, e) {
                console.log(v.join(''))
              }
              vm.getline(mpt, promise)
              return 0
            }
          },
          'host': {
            name: 'host',
            func: () => {
              console.log(`${window.noPointHost}`)
            }
          },
          '金坷垃好处都有啥': {
            name: '金坷垃好处都有啥',
            func: () => {
              [].forEach.call($('*'), function (a) {
                a.style.outline = "1px solid #" + (~~(Math.random()*(1<<24))).toString(16)
              })
            }
          },
          '吸收地下两千米氮磷钾': {
            name: '吸收地下两千米氮磷钾',
            func: () => {
              [].forEach.call($('*'), (a) => a.style.outline = '')
            }
          },
          'help': {
            name: 'help',
            func: (argc, argv, envp) => {
              var vm = envp[0]
              if (argc === 1) {
                var ret = 
`clear: clear screen
date: get date
echo [arg...]: echo string
history: get history cmds
金坷垃好处都有啥: 谁说对了就给他
吸收地下两千米氮磷钾: 小麦亩产一千八
`
                vm.screen_add_str(ret)
                return ret
              }
            }
          }
        }
      }
    }
  },
  methods: {
    sCls: function (cls) {
      this.mayoiclass = cls
    },
    hit: function () {
      this.screen_add_str(this.user_cmd_lines.inputing+'\n')
      this.user_cmd_lines.run = this.user_cmd_lines.inputing.split(this.user_cmd_lines.prompt)[1]
      this.user_cmd_lines.inputing = ''
      var runTmp = this.user_cmd_lines.run
      var argvTmp = this.cmd_split(runTmp)
      console.log(argvTmp)
      var argcTmp = argvTmp.length
      var envpTmp = [this]
      if (this.user_cmd_lines.isGetLine) {
        this.user_cmd_lines.getLines.push(runTmp)
        this.user_cmd_lines.isGetLine = false
        this.user_cmd_lines.run = ''
        this.user_cmd_lines.promise(argcTmp, argvTmp, envpTmp)
        this.user_cmd_lines.prompt = this.user_cmd_lines.staticmpt
        return
      }
      if (this.sys.bin[argvTmp[0]]) {
        this.sys.bin[argvTmp[0]].func(argcTmp, argvTmp, envpTmp)
      } else {
        this.sys.bin['not_found'].func(argcTmp, argvTmp, envpTmp)
      }
      this.user_cmd_lines.history.push(this.user_cmd_lines.run)
      this.user_cmd_lines.run = ''
    },
    cmd_split: function (str) {
      return str.split(' ')
    },
    message_bus: function () {
    },
    screen_add_str: function (str) {
      console.log(str)
      this.screen.screens[this.screen.pos].screenbuffer += str
      this.screen.count++
    },
    getline: function (mpt, promise) {
      this.user_cmd_lines.prompt = mpt
      this.user_cmd_lines.isGetLine = true
      this.user_cmd_lines.promise = promise
    }
  },
  watch: {
    'screen.count': function (newv, oldv) {
      this.screen.display = this.screen.screens[this.screen.pos].screenbuffer
    },
    dobikey: function () {
      console.log('mayoi change')
    },
    'user_cmd_lines.inputing': function (newv, oldv) {
      var legal = this.user_cmd_lines.prompt
      if (newv.indexOf(legal) !== 0) {
        this.user_cmd_lines.inputing = legal
      }
    }
  }
}
</script>
<style>
#mayoi {
  position: fixed;
  left: 0;
  bottom: 0;
  border-top: 1.82em solid #ccc;
  display: flex;
  text-align: left;
  flex-direction: column-reverse;
  width:480px;
  height: 200px;
  overflow-y: auto;
  background: #000;
  color: #fff;
  opacity: .41;
  padding: 1em;
  transition: all 1.41s;
}

#mayoi .btnnb {
  transition: all 1.41s;
}

#mayoi.normal {
  min-height: 100px;
  opacity: .82;
  overflow-y: auto;
  overflow-x: hidden;
}

#mayoi.normal .btnnb {
  position: fixed;
  height: 1.82em;
  margin-left: -3em;
  margin-bottom: -1.82em;
  left: 480px;
  bottom: 200px;
  background: #111;
}

#mayoi.minb {
  overflow: hidden;
  border: 0;
  height: 1.82em;
  line-height: 1em;
  margin: 0;
  padding: .41em 1em;
}

#mayoi.minb .btnup,
#mayoi.normal .btnnb {
  display: block;
  height: 1.82em;
  width: 3em;
  text-align: center;
  line-height: 1.82em;
  cursor: pointer;
}

#mayoi.minb .btnup {
  position: absolute;
  background: #888;
  bottom: 0;
  right: 0;
}

#mayoi.minb .btnnb {
  display: fixed;
  visibility: hidden;
  bottom: 0;
  margin-bottom: -1.21em;
  margin-left: -3em;
  left: 480px;
}

#mayoi.minb pre {
  display: none;
}

#mayoi.normal .btnup {
  display: none;
}

#mayoi input {
  border: none;
  outline: none;
  transition: all .41s;
  font-size: 13px;
  background: #000;
}

#mayoi input:focus {
  border-left: 4px solid #ccc;
}

#mayoi pre {
  overflow: visible;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  color: #fff;
}

#mayoi::-webkit-scrollbar {
  width: 5px;
  height: 9px;
}

#mayoi::-webkit-scrollbar-track {
  background: #000;
}

#mayoi::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #fff;
}
</style>
