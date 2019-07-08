<template lang="html">
  <div class="login-wrapper">
    <p>登陆网易云</p>
    <div class="user-name">
      <span>用户名：</span>
      <input />
    </div>
    <div class="user-pwd">
      <span>密码：</span>
      <input />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="css" scoped>
.login-wrapper{
  background: #d43c33;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:#fff;
}
.user-name{
  background: transparent;
  border: none;
}
</style>
