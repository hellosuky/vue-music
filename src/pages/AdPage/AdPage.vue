<template lang="html">
  <div class="">
    <my-header></my-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from '@/components/AdHeader/AdHeader'
import Tab from '@/components/AdTab/AdTab'

export default {
  name: 'AdPage',
  components: {
    MyHeader,
    Tab
  }
}
</script>

<style lang="css" scoped>
</style>
