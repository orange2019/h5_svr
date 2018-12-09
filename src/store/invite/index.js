import Request from './../../api/common/request'

class InviteStore {

  async getList(state, route) {
    let query = route.query;

    console.log("/api/inviteList.query", query);

    let ret = await Request.post("/api/inviteList?token=" + query.token, {})

    console.log("request inviteList ret", ret);
    state.inviteList = ret.data.rows;
    state.inviteCount = ret.data.count;

    return ret
  }

  async getInfo(state, route) {
    let query = route.query;

    console.log("/api/getInfo.query", query);

    let ret = await Request.post("/api/invite", {
      uuid: query.uuid
    })

    console.log("request getInfo ret", ret);
    state.inviteInfo = ret.data || {}

    return ret
  }
}

export default new InviteStore