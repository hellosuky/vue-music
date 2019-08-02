<template lang="html">
  <div class="song-wrapper">
    <div class="full-player">
      <div class="song-header">
        <i class="iconfont icon-left" @click="handleGoBack"></i>
        <div class="song-header-mid">
          <p>{{song.name}}</p>
          <p><span v-for="(item,index) in song.ar" :key="item.id">
            {{item.name}}{{index === (song.ar.length -1) ? '':'/'}}>
          </span></p>
        </div>
        <i class="iconfont icon-share"></i>
      </div>
      <div class="song-content" v-if="song.al">
        <div class="song-inner" @click="handleShowLyric" v-show="!showLyric">
          <div class="song-in" ref="songImg">
            <img :src="song.al.picUrl" alt="pic" :class="isPlaying? 'active':''" ref="img"/>
          </div>
        </div>
        <div class="lyric-inner" @click="handleHideLyric" v-show="showLyric" ref="lyric">
          <div class="lyric-wrapper">
            <p :key="index" class="text" ref="lyricNum" :class="currentLineNum === index ? 'current' : ''" v-for="(line,index) in lyric.lines">
              {{line.txt}}
            </p>
          </div>
        </div>
      </div>
      <div class="icon-wrapper">
        <i class="iconfont icon-like"></i>
        <i class="iconfont icon-comment"></i>
        <i class="iconfont icon-Moreoptionshorizon"></i>
      </div>
      <div class="song-bar">
        <progress-bar :currentTime="currentTime" :dt="song.dt"
          @playerChange="playerChange"
        ></progress-bar>
      </div>
      <div class="song-controller">
        <i class="iconfont" :class="playMode === 0 ? 'icon-ziyuanldpi' : playMode === 1 ? 'icon-suiji' : 'icon-danquxunhuan' " @click="changePlayMode"></i>
        <i class="iconfont icon-back" @click="handlePrevSong"></i>
        <i class="iconfont" :class="isPlaying? 'icon-Pause':'icon-play1'" @click="handlePlay"></i>
        <i class="iconfont icon-next" @click="handleNextSong"></i>
        <i class="iconfont icon-liebiaoshunxu" @click="handleDetail"></i>
      </div>
      <audio :src="songUrl" ref="audio" @timeupdate="timeupdate"></audio>
    </div>
     <div class="detail-mask" @click="handleClose" v-show="close">
       <div class="detail-list">
         <div class="detail-header">
           <i class="iconfont icon-suiji"></i>
           <span>随机播放({{playlist.length}})</span>
         </div>
         <div class="detail-wrapper" ref="wrapper">
           <ul class="detail-content">
             <li class="detail-item" v-for="(item,index) in sequenceList" :key="item.id"
             @click="changeSong(index)">
               {{item.name}}<i class="iconfont icon-play1"></i>
             </li>
           </ul>
         </div>
       </div>
     </div>
     <div class="no-play" v-show="noplay">
       暂不支持播放
     </div>
  </div>
</template>

<script>
import '@/assets/css/iconfont.css'
import axios from 'axios'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import BScroll from '@better-scroll/core'
import Lyric from 'lyric-parser'

import {
  mapActions,
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'Song',
  components: {
    ProgressBar
  },
  computed: {
    ...mapState({
      currentIndex: state => state.song.currentIndex,
      isPlaying: state => state.song.isPlaying,
      playMode: state => state.song.playMode,
      sequenceList: state => state.song.sequenceList
    }),
    ...mapGetters([
      'playlist'
    ])
  },
  watch: {
    // 判断歌曲有无变化的关键
    currentIndex: function(newCurrentIndex, oldCurrentIndex) {
      this.initSong()
    },
    // 判断歌曲是否应该播放
    isPlaying: function(newIsPlaying, oldIsPlaying) {
      if (newIsPlaying) {
        this.$refs.audio.play()
        return
      }
      this.$refs.audio.pause()
    },
    // Better-Scroll需要我们v-show后再显示
    close: function(newClose, oldClose) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          scrollY: true
        })
      })
    },
    showLyric: function(newShow, oldShow) {
      this.$nextTick(() => {
        this.LyricScroll = new BScroll(this.$refs.lyric, {
          click: true,
          scrollY: true
        })
      })
    }
  },
  methods: {
    ...mapActions([
      'getPrevSong',
      'getNextSong',
      'toggleIsPlaying',
      'changeIndex',
      'changeMode'
    ]),
    // init
    async initSong() {
      this.showLyric = false
      let id = this.playlist[this.currentIndex].id
      await this._getSongInfo(id)
      await this._getSongUrl(id)
      await this._getLyric(id)
      if (!this.isPlaying) {
        this.toggleIsPlaying()
      }
      this.lyric.play()
      this.$refs.audio.play()
    },
    _getSongInfo(id) {
      return axios.get(`/api/song/detail?ids=${id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.song = res.data.songs[0]
          }
        })
    },
    _getSongUrl(id) {
      return axios.get(`/api/song/url?id=${id}`)
        .then(res => {
          if (res.data.code === 200) {
            if (res.data.data[0].url) {
              this.songUrl = res.data.data[0].url
            } else {
              this.noplay = true
              setTimeout(() => {
                this.$router.go(-1)
              }, 500)
            }
          }
        })
    },
    _getLyric(id) {
      return axios.get(`/api/lyric?id=${id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.lyric = new Lyric(res.data.lrc.lyric, this.handler)
          }
        })
    },
    handler({
      lineNum,
      txt
    }) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        this.LyricScroll.scrollToElement(this.$refs.lyricNum[lineNum - 5], 1000, true, true)
      }
    },
    handleGoBack() {
      this.$router.go(-1)
    },
    handleNextSong() {
      this.getNextSong()
    },
    handlePrevSong() {
      this.getPrevSong()
    },
    handlePlay() {
      this._calculateAndSaveAngle()
      this.toggleIsPlaying()
      this.lyric.togglePlay()
    },
    handleDetail() {
      this.close = true
    },
    handleClose() {
      this.close = false
    },
    _calculateAndSaveAngle() {
      let cdStyle = window.getComputedStyle(this.$refs.img, null).transform // 获取图片的旋转角度

      let cd = this.$refs.songImg

      let cdTransform = window.getComputedStyle(cd, null).transform // 获取父容器的旋转角度

      // 如果父容器没有旋转过，采用图片的角度，否则利用transform叠加父子容器的角度
      cd.style.transform = cdTransform === 'none' ? cdStyle : cdStyle.concat(' ', cdTransform)
    },
    changeSong(index) {
      this.changeIndex(index)
      this.close = false
    },
    timeupdate(e) {
      this.currentTime = e.target.currentTime
      let t = Math.floor(parseFloat(this.song.dt) / 1000)
      if (e.target.currentTime > t) {
        if (this.playMode === 2) {
          this.$refs.audio.currentTime = 0
          return
        }
        if (this.isPlaying) {
          this.getNextSong()
        }
      }
    },
    playerChange(precent) {
      this.$refs.audio.currentTime = precent * Math.floor(parseFloat(this.song.dt) / 1000)
      this.lyric.seek(Math.floor(precent * this.song.dt))
    },
    changePlayMode() {
      let a = this.playMode + 1
      if (a > 2) {
        a = 0
      }
      this.changeMode(a)
    },
    handleShowLyric() {
      this.showLyric = true
    },
    handleHideLyric() {
      this.showLyric = false
    }
  },
  created() {
    if (this.playlist.length === 0) {
      this.$router.push('/logined/find')
      return
    }
    this.initSong()
  },
  data() {
    return {
      song: {},
      songUrl: '',
      currentTime: 0,
      close: false,
      noplay: false,
      lyric: '',
      showLyric: false,
      currentLineNum: 0
    }
  }
}
</script>

<style lang="css" scoped>
.full-player{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg,rgba(0,0,0,0.8), rgba(0,0,0,0.75),rgba(0,0,0,0.7),rgba(0,0,0,0.65));
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.song-header{
  display: flex;
  flex-direction: row;
  color: #fff;
  align-items: center;
}
.song-header-mid{
  flex: 1 1 0;
  margin-left: 5px;
  margin-top: 5px;
}
.icon-left{
  font-size: 25px;
  margin:8px 10px 5px 5px;
}
.song-header-mid p{
  font-size: 18px;
  margin-block-start:0;
  margin-block-end:0;
}
.song-header-mid span{
  color:#999;
  font-size: 14px;
}
.icon-share{
  font-size: 25px;
  margin:8px 10px 5px 5px;
}
.song-content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
}
.song-inner{
  width: 200px;
  height: 200px;
  border: 50px solid #000;
  border-radius: 50%;
  overflow: hidden;
}
.song-content img{
  width: 200px;
  height: 200px;
}
.active{
  animation: move 20s linear infinite;
}
.icon-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 10px;
}
.icon-wrapper i{
  font-size: 35px;
  color: #999;
}
.song-bar{
  margin-top: 10px;
}
.song-controller{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px 10px 30px 10px;
}
.song-controller i{
  font-size: 21px;
  color: #fff;
}
.song-controller .icon-play1{
  font-size: 45px;
}
.song-controller .icon-Pause{
  font-size: 45px;
}
@keyframes move {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(1turn);
  }
}
.detail-mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 1200;
}
.detail-header{
  line-height:40px;
  padding-left: 5px;
  border-bottom: 1px solid #ebebeb;
}
.detail-list{
  position: absolute;
  background: #fff;
  border-radius: 15px 15px 0 0;
  width: 100%;
  height: 400px;
  bottom: 0;
}
.detail-wrapper{
  height: 90%;
  width: 100%;
  overflow: hidden;
  bottom: 0;
  position: absolute;
  left: 0;
}
.detail-content{
  width: 100%;
}
.detail-item{
  line-height: 40px;
  padding-left: 10px;
  width: 100%;
}
.detail-item i{
  position: absolute;
  right: 10px;
}
.no-play{
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  width: 220px;
  font-size: 35px;
  color:#999;
}
.lyric-inner{
  color: rgba(255,255,255,0.3);
  height:400px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  line-height: 30px;
}
.current{
  color: #fff;
}
</style>
