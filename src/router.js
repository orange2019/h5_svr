import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './pages/main.vue'
import NewsList from './pages/news/list.vue'
import NewsDetail from './pages/news/detail.vue'
import Invest from './pages/invest/index.vue'
import InvestList from './pages/invest/list.vue'
import InvestDetail from './pages/invest/detail.vue'
import InvestApply from './pages/invest/apply.vue'
import Assets from './pages/assets/index.vue'
import AssetsTransaction from './pages/assets/transaction.vue'
import AssetsDetail from './pages/assets/detail.vue'
import AssetsIn from './pages/assets/in.vue'
import AssetsOut from './pages/assets/out.vue'
import AssetsTeam from './pages/assets/team.vue'
import AuthError from './pages/auth/error.vue'

let routes = [{
    path: '/',
    component: Home
  },

  {
    path: '/news',
    component: NewsList
  },
  {
    path: '/news/detail',
    component: NewsDetail
  },
  {
    path: '/invest',
    component: Invest
  },
  {
    path: '/invest/list',
    component: InvestList
  },
  {
    path: '/invest/detail',
    component: InvestDetail
  },
  {
    path: '/invest/apply',
    component: InvestApply
  },
  {
    path: '/assets',
    component: Assets
  },
  {
    path: '/assets/transaction',
    component: AssetsTransaction
  },
  {
    path: '/assets/detail',
    component: AssetsDetail
  },
  {
    path: '/assets/in',
    component: AssetsIn
  },
  {
    path: '/assets/out',
    component: AssetsOut
  },
  {
    path: '/assets/team',
    component: AssetsTeam
  },
  {
    path: '/auth/err',
    component: AuthError
  },
]

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: routes

  })
}