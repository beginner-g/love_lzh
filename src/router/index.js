import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import My from '@/view/My'

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
    }
  ]
})
