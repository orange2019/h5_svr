import Request from './../../api/common/request'

class VideoAction {

  async getList(state, route, body) {
    let query = route.query;

    query.offset = parseInt(route.query.offset || body.offset || 0)
    query.limit = parseInt(route.query.limit || body.limit || 0)

    console.log("/api/news/list.query", query);

    let ret = await Request.get("/api/video/list", query)

    console.log("request news list ret", ret);

    if (ret.code == 0) {
      ret.data.rows.forEach(item => {
        state.video.list.push(item)
      })
    }

    return ret
  }
}

export default new VideoAction