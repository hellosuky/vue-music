<template lang="html">
  <div class="video-wrapper">
    <div class="tab-wrapper" ref="tab">
      <ul class="tab">
        <li ref="tabitem" :class="active === index ? 'active tab-item' : 'tab-item'"
        v-for="(item,index) in tabList" :key="item.id"
        @click="handleClick(index,item.id)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="video-list">
      <div class="video-item" v-for="item in videoList" :key="item.data.vid">
        <img class="video-item-cover" :src="item.data.coverUrl" alt="pic" />
        <p class="video-item-title">{{item.data.title}}</p>
        <div class="video-creator">
          <img class="video-item-avatar" :src="item.data.creator.avatarUrl" alt="pic" />
          <p class="video-item-avatarname">{{item.data.creator.nickname}}</p>
        </div>
        <div class="video-item-play">
          <i class="iconfont icon-play1"></i>
        </div>
      </div>
    </div>
    <div class="bottom">
      Hello 你已经到底了~
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from '@better-scroll/core'
export default {
  name: 'Video',
  methods: {
    _getVideo() {
      axios.get('/api/video/group/list')
        .then(res => {
          if (res.data.code === 200) {
            this.tabList = res.data.data.slice(0, 10)
            this._getVideoList(this.tabList[0].id)
          }
        })
    },
    initScroll() {
      this.scroll = new BScroll(this.$refs.tab, {
        scrollX: true,
        click: true
      })
    },
    handleClick(index, videoId) {
      this.active = index
      this.scroll.scrollToElement(this.$refs.tabitem[index], 300, true, true)
      this._getVideoList(videoId)
    },
    _getVideoList(videoId) {
      axios.get(`/api/video/group?id=${videoId}`)
        .then(res => {
          if (res.data.code === 200) {
            this.videoList = res.data.datas
          }
        })
    }
  },
  created() {
    this._getVideo()
  },
  mounted() {
    this.initScroll()
  },
  data() {
    return {
      tabList: [],
      active: 0,
      videoList: []
    }
  }
}
</script>

<style lang="css" scoped>
.video-wrapper{
  margin-top: 60px;
}
.tab-wrapper{
  position: fixed;
  left:0;
  right: 0;
  top:59px;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.tab{
  width: 830px;
  display: flex;
  flex-direction: row;
  overflow: auto;
  align-items: center;
  list-style: none;
  z-index: 999;
}
.tab-item{
  padding: 10px;
}
.active{
  font-weight: 800;
  color:#d43c33;
  position: relative;
}
.active::after{
  content: '';
  position: absolute;
  bottom: 0;
  background: #d43c33;
  height: 2px;
  width: 70%;
  left:50%;
  transform: translate(-50%,0);
}
.video-list{
  margin-top: 105px;
  background: #ebecec;
}
.video-item{
  margin: 10px 0 10px 0;
  background: #fff;
  padding:15px 15px 0 15px;
  position: relative;
}
.video-item-cover{
  width: 100%;
  border-radius: 10px;
}
.video-item-title{
  margin: 15px;
}
.video-creator{
  border-top: 1px solid #ebecec;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.video-item-avatar{
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.video-item-play{
  position: absolute;
  color:#fff;
  left:50%;
  top:30%;
  transform: translate(-50%,0);
}
.video-item-play i{
  font-size: 45px;
}
.bottom{
  background: #eee;
  height: 50px;
  color: #999;
  text-align: center;
  width: 100%;
  line-height: 50px;
}
</style>
