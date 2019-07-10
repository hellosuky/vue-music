<template lang="html">
  <div class="">
    <banner></banner>
    <div class="icon-wrapper">
      <div class="icon-item">
        <span class="icon"><i class="iconfont icon-rili"></i></span>
        <span>每日推荐</span>
      </div>
      <div class="icon-item">
        <span class="icon"><i class="iconfont icon-musicyinle"></i></span>
        <span>歌单</span>
      </div>
      <div class="icon-item">
        <span class="icon"><i class="iconfont icon-radio"></i></span>
        <span>排行榜</span>
      </div>
      <div class="icon-item">
        <span class="icon"><i class="iconfont icon-rankfill"></i></span>
        <span>电台</span>
      </div>
    </div>
    <div class="recommand-list">
      <p class="recommand-title">推荐歌单</p>
      <div class="recommand-wrapper">
        <div class="recommand-item" v-for="item in recommandList" :key="item.id">
          <img :src="item.picUrl" alt="recommand-pic"/>
          <span>{{item.name.length>15 ? item.name.substring(0,15) + '...' : item.name}}</span>
          <div class="play-count">
            <i class="iconfont icon-play"></i>
            {{item.playCount}}
          </div>
        </div>
      </div>
    </div>
    <div class="newsong-list">
      <p class="newsong-title">新歌速递</p>
      <div class="newsong-wrapper">
        <div class="newsong-item" v-for="item in newSongList" :key="item.id">
          <img :src="item.album.picUrl" alt="pic"/>
          <div class="play-btn"><i class="iconfont icon-play2"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from '@/components/Banner/Banner'
import '@/assets/css/iconfont.css'
export default {
  name: 'Find',
  components: {
    Banner
  },
  methods: {
    _getRecommand () {
      axios.get('/api/personalized')
        .then(res => {
          if (res.data.code === 200) {
            this.recommandList = res.data.result.slice(0, 6)
            this.recommandList.map(v => {
              if (v.playCount > 100000 && v.playCount < 100000000) {
                v.playCount = (v.playCount / 100000).toFixed(0) + '万'
              }
              if (v.playCount > 100000000) {
                v.playCount = (v.playCount / 100000000).toFixed(1) + '亿'
              }
            })
          }
        })
    },
    _getNewSong () {
      axios.get('/api/top/song?type=0')
        .then(res => {
          if (res.data.code === 200) {
            this.newSongList = res.data.data.slice(0, 6)
          }
        })
    }
  },
  created () {
    this._getRecommand()
    this._getNewSong()
  },
  data () {
    return {
      recommandList: [],
      newSongList: []
    }
  }
}
</script>

<style lang="css" scoped>
.icon-wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin:10px 10px 10px 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebecec;
}
.icon-item{
  text-align: center;
  font-size: 14px;
}
.icon-wrapper .icon{
  width: 45px;
  height: 45px;
  display: block;
  background: #d43c33;
  border-radius: 50%;
  line-height: 45px;
  text-align: center;
  margin-bottom: 5px;
  margin:0 auto 8px auto;
}
.icon-wrapper i{
  color: #fff;
  font-size: 25px;
}
.recommand-list{
  margin: 15px;
}
.recommand-title{
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
}
.recommand-wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
.recommand-item{
  width: 30%;
  overflow: hidden;
  margin: 3px 3px 5px 3px;
  font-size: 12px;
  position: relative;
}
.recommand-item img{
  width: 100%;
  border-radius: 8px;
}
.play-count{
  position: absolute;
  top:1px;
  right: 5px;
  color: #fff;
  font-size: 10px;
}
.play-count i{
  font-size: 12px;
  margin-right: -4px;
}
.newsong-list{
  margin: 15px 15px 30px 15px;
}
.newsong-title{
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
}
.newsong-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}
.newsong-item{
  width: 30%;
  margin:5px 5px 8px 5px;
  position: relative;
}
.newsong-item img{
  width: 100%;
  border-radius: 8px;
}
.play-btn{
  position: absolute;
  bottom:13px;
  right: 8px;
  width: 25px;
  line-height:25px;
  text-align: center;
  height: 25px;
  z-index: 100;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
}
.play-btn i{
  font-size: 10px;
  color:#d43c33;
}
</style>
