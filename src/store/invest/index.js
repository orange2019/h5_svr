// const Request = require('./../../api/common/request')
import Request from './../../api/common/request'

class InvestStore {

  async getList(state, route) {

    let ret = await Request.post("/api/investList?token=" + route.query.token, {})
    console.log("request invest list ret", ret);
    state.investList = ret.data.list || []
    return ret
  }

  async getInfo(state, route) {
    let ret = await Request.post("/api/investInfo?token=" + route.query.token, {
      invest_id: route.query.invest_id
    })
    console.log("request invest list ret", ret);
    state.investInfo = ret.data.invest || {}
    state.userCanUseTokenNum = ret.data.canUseNum || 0
    state.isSetTradePwd = ret.data.isSetTradePwd
    return ret
  }

  async getUserList(state, route) {
    let ret = await Request.post("/api/investUserList?token=" + route.query.token, {})
    console.log("request invest list ret", ret);
    state.investUserList = ret.data.list || []
    return ret
  }

  async getUserDetail(state, route) {
    let ret = await Request.post("/api/investUserDetail?token=" + route.query.token, {
      uuid: route.query.uuid
    })
    console.log("request invest list ret", ret);
    state.investDetail = ret.data.info || {}
    state.investInfo = ret.data.invest || {}
    state.investDetailSum = ret.data.sum || 0
    state.investDetailTotal = ret.data.investTotal
    state.investDetailTotalLeave = ret.data.investTotalLeave
    return ret
  }
}

export default new InvestStore