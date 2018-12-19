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
    let offset = state.userInvestChildOffset || 0
    let limit = 20;
    let ret = await Request.post("/api/investTeam?token=" + route.query.token, {
      offset: offset,
      limit: limit
    })
    console.log("request getChildInvest ret", ret);
    ret.data.rows.forEach(row => {
      state.userInvestChild.push(row)
    })

    state.userInvestChildCount = ret.data.count || 0
    state.userTeamCount = ret.data.childCount || 0

    if (ret.code == 0 && ret.data.rows.length) {
      state.userInvestChildOffset += limit
    }
    return ret
  }

  async getChildInvestInfo(state, route) {
    let ret = await Request.post("/api/investTeamInfo?token=" + route.query.token, {})
    console.log("request investTeamInfo ret", ret);
    state.userInvestChildInfo = ret.data || {}
    return ret
  }
}

module.exports = new AssetsStroe()