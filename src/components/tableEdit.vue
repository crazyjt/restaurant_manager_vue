<template>
  <section class="tableEdit">
    <div class="tableEditInfo">
      <div class="tableEditInfoBar">餐桌id: <span class="tableEditInfoSpan">{{d_id}}</span></div>
      <div class="tableEditInfoBar">餐桌编号: <span class="tableEditInfoSpan">{{d_no}}</span></div>
      <div class="tableEditInfoBar">用餐人数: <input class="tableEditInfoInput" type="number" v-model="d_num"/></div>
      <div class="tableEditInfoBar">消费金额: <span class="tableEditInfoSpan" style="color: red;">{{price}}元</span></div>
    </div>
    <button v-bind:class="{'tableEditDetials':!showDetials,'tableEditDetialsClick':showDetials}" v-on:touchend="showDetialsChange">订单详情</button>
    <div class="tableEditMenus" v-show="showDetials">
      <div class="editMenusPart">
        <template v-for="(menu, index) in menus">
          <div class="editMenu">
            <img class="editMenuImg" v-bind:src="m_pic[index]"/>
            <div class="editMenuInfo">
              <div class="editMenuName">{{menu[0]}}</div>
              <div class="editMenuNum">库存: {{menu[1]}}</div>
              <div class="editMenuPrice">单价: {{menu[2]}}元</div>
            </div>
            <div class="editMenuOrder">
              <div class="editMenuState">份数</div>
              <input class="editMenuInput" type="number" v-model="m_orderArray[index]"/>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="tableEditBottom">
      <button class="tableEditChange" v-on:click="orderChange">修改</button>
      <button class="tableEditPay" v-on:click="orderPay">买单</button>
    </div>
    <warnAlert v-show="showWarn" v-bind:msg="msg" v-on:sure="sure" v-on:cancel="cancel"></warnAlert>
  </section>
</template>

<script>
import warnAlert from '@/components/warnAlert'
import {API_PostTableInfo, API_PostOrderInfo, API_PostTableOperator} from '@/constants/index'
import {Toast} from 'mint-ui'
import basicImg from '../assets/image/noMenuPic.png'
export default {
  data: function () {
    return {
      showDetials: false,
      d_id: '',
      d_no: '',
      d_num: '',
      price: 0.0,
      menus: [],
      m_orderArray: [],
      showWarn: false,
      msg: "是否确认买单",
      m_pic: []
    }
  },
  components: {
    warnAlert: warnAlert
  },
  created: function () {
    this.$store.commit('topTitileMsgChange', '餐桌详情')
    this.d_id = this.$route.params.d_id
    //获取餐桌信息
    if (this.d_id != '' && this.d_id != null) {
      this.$ajax.post(API_PostTableInfo, {
        d_id: this.d_id
      }).then((response) => {
        if (response.data.code == 200){
          this.d_no = response.data.table.d_no
          this.d_num = response.data.table.d_num
          this.price = response.data.price
        } else {
          Toast ({
            message: "系统繁忙，请重试",
            duration: 2000
          })
        }
        console.log(response)
      }).catch((response) => {
        console.log(response)
        Toast ({
            message: "系统繁忙，请重试",
            duration: 2000
        })
      })
    } else {
      Toast ({
            message: "系统繁忙，请重试",
            duration: 2000
      })
    }

  },
  mounted: function () {
    this.$store.commit('topTitileMsgChange', '餐桌详情')
  },
  methods: {
    showDetialsChange: function () {
      this.showDetials = !this.showDetials
      
      if (this.showDetials) {
        //获取订单详情
        this.$ajax.post(API_PostOrderInfo, {
            d_id: this.d_id
        }).then((response) => {
          console.log(response)
          if (response.data.code == 200) {
            this.menus = response.data.map
            for (var i = 0; this.menus[i] != null; i++) {
              this.m_orderArray.push(this.menus[i][3])
              if (response.data.map[i][4] != "") {
                this.m_pic.push('data:image/gif;base64,' + response.data.map[i][4])
              } else {
                this.m_pic.push(basicImg)
              }
            }
          } else {
            Toast ({
              message: "获取菜单失败，请重试",
              duration: 2000
            })
          }
        }).catch((response) => {
          console.log(response)
          Toast ({
            message: "获取菜单失败，请重试",
            duration: 2000
          })
        })
      }
    },
    orderChange: function () {
      var m_order = ""
      for (var i = 0; i < this.m_orderArray.length; i++){
        if (this.m_orderArray[i] == "" || this.m_orderArray[i] == null) {
          m_order += "0"
        } else {
          m_order += this.m_orderArray[i];
        }
        if (i != this.m_orderArray.length -1) {
          m_order += ","
        }
      }
      console.log("m_order: " + m_order)
      this.$ajax.post(API_PostTableOperator, {
        d_id: this.d_id,
        d_no: this.d_no,
        d_num: this.d_num,
        operator: 1,
        w_id: this.getCookie('w_id'),
        m_order: m_order
      }).then((response) => {
        console.log(response)
        if (response.data.code == 200) {
          Toast ({
            message: response.data.returnStr
          })
          this.$router.push({path: '/'})
        }
      }).catch((response) => {
        Toast ({
            message: response.data.returnStr
        })
        console.log(response)
      })
    },
    orderPay: function () {
      this.showWarn = true
    },
    sure: function () {
      //买单接口
      this.$ajax.post(API_PostTableOperator, {
        d_id: this.d_id,
        d_no: this.d_no,
        d_num: this.d_num,
        operator: 3
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
    },
    cancel: function () {
      this.showWarn = false
    }
  }
}
</script>

<style>
.tableEdit {
  width: 100%;
  height: 92%;
  overflow: hidden;
  background: url("../assets/image/tableEdit_bg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.tableEditInfo {
  width: 100%;
  height: 24%;
  margin-top: 15%;
}
.tableEditInfoBar {
  width: 70%;
  height: 24%;
  border-bottom: 2px solid rgb(8, 8, 8);
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 600;
}
.tableEditInfoSpan {
  width: 35%;
  display: block;
  position: absolute;
  right: 0;
  bottom: 15%;
  color: rgb(127, 161, 255);
  font-size: 1.2rem;
}
.tableEditInfoInput {
  width: 35%;
  height: 70%;
  position: absolute;
  right: 0;
  bottom: 5%;
  font-size: 1.2rem;
  text-align: center;
}
.tableEditDetials {
  width: 50%;
  height: 8%;
  display: block;
  margin: 3% auto;
  border-radius: 15px;
  border: none;
  font-size: 1.2rem;
  text-align: center;
  background: url("../assets/image/tableEditMiddle.png") no-repeat;
  background-size: 100% 100%;
  color: rgb(151, 4, 4);
}
.tableEditDetials:active {
  background: url("../assets/image/tableEditMiddleDown.png") no-repeat;
  background-size: 100% 100%;
}
.tableEditDetialsClick {
  width: 50%;
  height: 8%;
  display: block;
  margin: 3% auto;
  border-radius: 15px;
  border: none;
  font-size: 1.2rem;
  text-align: center;
  background: url("../assets/image/tableEditMiddle1.png") no-repeat;
  background-size: 100% 100%;
  color: rgb(151, 4, 4);
}
.tableEditDetialsClick:active {
  background: url("../assets/image/tableEditMiddle1Down.png") no-repeat;
  background-size: 100% 100%;
}
.tableEditMenus {
  width: 100%;
  height: 68%;
}
.editMenusPart {
  width: 70%;
  height: 70%;
  margin: 0 auto;
  overflow-y: scroll;
}
.editMenu {
  width: 100%;
  height: 25%;
  margin-top: 2%;
  overflow: hidden;
  background: rgba(255, 136, 38, 0.795);
  border-radius: 15px;
}
.editMenuImg {
  width: 35%;
  height: 100%;
  float: left;
}
.editMenuInfo {
  width: 45%;
  height: 100%;
  padding-top: 2%;
  float: left;
  text-align: center;
}
.editMenuOrder {
  width: 20%;
  height: 100%;
  float: left;
  text-align: center;
}
.editMenuInput {
  width: 80%;
  height: 40%;
  margin-top: 12%;
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  text-align: center;
}
.tableEditBottom {
  width: 100%;
  height: 8%;
  text-align: center;
  overflow: hidden;
  position: absolute;
  bottom: 0;
}
.tableEditChange {
  width: 25%;
  height: 90%;
  background: url("../assets/image/btn_pay.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  margin: 1% auto;
}
.tableEditChange:active {
  width: 25%;
  height: 90%;
  background: url("../assets/image/btn_pay1.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  margin: 1% auto;
}
.tableEditPay {
  width: 25%;
  height: 90%;
  background: url("../assets/image/btn_pay.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  margin: 1% auto;
  margin-left: 5%;
}
.tableEditPay:active {
  width: 25%;
  height: 90%;
  background: url("../assets/image/btn_pay1.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  border: none;
  font-size: 1.2rem;
  margin: 1% auto;
  margin-left: 5%;
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


