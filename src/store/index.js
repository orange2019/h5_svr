import Vue from 'vue'
import Vuex from 'vuex'
import NewsStore from './news/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return {
      newsData: {
        id: "",
        title: "",
        description: "",
        post_time: "",
        content: "",
        cover: "",
        status: 1,
        type: 0,
        category: "",
        sort: 0
      },
      listItems: [],
      listCount: 0,
      listOffset: 0,
      listCurrentNum: 1,
      listLimit: 10,
      newsCategory: {
        notice: true,
        industry: false
      }
    }
  },
  mutations: {

  },
  actions: {
    async newsListGet({
      state
    }, data) {
      return await NewsStore.getList(state, data.route)
    }
  }
})

export function createStore() {
  return store
}