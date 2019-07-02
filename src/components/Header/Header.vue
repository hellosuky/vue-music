<template lang="html">
  <div class="header">
    <img src="../../common/image/default.png" alt="logo" />
    <span>Chicken Music</span>
  </div>
</template>

<script>
export default {
  name: 'MyHeader'
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.header
  text-align:center
  display:flex
  align-items:center
  justify-content:center
  img
    width:50px
    font-size:0
  span
    padding-left:8px
    font-size:$font-size-large-x
    color:$color-theme
    letter-spacing:1px
</style>
