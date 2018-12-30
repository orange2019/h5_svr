/**
 * 简单购物车
 */
class Cart {

  constructor(cartObj) {
    this.cart = cartObj || []
  }

  info() {
    let list = this.list()
    let total = this.total()
    let count = this.count()

    return {
      list,
      total,
      count
    }
  }

  list() {
    let newCart = []
    this.cart.forEach(item => {
      if (item.id && item.count > 0) {
        newCart.push(item)
      }
    })

    this.cart = newCart
    return this.cart
  }

  total() {
    let total = 0
    this.cart.forEach(item => {

      let itemTotal = parseFloat(item.price) * 100 * item.count
      console.log('total===============', itemTotal)
      total += itemTotal
      console.log('total===============', total)
    })

    return total / 100
  }

  count() {
    let count = 0
    this.cart.forEach(item => {
      count += item.count
    })

    return count
  }

  add(itemInfo, count = 1) {
    let isNew = 1
    this.cart.forEach(item => {
      console.log('add  ======= item', item)
      if (item.id == itemInfo.id) {
        item.count = count
        isNew = 0
      }
    })
    if (isNew) {
      console.log('add ===== itemInfo', itemInfo)
      this.cart.push(itemInfo)
    }
  }

  plus(itemInfo, count = 1) {
    let isNew = 1
    this.cart.forEach(item => {
      if (item.id == itemInfo.id) {
        item.count += count
        isNew = 0
      }
    })
    if (isNew) {
      this.cart.push(itemInfo)
    }
  }

  minus(itemInfo, count = 1) {

    let newCart = []
    this.cart.forEach((item, i) => {
      if (item.id == itemInfo.id) {
        item.count = item.count - count
        if (item.count > 0) {
          newCart.push(item)
        }
      }
    })

    this.cart = newCart
  }

  clear() {
    this.cart = []
  }
}

module.exports = Cart