<template lang="html">
  <div class="">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in bannerList" :key="index" class="swiper-item">
        <div class="swiper">
          <img :src="item.pic" alt="pic"/>
          <div class="swiper-type">
            {{item.typeTitle}}
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Banner',
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    _getBanner () {
      let u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      if (isAndroid) {
        axios.get(`/api/banner?type=1`)
          .then(res => {
            if (res.data.code === 200) {
              this.bannerList = res.data.banners
            }
          })
      } else {
        axios.get(`/api/banner?type=2`)
          .then(res => {
            if (res.data.code === 200) {
              this.bannerList = res.data.banners
            }
          })
      }
    }
  },
  created () {
    this._getBanner()
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      bannerList: []
    }
  }
}
</script>

<style lang="css" scoped>
.swiper-item{
  text-align: center;
  margin-top: 70px;
}
.swiper{
  position: relative;
  width: 100%;
  overflow: hidden;
}
.swiper-type{
  position: absolute;
  bottom: 0;
  right: 5%;
  border-radius: 8px 0 0 0;
  padding: 3px;
  background: #d43c33;
  color:#fff;
}
.swiper-item img{
  width: 90%;
  border-radius: 10px;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet-active{
  background: #d43c33;
}
</style>
