import Request from './../../api/common/request'

class MallAction {

  async getList(state, route, data) {

    let offset = state.goods.offset || 0
    let limit = state.goods.limit || 10

    let ret = await Request.post('/api/mall/goods/list', {
      offset: offset,
      limit: limit
    })

    console.log('request mall get list', ret)
    if (ret.code == 0) {
      ret.data.list.forEach(item => {
        state.goods.list.push(item)
      })

      state.goods.offset += limit
    }

  }
}

export default new MallAction