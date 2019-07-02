import Vue from 'vue'
import Router from 'vue-router'
import Recommand from '@/pages/Recommand/Recommand.vue'
import Singer from '@/pages/Singer/Singer.vue'
import Rank from '@/pages/Rank/Rank.vue'
import Search from '@/pages/Search/Search.vue'

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
      path: '/singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
