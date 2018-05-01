<template>
  <section class="tableOpen">
    <div class="tableOpenInfo">
      <div class="tableOpenInfoBar">餐桌id: <span class="tableOpenInfoSpan">{{d_id}}</span></div>
      <div class="tableOpenInfoBar">餐桌编号: <span class="tableOpenInfoSpan">{{d_no}}</span></div>
      <div class="tableOpenInfoBar">用餐人数: <input class="tableOpenInfoInput" type="number" v-model="d_num"/></div>
    </div>
    <img class="tableOpenImg" src="../assets/image/menuTitle.png"/>
    <div class="tableOpenMenus">
      <div class="openMenusPart">
        <template v-for="(menu, index) in menus">
          <div class="openMenu">
            <img class="openMenuImg" v-bind:src="m_pic[index]"/>
            <div class="openMenuInfo">
              <div class="openMenuName">{{menu.m_name}}</div>
              <div class="openMenuNum">库存: {{menu.m_inventory}}</div>
              <div class="openMenuPrice">单价: {{menu.m_price}}元</div>
            </div>
            <div class="openMenuOrder">
              <div class="openMenuOrderState">份数</div>
              <input class="openMenuInput" type="number" v-model="m_orderArray[index]"/>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="tableOpenBottom">
      <button class="tableOpenBtn"  v-on:click="goToIndex">确认下单</button>
    </div>
  </section>
</template>

<script>
import {API_PostMenuList, API_PostTableOperator} from '@/constants/index'
import {Toast} from 'mint-ui'
import basicImg from '../assets/image/noMenuPic.png'
export default {
  data: function () {
    return {
      d_id: '',
      d_no: '',
      d_num: '',
      menus: [],
      m_orderArray: [],
      m_pic: []
    }
  },
  created: function () {
    this.$store.commit('topTitileMsgChange', '下单选菜')
    this.d_id = this.$route.params.d_id
    this.d_no = this.$route.params.d_no
    this.$ajax.post(API_PostMenuList).then((response) => {
      console.log(response)
      if (response.data.code == 200) {
        this.menus = response.data.menus
        for (var i = 0; i < response.data.m_pic.length; i++) {
          if (response.data.m_pic[i] != "") {
            this.m_pic.push('data:image/gif;base64,' + response.data.m_pic[i])
          } else {
            this.m_pic.push(basicImg)
          }
        }
      }
    }).catch((response) => {
      console.log(response)
    })
  },
  mounted: function () {
    this.$store.commit('topTitileMsgChange', '下单选菜')
  },
  methods: {
    goToIndex: function () {
      console.log('array length: ' + this.m_orderArray.length)
      var m_order = ""
      for (var i = 0; i < this.menus.length; i++) {
        if (this.m_orderArray[i] == '' || this.m_orderArray[i] == null) {
          m_order += "0"
        } else {
          m_order += this.m_orderArray[i]
        }
        if (i != this.menus.length -1) {
          m_order += ","
        }
      }
      console.log('array: ' + this.m_orderArray)
      console.log('m_order: ' + m_order)
      this.$ajax.post(API_PostTableOperator, {
        d_id: this.d_id,
        d_no: this.d_no,
        d_num: parseInt(this.d_num),
        operator: 2,
        w_id: this.getCookie('w_id'),
        m_order: m_order
      }).then((response) => {
        console.log(response)
        if (response.data.code == 200) {
          Toast ({
            message: response.data.returnStr,
            duration: 2000
          })
          this.$router.push({path: '/'})
        } else {
          Toast ({
            message: response.data.returnStr,
            duration: 2000
          })
        }
      }).catch((response) => {
        console.log(response)
        Toast ({
          message: response.data.returnStr,
          duration: 2000
        })
      })
    }
  }
}
</script>

<style>
.tableOpen {
  width: 100%;
  height: 92%;
  overflow: hidden;
  background: url("../assets/image/tableOpen_bg.png") no-repeat;
  background-size: 100% 100%;
}
.tableOpenInfo {
  width: 100%;
  height: 21%;
  margin-top: 15%;
}
.tableOpenInfoBar {
  width: 60%;
  height: 32%;
  border-bottom: 2px solid rgb(8, 8, 8);
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 600;
}
.tableOpenInfoSpan {
  width: 30%;
  display: block;
  position: absolute;
  right: 0;
  bottom: 15%;
  color: rgb(127, 161, 255);
  font-size: 1.2rem;
}
.tableOpenInfoInput {
  width: 30%;
  height: 70%;
  position: absolute;
  right: 0;
  bottom: 5%;
  font-size: 1.2rem;
  text-align: center;
}
.tableOpenImg {
  width: 80%;
  height: 10%;
  display: block;
  margin: 0 auto;
}
.tableOpenMenus {
  width: 100%;
  height: 50%;
}
.openMenusPart {
  width: 70%;
  height: 100%;
  margin: 0 auto;
  overflow-y: scroll;
}
.openMenu {
  width: 100%;
  height: 25%;
  margin-top: 2%;
  overflow: hidden;
  background: rgba(255, 136, 38, 0.795);
  border-radius: 15px;
}
.openMenuImg {
  width: 35%;
  height: 100%;
  float: left;
}
.openMenuInfo {
  width: 45%;
  height: 100%;
  float: left;
  padding-top: 2%;
  text-align: center;
}

.openMenuOrder {
  width: 20%;
  height: 100%;
  float: left;
  text-align: center;
}
.openMenuInput {
  width: 80%;
  height: 40%;
  margin-top: 12%;
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  text-align: center;
}
.tableOpenBottom {
  width: 100%;
  height: 9%;
  text-align: center;
  overflow: hidden;
}
.tableOpenBtn {
  width: 30%;
  height: 90%;
  background: url("../assets/image/btn_pay.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  margin: 1% auto;
}
.tableOpenBtn:active {
  width: 30%;
  height: 90%;
  background: url("../assets/image/btn_pay1.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  margin: 1% auto;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 3px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(70, 69, 69, 0.3);
  border-radius: 3px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(194, 193, 193, 0.5);
}
</style>
