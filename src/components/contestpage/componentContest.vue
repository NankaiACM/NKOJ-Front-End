<template>
  <div id="component-contest">
    <div class="contest-content">
      <router-view class="contest-main"></router-view>
      <contest-side-bar class="contest-sidebar"/>
    </div>
  </div>
</template>

<script>
import contestPage from './contest.vue'
import Breadcrumb from './breadcrumb'
import contestSideBar from './contestSideBar'
import allContest from "./allContest";
import contestDetail from "./contestDetail";
import contestOpen from "./contestOpen";

export default {
  name: 'component-contest',
  components: {
    contestPage,
    Breadcrumb,
    contestSideBar,
    allContest,
    contestDetail,
    contestOpen,
  }
}
</script>

<style>
  #component-contest {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: rgba(255,255,255,.8);
    font-size: 16px;
  }
  @media screen and (min-width: 1281px){
    #component-contest{
      padding: 0px 10%;
    }
  }
  @media screen and (max-width: 1280px){
    #component-contest{
      padding: 0px 10px;
    }
  }

  h5 {
    padding: 10px 0;
    margin: 0;
    font-size: 125%;
    font-weight: 500;
    text-align: left;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .contest-content {
    padding: 0 20px;
    display: flex;
  }

  .contest-content * {
    box-sizing: border-box;
  }

  .contest-main {
    width: 75%;
    padding: 15px 30px 40px 5px;
  }

  .contest-sidebar {
    width: 25%;
    box-sizing: border-box;
    padding: 20px 0 0;
    margin-left: 3%;
    margin-top: 100px;
  }

  a{
    text-decoration: none;
    color:inherit;
  }

  a:hover{
    color: inherit;
    text-decoration: none;
  }

  a.contest-link {
    color: #00a6de;
    font-weight: 500;
    cursor: pointer;
    font-size: inherit;
  }

  a.contest-link:hover {
    text-decoration-line: underline;
  }


.contest-wrapper{
  padding: 10px 0 0;
}
.contest-title{
  margin-left: 10px;
}
.a-wrapper{
  margin: 10px 0;
  padding: 10px 0;
  box-sizing: border-box;
  display: block;
}
.contest-wrapper ul{
  width: 100%;
  margin: 0;
  padding: 0;
	list-style: none;
}
h4{
  font-size: 1.5em;
  margin: 10px 0;
}
.block-wrapper{
  width: 100%;
  padding: 20px 0;
}
</style>
