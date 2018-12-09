import Vue from 'vue'
import Vuex from 'vuex'
import NewsStore from './news/index'
import InvestStore from './invest/index'
import AssetsStore from './assets/index'
import InviteStore from './invite/index'

Vue.use(Vuex)

const userTransactionTypes = [
  '',
  '充值',
  '提币',
  '转账',
  '购买产品',
  '产品收益',
  '团队收益'
]

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
      investDetailSum: 0,
      investDetailTotal: 0,
      investDetailTotalLeave: 0,
      userAssets: {},
      userTransactions: [],
      userTransactionsCount: 0,
      userTransactionTypes: userTransactionTypes,
      userTransactionDetail: {},
      userInvestChild: [],
      userInvestChildCount: 0,
      userTeamCount: 0,
      inviteList: [],
      inviteCount: 0,
      inviteInfo: {}
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
    },
    async userAssetsGet({
      state
    }, data) {
      return await AssetsStore.getUserAsset(state, data.route)
    },
    async userTransactionGet({
      state
    }, data) {
      return await AssetsStore.getTransaction(state, data.route)
    },
    async userInvestChildGet({
      state
    }, data) {
      return await AssetsStore.getChildInvest(state, data.route)
    },
    async inviteListGet({
      state
    }, data) {
      return await InviteStore.getList(state, data.route)
    },
    async inviteInfoGet({
      state
    }, data) {
      return await InviteStore.getInfo(state, data.route)
    }
  }
})

export function createStore() {
  return store
}