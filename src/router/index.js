import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import My from '@/view/My'
import Details from '@/view/Details'
import Map from '@/view/Map'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/Details',
      name: 'Details',
      component: Details
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map
    }
  ]
})
