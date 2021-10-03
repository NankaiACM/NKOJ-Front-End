<template>
  <div class="activity has-div-center" @mousemove="akari" ref="makari">
    <pre class="pre" ref="pre">
      {{code}}
    </pre>
    <canvas id="canvas"></canvas>
    <div class="part1 has-div-center" ref="akari">
      <p class="has-text-white title is-init" ref="title">
        Nankai University Programming Contest 15 is Upcomming!
      </p>
      <br>
      <p class="has-text-white has-text-center subtitle is-init" ref="subtitle">
        第十五届 “我为程序狂” 南开大学程序设计竞赛就要开始啦！
      </p>
      <br>
      <div class="button is-init has-background-none has-text-white" ref="field" @click="wdttdwl">
        {{ islogin ? '现在报名' : '现在登录'}}
      </div>
    </div>
    <div class="has-text-white pick"><span @click="pick">收  起</span> | <span @click="hide">不再显示</span></div>
  </div>
</template>
<style lang="less" scoped>
.activity {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 5;
  opacity: .98;
  overflow: hidden;
}
pre, canvas {
  position: absolute;
  left: 0;
  top: 0;
}
pre {
  left: -50vw;
  top: -50vh;
  width: 200vw;
  height: 200vh;
  padding: 55vh 75vw;
}
canvas#canvas {
  width: 100vw;
  height: 100vh;
  background: rgba(54, 54, 54, 1) !important;
  opacity: .9;
}
.pick {
  position: fixed;
  bottom: 2em;
  cursor: pointer;
  span:hover {
    color: #6cf;
  }
}
.part1 {
  position: absolute;
  .title {
    font-size: 3rem;
  }
  .subtitle {
    font-size: 1.25rem;
  }
  .button {
    border: 2px solid #fff;
    border-radius: 4px;
    cursor: pointer;
    padding: 1rem 1.5rem;
  }
}
.has-background-none {
  background: none !important;
}
.has-div-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.has-text-white {
  color: #fff;
}
.has-text-center {
  text-align: center;
}
.is-init {
  position: relative;
  top: -100px;
  opacity: 0;
}
</style>
<script>
export default {
  name: 'activity',
  mounted () {
    this.$nextTick(() => {
      Velocity(this.$refs.title, {
        translateY: '50px',
        opacity: 1
      }, {
        easing: 'easeOutSine',
        duration: 1000
      })
      Velocity(this.$refs.subtitle, {
        translateY: '75px',
        opacity: 1
      }, {
        easing: 'easeOutSine',
        duration: 1250
      })
      Velocity(this.$refs.field, {
        translateY: '80px',
        opacity: 1
      }, {
        easing: 'easeOutSine',
        duration: 1500
      })
      Velocity(this.$refs.pre, {
        translateY: -window.innerHeight / 2
      }, {
        duration: 16000,
        loop: 2
      })
      init()
    })
  },
  methods: {
    akari: function (event) {
      const tranY = (event.clientX / window.innerWidth - 0.5) * 15
      const tranX = (event.clientY / window.innerHeight - 0.5) * -15
      this.$refs.akari.style.transform = `rotateX(${tranX}deg) rotateY(${tranY}deg)`
      /*
      Velocity(this.$refs.akari, {
        rotateX: tranX + 'deg',
        rotateY: tranY + 'deg'
      }, {
        duration: 0
      })
      */
    },
    wdttdwl () {
      if (this.islogin) { window.open(window.location.origin + '/nkpc.html#/', '_blank') } else { this.$emit('logIn') }
    },
    pick () {
      window.isplay = false
      Velocity(this.$refs.makari, {
        translateY: -window.innerHeight * 2
      }, {
        duration: 2141
      })
    },
    hide () {
      localStorage.setItem('activity', 'hide')
      this.pick()
    }
  },
  beforeDestroy () {
    uninstall()
  },
  computed: {
    islogin () {
      return this.$store.state.userData.isLogin
    }
  },
  data: function () {
    return {
      code: `
#include <bits/stdc++.h>

using namespace std;

char s[3000000], t[3000];
int l1, l2;
int z[3000 + 3000000];
int val[3000 + 3000000];
int nxt[3030];
const int N = 3000010;

void get_nxt(char T[], int nt[])
{
    int j = 1;
    nt[0] = 0;
    for (int i = 1, j = 0; i < l2; i++)
    {
        while (j && T[i] != T[j])
            j = nt[j - 1];
        if (T[i] == T[j])
            j++;
        nt[i] = j;
    }
}

struct Node
{
    long long v;
} tree[3000010];

void push_up(int x)
{
    tree[x].v = tree[x * 2].v + tree[x * 2 + 1].v;
}
void build_tree(int x, int l, int r)
{
    if (l == r)
    {
        tree[x].v = val[l];
        return;
    }
    int mid = (l + r) >> 1;
    build_tree(x * 2, l, mid);
    build_tree(x * 2 + 1, mid + 1, r);
    push_up(x);
    return;
}
void Change(int x, int l, int r, int cop)
{
    if (l == r)
    {
        tree[x].v = val[l];
        return;
    }
    int mid = (l + r) >> 1;
    if (cop <= mid)
        Change(x * 2, l, mid, cop);
    else
        Change(x * 2 + 1, mid + 1, r, cop);
    push_up(x);
    return;
}
long long query(int x, int l, int r, int ll, int rr)
{
    if (rr < ll)
    {
        return 0LL;
    }
    if (l >= ll && r <= rr)
    {
        return tree[x].v;
    }
    int mid = (r + l) >> 1;
    long long ans = 0;
    if (rr > mid)
    {
        ans += query(x * 2 + 1, mid + 1, r, ll, rr);
    }
    if (ll <= mid)
    {
        ans += query(x * 2, l, mid, ll, rr);
    }
    return ans;
}

void kmp(char S[], char T[], int nt[], int len, int vl[])
{
    int sn = min(len, l1), tn = l2;
    for (int i = 0, j = 0; i < sn; i++)
    {
        while (j && S[i] != T[j])
            j = nt[j - 1];
        if (S[i] == T[j])
            j++;
        if (j == tn)
        {
            vl[i - j + 1] = 1;
            j = nt[j - 1];
        }
    }
}
void print(int x, int l, int r)
{
    cout << tree[x].v << " ";
    if (l == r)
    {
        return;
    }
    print(x * 2, l, (l + r) / 2);
    print(x * 2 + 1, (l + r) / 2 + 1, r);
}
void change(int start, int tail)
{
    for (int i = start; i <= tail; i++)
    {
        val[i] = 0;
    }
    kmp(s + start, t + 1, nxt + 1, tail - start + 1 + l2, val + start);
    for (int i = start; i <= tail; i++)
    {
        Change(1, 1, l1, i);
    }
}

int q;

int main()
{
    scanf("%d", &l1);
    scanf("%s", s + 1);
    scanf("%d", &l2);
    scanf("%s", t + 1);
    scanf("%d", &q);

    get_nxt(t + 1, nxt + 1);
    kmp(s + 1, t + 1, nxt + 1, l1, val + 1);
    build_tree(1, 1, l1);
    for (int i = 0; i < q; i++)
    {
        char ch;
        cin >> ch;
        if (ch == 'Q')
        {
            int a, b;
            cin >> a >> b;
            printf("%lld\n", query(1, 1, l1, a, b - l2 + 1));
        }
        else
        {
            int pos;
            char cc;
            cin >> pos >> cc;
            s[pos] = cc;
            change(max(1, pos - l2), pos);
        }
    }
    return 0;
}
`
    }
  }
}

var ref, ctx, reref, rectx, w, h

var fps = 16; var timed = [0, 0]

const lr = []

function resize () {
  w = ref.width = reref.width = window.innerWidth
  h = ref.height = reref.height = window.innerHeight
}

function uninstall () {
  window.isplay = false
  window.removeEventListener('resize', resize)
}

function init () {
  reref = document.querySelector('#canvas')
  rectx = reref.getContext('2d')
  ref = document.createElement('canvas')
  ctx = ref.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.ref = ref
  window.ctx = ctx
  for (let i = 0; i < 10; i++) {
    lr.push({ v: Math.random() + 10, x: 0, y: h / 3 * 2 + 141 * Math.random() })
  }
  timed[0] = new Date().getTime()
  window.isplay = true
  loop()
}

function clear () {
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = 'rgba(54, 54, 54, 0.041)'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'lighter'
}

function loop () {
  draw()
  // console.log('fps: ' + 1000 / (new Date().getTime() - timed[1]));
  timed[1] = new Date().getTime()
  rectx.beginPath()
  rectx.drawImage(ref, 0, 0)
  rectx.closePath()
  if (window.isplay) setTimeout(loop, 1000 / fps)
  // window.requestAnimationFrame(loop);
}

function draw () {
  clear()
  for (const i of lr) {
    const clr = `rgba(${~~(i.v - 1) * 155 + 100}, ${~~(i.x / w * 155) + 100}, ${~~(i.y / h * 255)}, .9)`
    ctx.shadowColor = clr
    ctx.shadowBlur = 5

    ctx.beginPath()
    ctx.strokeStyle = clr
    ctx.lineWidth = 3
    ctx.moveTo(~~i.x, ~~i.y)
    ctx.lineTo(~~(i.x + i.v * 5), ~~i.y)
    ctx.stroke()
    ctx.closePath()

    i.x += i.v * 5

    ctx.beginPath()
    ctx.fillStyle = clr
    ctx.arc(~~i.x, ~~i.y, 1, Math.PI * 2, 0)
    ctx.fill()
    ctx.closePath()

    if (i.x > w) {
      i.x = 0
      i.v = Math.random() * 10 + 10
      i.y = h / 3 * 2 + 141 * Math.random()
    }
  }
}
</script>
