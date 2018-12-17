import Request from './../../api/common/request'

class InviteStore {

  async getList(state, route) {
    let query = route.query;

    console.log("/api/inviteList.query", query);

    let ret = await Request.post("/api/inviteList?token=" + query.token, {})

    console.log("request inviteList ret", ret);
    state.inviteList = ret.data;

    let count = 0
    ret.data.forEach(item => {
      count += item.length
    });
    state.inviteCount = count;

    return ret
  }

  async getInfo(state, route) {
    let query = route.query;
    let token = query.token
    console.log("/api/getInfo.query", query);

    let ret = await Request.post("/api/invite?token=" + token, {})

    console.log("request getInfo ret", ret);
    state.inviteInfo = ret.data || {}

    return ret
  }

  async getUser(state, route) {
    let query = route.query;
    console.log("/api/getUser.query", query);
    if (!query.uuid) {
      state.inviteUser = {}
      return
    }

    let ret = await Request.post("/api/inviteUser", {
      uuid: query.uuid
    })

    console.log("request getUser ret", ret);
    state.inviteUser = ret.data || {}

    return ret
  }
}

export default new InviteStore