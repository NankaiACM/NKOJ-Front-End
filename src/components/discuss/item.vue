<template>
<div class="item">
  <div class="block positive" :class="{fill: it.positive > 0}"><span class="count">{{it.positive}}</span><span class="small">positive</span></div>
  <div class="block negative" :class="{fill: it.negative > 0}"><span class="count">{{it.negative}}</span><span class="small">negative</span></div>
  <div class="summary">
    <router-link :to="'/discuss/' + it['post_id']" class="title">{{it.title}}</router-link>
    <div class="info">
      <router-link :to="'/space/uid/' + it['user_id']">{{it['user_id']}}</router-link>
      <span>{{interval(it.since)}} 前发布</span>
      <div v-if="it['last_active_user']">
        <router-link :to="'/space/uid/' + it['user_id']">{{it['last_active_user']}}</router-link>
        <span>{{interval(it["last_active_date"])}} 前评论</span>
      </div>
    </div>
  </div>
  <div>
    <div v-if="$store.getters.usrLogGet && $store.getters.proAddGet" class="opa">
      <div class="opaBtn">
        <span
          @click="dosth('remove', it['post_id'])"
          class="glyphicon glyphicon-trash del">delete</span>
        <br>
        <span
          @click="dosth('recover', it['post_id'])"
          class="glyphicon glyphicon-repeat rev">recover</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>

export default {
  name: 'item',
  props: ['it'],
  methods: {
    interval: function (timestamp) {
      return this.$dayjs(new Date(timestamp), 'x').fromNow()
    },
    dosth: function (opa, id) {
      const vm = this
      vm.$router.mngCP(vm, 'post', opa, id)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  max-width: 960px;
  display: grid;
  grid-template-columns: 50px 50px auto 50px;
  grid-column-gap: 1em;
  border-bottom: 1px solid #eee;
  padding: 1em 0;
  .block {
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
  @pc: #aaa;
  @nc: #aaa;
  .positive {
    border: 1px solid @pc;
    color: @pc;
    &.fill {
      background: @pc;
      color: #fff;
    }
  }
  .negative {
    border: 1px solid @nc;
    color: @nc;
    &.fill {
      background: @nc;
      color: #fff;
    }
  }
  .title {
    color: #233;
    font-size: 16px;
    font-weight: 500;
    &:hover {
      color: #204d74;
    }
  }
  .info {
    display: flex;
    flex-direction: row;
    a {
      color: #9d9d9d;
      margin: 0 1em;
    }
  }
  .opa {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    .opaBtn {
      text-align: center;
      cursor: pointer;
      .del:hover {
        color: #c24f4a;
      }
      .rev:hover {
        color: #2cbfec;
      }
    }
  }
}
</style>
