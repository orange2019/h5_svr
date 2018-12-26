const express = require('express');
const router = express.Router()
const Cart = require('./../vendor/cart')
const Log = require('./../log')('cart')

router.get('/info', async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  let sessionCart = req.session.cart
  let cart = new Cart(sessionCart)
  let info = cart.info()
  Log.info('cart', info)
  return res.json(info)
})

module.exports = router