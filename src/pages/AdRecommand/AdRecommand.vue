<template lang="html">
  <div class="recommand-music">
    <div class="recommand-title">
      推荐歌单
    </div>
    <div class="item-group">
      <div class="item-wrapper" v-for="item in computedRecommandList" :key="item.id"
      @click="handlePlayList(item.id)">
        <img :src="item.picUrl" alt="cover"/>
        <p>{{item.name}}</p>
        <div class="play-count">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+" alt="logo"/>
          {{item.playCount}}
        </div>
      </div>
    </div>
    <div class="newest-title">
      最新音乐
    </div>
    <div class="newest-group">
      <div class="newest-item" v-for="item in newSongsList" :key="item.id"
      @click="handleNewSong(item.id)">
        <div class="newest-word">
          <p>{{item.name.length > 30 ? item.name.substring(0,30) + '...': item.name}}</p>
          <p class="newest-info"> <span>{{item.song.artists[0].name}}</span> - <span>{{item.song.album.name.length > 25 ? item.song.album.name.substring(0,25) + '...' : item.song.album.name}}</span> </p>
        </div>
        <div class="play-btn"></div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '../../components/AdFooter/AdFooter'
import axios from 'axios'
export default {
  name: 'Recommand',
  components: {
    MyFooter
  },
  methods: {
    _getRecommand () {
      axios.get('/api/personalized')
        .then(res => {
          if (res.data.code === 200) {
            this.recommandList = res.data.result
          }
        })
    },
    _getNewSongs () {
      axios.get('/api/personalized/newsong')
        .then(res => {
          if (res.data.code === 200) {
            this.newSongsList = res.data.result
          }
        })
    },
    handlePlayList (id) {
      this.$router.push(`/adplaylist/${id}`)
    },
    handleNewSong (id) {
      this.$router.push(`/addetail/${id}`)
    }
  },
  computed: {
    computedRecommandList () {
      var newList = this.recommandList.slice(0, 6)
      for (let i = 0; i < newList.length; i++) {
        newList[i].playCount = newList[i].playCount / 10000 > 0 ? Math.round(newList[i].playCount / 10000).toFixed(1) + '万' : newList[i].playCount
        newList[i].name = newList[i].name.length > 20 ? newList[i].name.substring(0, 20) + '...' : newList[i].name
      }
      return newList
    }
  },
  created () {
    this._getRecommand()
    this._getNewSongs()
  },
  data () {
    return {
      recommandList: [],
      newSongsList: []
    }
  }
}
</script>

<style lang="css" scoped>
.recommand-music{
  margin-top: 132px;
}
.recommand-title{
  border-left: 2px solid #d43c33;
  padding-left: 5px;
  font-size: 18px;
  letter-spacing: 1px;
}
.item-group{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 15px;
}
.item-wrapper{
  padding-left: 1px;
  padding-right: 1px;
  box-sizing: border-box;
  width: 33.3%;
  position: relative;
}
.item-wrapper:after{
  content:'';
  position: absolute;
  top:0;
  left:0;
  background: linear-gradient(180deg,rgba(0,0,0,0.2),transparent);
  width: 100%;
  height: 20px;
}
.item-wrapper img{
  width:100%;
}
.item-wrapper p{
  color:#333;
  font-size: 13px;
  line-height: 1.3;
  padding: 2px 0 10px 3px;
}
.item-wrapper .play-count{
  position:absolute;
  right: 3px;
  top: 0;
  color:#fff;
  font-size: 13px;
}
.item-wrapper .play-count img{
  width:10px;
}
.newest-title{
  border-left: 2px solid #d43c33;
  padding-left: 5px;
  font-size: 18px;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.newest-item{
  border-bottom: 1px solid #ccc;
  padding:5px 0 5px 10px;
  display: flex;
  align-items: center;
}
.newest-info{
  font-size: 13px;
  color:#333;
}
.newest-word{
  flex:1 1 0;
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
</style>
