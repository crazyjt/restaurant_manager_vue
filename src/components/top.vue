<template>
    <header class="header">
        <div class="headerBack" v-show="!isIndex" v-on:touchend="goBack">
            <img src="../assets/image/sysm_la.png"/>
        </div>
        <div class="headerTitle">{{this.$store.state.topTitleMsg}}</div>
    </header>
</template>

<script>
export default {
  data: function () {
    return {
      isIndex: true
    }
  },
  created: function () {
    if (this.$route.path === '/') {
      this.isIndex = true
    } else {
      this.isIndex = false
    }
  },
  mounted: function () {
    if (this.$route.path === '/') {
      this.isIndex = true
    } else {
      this.isIndex = false
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.path === '/') {
        this.isIndex = true
      } else {
        this.isIndex = false
      }
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.header {
    width: 100%;
    height: 100%;
    background: url("../assets/image/header_bg.jpg");
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.headerBack {
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    margin-left: 5%;
}
.headerBack img {
    height: 50%;
}
.headerBack:active {
    width: 9%;
    height: 80%;
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    margin-left: 5%;
}
.headerTitle {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: #ffffff;
}
</style>
