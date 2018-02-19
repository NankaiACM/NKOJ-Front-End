<template>
  <i class="iconfont" v-bind:style="{fontSize:size+'%'}">&#xe653;</i>
</template>

<script>
export default {
  name:'iconSearch',
  props:['size'],
}
</script>



<style scoped>

@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1518598124116'); /* IE9*/
  src: url('iconfont.eot?t=1518598124116#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAUYAAsAAAAAB4AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kg9Y21hcAAAAYAAAABeAAABhpqEBr5nbHlmAAAB4AAAAUQAAAFkP6oDoWhlYWQAAAMkAAAALwAAADYQc3XOaGhlYQAAA1QAAAAcAAAAJAfeA4RobXR4AAADcAAAAAwAAAAMC+kAAGxvY2EAAAN8AAAACAAAAAgAdgCybWF4cAAAA4QAAAAfAAAAIAESAF1uYW1lAAADpAAAAUUAAAJtPlT+fXBvc3QAAATsAAAAKgAAADupV8FVeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDwLZm7438AQw9zA0AAUZgTJAQAphQy/eJzFkMENgDAMAy9t6QMxCA+26YcXc3TirlFMKA8mqCXHimMpUYAFiOIhJrAL48Ep19yPrO4nz2SpEait9K7+U0U0y65BJTMNNm/1H5vXfXT6CnVQJ7byknADJBYM2wAAeJw1z71OwlAUB/B7bu29BeFWbr9bKLQFLgZtYq06GMHBQYyDiZNhwQfQFQYHFhMHBydXP2LiS/AyRJ+jetV4cvJL/uc/HaQi9LVUFoqLDNRDW+gInSEEpA8xww2IRJ7iPliRajkmU0QiIprEqXIATkxMO9vNuw6hRAcGIWxH2a5IsYCdfID3IbMbAF7gn/NOnSsPUHZFeFuc4FewmkldH2wWo42hmbUMbVrh3OP8XiOqqmG8ojO4cuySWiqT4k3VfWvRXMdNqHjCP72otgJ+eZdfNzpOCWA+ByNosfdhza/JvfFtg3t0raq5fjVpmzD9XHWNSqP7geTgHxQNPyILRfJLBkkKYgB7ITgmoU4IJBYdmeWVAQ0BD4PD9niG8WwsDbxnArpBi+VogvFk9CuYhv1XS3vH9SdqMPry30oR+gbztTZpeJxjYGRgYADiev1ld+P5bb4ycLMwgMC1VRJvEPT/hywMzBJALgcDE0gUAD6XCvMAeJxjYGRgYG7438AQw8IAAkCSkQEVMAMARwkCbAQAAAAD6QAABAAAAAAAAAAAdgCyeJxjYGRgYGBmCGRgZQABJiDmAkIGhv9gPgMAEPcBcAB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICZkYmRmZGFgbGCNzO5ODWxKDkjM6+gtISBAQA9IwYUAAA=') format('woff'),
  url('iconfont.ttf?t=1518598124116') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1518598124116#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: default;
}

.icon-icsearchinput:before { content: "\e653"; }

</style>
