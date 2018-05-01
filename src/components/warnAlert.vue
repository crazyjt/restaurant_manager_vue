<template>
  <div class="warnAlert">
    <div class="warnAlertBody">
      <p class="warnMessage" v-html="msg"></p>
      <div class="warnBtnPart">
          <button class="warnBtn" v-on:click="sureFunc">确定</button>
          <button class="warnBtn" v-on:click="cancelFunc">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['msg'],
  methods: {
    sureFunc: function () {
      setTimeout(() => {
        this.$emit('sure')
      }, 200)
    },
    cancelFunc: function () {
      setTimeout(() => {
        this.$emit('cancel')
      }, 200)
    }
  }
}
</script>

<style>
.warnAlert {
  background-color:rgba(0, 0, 0, 0.089);
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  opacity:1;
  z-index: 2;
}
.warnAlertBody {
  width: 100%;
  height: 30%;
  background: rgba(250, 250, 249, 0.945);
  position:absolute;
  top:50%;
  margin-top:-30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
}
.warnMessage {
  font-size: 1.4rem;
  width: 50%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.warnBtnPart {
  width: 100%;
  height: 30%;
  text-align: center;
  margin-bottom: 5%;
  letter-spacing: 25px;
}
.warnBtn {
  width: 30%;
  height: 90%;
  font-size: 1.2rem;
  border: none;
  background: url("../assets/image/btn_pay.png") no-repeat;
  background-size: 100% 100%;
}
.warnBtn:active {
  width: 30%;
  height: 90%;
  font-size: 1.2rem;
  border: none;
  background: url("../assets/image/btn_pay1.png") no-repeat;
  background-size: 100% 100%;
}
</style>


