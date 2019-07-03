<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MyHeader from '@/components/Header/Header'
import Tab from '@/components/Tab/Tab'

export default {
  name: 'App',
  components: {
    MyHeader,
    Tab
  }
}
</script>

<style lang="css">
*{
  margin:0;
  padding:0;
}
</style>
