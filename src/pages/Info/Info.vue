<template lang="html">
  <div class="info-wrapper">
    <div class="my-built">
      <p class="title">创建的歌单({{builtList.length}})</p>
      <div class="built-wrapper">
        <div class="item" v-for="item in builtList" :key="item.id">
          <img :src="item.coverImgUrl" alt="img"/>
          <div class="words">
            <p>{{item.name}}</p>
            <p>{{item.trackCount}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-collection">
      <p class="title">收藏的歌单({{collectionList.length}})</p>
      <div class="item" v-for="item in collectionList" :key="item.id">
        <img :src="item.coverImgUrl" alt="img"/>
        <div class="words">
          <p>{{item.name}}</p>
          <p>{{item.trackCount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Info',
  methods: {
    _getUserPlayList () {
      let uid = window.localStorage.getItem('uid')
      axios.get(`/api/user/playlist?uid=${uid}`)
        .then(res => {
          if (res.data.code === 200) {
            this.list = res.data.playlist
          }
        })
    }
  },
  created () {
    this._getUserPlayList()
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    builtList: function() {
      let list = []
      let uid = window.localStorage.getItem('uid')
      this.list.map(v => {
        if (v.creator.userId.toString() === uid) {
          list.push(v)
        }
      })
      return list
    },
    collectionList: function() {
      let list = []
      let uid = window.localStorage.getItem('uid')
      this.list.map(v => {
        if (v.creator.userId.toString() !== uid) {
          list.push(v)
        }
      })
      return list
    }
  }
}
</script>

<style lang="css" scoped>
.info-wrapper{
  margin-top: 60px;
}
.item{
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px;
}
.item img{
  width: 50px;
  height: 50px;
  border-radius: 8px;
}
.item .words{
  padding-left: 10px;
}
.title{
  font-size: 18px;
  margin: 10px;
  font-weight: 800;
}
.my-collection{
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>
