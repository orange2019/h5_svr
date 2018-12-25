class Cart {

  constructor(cartObj) {
    this.cart = cartObj || []
  }

  info() {

  }

  list() {

    return this.cart
  }

  total() {
    let total = 0
    this.cart.forEach(item => {
      total += item.price * item.count
    })

    return total
  }

  count() {
    let count = 0
    this.cart.forEach(item => {
      count += item.count
    })

    return count
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

  minus(itemInfo, count = 1, cb) {

    let newCart = []
    this.cart.forEach(item => {
      if (item.id == itemInfo.id) {
        item.count -= count
        if (item.count != 0) {
          newCart.push(item)
        }
      }
    })

    this.cart = newCart
  }
}

module.exports = Cart