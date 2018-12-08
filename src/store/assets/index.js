import Request from './../../api/common/request'
class AssetsStroe {

  async getUserAsset(state, route) {
    let ret = await Request.post("/api/assets?token=" + route.query.token, {})
    console.log("request getUserAsset ret", ret);
    state.userAssets = ret.data
    return ret
  }

  async getTransaction(state, route) {
    let ret = await Request.post("/api/assetsTransaction?token=" + route.query.token, {})
    console.log("request getTransaction ret", ret);
    state.userTransactions = ret.data.rows || []
    state.userTransactionsCount = ret.data.count || 0
    return ret
  }
}

module.exports = new AssetsStroe