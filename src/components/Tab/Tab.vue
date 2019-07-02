<template lang="html">
  <div class="header-wrapper">
    <router-link to="/recommand" tag="span">
      推荐
    </router-link>
    <router-link to="/singer" tag="span">
      歌手
    </router-link>
    <router-link to="/rank" tag="span">
      排行
    </router-link>
    <router-link to="/search" tag="span">
      搜索
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
  .header-wrapper
    color:$color-text-d
    display:flex
    justify-content:space-around
    padding:10px
    span
      padding-bottom:5px
      border-bottom:2px solid $color-background
      &.router-link-active
        color: $color-theme
        border-bottom:2px solid $color-theme
</style>
