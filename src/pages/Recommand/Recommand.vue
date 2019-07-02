<template lang="html">
  <div>
    <swiper :options="swiperOption" ref="mySwiper" class="my-swiper">
      <swiper-slide v-for="item in slider" :key="item.id">
        <a :href="item.linkUrl">
          <img :src="item.picUrl" alt="pic"/>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="recommand-list">
      <div class="recommand-title">
        热门歌单推荐
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommand} from '@/api/recommand'
import {SUCCESS} from '@/common/js/config'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Recommand',
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this._getRecommand()
  },
  data () {
    return {
      slider: [],
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  methods: {
    _getRecommand () {
      getRecommand().then(res => {
        if (res.code === SUCCESS) {
          this.slider = res.data.slider
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'

.swiper-slide
  img
    width:100%
.swiper-pagination >>> .swiper-pagination-bullet-active
  background: #eee !important
.recommand-list
  .recommand-title
    color: $color-theme
    padding: 20px
    letter-spacing:1px
    font-size:$font-size-large
    text-align: center
</style>
