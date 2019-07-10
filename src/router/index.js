import Vue from 'vue'
import Router from 'vue-router'

import AdPage from '@/pages/AdPage/AdPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: AdPage,
      children: [
        {
          path: '',
          redirect: 'adrecommand'
        },
        {
          path: 'adrecommand',
          component: () => import('@/pages/AdRecommand/AdRecommand')
        },
        {
          path: 'adhot',
          component: () => import('@/pages/AdHot/AdHot')
        },
        {
          path: 'adsearch',
          component: () => import('@/pages/AdSearch/AdSearch')
        }
      ]
    },
    {
      path: '/adplaylist/:id',
      component: () => import('@/pages/AdPlayList/AdPlayList')
    },
    {
      path: '/addetail/:id',
      component: () => import('@/pages/AdDetail/AdDetail')
    },
    {
      path: '/login',
      component: () => import('@/pages/Login/Login')
    },
    {
      path: '/logined',
      component: () => import('@/pages/LoginedPage/LoginedPage'),
      children: [
        {
          path: '',
          redirect: 'find'
        },
        {
          path: 'info',
          component: () => import('@/pages/Info/Info')
        },
        {
          path: 'video',
          component: () => import('@/pages/Video/Video')
        },
        {
          path: 'find',
          component: () => import('@/pages/Find/Find')
        },
        {
          path: 'friend',
          component: () => import('@/pages/Friend/Friend')
        }
      ]
    }
  ]
})
