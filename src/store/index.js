import Vue from 'vue'
import Vuex from 'vuex'
import NewsStore from './news/index'
import InvestStore from './invest/index'

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
      },
      investList: [],
      investInfo: {},
      userCanUseTokenNum: {},
      investUserList: [],
      investDetail: {},
      investDetailSum: 0
    }
  },
  mutations: {

  },
  actions: {
    async newsListGet({
      state
    }, data) {
      return await NewsStore.getList(state, data.route)
    },
    async investListGet({
      state
    }, data) {
      return await InvestStore.getList(state, data.route)
    },
    async investInfoGet({
      state
    }, data) {
      return await InvestStore.getInfo(state, data.route)
    },
    async investUserListGet({
      state
    }, data) {
      return await InvestStore.getUserList(state, data.route)
    },
    async investDetailGet({
      state
    }, data) {
      return await InvestStore.getUserDetail(state, data.route)
    }
  }
})

export function createStore() {
  return store
}