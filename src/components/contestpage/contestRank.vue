<template>
  <div id="contest-rank-container">
    <div class="person-rank-container">
      <img src="http://78.media.tumblr.com/avatar_ed13c11730b8_128.pnj"/>
      <div></div>
    </div>
   <div id="draw-container">
     <div class="plate test1">
     </div>
   </div>
  </div>
</template>
<script>
export default {
  name: 'contestRank',
  data: function () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>
#contest-rank-container {
  width: 100%;
  height: 100%;
  background: #fff;
}

#draw-container {
  width: 300px;
  height: 300px;
}

.plate {
  width: 100%;
  height: 100%;
}

.test1 {
  background: #6cf;
  clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
  transition: .3s;
}

.test1:hover {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.person-rank-container {
  width: 100%;
}
</style>
