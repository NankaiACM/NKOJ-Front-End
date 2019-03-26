<template>
  <div class="b">
    <div class="c">
      <span>{{supitem}}</span><div class="w"><input class="r" placeholder="竞赛 ID" v-model="supId" id="info2"></div>
      <template v-for="(item, index) in subId">
        <span>
          <span class="cross" @click="push">+</span>
          <span class="minus" @click="minus(index)">-</span>
          {{subitem}}
        </span>
        <div class="w"><input class="r" placeholder="用户 ID" v-model="subId[index]"></div>
      </template>
      <div class="a" @click="add">添加</div><div class="d" @click="rm">删除</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'rmadd',
  props: ['supitem', 'subitem', 'addAPI', 'rmAPI'],
  data: function () {
    return {
      subId: ['1'],
      supId: '1007'
    }
  },
  methods: {
    add: function () {
      for (let id of this.subId) {
        this.$store.commit('setNotify', {
          title: 'status:',
          message: 'waiting...'
        })
        this.$http.get(window.noPointHost + '/api/admin/contest/' + this.supId + this.addAPI + id)
          .then(function (r) {
            this.$store.commit('setNotify', {
              title: 'res:',
              message: JSON.stringify(r.body, null, 2)
            })
          }, function (e) {
            this.$store.commit('setNotify', {
              title: 'res:',
              message: JSON.stringify(e.body, null, 2)
            })
          })
      }
    },
    rm: function () {
      for (let id of this.subId) {
        this.$store.commit('setNotify', {
          title: 'status:',
          message: 'waiting...'
        })
        this.$http.get(window.noPointHost + '/api/admin/contest/' + this.supId + this.rmAPI + id)
          .then(function (r) {
            this.$store.commit('setNotify', {
              title: 'res:',
              message: JSON.stringify(r.body, null, 2)
            })
          }, function (e) {
            this.$store.commit('setNotify', {
              title: 'res:',
              message: JSON.stringify(e.body, null, 2)
            })
          })
      }
    },
    push: function () {
      this.subId.push('1')
    },
    minus: function (pos) {
      this.subId.splice(pos, 1)
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.supId = this.$route.params.id
    }
  }
}
</script>
<style lang="less" scoped>
* {
  transition: all .41s;
}

.b {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  /* top: 0; */
  min-height: 100%;
  flex-direction: column;
  padding: 60px 0;
  input {
    outline: none;
  }
  .c {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 3em 1em;
    display: grid;
    grid-template-columns: 200px 200px;
    grid-template-rows: auto;
    align-items: center;
    justify-items: center;
    grid-row-gap: 2em;
    grid-column-gap: 2em;
    .cross, .minus {
      display: inline-block;
      border-radius: 50%;
      height: 20px;
      width: 20px;
      line-height: 20px;
      text-align: center;
      border: #ccc 1px solid;
      color: #ccc;
      cursor: pointer;
      &:hover {
        border-color: #2cbfec;
        color: #2cbfec;
      }
    }
    .minus {
      margin-right: 1em;
    }
    .w {
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      &::after {
        position: absolute;
        display: block;
        content: ' ';
        left: 0;
        top: 100%;
        width: 1px;
        height: 1px;
        background: #e5e5e5;
        transition: all .41s;
      }
      &:hover::after {
        width: 100%;
        background: #2cbfec;
      }
    }
    .a, .d {
      border: 1px solid #e5e5e5;
      padding: .4em 1em;
      border-radius: 4px;
      cursor: pointer;
    }
    .a {
      justify-self: end;

      &:hover {
        color: #2cbfec;
        border-color: #2cbfec;
      }
    }
    .d {
      justify-self: start;
      &:hover {
        color: #c24f4a;
        border-color: #c24f4a;
      }
    }
  }
}
</style>
