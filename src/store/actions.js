import NewsAction from './news/index'
import InvestAction from './invest/index'
import InviteAction from './invite/index'
import AssetsAction from './assets/index'
import VideoAction from './video/index'

export default {
  async newsListGet({
    state
  }, data) {
    return await NewsAction.getList(state, data.route)
  },
  async investListGet({
    state
  }, data) {
    return await InvestAction.getList(state, data.route)
  },
  async investInfoGet({
    state
  }, data) {
    return await InvestAction.getInfo(state, data.route)
  },
  async investUserListGet({
    state
  }, data) {
    return await InvestAction.getUserList(state, data.route)
  },
  async investDetailGet({
    state
  }, data) {
    return await InvestAction.getUserDetail(state, data.route)
  },
  async userAssetsGet({
    state
  }, data) {
    return await AssetsAction.getUserAsset(state, data.route)
  },
  async userTransactionGet({
    state
  }, data) {
    return await AssetsAction.getTransaction(state, data.route)
  },
  async userInvestChildGet({
    state
  }, data) {
    return await AssetsAction.getChildInvest(state, data.route)

  },
  async userInvestChildInfoGet({
    state
  }, data) {
    return await AssetsAction.getChildInvestInfo(state, data.route)
  },
  async inviteListGet({
    state
  }, data) {
    return await InviteAction.getList(state, data.route)
  },
  async inviteInfoGet({
    state
  }, data) {
    return await InviteAction.getInfo(state, data.route)
  },
  async getInviteUser({
    state
  }, data) {
    return await InviteAction.getUser(state, data.route)
  },
  async videoListGet({
    state
  }, data) {
    return await VideoAction.getList(state, data.route, data.body)
  }

}