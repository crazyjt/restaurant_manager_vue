<template>
  <section class="index">
    <img class="indexRefresh" src="../assets/image/refresh.png" v-show="showRefresh" v-on:click="refresh"/>
    <div class="indexTablePart">
        <template v-for="(table, index) in tables">
          <div class="indexTableDiv">
            <div class="indexTableLeft">
              <div class="indexTableLeftDiv">餐桌id:</div><span class="indexTableLeftSpan">{{table.d_id}}</span>
              <div class="indexTableLeftDiv">餐桌编号:</div><span class="indexTableLeftSpan">{{table.d_no}}</span>
            </div>
            <div class="indexTableRight">
              <button v-bind:class="{'indexBtnEnable':(table.d_status=='空闲'),'indexBtnUnable':(table.d_status=='有客')}" v-on:click="goToTableOpen(index)">开桌</button>
              <button v-bind:class="{'indexBtnEnable':(table.d_status=='有客'),'indexBtnUnable':(table.d_status=='空闲')}" v-on:click="goToTableEdit(index)">查看</button>
            </div>
          </div>
        </template>
    </div>
  </section>
</template>

<script>
import {API_PostTableList} from '@/constants/index'
import {Toast} from 'mint-ui'
export default {
  data: function () {
    return {
      showRefresh: false,
      tables: []
    }
  },
  created: function () {
    this.showRefresh = false;
    console.log('test')
    if (this.getCookie('w_id') == null || this.getCookie('w_id') == '') {
      Toast ({
        message: "请先登录",
        duration: 2000
      })
      this.$router.push({path: '/signin'})
      return
    } else {
      this.$store.commit('topTitileMsgChange', '餐厅管理')
    }
    this.$ajax.post(API_PostTableList).then((response) => {
      console.log(response)
      if (response.data.code == 200) {
        this.tables = response.data.tables
        console.log(this.tables)
      } else {
        Toast ({
          message: "获取餐桌列表失败，请刷新",
          duration: 2000
        })
        this.showRefresh = true;
      }
    }).catch((response) => {
      console.log(response)
      Toast ({
        message: "获取餐桌列表失败，请刷新",
        duration: 2000
      })
      this.showRefresh = true;
    })
  },
  mounted: function () {
    this.$store.commit('topTitileMsgChange', '餐厅管理')
  },
  methods: {
    goToTableOpen: function (index) {
      if (this.tables[index].d_status == "有客") {
        return
      } else {
        //路由带参数，在/router/index文件中也要进行相应的设置
        this.$router.push({name: 'tableOpenParams', params: {d_id: this.tables[index].d_id, d_no: this.tables[index].d_no} })
      }
    },
    goToTableEdit: function (index) {
      if (this.tables[index].d_status == "有客") {
        this.$router.push({name: 'tableEditParams', params: {d_id: this.tables[index].d_id}})
      } else {
        return
      }
    },
    refresh: function () {
      location.reload();
    }
  }
}
</script>

<style>
.index {
  width: 100%;
  height: 83%;
  background: rgb(241, 241, 241);
  overflow-y: scroll;
  text-align: center;
}
.indexRefresh {
  width: 15%;
  height: 10%;
  margin-top: 15%;
}
.indexTablePart {
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
.indexTableDiv {
  width: 100%;
  height: 12%;
  margin-top: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(157, 166, 248);
  border-radius: 10px;
}
.indexTableLeft {
  width: 45%;
  height: 100%;
  align-items: center;
  overflow: hidden;
}
.indexTableLeftDiv {
  width: 50%;
  height: 50%;
  float: left;
  padding-top: 3%;
  padding-left: 3%;
}
.indexTableLeftSpan {
  width: 45%;
  height: 50%;
  float: left;
  padding-top: 3%;
  text-align: center;
  color: rgb(170, 108, 28);
}
.indexTableRight {
  width: 58%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.indexBtnEnable {
  width: 40%;
  height: 60%;
  margin-left: 7%;
  border: none;
  background: url("../assets/image/enable.png") no-repeat;
  background-size: 100% 100%;
  font-weight: 600;
  font-size: 1rem;
  color: #000000;
}
.indexBtnEnable:active {
  width: 40%;
  height: 60%;
  margin-left: 7%;
  border: none;
  background: url("../assets/image/enable1.png") no-repeat;
  background-size: 100% 100%;
  font-weight: 600;
  font-size: 1rem;
  color: #000000;
}
.indexBtnUnable {
  width: 40%;
  height: 60%;
  margin-left: 7%;
  border-radius: 8px;
  border: none;
  background: url("../assets/image/unable.png") no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
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
