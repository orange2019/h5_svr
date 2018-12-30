import Request from './../../api/common/request'

class MallAction {

  async getUser(state, route) {
    let ret = await Request.post('/api/mall/authInfo?token=' + route.query.token)
    console.log('mall get user ret', ret)
    if (ret.code == 0) {
      state.mallUser.auth = true
      state.mallUser.info = ret.data
    }

    return ret
  }

  async getUserAddress(state, route) {
    let ret = await Request.post('/api/mall/user/address?token=' + route.query.token)
    console.log('mall get user address ret', ret)
    if (ret.code == 0) {
      state.address.list = ret.data.address
      state.address.default = ret.data.address[0] || {}
    }

    return ret
  }

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

  async getOrderList(state, route, data = {}) {

    let offset = state.order.offset || 0
    let limit = state.order.limit || 10
    data.offset = offset
    data.limit = limit

    let ret = await Request.post('/api/mall/order/list?token=' + route.query.token, data)

    console.log('request mall get list', ret)
    if (ret.code == 0) {
      ret.data.rows.forEach(item => {
        state.order.list.push(item)
      })

      state.order.offset += limit
    }

    return ret

  }

  async getOrderInfo(state, route, body) {
    let ret = await Request.post('/api/mall/order/info?token=' + route.query.token, {
      order_id: body.order_id
    })
    console.log('request order info ret ', ret)

    if (ret.code == 0) {
      state.order.info = ret.data
    } else {
      alert('无效订单')
      // history.go(-1)
    }

    return ret

  }
}

export default new MallAction