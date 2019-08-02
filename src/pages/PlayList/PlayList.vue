<template lang="html">
  <div class="playlist-wrapper">
    <div class="playlist-header">
      <div class="playlist-bg" :style="{backgroundImage:'url('+ playlist.coverImgUrl +')'}"></div>
      <div class="playlist-header-top">
        <i class="iconfont icon-left" @click="handleBack
        "></i>
        <div class="playlist-header-top-title">
          <p>{{topTitle}}</p>
          <p class="playlist-header-top-desc">description</p>
        </div>
        <i class="iconfont icon-fangdajing"></i>
      </div>
      <div class="playlist-header-wrapper">
        <div class="playlist-header-bottom">
          <div class="playlist-header-bottom-img">
            <img :src="playlist.coverImgUrl" alt="pic" />
            <div class="play-count">
              <i class="iconfont icon-play"></i>
              {{playlist.playCount}}
            </div>
          </div>
          <div class="playlist-header-bottom-info">
            <p class="playlist-header-bottom-title">{{playlist.name}}</p>
            <div class="playlist-header-bottom-creator" v-if="playlist.creator">
              <img :src="playlist.creator.avatarUrl" alt="avatar-img" />
              <span>{{playlist.creator.nickname}} ></span>
            </div>
            <p class="playlist-header-bottom-desc" v-if="playlist.description">
              {{playlist.description.length > 30 ? playlist.description.substring(0,30) + '...':playlist.description}}</p>
          </div>
        </div>
        <div class="playlist-header-btn">
          <div class="playlist-header-icon">
            <p><i class="iconfont icon-comment"></i></p>
            <p><span>{{playlist.commentCount}}</span></p>
          </div>
          <div class="playlist-header-icon">
            <p><i class="iconfont icon-share"></i></p>
            <p><span>{{playlist.shareCount}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="songs-list">
      <div class="songs-title">
        <i class="iconfont icon-play1"></i>
        <span v-if="playlist.tracks">&nbsp;&nbsp;播放全部(共{{playlist.tracks.length}}首)</span>
      </div>
      <div class="song-item" v-for="(item,index) in playlist.tracks" :key="item.id"
      @click="handleSong(index)">
        <div class="song-index">
          {{index &lt; 10 ? index + '&nbsp;&nbsp;' : index}}
        </div>
        <div class="song-info">
          <p>{{item.name}}</p>
          <p class="song-desc">{{item.al.name}} - {{item.ar[0].name}}</p>
        </div>
        <div class="song-play">
          <i class="iconfont icon-PlayIcon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/iconfont.css'
import { mapActions } from 'vuex'
export default {
  name: 'PlayList',
  methods: {
    ...mapActions([
      'getSequenceList',
      'getCurrentIndex'
    ]),
    _getPlayList() {
      let id = this.$route.params.id
      axios.get(`/api/playlist/detail?id=${id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.playlist = res.data.playlist
            if (this.playlist.playCount > 100000 && this.playlist.playCount < 100000000) {
              this.playlist.playCount = (this.playlist.playCount / 10000).toFixed(0) + '万'
            }
            if (this.playlist.playCount > 10000000) {
              this.playlist.playCount = (this.playlist.playCount / 10000000).toFixed(1) + '亿'
            }
          }
        })
    },
    handleBack() {
      this.$router.go(-1)
    },
    handleScroll() {
      window.addEventListener('scroll', () => {
        var scrollWid = document.body.scrollTop || document.documentElement.scrollTop

        if (scrollWid > 100) {
          this.topTitle = this.playlist.name
        } else {
          this.topTitle = '歌单'
        }
      })
    },
    handleSong (index) {
      this.getCurrentIndex(index)
      this.getSequenceList(this.playlist.tracks)
      this.$router.push(`/song`)
    }
  },
  created() {
    this.handleScroll()
    this._getPlayList()
  },
  data() {
    return {
      playlist: {},
      topTitle: '歌单'
    }
  }
}
</script>

<style lang="css" scoped>
.playlist-bg{
  min-height: 300px;
  background-size: cover;
  background-position: 50%;
  filter: blur(10px) grayscale(50%);
  transform: scale(1.5);
  z-index: -1;
  position: relative;
}
.playlist-header{
  overflow: hidden;
}
/* 歌单头部 */
.playlist-header-top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0,0,0,0.1);
  min-height: 40px;
  display: flex;
  flex-direction: row;
  color:#fff;
  align-items: center;
  padding: 5px 0;
  z-index: 1000;
}
.playlist-header-top i{
  font-size: 20px;
}
.playlist-header-top .icon-left{
  margin: 10px;
}
.playlist-header-top-title{
  flex:1 1 0;
}
.playlist-header-top-desc{
  font-size: 12px;
  color:rgba(255,255,255,0.5);
}
.playlist-header-top .icon-fangdajing{
  margin: 10px;
}
/* 歌单封面 */
.playlist-header-wrapper{
  position: absolute;
  top: 50px;
  margin: 12px;
}
.playlist-header-bottom{
  display: flex;
  flex-direction: row;
}
.playlist-header-bottom-img{
  position: relative;
  margin-right: 10px;
}
.playlist-header-bottom-img::before{
  content:'';
  height:100%;
  position: absolute;
  top: 0;
  left:0;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,0.2),transparent);
}
.playlist-header-bottom-img img{
  width: 125px;
  border-radius: 6px;
}
.playlist-header-bottom-title{
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  margin-top: 1px;
}
.play-count{
  position: absolute;
  top:2px;
  color: #fff;
  right:3px;
  font-size: 12px;
}
.play-count i{
  margin-right: -3px;
}
.playlist-header-bottom-creator{
  margin-top: 6px;
  margin-bottom: 6px;
  color: #999;
  display: flex;
  align-items: center;
  font-size: 13px;
}
.playlist-header-bottom-creator img{
  width: 35px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 5px;
}
.playlist-header-bottom-desc{
  color: #999;
  font-size: 11px;
  margin-top: 4px;
}
.playlist-header-btn{
  color:#fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 15px 0 10px 0;
}
.playlist-header-icon{
  text-align: center;
  font-size: 12px;
}
.playlist-header-icon i{
  font-size: 30px;
}
.songs-list{
  margin-top: -25px;
  background: #fff;
  border-radius: 20px 20px 0 0;
  margin-bottom: 30px;
}
.songs-title{
  padding: 10px 10px 10px 15px;
}
.songs-title i{
  font-size: 22px;
}
.song-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin:5px 0;
}
.song-index{
  color:#999;
  font-size: 20px;
  margin: 10px 10px 10px 20px;
}
.song-info{
  flex:1 1 0;
}
.song-desc{
  font-size: 12px;
  color:#999;
}
.song-play{
  margin-right: 15px;
}
.song-play i{
  font-size: 25px;
}
</style>
