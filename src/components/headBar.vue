<template>
<div>
  <div class="head-wrapper" :class="{'add-shadow':isScrolled}">
    <div class="head-container">
      <div class="mainIcon"><img height="50px" src="../assets/logo_new_whitemode.png" v-on:click="$emit('toHome')">
      </div>
      <ul class="nav navbar-nav">
        <li class="separate"><span></span></li>
        <li :class="{focusing:nowPage=='home'}" v-on:click="$emit('toHome')"><span
          class="glyphicon glyphicon-home"></span>主页
        </li>
        <li :class="{focusing:nowPage=='problems'}" v-on:click="$emit('toProblem')"><span
          class="glyphicon glyphicon-list"></span>题目
        </li>
        <li :class="{focusing:nowPage=='status'}" v-on:click="$emit('toStatus')"><span
          class="glyphicon glyphicon-stats"></span>评测
        </li>
        <li :class="{focusing:nowPage=='contest'}" v-on:click="$emit('toContest')"><span
          class="glyphicon glyphicon-tower"></span>比赛
        </li>
        <li :class="{focusing:nowPage=='rank'}" v-on:click="$emit('toRank')"><span
          class="glyphicon glyphicon-signal"></span>排名
        </li>
        <li :class="{focusing:nowPage=='discuss'}" v-on:click="$emit('toDiscuss')"><span
          class="glyphicon glyphicon-comment"></span>讨论
        </li>
      </ul>
      <div class="usersBar">
        <div class="separate"></div>
        <div class="field" :class="{'field-focus':userPage=='signUp'}" v-on:click="$emit('signUp')">
          <a> 注册<span class="glyphicon glyphicon-user"></span></a>
        </div>
        <div class="field" :class="{'field-focus':userPage=='login'}" v-on:click="$emit('logIn')">
          <a> 登录<span class="glyphicon glyphicon-log-in"></span></a>
        </div>
      </div>
    </div>
    <div class="slider" @click="toggleAnnouncement"></div>
    <div class="head-container" id="loki">
      <slot></slot>
    </div>
  </div>
  <vue-slide-up-down :active="showAnnouncement">
    <div class="announcement">
      2017.12.8 我们为它加入了新的语言 Python~ 欢迎尝试<br>
      如果您对 OJ 的进一步开发，包括前端/后台/数据库设计，有兴趣，请联系 sunrisefox@qq.com ~
    </div>
    <div class="clearfix"></div>
  </vue-slide-up-down>
</div>
</template>

<script>
  export default {
    name: 'headBar',
    props: {
      nowPage: String,
      userPage: String
    },
    data () {
      return {
        isScrolled: false,
        showAnnouncement: true
      }
    },
    methods: {
      handleScroll () {
        let scrolled =
          document.documentElement.scrollTop || document.body.scrollTop
        if (scrolled > 0) {
          if (!this.isScrolled) this.isScrolled = true
        } else {
          if (this.isScrolled) this.isScrolled = false
        }
      },
      toggleAnnouncement () {
        setTimeout(() => (this.showAnnouncement = !this.showAnnouncement), 200);
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.handleScroll)
      })
    }
  }
</script>

<style>
  .head-wrapper {
    display: table;
    width: 100%;
    transition: box-shadow 0.3s ease;
    box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0);
  }

  .add-shadow {
    box-shadow: 0 2px 6px 0 rgba(7, 17, 27, 0.1);
  }

  .head-container {
    width: 100%;
    clear: both;
    display: table;
    background-color: #fff;
    border-bottom: 1px solid #d3dcdc;
  }

  .mainIcon {
    height: 50px;
    float: left;
    margin: 5px 40px 5px 20px;
    cursor: pointer;
  }

  .mainIcon img {
    height: 50px;
  }

  .navbar-nav {
    height: 100%;
    display: block;
    line-height: 50px;
  }

  .head-wrapper .separate {
    width: 0;
    margin: 10px 10px;
    padding: 0;
    height: 40px;
    border-left: 1px solid #d3dcdc;
    display: inline-block;
  }

  .navbar-nav li {
    color: #939da6;
    padding: 5px 1rem;
    font-size: 1.5rem;
    width: 10rem;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    transition: all 0.3s ease;
  }

  .navbar-nav li.focusing {
    background-color: #f2f7f7;
    color: #13293d;
    cursor: default;
    pointer-events: none;
  }

  .navbar-nav li:hover {
    background-color: #e8f1f2;
    color: #687683;
  }

  .navbar-nav li span {
    margin-right: 5px;
  }

  .usersBar {
    float: right;
    padding-right: 20px;
    height: 60px;
  }

  .usersBar div.field {
    width: 4rem;
    height: 60px;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin: 0 5px;
  }

  .usersBar div.field a {
    line-height: 60px;
    color: #687683;
    position: relative;
    top: -60px;
    transition: top 0.4s ease;
  }

  .usersBar div.field:hover a,
  .usersBar div.field-focus a {
    text-decoration: none;
    top: 0;
  }

  .usersBar div.field a:focus {
    text-decoration: none;
  }

  .usersBar div.field a span {
    padding: 0 1.1rem;
  }

  .announcement {
    padding: 2rem 0;
    width: 70%;
    margin: auto;
    margin-bottom: 1em;
    background-color: #fff;
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.35);
  }
  .slider {
    position: absolute;
    margin-top: -20px;
    width: 200px;
    height: 200px;
    right: 7%;
    cursor: pointer;
    background-image:
      url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzIwMCcgd2lkdGg9JzIwMCcgIGZpbGw9IiMwMDAwMDAiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC05NTIuMzYyMTYpIj48cGF0aCBzdHlsZT0iY29sb3I6IzAwMDAwMDtmb250LXN0eWxlOm5vcm1hbDtmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXN0cmV0Y2g6bm9ybWFsO2ZvbnQtc2l6ZTptZWRpdW07bGluZS1oZWlnaHQ6bm9ybWFsO2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO3RleHQtZGVjb3JhdGlvbi1saW5lOm5vbmU7dGV4dC1kZWNvcmF0aW9uLXN0eWxlOnNvbGlkO3RleHQtZGVjb3JhdGlvbi1jb2xvcjojMDAwMDAwO2xldHRlci1zcGFjaW5nOm5vcm1hbDt3b3JkLXNwYWNpbmc6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7ZGlyZWN0aW9uOmx0cjtibG9jay1wcm9ncmVzc2lvbjp0Yjt3cml0aW5nLW1vZGU6bHItdGI7YmFzZWxpbmUtc2hpZnQ6YmFzZWxpbmU7dGV4dC1hbmNob3I6c3RhcnQ7d2hpdGUtc3BhY2U6bm9ybWFsO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgZD0ibSAxOS4wNzIzLDk1Ny4xOTgxIDAsMS41IDYxLjg1NTQsMCAwLC0xLjUgLTYxLjg1NTQsMCB6Ij48L3BhdGg+PHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LXNpemU6bWVkaXVtO2xpbmUtaGVpZ2h0Om5vcm1hbDtmb250LWZhbWlseTpzYW5zLXNlcmlmO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb246bm9uZTt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO3RleHQtYW5jaG9yOnN0YXJ0O3doaXRlLXNwYWNlOm5vcm1hbDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiIGQ9Im0gMzMuNzQwMiwxMDI4LjkyMjcgLTYuMTY5OSwxOC42MDM1IDIzLjYzMjgsMCAtNi4xNjk5LC0xOC42MDM1IC0wLjU0MSwwIC0xMC43NTIsMCB6IG0gMS4wODIxLDEuNSA5LjEyNjksMCA1LjE3NzcsMTUuNjAzNSAtMTkuNDgwNCwwIDUuMTc1OCwtMTUuNjAzNSB6Ij48L3BhdGg+PHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LXNpemU6bWVkaXVtO2xpbmUtaGVpZ2h0Om5vcm1hbDtmb250LWZhbWlseTpzYW5zLXNlcmlmO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb246bm9uZTt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO3RleHQtYW5jaG9yOnN0YXJ0O3doaXRlLXNwYWNlOm5vcm1hbDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiIGQ9Im0gMjguNDE0MSw5NTcuMjk4NiAwLDUyLjUyOTMgMC4wMTYsMCBjIDAuMTczNiw1LjYzOTEgNC44MDM4LDEwLjE3NTggMTAuNDg0NCwxMC4xNzU4IDUuNjgwNCwwIDEwLjMxMDcsLTQuNTM2NyAxMC40ODQzLC0xMC4xNzU4IGwgMC4wNDksMCAwLC0yNy43MDUxIGMgMS44MzYxLDMuMDcyNSA1LjE4NDksNS4xNDA2IDkuMDE3NSw1LjE0MDYgMy44Mzc4LDAgNy4xODk1LC0yLjA3MzIgOS4wMjM1LC01LjE1MjMgbCAwLjAyMiwxOC4zMDA4IDEuNSwwIC0wLjAyOSwtMjQuMjc5MyBjIDAsLTUuNDI2MiAtNC43ODk5LC05Ljg2MzMgLTEwLjUxNTcsLTkuODYzMyAtNS44NDY5LDAgLTEwLjUxNzUsNC40NTAyIC0xMC41MTc1LDkuODYzMyBsIDAsMjguMDQ0OSBjIC0xLjgyOTQsLTMuMDkxMSAtNS4xODgyLC01LjE3MzggLTkuMDMzMiwtNS4xNzM4IC0zLjgyMjMsMCAtNy4xNjM0LDIuMDU4NSAtOSw1LjExOTEgbCAwLC00Ni44MjQyIC0xLjUsMCB6IG0gMzAuMDUwNywxMC40Njg4IGMgNC45NTIsMCA5LjAxNTcsMy44MjU3IDkuMDE1Nyw4LjM2MzIgbCAwLDAuODEyNSAtMC4wMTIsMCBjIC0wLjEwNTcsNC44OTYgLTQuMDg0LDguODIwMyAtOS4wMDU5LDguODIwMyAtNC45MjE4LDAgLTguOTAyLC0zLjkyNDMgLTkuMDA3OCwtOC44MjAzIGwgLTAuMDEsMCAwLC0wLjgxMjUgYyAwLC00LjU1MDUgMy45MjU5LC04LjM2MzIgOS4wMTc1LC04LjM2MzIgeiBtIC0xOS41NTA3LDMyLjczNDMgYyA0Ljk4MDcsMCA5LjAwMzksNC4wMjEzIDkuMDAzOSw5LjAwMiAwLDQuOTgwNyAtNC4wMjMzLDkuMDAxOSAtOS4wMDM5LDkuMDAxOSAtNC45Njc3LDAgLTguOTc4OCwtNC4wMDA0IC05LC04Ljk2MjkgbCAwLC0wLjA3OCBjIDAuMDIxLC00Ljk2MjQgNC4wMzIzLC04Ljk2MjkgOSwtOC45NjI5IHoiPjwvcGF0aD48cGF0aCBzdHlsZT0iY29sb3I6IzAwMDAwMDtmb250LXN0eWxlOm5vcm1hbDtmb250LXZhcmlhbnQ6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXN0cmV0Y2g6bm9ybWFsO2ZvbnQtc2l6ZTptZWRpdW07bGluZS1oZWlnaHQ6bm9ybWFsO2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO3RleHQtZGVjb3JhdGlvbi1saW5lOm5vbmU7dGV4dC1kZWNvcmF0aW9uLXN0eWxlOnNvbGlkO3RleHQtZGVjb3JhdGlvbi1jb2xvcjojMDAwMDAwO2xldHRlci1zcGFjaW5nOm5vcm1hbDt3b3JkLXNwYWNpbmc6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7ZGlyZWN0aW9uOmx0cjtibG9jay1wcm9ncmVzc2lvbjp0Yjt3cml0aW5nLW1vZGU6bHItdGI7YmFzZWxpbmUtc2hpZnQ6YmFzZWxpbmU7dGV4dC1hbmNob3I6c3RhcnQ7d2hpdGUtc3BhY2U6bm9ybWFsO2NsaXAtcnVsZTpub256ZXJvO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO29wYWNpdHk6MTtpc29sYXRpb246YXV0bzttaXgtYmxlbmQtbW9kZTpub3JtYWw7Y29sb3ItaW50ZXJwb2xhdGlvbjpzUkdCO2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVyczpsaW5lYXJSR0I7c29saWQtY29sb3I6IzAwMDAwMDtzb2xpZC1vcGFjaXR5OjE7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eToxO2NvbG9yLXJlbmRlcmluZzphdXRvO2ltYWdlLXJlbmRlcmluZzphdXRvO3NoYXBlLXJlbmRlcmluZzphdXRvO3RleHQtcmVuZGVyaW5nOmF1dG87ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgZD0ibSA1Ny43MTQ4LDk1Ny4yOTU4IDAsMTkuNTQxIDEuNSwwIDAsLTE5LjU0MSAtMS41LDAgeiI+PC9wYXRoPjxwYXRoIHN0eWxlPSJjb2xvcjojMDAwMDAwO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7Zm9udC1zaXplOm1lZGl1bTtsaW5lLWhlaWdodDpub3JtYWw7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7dGV4dC1kZWNvcmF0aW9uLWxpbmU6bm9uZTt0ZXh0LWRlY29yYXRpb24tc3R5bGU6c29saWQ7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOiMwMDAwMDA7bGV0dGVyLXNwYWNpbmc6bm9ybWFsO3dvcmQtc3BhY2luZzpub3JtYWw7dGV4dC10cmFuc2Zvcm06bm9uZTtkaXJlY3Rpb246bHRyO2Jsb2NrLXByb2dyZXNzaW9uOnRiO3dyaXRpbmctbW9kZTpsci10YjtiYXNlbGluZS1zaGlmdDpiYXNlbGluZTt0ZXh0LWFuY2hvcjpzdGFydDt3aGl0ZS1zcGFjZTpub3JtYWw7Y2xpcC1ydWxlOm5vbnplcm87ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7b3BhY2l0eToxO2lzb2xhdGlvbjphdXRvO21peC1ibGVuZC1tb2RlOm5vcm1hbDtjb2xvci1pbnRlcnBvbGF0aW9uOnNSR0I7Y29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzOmxpbmVhclJHQjtzb2xpZC1jb2xvcjojMDAwMDAwO3NvbGlkLW9wYWNpdHk6MTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowO3N0cm9rZS1vcGFjaXR5OjE7Y29sb3ItcmVuZGVyaW5nOmF1dG87aW1hZ2UtcmVuZGVyaW5nOmF1dG87c2hhcGUtcmVuZGVyaW5nOmF1dG87dGV4dC1yZW5kZXJpbmc6YXV0bztlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiBkPSJtIDM4LjYzNjcsMTAwOS41NDE5IDAsMjAuNDkwMiAxLjUsMCAwLC0yMC40OTAyIC0xLjUsMCB6Ij48L3BhdGg+PHBhdGggc3R5bGU9ImNvbG9yOiMwMDAwMDA7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LXNpemU6bWVkaXVtO2xpbmUtaGVpZ2h0Om5vcm1hbDtmb250LWZhbWlseTpzYW5zLXNlcmlmO3RleHQtaW5kZW50OjA7dGV4dC1hbGlnbjpzdGFydDt0ZXh0LWRlY29yYXRpb246bm9uZTt0ZXh0LWRlY29yYXRpb24tbGluZTpub25lO3RleHQtZGVjb3JhdGlvbi1zdHlsZTpzb2xpZDt0ZXh0LWRlY29yYXRpb24tY29sb3I6IzAwMDAwMDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO3RleHQtYW5jaG9yOnN0YXJ0O3doaXRlLXNwYWNlOm5vcm1hbDtjbGlwLXJ1bGU6bm9uemVybztkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtvcGFjaXR5OjE7aXNvbGF0aW9uOmF1dG87bWl4LWJsZW5kLW1vZGU6bm9ybWFsO2NvbG9yLWludGVycG9sYXRpb246c1JHQjtjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM6bGluZWFyUkdCO3NvbGlkLWNvbG9yOiMwMDAwMDA7c29saWQtb3BhY2l0eToxO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS41O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MTtjb2xvci1yZW5kZXJpbmc6YXV0bztpbWFnZS1yZW5kZXJpbmc6YXV0bztzaGFwZS1yZW5kZXJpbmc6YXV0bzt0ZXh0LXJlbmRlcmluZzphdXRvO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiIGQ9Im0gNjQuODYxMyw5OTUuODkxNSAtMS4wNjA1LDEuMDYwNSA0LjQzNzUsNC40Mzc1IDQuNDM3NSwtNC40Mzc1IC0xLjA2MjUsLTEuMDYwNSAtMy4zNzUsMy4zNzUgLTMuMzc3LC0zLjM3NSB6Ij48L3BhdGg+PC9nPjwvc3ZnPg==");
    transform: translateY(0);
    z-index: -1;
  }
  .slider:active {
    transform: translateY(20px);
  }
</style>
