import Vue from 'vue'
import Router from 'vue-router'

import Recommand from '@/pages/Recommand/Recommand'
import Hot from '@/pages/Hot/Hot'
import Search from '@/pages/Search/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommand'
    },
    {
      path: '/recommand',
      name: 'Recommand',
      component: Recommand
    },
    {
      path: '/hot',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
