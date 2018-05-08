<template>
  <div id="tlexcon">
  </div>
</template>
<script>
import * as three from 'three.js'
export default {
  name: 'tlex',//threeJS alex
  data: function () {
    return {
      cubes: [],
      cuben: 41,
      dom: 0,
      scene: 0,
      camera: 0,
      renderer: 0,
      light: 0,
      slight: 0,
      scenn: {
        width: 1000,
        height: 1000,
        z: 500
      },
      cubepos: [],
      edges: [],
      path: []
    }
  },
  methods: {
    Kruskal: function (edges, n, m, p) {
      var ret = []
      var find = (x) => p[x] === x ? x : p[x] = find(p[x])
      edges.sort((l, r) => {
        return l.w - r.w
      })
      for (var i = 0; i < n; i ++) p.push(i)
      for (var i = 0; i < m; i ++) {
        console.log(edges[i])
        var u = find(edges[i].u)
        var v = find(edges[i].v)
        if (u === v) continue;
        p[u] = v
        ret.push({u: edges[i].u, v: edges[i].v})
      }
      return ret
    },
    cin: function () {
      var edges = []
      for (var i = 0; i < this.cuben - 1; i ++) {
        for (var j = i + 1; j < this.cuben; j ++) {
          var l = this.cubepos[i]
          var r = this.cubepos[j]
          console.log(j)
          var [dx, dy, dz] = [l.x - r.x, l.y - r.y, l.z - r.z]
          [dx, dy, dz] = [dx * dx, dy * dy, dz * dz]
          var d = Math.sqrt(dx + dy + dz)
          edges.push({
            w: d,
            u: i,
            v: j
          })
        }
      }
      this.edges = edges
      this.path = this.Kruskal(edges, this.cuben, edges.length, [])
    },
    cubesGet: function () {
      var s = this.scenn
      var t = 0.4
      let [w, h, p] = [s.width * t, s.height * t, s.z * t]
      let r = Math.random
      this.cubes = []
      this.cubepos = []
      for (var i = 0;i < this.cuben;i ++) {
        var [x, y, z] = [w * r(), h * r(), p * r() ]
        var box = this.cubeGet()
        box.position.set(x, y, z)
        this.scene.add(box)
        this.cubes.push(box)
        this.cubepos.push({x: x, y: y, z: z})
      }
      this.cin()
    },
    cubeGet: function () {
      var geom = new three.CubeGeometry(5, 5, 5, 1)
      //var geom = new three.BoxGeometry(10, 10, 10)
      //var mate = new three.MeshStandardMaterial({color: 0x66ccff})
      var mate = new three.MeshNormalMaterial()
      return new three.Mesh(geom, mate)
    },
    lineGet: function (len) {
      var [rt, rb, h] = [.3, .3, len]
      var geom = new three.CylinderGeometry(rt, rb, h)
      var mate = new three.MeshNormalMaterial()
      return new three.Mesh(geom, mate)
    },
    roxGet: function (ax, bx) {
      var theta = ax.angleTo(bx)
      var cx = new three.Vector3()
      cx.crossVectors(ax, bx)
      var rox = new three.Matrix4()
      rox.makeRotationAxis(cx.normalize(), theta)
      return rox
    },
    linesGet: function () {
      for (var i = 0;i < this.path.length; i ++) {
        var l = this.path[i].u
        var r = this.path[i].v
        l = this.cubepos[l]
        r = this.cubepos[r]
        var [dx, dy, dz] = [l.x - r.x, l.y - r.y, l.z - r.z]
        var [x, y, z] = [l.x / 2 + r.x / 2, l.y / 2 + r.y / 2, l.z / 2 + r.z / 2]
        var len = Math.sqrt(dx * dx + dy * dy + dz * dz)
        var line = this.lineGet(len)
        line.position.set(x, y, z)
        var ax = new three.Vector3(0, 1, 0)
        var bx = new three.Vector3(dx, dy, dz)
        var rox = this.roxGet(ax, bx)
        rox.multiply(line.matrix)
        line.matrix = rox
        line.rotation.setFromRotationMatrix(line.matrix)
        this.scene.add(line)
      }
      this.rotateCubes()
    },
    rotateCubes: function () {
      for (var i in this.path) {
        var a = this.path[i].u
        var b = this.path[i].v
        var l = this.cubepos[a]
        var r = this.cubepos[b]
        var ax = new three.Vector3(l.x - r.x, l.y - r.y, l.z - r.z)
        var bx = new three.Vector3(0, 1, 0)
        var rox = this.roxGet(ax, bx)
        rox.multiply(this.cubes[b].matrix)
        this.cubes[b].matrix = rox
        this.cubes[b].rotation.setFromRotationMatrix(this.cubes[b].matrix)
      }
    },
    getScenn: function () {
      var a = window.innerHeight
      var b = window.innerWidth
      if (a > b) a = b
      this.scenn.width = a
      /*
      this.scenn.height = window.innerHeight
      this.scenn.z = window.innerWidth / 2 + window.innerHeight / 2
      */
      this.scenn.height = this.scenn.z = this.scenn.width
      
    },
    threeinit: function () {
      this.dom = document.querySelector('#tlexcon')
      this.getScenn()
      this.scene = new three.Scene()
      this.camera = new three.PerspectiveCamera(20, window.innerWidth / window.innerHeight)
      this.camera.position.set(this.scenn.width * 1, this.scenn.height * 1, this.scenn.z * 1)
      this.camera.position.r = 0
      this.camera.lookAt(new three.Vector3(0, 0, 0))
      this.renderer = new three.WebGLRenderer({alpha: true, antialias: true})
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // this.renderer.setPixelRatio(window.devicePixelRatio ?? 1)  //垃圾es6没支持
      this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)  //调整物理像素与绘制像素 1 : 1
      this.dom.appendChild(this.renderer.domElement)
      this.light = new three.AmbientLight(0xffffff, 1)
      this.slight = new three.DirectionalLight(0xffffff, 1)
      this.slight.shadow.camera.near = 1
      this.slight.shadow.camera.far = 1000
      this.slight.shadow.mapSize.width = 2048
      this.slight.shadow.mapSize.height = 2048
      this.scene.add(this.camera)
      this.scene.add(this.light)
      this.scene.add(this.slight)
      this.cubesGet()
      this.linesGet()
      window.addEventListener('resize', this.handleWRize, false)
      this.animate()
    },
    handleWRize: function () {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.getScenn()
    },
    animate: function () {
      this.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    update: function () {
      for (var i in this.path) {
        var a = this.path[i].u
        var b = this.path[i].v
        var l = this.cubepos[a]
        var r = this.cubepos[b]
        var rox = new three.Vector3(l.x - r.x, l.y - r.y, l.z - r.z)
        this.cubes[b].rotateOnAxis(rox, .00001)
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.threeinit()
    })
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleWRize)
  }
}
</script>
<style lang="less" scoped>
</style>
