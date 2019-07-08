import Vue from 'vue'
import Router from 'vue-router'

import AdRecommand from '@/pages/AdRecommand/AdRecommand'
import AdHot from '@/pages/AdHot/AdHot'
import AdSearch from '@/pages/AdSearch/AdSearch'
import Login from '@/pages/Login/Login'
import AdPage from '@/pages/AdPage/AdPage'
import AdPlayList from '@/pages/AdPlayList/AdPlayList'
import AdDetail from '@/pages/AdDetail/AdDetail'

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
          component: AdRecommand
        },
        {
          path: 'adhot',
          component: AdHot
        },
        {
          path: 'adsearch',
          component: AdSearch
        }
      ]
    },
    {
      path: '/adplaylist/:id',
      component: AdPlayList
    },
    {
      path: '/addetail/:id',
      component: AdDetail
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
