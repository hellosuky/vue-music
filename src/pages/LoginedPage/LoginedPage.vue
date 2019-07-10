<template lang="html">
  <div class="">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '@/components/Header/Header'

export default {
  name: 'LoginedPage',
  components: {
    MyHeader
  }
}
</script>

<style lang="css" scoped>

</style>
