import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './pages/main.vue'
import NewsList from './pages/news/list.vue'
import NewsDetail from './pages/news/detail.vue'

let routes = [
  {
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
  }
]

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: routes

  })
}