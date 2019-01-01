import Request from './../../api/common/request'

class CartAction {

  async getInfo(state, route) {
    let cart = await Request.get('/cart/info')
    console.log('request get cart info ', cart)
    state.cart = cart
  }
}

export default new CartAction