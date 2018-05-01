<template>
  <footer class="bottom">
    <div class="bottomBarLeft" v-on:click="bottomClick(0)">
      <img class="bottomBarImg" src="../assets/image/home.png" v-if="!isIndex" />
      <img class="bottomBarImg" src="../assets/image/home1.png" v-if="isIndex" />
      <span class="bottomBarSpan" v-bind:class="{'bottomBarSpanClick':isIndex,'bottomBarSpan':!isIndex}">主页</span>
    </div>
    <div class="bottomBarRight" v-on:click="bottomClick(1)">
      <img class="bottomBarImg" src="../assets/image/personal.png" v-if="!isPersonal" />
      <img class="bottomBarImg" src="../assets/image/personal1.png" v-if="isPersonal" />
      <span class="bottomBarSpan" v-bind:class="{'bottomBarSpanClick':isPersonal,'bottomBarSpan':!isPersonal}">个人</span>
    </div>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      isIndex: true,
      isPersonal: false
    }
  },
  methods: {
    bottomClick: function (num) {
      switch (num) {
        case 0:
          this.isIndex = true
          this.isPersonal = false
          this.$router.push({path: '/'})
          break
        case 1:
          this.isPersonal = true
          this.isIndex = false
          this.$router.push({path: '/personal'})
          break
      }
    }
  },
  created: function () {
    if (this.$route.path === '/personal') {
      this.isPersonal = true
      this.isIndex = false
    } else if (this.$route.path === '/') {
      console.log('created index')
      this.isIndex = true
      this.isPersonal = false
    }
  },
  mounted: function () {
    if (this.$route.path === '/personal') {
      this.isPersonal = true
      this.isIndex = false
    } else if (this.$route.path === '/') {
      console.log('mounted index')
      this.isIndex = true
      this.isPersonal = false
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.path === '/personal') {
        this.isPersonal = true
        this.isIndex = false
      } else if (to.path === '/') {
        console.log('watch index')
        this.isIndex = true
        this.isPersonal = false
      }
    }
  }
}
</script>

<style>
.bottom {
  width: 100%;
  height: 100%;
  border-top: 1.0px solid #bebebe;
  overflow: hidden;
  display: flex;
}
.bottomBarLeft {
  width: 50%;
  height: 100%;
  text-align: center;
  border-right: 1.0px solid #bebebe;
}
.bottomBarRight {
  width: 49%;
  height: 100%;
  text-align: center;
}
.bottomBarImg {
  height: 70%;
  overflow: hidden;
}
.bottomBarSpan {
  display: block;
  overflow: hidden;
  margin-top: -4%;
  font-size: 0.9rem;
  color: #b5b4b4;
}
.bottomBarSpanClick {
  display: block;
  overflow: hidden;
  font-size: 0.9rem;
  color: #5d91fc;
}
</style>
