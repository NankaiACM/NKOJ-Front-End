<template lang="pug">
progress.progress.is-small.is-danger(max="100")
</template>

<script>
export default {
  name: 'recycler'
}
</script>

<style lang="scss" scoped>
.progress.is-danger:indeterminate {
  background-image: linear-gradient(to right,#ff3860 30%,#dbdbdb 30%);
}
.progress:indeterminate {
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: moveIndeterminate;
  animation-name: moveIndeterminate;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  background-color: #dbdbdb;
  background-image: linear-gradient(to right,#4a4a4a 30%,#dbdbdb 30%);
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 150% 150%;
}
@keyframes moveIndeterminate {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
