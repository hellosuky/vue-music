<template lang="html">
  <div class="hot-wrapper">
    <div class="hot-title-wrapper">
      <div class="hot-title-upon"></div>
    </div>
    <div class="hotList-wrapper">
      <div class="hot-item" v-for="(item,index) in hotList" :key="item.id">
        <div class="hot-index">{{(index + 1)  &lt; 10 ? '0' + ( index + 1) : ( index + 1) }}</div>
        <div class="hot-info">
          <p>{{item.name}}</p>
          <p class="hot-sub">{{item.ar[0].name}} - {{item.al.name}}</p>
        </div>
        <div class="play-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Hot',
  data () {
    return {
      hotList: []
    }
  },
  methods: {
    _getHot () {
      axios.get('/api/top/list?idx=1')
        .then(res => {
          if (res.data.code === 200) {
            this.hotList = res.data.playlist.tracks.slice(0, 20)
          }
        })
    }
  },
  created () {
    this._getHot()
  }
}
</script>

<style lang="css" scoped>
.hot-title-wrapper{
  margin-top: 128px;
  background: url('https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=') no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 146px;
  position: relative;
}
.hot-title-upon{
  width: 142px;
  height: 67px;
  background: url('https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=') no-repeat;
  background-size: 166px 97px;
  background-position: -25px -28px;
  position: absolute;
  left: 10px;
  bottom: 20px;
}
.hotList-wrapper{
  padding-bottom:10px;
}
.hot-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 0 6px 0;
}
.hot-index{
  color:#d43c33;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
}
.hot-info{
  flex:1 1 0;
}
.hot-sub{
  color:#333;
  font-size: 12px;
}
.play-btn{
  width: 22px;
  height: 22px;
  display: inline-block;
  background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=) no-repeat;
  background-size: 166px 97px;
  background-position: -24px 0;
  margin-right: 10px;
}
</style>
