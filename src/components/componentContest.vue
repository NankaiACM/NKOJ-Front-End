<template>
  <div id="component-contest">
    <breadcrumb  :places="['Home','Contests']"/>
    <div class="contest-content">
      <!--contest-page class="contest-main"/-->
      <all-contest class="contest-main"/>
      <contest-side-bar class="contest-sidebar"/>
    </div>
  </div>
</template>

<script>
import contestPage from './contestpage/contest.vue'
import Breadcrumb from './contestpage/breadcrumb'
import contestSideBar from './contestpage/contestSideBar'
import allContest from "./contestpage/allContest";

export default {
  name: 'component-contest',
  components: {
    contestPage,
    Breadcrumb,
    contestSideBar,
    allContest,
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
    background: white;
    font-size: 16px;
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
    padding: 15px 30px 20px 5px;
  }

  .contest-sidebar {
    width: 25%;
    box-sizing: border-box;
    padding: 15px 0;
    margin-left: 3%;
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

</style>
