<template lang="html">
  <div class="playlist-detail">
    <div class="playlist-header">
      <div class="playlist-header-cover" :style="{ backgroundImage: 'url('+playList.coverImgUrl+')' }"></div>
      <div class="playlist-header-data">
        <img class="playlist-header-img" :src="playList.coverImgUrl" alt="pic"/>
        <div class="playlist-header-info">
          <p>{{playList.name}}</p>
          <div class="playlist-creator" v-if="playList.creator">
            <img :src="playList.creator.avatarUrl" alt="creator"/>
            <p>{{playList.creator.nickname}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist-tags">
      <span>标签：</span>
      <div class="tags-wrapper">
        <span v-for="(item,index) in playList.tags" :key="index">
          {{item}}
        </span>
      </div>
    </div>
    <p class="playlist-info">简介:{{playList.description}}</p>
    <div class="playlist-songs">
      <p class="playlist-title">歌曲列表</p>
      <div class="songs-list">
        <div class="songs-item" v-for="(item,index) in playList.tracks" :key="index">
          <div class="songs-index">{{index + 1}}</div>
          <div class="songs-name">
            <p>{{item.name}}</p>
            <p class="songs-sub">{{item.ar[0].name}} - {{item.al.name}}</p>
          </div>
          <div class="play-btn"></div>
        </div>
      </div>
    </div>
    <div class="save-playlist">
      <div class="save-btn">
        收藏歌单
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AdPlayList',
  methods: {
    _getPlayListDetail () {
      let id = this.$route.params.id
      axios.get(`/api/playlist/detail?id=${id}`)
        .then(res => {
          if (res.data.code === 200) {
            this.playList = res.data.playlist
          }
        })
    }
  },
  created () {
    this._getPlayListDetail()
  },
  data () {
    return {
      playList: {}
    }
  }
}
</script>

<style lang="css" scoped>
.playlist-detail{
  position: relative;
}
.playlist-header{
  position: relative;
  height: 200px;
  overflow: hidden;
}
.playlist-header-cover{
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom: 0;
  width:100%;
  filter: blur(20px);
  z-index: -1;
}
.playlist-header-cover::after{
  content: '';
  left:0;
  right:0;
  top:0;
  bottom: 0;
  position: absolute;
  z-index: 1;
  background: rgba(0,0,0,0.4);
}
.playlist-header-data{
  position: absolute;
  left:15px;
  top: 25px;
  display: flex;
  flex-direction: row;
}
.playlist-header-img{
  width: 150px;
  padding-right: 15px;
}
.playlist-header-info{
  color:#fff;
  font-size: 20px;
  padding-top: 5px;
  padding-right: 10px;
}
.playlist-creator{
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.playlist-creator img{
  width: 40px;
  border-radius: 50%;
  padding-right: 10px;
}
.playlist-tags{
  padding: 10px;
  display: flex;
  flex-direction: row;
}
.tags-wrapper span{
  border: 1px solid #ebecec;
  border-radius: 20px;
  padding:2px 5px 2px 5px;
  margin: 0 5px 0 5px;
}
.playlist-info{
  padding: 10px;
}
.playlist-title{
  background: #ebecec;
  padding: 5px;
}
.playlist-songs{
  margin-bottom: 33px;
}
.songs-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
}
.songs-index{
  font-size: 20px;
  padding-right: 10px;
  color:#999;
}
.songs-name{
  flex:1 1 0;
}
.songs-sub{
  color:#333;
  font-size: 13px;
}
.play-btn{
  width:22px;
  height: 22px;
  display: inline-block;
  background: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=") no-repeat;
  background-size: 166px 97px;
  background-position: -24px 0;
  margin-right: 10px;
}
.save-playlist{
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
  background: #fff;
}
.save-btn{
  background: #d43c33;
  border-radius: 20px;
  width: 80%;
  height: 35px;
  line-height: 35px;
  color: #fff;
  text-align: center;
    margin: 0 auto;
}
</style>
