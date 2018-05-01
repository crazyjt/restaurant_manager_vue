<template>
  <body>
    <div id="index">
      <top id="top" v-show="showTopFunc"></top>
      <router-view/>
      <bottom id="bottom" v-show="showBottomFunc"></bottom>
    </div>
  </body>
</template>

<script>
import top from '@/components/top'
import bottom from '@/components/bottom'
export default {
  data: function () {
    return {
    }
  },
  components: {
    top,
    bottom
  },
  created: function () {
    this.$store.commit('showTopChange', false)
    this.$store.commit('showBottomChange', false)
    //头部判断
    if(this.$route.path != '/personal' && this.$route.path != '/signin') {
      this.$store.commit('showTopChange', true)
    }
    //bottom底部判断
    if(this.$route.path === '/personal' || this.$route.path === '/') {
      this.$store.commit('showBottomChange', true)
    }
  },
  mounted: function () {
    this.$store.commit('showTopChange', false)
    this.$store.commit('showBottomChange', false)
    //头部判断
    if(this.$route.path != '/personal' && this.$route.path != '/signin') {
      this.$store.commit('showTopChange', true)
    }
    //bottom底部判断
    if(this.$route.path === '/personal' || this.$route.path === '/') {
      this.$store.commit('showBottomChange', true)
    }
  },
  computed: {
    showTopFunc: function () {
      return this.$store.state.showTop
    },
    showBottomFunc: function () {
      return this.$store.state.showBottom
    }
  },
  watch: {
    '$route': function (to, from) {
      this.$store.commit('showTopChange', false)
      this.$store.commit('showBottomChange', false)
      //头部判断
      if (to.path != '/personal' && to.path != '/signin') {
        this.$store.commit('showTopChange', true)
      }
      //bottom底部判断
      if (to.path === '/' || to.path === '/personal') {
        this.$store.commit('showBottomChange', true)
      }
    }
  }
}
</script>

<style>
body {
  margin: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#index {
  width: 100%;
  height: 100%;
  position: relative;
}
#top {
  width: 100%;
  height: 8%;
}
#bottom {
  width: 100%;
  height: 9%;
  position: absolute;
  bottom: 0;
}
#bottomTableOpen {
  width: 100%;
  height: 9%;
  position: absolute;
  bottom: 0;
}
#bottomTableEdit {
  width: 100%;
  height: 9%;
  position: absolute;
  bottom: 0;
}
</style>
