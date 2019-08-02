<template lang="html">
  <div class="friend-wrapper">
    <div class="friend-hook" ref="hook" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <div class="friend-item" v-for="item in friEvent" :key="item.id">
        <div class="friend-header">
          <img class="friend-header-img" :src="item.user.avatarUrl" alt="avatar"/>
          <div class="friend-header-sth">
            <span class="friend-header-name">{{item.user.nickname}}</span>
            <span v-if="JSON.parse(item.json).song">发布单曲:</span>
            <span v-if="JSON.parse(item.json).video">发布视频:</span>
            <div class="">
              {{item.user.followeds}}粉丝
            </div>
          </div>
          <div class="friend-follow" v-if="!item.user.followed">+关注</div>
        </div>
        <div class="friend-content">
          <div class="friend-msg">
            {{JSON.parse(item.json).msg}}
          </div>
          <div class="friend-pics" v-if="item.pics.length > 0">
            <img :key="pic.id" v-for="pic in item.pics" :src="pic.squareUrl" alt="pic"/>
          </div>
          <div class="friend-song" v-if="JSON.parse(item.json).song">
            <img :src="JSON.parse(item.json).song.album.picUrl"/>
            <div class="friend-song-name">
              {{JSON.parse(item.json).song.name}}
              <div class="friend-song-artist">
                {{JSON.parse(item.json).song.artists[0].name}}
              </div>
            </div>
            <div class="friend-song-play">
              <i class="iconfont icon-play1"></i>
            </div>
          </div>
          <div class="friend-video" v-if="JSON.parse(item.json).video">
            <img :src="JSON.parse(item.json).video.coverUrl"/>
            <div class="friend-video-play">
              <i class="iconfont icon-play1"></i>
            </div>
          </div>
          <div class="icon-wrapper">
            <span><i class="iconfont icon-zhuanfa"></i>{{item.info.shareCount}}</span>
            <span><i class="iconfont icon-comment"></i>{{item.info.commentCount}}</span>
            <span><i class="iconfont icon-like"></i>{{item.info.likedCount}}</span>
          </div>
        </div>
      </div>
      <div class="loading-wrapper" v-if="loading">
        <div class="loading">
          加载中....
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/assets/css/iconfont.css'

export default {
  name: 'Friend',
  methods: {
    _getFriends () {
      axios.get('/api/event?pagesize=10')
        .then(res => {
          if (res.data.code === 200) {
            this.friEvent = res.data.event
            this.lasttime = res.data.lasttime
          }
        })
    },
    touchstart (e) {
      this.startY = e.targetTouches[0].pageY
      this.height = this.$refs.hook.scrollHeight
      this.canDrag = true
    },
    touchmove (e) {
      if (this.canDrag) {
        let dist = e.targetTouches[0].pageY - this.startY
        let top = document.documentElement.scrollTop || document.body.scrollTop
        let clientHeight = document.body.clientHeight || document.documentElement.clientHeight
        if (this.height < top + clientHeight && dist < -50) {
          this.loading = true
          // get new data
          this.debounce(() => {
            axios.get(`/api/event?pagesize=10&lasttime=${this.lasttime}`)
              .then(res => {
                if (res.data.code === 200) {
                  this.friEvent.push(...res.data.event)
                  this.lasttime = res.data.lasttime
                  this.loading = false
                }
              })
          }, 200)
        }
      }
    },
    touchend (e) {
      this.canDrag = false
    },
    debounce (fn, wait) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(fn, wait)
    }
  },
  created () {
    this._getFriends()
  },
  data () {
    return {
      friEvent: [],
      startY: 0,
      height: 0,
      canDrag: false,
      loading: false,
      lasttime: 0
    }
  }
}
</script>

<style lang="css" scoped>
.friend-wrapper{
  padding: 60px 12px 10px 12px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
.friend-item{
  border-bottom: 0.5px solid #eee;
  margin-bottom: 10px;
  padding-bottom: 5px;
}
.friend-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.friend-header-img{
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.friend-header-sth{
  flex: 1 1 0;
  color: #999;
  font-size: 14px;
}
.friend-header-name{
  color: #2177b8;
}
.friend-follow{
  padding:3px 10px 3px 10px;
  background: #d43c33;
  border-radius: 20px;
  font-size: 13px;
  letter-spacing: 2px;
  color: #fff;
  text-align: center;
}
.friend-content{
  margin-left: 50px;
  margin-top: 10px;
}
.friend-msg{
  font-size: 14px;
}
.friend-pics{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
}
.friend-pics img{
  border-radius: 3px;
  width: 30%;
  height: 30%;
  margin: 4px;
}
.friend-song{
  width: 100%;
  border-radius: 3px;
  background: #ebecec;
  padding: 3px 0px 3px 0px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  position: relative;
}
.friend-song img{
  width: 40px;
  height: 40px;
  margin-left: 3px;
  margin-right: 5px;
}
.friend-song-artist{
  font-size: 10px;
  color: #999;
}
.friend-song-play{
  position: absolute;
  left:12px;
  color:#fff;
}
.friend-song-play i{
  font-size: 20px;
}
.friend-video{
  margin: 10px;
  position: relative;
}
.friend-video img{
  width: 100%;
  border-radius: 5px;
}
.friend-video-play{
  color:#fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.friend-video-play i{
  font-size: 45px;
}
.icon-wrapper{
  color:#999;
  margin: 15px;
  vertical-align: middle;
}
.icon-wrapper span{
  width: 80px;
  font-size: 14px;
  display: inline-block;
}
.icon-wrapper i{
  font-size: 18px;
  margin-right: 2px;
}
.loading-wrapper{
  text-align: center;
  font-size: 18px;
  height: 50px;
  position: relative;
  transition: ease-out 2s;
}
.loading{
  position: fixed;
  bottom:0;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background: #ebecec;
  left:0;
  right: 0;
}
</style>
