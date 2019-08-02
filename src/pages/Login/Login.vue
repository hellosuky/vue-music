<template lang="html">
  <div class="login-wrapper">
    <img class="logo" src="./logo.png" alt="logo" />
    <p>登陆网易云</p>
    <div class="user-name">
      <input placeholder="输入手机号" v-model="userName"/>
    </div>
    <div class="user-pwd">
      <input placeholder="输入密码" v-model="userPwd" />
    </div>
    <button type="button" name="button" class="login-btn" @click="handleClick">登陆</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  methods: {
    handleClick () {
      if (!this.userName) {
        alert('请你输入手机号')
        return
      }
      if (!this.userPwd) {
        alert('请你输入密码')
        return
      }
      axios.get(`/api/login/cellphone?phone=${this.userName}&password=${this.userPwd}`)
        .then(res => {
          axios.get('/api/login/status')
            .then(res => {
              window.localStorage.setItem('uid', res.data.profile.userId)
              this.$router.push('/logined')
            })
        })
    }
  },
  data () {
    return {
      userName: '',
      userPwd: ''
    }
  }
}
</script>

<style lang="css" scoped>
.login-wrapper{
  background: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:#d43c33;
  font-size: 22px;
  font-weight: 600;
}
.logo{
  width: 100px;
}
.user-name{
  border:2px solid #d43c33;
  padding-left: 10px;
  border-radius: 20px;
  margin-top: 10px;
}
.user-name input{
  background: transparent;
  border: none;
  vertical-align: middle;
}
.user-name input:focus{
  outline: none;
}
.user-pwd{
  border:2px solid #d43c33;
  padding-left: 10px;
  margin-top: 5px;
  border-radius: 20px;
}
.user-pwd input{
  background: transparent;
  border: none;
  vertical-align: middle;
}
.user-pwd input:focus{
  outline: none;
}
.login-btn{
  width: 150px;
  background: #d43c33;
  height: 35px;
  border: none;
  border-radius: 20px;
  margin-top: 10px;
  color:#fff;
  line-height: 35px;
}
.login-btn:focus{
  outline: none;
}
</style>
