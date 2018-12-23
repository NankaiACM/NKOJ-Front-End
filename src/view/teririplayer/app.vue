<template>
<div id="teririid">
  <div id="wrap" class="hero is-clipped">
    <nav class="navbar is-success">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <a class="navbar-item" href="/">
            主站
          </a>
        </div>
      </div>
    </nav>
    <div class="level content">
      <div class="container">
        <header>
          <h4>{{title}}</h4>
          <p class="is-medium">播放量: {{~~(Math.random() * 100)}}</p>
        </header>
        <div class="columns">
          <div class="column">
            <hr>
            <video id="teriri" class="vjs-matrix video-js">
            </video>
          </div>
          <div class="column is-one-quarter">
            <div class="tabs">
              <ul>
                <li class="is-active"><a>所有视频</a></li>
                <li><a>何もない</a></li>
              </ul>
            </div>
            <div>
              <div class="level is-pointer" v-for="(item, index) in list"  :key="index" @click="setsrc(index)">
                <div class="level-left">
                  <figure class="image">
                    <img src="./img_loading.png">
                  </figure>
                </div>
                <div class="level-right">
                  {{format(item)}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import videojs from 'video.js';
export default {
  name: 'teririplayer',
  data () {
    return {
      teririr: [],
      list: [],
      title: '魔法少女teriri',
    };
  },
  mounted () {
    this.$nextTick(async function () {
      document.querySelector('head').removeChild(document.querySelector('#bs3'));
      let l1 = document.createElement('link');
      let l2 = document.createElement('link');
      l1.type = l2.type = 'text/css';
      l1.rel = l2.rel = 'stylesheet';
      l1.href = '/static/bulma.min.css';
      document.querySelector('head').appendChild(l1);
      l2.href = '/static/video-js.min.css';
      document.querySelector('head').appendChild(l2);
      this.teriri = videojs('teriri', {
        controls: true,
        autoplay: false,
        preload: 'auto'
      });
      this.list = await this.aget('http://acm.nankai.edu.cn/api/video/list');
      this.setsrc(0);
    });
  },
  methods: {
    videourl (name) {
      return 'http://acm.nankai.edu.cn/api/video' + name;
    },
    setsrc (index) {
      this.teriri.src(this.videourl(this.list[index]));
      this.title = this.format(this.list[index]);
    },
    format (raw) {
      const str = raw.split('/');
      return str[str.length - 1];
    },
    aget (api) {
      let vm = this;
      return new Promise(function (resolve, reject) {
        vm.$http
          .get(api)
          .then(function (res) {
            if (res.body.code ===0) {
              resolve(res.body.data);
            } else {
              reject(res.body.data);
            }
          }, function (err) {
            reject(err);
          });
      });
    }
  }
}
</script>
<style lang="less">
// @import './bulma.min.css';
// @import './video-js.min.css';
#teririid {
#wrap {
  background: url('./2018-04-17.jpg') 0 / cover scroll;
  background-position: 0% 0%;
}
.navbar::before {
  content: '';
  background: url('./2018-04-17-1.jpg') 0 / cover scroll;
  background-position: 0% 0%;
  position: absolute;
  height: 100%;
  width: 100%;
}
.navbar {
  margin-bottom: 111px;
  position: relative;
  background: rgba(255,255,255,.41);
}
header {
  position: relative;
}
#teriri {
  width: 100%;
}
.content {
  background: #fff;
  padding: 3em 2em;
}
.is-pointer {
  cursor: pointer;
}
/* Change all text and icon colors in the player. */
.vjs-matrix.video-js {
  color: #fff;
}

/* Change the border of the big play button. */
.vjs-matrix .vjs-big-play-button {
  background: none;
  top: 50%;
  left: 50%;
  border: none;
  margin-left: -1.5em;
  margin-top: -1.25em;
  border-radius: 0;
}

.vjs-matrix .vjs-big-play-button:hover,
.vjs-matrix:hover .vjs-big-play-button {
  background: none;
}

/* Change the color of various "bars". */
.vjs-matrix .vjs-volume-level,
.vjs-matrix .vjs-play-progress,
.vjs-matrix .vjs-slider-bar {
  background: #fff;
}
}
</style>

