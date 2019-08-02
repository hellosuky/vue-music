<template lang="html">
  <div class="recommand-wrapper">
    <div class="recommand-top">
      <i class="iconfont icon-left" @click="handleBack"></i>
      <div class="today">
        {{today}}
      </div>
      <div class="desc">
        根据你的音乐口味，为你推荐好音乐、好朋友
      </div>
    </div>
    <div class="recommand-list">
      <div class="play-all">
        <i class="iconfont icon-play"></i>
        播放全部
      </div>
      <div class="recommand-item" v-for="item in recommandList" :key="item.id">
        <div class="recommand-pic">
          <img :src="item.album.picUrl" alt="pic"/>
        </div>
        <div class="recommand-words">
          <div class="recommand-name">{{item.name}}</div>
          <div class="recommand-down">{{item.artists[0].name}} - {{item.album.name}}</div>
        </div>
        <i class="iconfont icon-PlayIcon play-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Recommand',
  methods: {
    _getRecommand() {
      axios.get('/api/recommend/songs')
        .then(res => {
          if (res.data.code === 200) {
            this.recommandList = res.data.recommend.slice(0, 10)
          }
        })
    },
    handleBack () {
      this.$router.go(-1)
    }
  },
  created() {
    this._getRecommand()
  },
  data() {
    return {
      recommandList: []
    }
  },
  computed: {
    today () {
      var date = new Date()
      return date.getDate() + '/' + (date.getMonth() + 1)
    }
  }
}
</script>

<style lang="css" scoped>
.recommand-top{
  background: url('http://p1.music.126.net/4fEKAYWHSuD0tGpBWRRiaQ==/109951164213745269.jpg') no-repeat;
  background-size: cover;
  height: 180px;
  overflow: hidden;
}
.recommand-list{
  background: #fff;
  border-radius: 25px;
  z-index: 1;
  margin-top: -30px;
}
.play-all{
  padding: 15px 10px 15px 10px;
}
.recommand-item{
  display: flex;
  flex-direction: row;
  margin: 10px;
  align-items: center;
}
.recommand-item img{
  width: 50px;
  border-radius: 5px;
}
.recommand-item .recommand-words{
  margin-left: 10px;
}
.recommand-title{
  font-size: 14px;
}
.recommand-words{
  flex:1 1 0;
}
.recommand-down{
  color: #999;
  font-size: 12px;
}
.today{
  position: absolute;
  color:#fff;
  font-size: 18px;
}
.play-icon{
  font-size: 30px;
}
</style>
