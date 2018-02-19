<template>
  <div id="component-contest">
    <breadcrumb  :places="['Home','Contests']"/>
    <div class="contest-content">
      <contest-page class="contest-main"/>
      <!--pagination id="pagination"/-->
      <contest-side-bar class="contest-sidebar"/>
    </div>
    <div class="footer"><span>footer</span></div>
  </div>
</template>

<script>
import contestPage from './contestpage/contest.vue'
import Breadcrumb from './contestpage/contestComponents/breadcrumb'
import contestSideBar from './contestpage/contestComponents/contestSideBar'
import pagination from './contestpage/contestComponents/pagination'

export default {
  name: 'component-contest',
  components: {
    contestPage,
    Breadcrumb,
    contestSideBar,
    pagination
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
  }

  body {
    margin: 0;
    padding: 0;
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
    margin-left: 20px;
  }

  .footer, .header {
    height: 100px;
    background-color: #87CEFA;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
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

  #pagination {
    box-sizing: border-box;
    width: 75%;
  }
</style>
