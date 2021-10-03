
<template>
  <div id="breadcrumb">
    <div class="location-text location-title">Your Location</div>
    <ol>
      <li v-for="(place,index) in places" v-bind:key="place.id"
      v-bind:class="{Located:(index==(places.length-1))}">
        <a>{{place}}</a> <div v-if="index!=(places.length-1)" class="location-text"> > </div></li>
    </ol>
  </div>
</template>

<script>
// 面包屑导航
export default {
  name: 'breadcrumb',
  props: {
    places: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
#breadcrumb{
    margin: 0;
    padding: 0 20px;
    display: flex;
    align-items: baseline;
    -moz-box-align: center;
    -webkit-box-align: center;
    border-bottom: 1px solid #e0e4e8;
}
.location-text{
    text-align: left;
    display: inline;
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    color: #979faf;
}
.location-title{
    font-weight: bold;
    color: #39424e
}
#breadcrumb ol{
    margin: 20px 0;
    padding:0 0 0 20px;
}
#breadcrumb ol .Located{
    color: #39424e;
}
#breadcrumb li{
    color: #979faf;
    display: inline;
    text-decoration: none;
}
#breadcrumb a{
    cursor: pointer;
    transition: color 0.3s ease;
}
#breadcrumb a:hover{
    color: #39424e;
}
#breadcrumb ol .Located a{
    cursor: default;
}
</style>
