<template lang="html">
  <div class="search-wrapper">
    <div class="search-input">
      <span class="search-btn"></span>
      <input placeholder="搜索歌曲、歌手、专辑" v-model="keywords" id="inputBar"/>
      <div class="close-btn" v-if="show" @click="handleClick">x</div>
    </div>
    <div class="search-hotword">
      <p class="search-hotword-title">热门搜索</p>
      <div class="search-all">
        <span v-for="(item,index) in wordList" :key="index">
          {{item.first}}
        </span>
      </div>
    </div>
    <div class="search-mask" v-if="show">
      <p class="search-title">搜索“{{keywords}}”</p>
      <div class="search-item" v-for="(item,index) in suggestList" :key="index">
        <div class="play-btn"></div>
        <div class="search-info">
          {{item.keyword}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const _ = require('lodash')

export default {
  name: 'Search',
  methods: {
    _getHotWords () {
      axios.get('/api/search/hot')
        .then(res => {
          if (res.data.code === 200) {
            this.wordList = res.data.result.hots
          }
        })
    },
    search (newword) {
      if (newword.length === 0) {
        this.show = false
        return
      }
      axios.get(`/api/search/suggest?keywords=${newword}&type=mobile`)
        .then(res => {
          if (res.data.code === 200 && newword.length > 0) {
            this.suggestList = res.data.result.allMatch
            this.show = true
          }
        })
    },
    handleClick () {
      this.keywords = ''
    }
  },
  created () {
    this._getHotWords()
    this._debounce = _.debounce(this.search, 200, false)
  },
  data () {
    return {
      wordList: [],
      keywords: '',
      suggestList: [],
      show: false
    }
  },
  watch: {
    keywords (newword, old) {
      // 节流
      this._debounce(newword)
    }
  }
}
</script>

<style lang="css" scoped>
.search-wrapper{
  margin-top: 138px;
  position: relative;
}
.search-input{
  width: 90%;
  background: #ebecec;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  margin: 10px auto;
  position: relative;
}
.search-input input:focus{
  outline: none;
}
.search-input input{
  border: none;
  background: transparent;
  width: 80%;
  position: absolute;
  left:40px;
  top:4px;
  height: 32px;
}
.search-btn{
  display: block;
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==');
  background-size: 100% 100%;
}
.close-btn{
  border-radius: 50%;
  width:20px;
  height: 20px;
  background: #999;
  text-align: center;
  line-height: 15px;
  color:#fff;
  position: absolute;
  top: 10px;
  right: 13px;
}
.search-hotword-title{
  padding-left: 10px;
  padding-top: 15px;
  color:#333;
  font-size: 13px;
  padding-bottom: 10px;
}
.search-all{
  display: flex;
  flex-wrap: wrap;
}
.search-all span{
  border: 1px solid #ebecec;
  border-radius: 15px;
  padding:5px 8px 5px 8px;
  margin: 5px;
}
.search-mask{
  background: #fff;
  position: absolute;
  width:100%;
  top:54px;
  min-height: 300px;
}
.search-item{
  border-bottom: 1px solid #ebecec;
  height:40px;
  line-height: 40px;
}
.play-btn{
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==');
  background-size: 100% 100%;
  float: left;
  margin: 12px 8px 0 8px;
}
.search-info{
  float: left;
}
.search-title{
  color:#507daf;
  padding-bottom: 15px;
  padding-left: 8px;
  padding-top: 10px;
}
</style>
