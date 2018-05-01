<template>
  <section class="signin">
    <div class="signinIcon">
      <img src="../assets/image/logo.png"/>
    </div>
    <div class="signinInput">
      <input class="signinInputId" placeholder="员工id" v-model="w_id"/>
      <div class="signinInputPwd">
        <input class="signinInputPwdBar" v-bind:type="passwordType" placeholder="登录密码" v-model="w_password"/>
        <div v-bind:class="{'signinInputOpen': visible,'signinInputClose': !visible}" v-on:click="eyeChange"/>
      </div>
    </div>
    <button class="signinButton" v-on:click="goToIndex">登录</button>
  </section>
</template>

<script>
import {API_PostSignIn} from '@/constants/index.js'
import {Toast} from 'mint-ui'
export default {
  data: function () {
    return {
      passwordType: 'password',
      visible: false,
      w_id: '',
      w_password: ''
    }
  },
  methods: {
    eyeChange: function () {
      this.visible = !this.visible
      this.passwordType = this.visible ? 'text' : 'password'
    },
    goToIndex: function () {
      this.$ajax.post(API_PostSignIn, {
        w_id: this.w_id,
        w_password: this.w_password
      }).then((response) => {
        if (response.data.code == 200) {
          this.setCookie('w_id', response.data.w_id)
          this.setCookie('w_password', response.data.w_password)
          Toast ({
            message: "登录成功!",
            duration: 2000
          })
          this.$router.push({path: '/'})
        } else {
          Toast ({
            message: "员工id或密码错误!",
						duration: 2000
          })
        }
        console.log(response)
      }).catch((response) => {
				console.log(response)
			})
    }
  }
}
</script>

<style>
.signin {
    width: 100%;
    height: 100%;
    text-align: center;
}
.signinIcon {
    margin-top: 30%;
}
.signinInput {
    width: 100%;
    height: 15%;
    font-size: 1.2rem;
    color: #5d91fc;
}
.signinInputId {
    width: 90%;
    height: 50%;
    border: none;
    outline: medium;
    border-bottom: 1px solid black;
    font-size: 1.2rem;
}
.signinInputPwd {
    width: 90%;
    height: 50%;
    border-bottom: 1px solid black;
    margin-top: 2%;
    margin-left: 5%;
    position: relative;
    float: left;
}
.signinInputPwdBar {
    width: 80%;
    height: 89%;
    border: none;
    outline: medium;
    position: absolute;
    left: 0;
    font-size: 1.2rem;
    float: left;
}
.signinInputOpen {
    width: 10%;
    height: 75%;
    float: right;
    margin-right: 5%;
    margin-top: 2%;
    background: url(../assets/image/eye_open.png) no-repeat;
    background-size: 90% 80%;
}
.signinInputClose {
    width: 10%;
    height: 75%;
    float: right;
    margin-right: 5%;
    margin-top: 2%;
    background: url(../assets/image/eye_close.png) no-repeat;
    background-size: 90% 80%;
}
.signinButton {
    width: 30%;
    height: 7%;
    margin-top: 5%;
    background: #5d91fc;
    border: none;
    color: #ffffff;
    font-size: 1.5rem;
    border-radius: 25px;
}
.signinButton:active {
    width: 25%;
    height: 6%;
    margin-top: 5%;
    background: #5d91fc;
    border: none;
    color: #ffffff;
    font-size: 1.2rem;
    border-radius: 25px;
}
</style>
