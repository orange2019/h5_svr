// const Request = require('./../../api/common/request')
import Request from './../../api/common/request'

class NewsStore {

  async getList(state, route) {
    let query = route.query;

    query.offset = parseInt(route.query.offset || 0)
    query.limit = parseInt(route.query.limit || 50)

    console.log("/api/news/list.query", query);

    let ret = await Request.get("/api/newsList", query)

    console.log("request news list ret", ret);
    state.listItems = ret.data.rows;
    state.listCount = ret.data.count;
    state.listOffset = query.offset

    return ret
  }
}

export default new NewsStore