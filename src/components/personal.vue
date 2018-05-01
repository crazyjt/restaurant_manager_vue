<template>
  <section class="personal">
    <div class="personalBg">
      <div class="personalImgBg">
        <img class="personalImg" v-bind:src="srcStr"/>
      </div>
      <div class="personalName">{{w_name}}</div>
    </div>
    <ul class="personalInfoUl">
      <li class="personalInfoLi">员工id：<span class="personalInfoSpan">{{w_id}}</span></li>
      <li class="personalInfoLi">员工岗位：<span class="personalInfoSpan">{{w_type}}</span></li>
      <li class="personalInfoLi">员工性别：<span class="personalInfoSpan">{{w_sex}}</span></li>
      <li class="personalInfoLi">员工工龄：<span class="personalInfoSpan">{{w_workTime}}年</span></li>
    </ul>
    <button class="personalExit" v-on:click="goToSignin">退出登录</button>
  </section>
</template>

<script>
import {API_PostWorkerInfo} from '@/constants/index.js'
import {Toast} from 'mint-ui'
import basicImage from '../assets/image/personal_img.png'
export default {
  data: function () {
    return {
      w_name: '',
      w_id: '',
      w_type:'',
      w_sex: '',
      w_workTime: '',
      srcStr: basicImage
    }
  },
  created: function () {
    if (this.getCookie('w_id') == "" || this.getCookie('w_id') == null) {
      Toast ({
        message: "请先登录",
        duration: 2000
      })
      this.$router.push({path: '/signin'})
      return
    }
    this.$ajax.post(API_PostWorkerInfo, {
      w_id: this.getCookie('w_id'),
      w_password: this.getCookie('w_password')
    }).then((response) => {
      console.log(response)
      if (response.data.code == 200) {
        this.w_id = response.data.w_id
        this.w_type = response.data.w_type
        this.w_sex = response.data.w_sex
        this.w_workTime = response.data.w_workTime
        this.w_name = response.data.w_name
        if (response.data.w_pic != "") {
          this.srcStr = 'data:image/gif;base64,' + response.data.w_pic
        }
      } else {
        Toast ({
          message: "获取信息失败，请重新登录",
          duration: 2000
        })
        this.$router.push({path: '/signin'})
        console.log(response)
      }
    }).catch((response) => {
      Toast ({
          message: "获取信息失败，请重新登录",
          duration: 2000
        })
        this.$router.push({path: '/signin'})
        console.log(response)
    })
  },
  methods: {
    goToSignin: function () {
      this.clearCookie('w_id')
      this.clearCookie('w_password')
      this.$router.push({path: '/signin'})
    }
  }
}
</script>

<style>
.personal {
  width: 100%;
  height: 91%;
  background: rgb(241, 241, 241);
  text-align: center;
  overflow: hidden;
}
.personalBg {
  width: 100%;
  height: 40%;
  background: url("../assets/image/personal_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.personalImgBg {
  width: 40%;
  height: 60%;
  background: #92b4f8;
  border-radius: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  overflow: hidden;
}
.personalImg {
  width: 100%;
  height: 100%;
}
.personalName {
  width: 100%;
  height: 15%;
  text-align: center;
  position: absolute;
  bottom:  2%;
  font-size: 1.4rem;
  color: rgb(245, 119, 140);
  overflow: hidden;
}
.personalInfoUl {
  width: 90%;
  height: 45%;
  background: url("../assets/image/personal_bg1.png") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.personalInfoLi {
  width: 85%;
  height: 24%;
  display: flex;
  align-items: center;
  text-align: right;
  font-size: 1.3rem;
  margin-right: 100%;
  position: relative;
  border-bottom: 2px solid rgb(68, 68, 68);
}
.personalInfoSpan {
  width: 25%;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0%;
  bottom: 25%;
  color: #8d580a;
}
.personalExit {
  width: 30%;
  height: 7%;
  background: #f7a151;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  border-radius: 25px;
  margin-bottom: 5%;
}
.personalExit:active {
  width: 27%;
  height: 6%;
  background: #f7a151;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  border-radius: 25px;
  margin-bottom: 5%;
}
</style>
