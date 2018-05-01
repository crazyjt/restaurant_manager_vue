import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'

vue.use(vuex)

const state = {
  showTop: false,
  showBottom: false,
  topTitleMsg: ''
}

export default new vuex.Store({
  state,
  mutations
})
