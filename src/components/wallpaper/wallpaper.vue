<template>
  <div id="particles-js">
  </div>
</template>
<script>
import parclesJS from 'particles.js'
var Alex = function () {
  particlesJS('particles-js',{
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#000"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ccc",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }),
  function () {
    console.log('hhh')
  }
}
export default {
  name: 'wallpaper',
  methods: {
    destroyW: function () {
      if (! window.pJSDom[0]) return
      window.pJSDom[0].pJS.fn.vendors.destroypJS()
      window['pJSDom'] = []
    },
    stop: function () {
      window.localStorage.setItem('wallpaper-run', 'false')
      this.destroyW()
    },
    start: function () {
      window.localStorage.setItem('wallpaper-run', 'true')
      window.Alex()
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      var isrun = window.localStorage.getItem('wallpaper-run')
      window.Alex = Alex
      if (isrun && isrun === 'false') return
      this.start()
    })
  },
  beforeDestroy: function () {
    this.destroyW()
  }
}
</script>
<style lang="less" scoped>
#particles-js {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 100%;
}
</style>

