import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import signin from '@/components/signin'
import personal from '@/components/personal'
import tableOpen from '@/components/tableOpen'
import tableEdit from '@/components/tableEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/tableOpen/:d_id/:d_no',
      name: 'tableOpenParams',
      component: tableOpen
    },
    {
      path: '/tableEdit/:d_id',
      name: 'tableEditParams',
      component: tableEdit
    }
  ]
})
