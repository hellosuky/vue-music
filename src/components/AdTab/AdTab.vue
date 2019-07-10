<template lang="html">
  <div class="tab-wrapper">
    <router-link to="/adrecommand" tag="div">
      <span>
        推荐音乐
      </span>
    </router-link>
    <router-link to="/adhot" tag="div">
      <span>
        热歌榜
      </span>
    </router-link>
    <router-link to="/adsearch" tag="div">
      <span>
        搜索
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="css" scoped>
.tab-wrapper{
  position: fixed;
  left:0;
  top:80px;
  height: 45px;
  line-height: 45px;
  width:100%;
  border-bottom: 1px solid #ebecec;
  background: #fff;
  z-index: 100;
}
.tab-wrapper div{
  width: 33%;
  float: left;
  text-align: center;
}
.tab-wrapper span{
  height: 45px;
  display: inline-block;
  position: relative;
  font-size: 15px;
}
.tab-wrapper span:before{
  content:'';
  width: 100%;
  height: 2px;
  position: absolute;
  background: #fff;
  bottom: 2px;
}
.tab-wrapper .router-link-active span{
  color: #d43c33;
}
.tab-wrapper .router-link-active span:before{
  background:#d43c33;
}
</style>
