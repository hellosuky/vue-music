<template lang="html">
  <div class="bar-wrapper" ref="bar">
    <div class="now-time">
      {{now}}
    </div>
    <div class="bar-inner"
    @click="handleClick">
      <div class="bar-play" ref="play"
      ></div>
      <div class="bar-button" ref="btn"
      @touchstart.prevent="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend="handleTouchEnd"
      ></div>
    </div>
    <div class="song-time">
      {{time}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    currentTime: Number,
    dt: Number
  },
  watch: {
    currentTime(newCurrentTime, oldCurrentTime) {
      this.now = this.parseNow(newCurrentTime)
      this.getButtonPos(newCurrentTime, this.dt)
    },
    dt(newDt, oldDt) {
      this.time = this.parseTime(newDt)
    }
  },
  methods: {
    parseTime(time) {
      let t = Math.floor(parseFloat(time) / 1000)
      let minus = Math.floor(t / 60)
      let seconds = (t % 60).toString().padStart(2, '0')
      return minus + ':' + seconds
    },
    parseNow(now) {
      let minus = Math.floor(now / 60)
      let seconds = Math.floor((now % 60)).toString().padStart(2, '0')
      return minus + ':' + seconds
    },
    getButtonPos(now, dt) {
      let t = Math.floor(parseFloat(dt) / 1000)
      let a = Math.floor(now)
      let precent = a / t
      this.$refs.btn.style.left = (280 * precent) + 'px'
      this.$refs.play.style.width = (280 * precent) + 'px'
    },
    handleTouchStart(e) {
      this.posX = e.touches[0].pageX
      this.left = this.$refs.btn.offsetLeft
      this.canDrag = true
    },
    handleTouchMove(e) {
      if (!this.canDrag) {
        return
      }
      let x = e.touches[0].pageX
      let deltaX = x - this.posX

      this.$refs.btn.style.left = Math.min(280, Math.max(0, this.left + deltaX)) + 'px'
      this.$emit('playerChange', (this.left + deltaX) / 280)
    },
    handleTouchEnd(e) {
      this.canDrag = false
    },
    handleClick(e) {
      this.$refs.btn.style.left = Math.min(280, Math.max(0, e.clientX - 50)) + 'px'
      this.$emit('playerChange', (e.clientX - 50) / 280)
    }
  },
  data() {
    return {
      time: '',
      now: '',
      canDrag: false,
      posX: ''
    }
  }
}
</script>

<style lang="css" scoped>
.bar-wrapper{
  position: relative;
  height: 30px;
  width: 100%;
  line-height: 30px;
}
.bar-inner{
  position: relative;
  height: 3px;
  width: 280px;
  background: rgba(255,255,255,0.2);
  margin: 0 auto;
}
.bar-play{
  position: absolute;
  height: 3px;
  background: #ebebeb;
  left:0;
  top: 0;
}
.bar-button{
  background: #fff;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: -2px;
  touch-action:none;
}
.now-time{
  position: absolute;
  left: 5px;
  top: -13px;
  color:#fff;
}
.song-time{
  position: absolute;
  right: 5px;
  color:#fff;
  top: -13px;
}
</style>
