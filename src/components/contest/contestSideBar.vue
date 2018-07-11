<template>
  <div>
    <div class="sidebar-el">
      <h5>Search</h5>
      <div class="search-bar">
        <div class="search-input-bar">
          <input v-model="searchKey"/>
        </div>
        <icon-search class="icon-search" size=200></icon-search>
      </div>
    </div>
    <div class="sidebar-el">
      <h5>Quick Link</h5>
      <ul>
        <li class="sidebar-link"><a href="contest/allContest" class="contest-link">All Contests</a></li>
        <li class="sidebar-link"><a class="contest-link">Other OJ Contests</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
// contest界面侧边栏
import iconSearch from './iconsearch/icon'

export default {
  name: 'contestSideBar',
  components: {
    iconSearch
  },
  data () {
    return {
      searchKey: ''
    }
  }
}
</script>

<style scoped>
.search-bar{
  position: relative;
  box-sizing: border-box;
  border: 1px solid #AAAAAA;
  border-radius: 5px;
  transform: translateX(-10px);
}
.search-bar:hover{
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.icon-search{
  position: absolute;
  left: 5px;
  top: -2px;
  color: #AAAAAA;
  transition: color 0.3s ease;
  pointer-events: none;
}
 .search-bar:hover .icon-search{
   color: #767676;
 }
 .search-bar input{
   padding: 7px 10px 7px 45px;
   font-size: 100%;
   border: none;
   width: 100%;
   border-radius: 5px;
 }
.sidebar-el{
  padding:10px 0;
}
ul{
  width: 100%;
  margin: 0;
  padding: 0;
	list-style: none;
}
.sidebar-link{
  text-align: left;
  padding-bottom: 5px;
  padding-top: 5px;
  font-weight: 700;
  font-size: 100%;
}
</style>
