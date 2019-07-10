<template lang="html">
  <div class="">
    ddd
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Friend',
  methods: {
    _getFriends () {
      axios.get('/api/event?pagesize=20')
        .then( res => {
          if (res.data.code === 200) {
            console.log(res)
          }
        })
    }
  },
  created () {
    this._getFriends()
  }
}
</script>

<style lang="css" scoped>
</style>
