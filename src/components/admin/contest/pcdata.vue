<template>
<div id="data">
  <h3>比赛信息</h3>
  <input placeholder="竞赛 ID" type="text" value="1001" id="info"><span id="get">Get</span>
</div>
</template>

<script>
export default {
  name: 'data'
}
</script>
<style lang="less" scoped>
#data {
  #info, #get {
    background: none;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 1em;
    padding: .4em 1em;
    height: 2.5em;
    margin: .4em 0 .4em 1em;
  }
  #get {
    border-radius: 0 4px 4px 0;
    margin: .4em 1em .4em 0;
  }
}
</style>
