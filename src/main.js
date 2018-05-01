// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'

import {setCookie,getCookie,clearCookie} from '@/util/cookieMethod'

Vue.config.productionTip = false
Vue.use(MintUi)

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.$ajax = axios
Vue.prototype.waiting = MintUi.Indicator
Vue.prototype.setCookie = setCookie
Vue.prototype.getCookie = getCookie
Vue.prototype.clearCookie = clearCookie

store.registerModule('vux', {
  state: {
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

var index = document.getElementById('index')
index.style.height = document.documentElement.clientHeight + 'px'
index.style.width = document.documentElement.width + 'px'
