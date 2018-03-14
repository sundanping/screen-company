import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import user from '@/components/user'
import production from '@/components/production'
import resource from '@/components/resource'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/production',
      name: 'production',
      component: production
    },
    {
      path: '/resource',
      name: 'resource',
      component: resource
    }
  ]
})
