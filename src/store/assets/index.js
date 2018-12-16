import Request from './../../api/common/request'
class AssetsStroe {

  async getUserAsset(state, route) {
    let ret = await Request.post("/api/assets?token=" + route.query.token, {})
    console.log("request getUserAsset ret", ret);
    state.userAssets = ret.data
    return ret
  }

  async getTransaction(state, route) {
    let offset = state.userTransactionsOffset || 0
    let ret = await Request.post("/api/assetsTransaction?token=" + route.query.token, {
      offset: offset,
      limit: 10
    })
    console.log("request getTransaction ret", ret);
    if (ret.data.rows && ret.data.rows.length) {
      ret.data.rows.forEach(item => {
        state.userTransactions.push(item)
      });

      state.userTransactionsOffset += 10
    }
    // state.userTransactions = ret.data.rows || []
    state.userTransactionsCount = ret.data.count || 0
    return ret
  }

  async getChildInvest(state, route) {
    let ret = await Request.post("/api/investTeam?token=" + route.query.token, {})
    console.log("request getChildInvest ret", ret);
    state.userInvestChild = ret.data.rows || []
    state.userInvestChildCount = ret.data.count || 0
    state.userTeamCount = ret.data.childCount || 0
    return ret
  }
}

module.exports = new AssetsStroe()