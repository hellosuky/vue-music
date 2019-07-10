<template lang="html">
  <div class="header-wrapper">
    <div class="ham-btn">
      <svg height="30px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="30px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/></svg>
    </div>
    <div class="sub-title">
      <router-link to="/logined/info" tag="span">
        我的
      </router-link>
      <router-link to="/logined/find" tag="span">
        发现
      </router-link>
      <router-link to="/logined/friend" tag="span">
        朋友
      </router-link>
      <router-link to="/logined/video" tag="span">
        视频
      </router-link>
    </div>
    <div class="search-btn">
      <svg enable-background="new 0 0 512 512" height="28px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="28px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M497.913,497.913c-18.782,18.782-49.225,18.782-68.008,0l-84.862-84.863c-34.889,22.382-76.13,35.717-120.659,35.717  C100.469,448.767,0,348.312,0,224.383S100.469,0,224.384,0c123.931,0,224.384,100.452,224.384,224.383  c0,44.514-13.352,85.771-35.718,120.676l84.863,84.863C516.695,448.704,516.695,479.131,497.913,497.913z M224.384,64.109  c-88.511,0-160.274,71.747-160.274,160.273c0,88.526,71.764,160.274,160.274,160.274c88.525,0,160.273-71.748,160.273-160.274  C384.657,135.856,312.909,64.109,224.384,64.109z"/></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader'
}
</script>

<style lang="css" scoped>
.header-wrapper{
  position: fixed;
  left:0;
  top:0;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 10px 0 10px 0;
  background: #fff;
  z-index: 1000;
}
.ham-btn{
  padding: 5px 0 0 10px;
}
.sub-title{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 1 1 0;
  color:#333;
}
.search-btn{
  padding: 5px 5px 0 0 ;
}
.router-link-active{
  color:#000;
  font-weight: 800;
  font-size: 20px;
}
</style>
