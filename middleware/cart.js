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

router.get('/item', async (req, res) => {
  let itemId = req.query.id
  if (!req.session.cart) {
    req.session.cart = []
  }
  let sessionCart = req.session.cart
  let cart = new Cart(sessionCart)

  let list = cart.list()
  let ret = null
  list.forEach(item => {
    if (item.id == itemId)
      ret = item
  });

  return res.json({
    item: ret
  })
})

router.post('/plus', async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  let sessionCart = req.session.cart
  let cart = new Cart(sessionCart)

  let item = req.body.item
  let count = req.body.count || 1

  cart.plus(item, count)

  return res.json({
    code: 0
  })

})

router.post('/add', async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  let sessionCart = req.session.cart
  let cart = new Cart(sessionCart)

  let item = req.body.item

  console.log('add item =======', item)
  let count = req.body.count || 1

  cart.add(item, count)

  return res.json({
    code: 0
  })

})

router.post('/minus', async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  let sessionCart = req.session.cart
  let cart = new Cart(sessionCart)

  Log.info('/minus body ', cart.list())
  Log.info('/minus body ', req.body)
  let item = req.body.item
  let count = req.body.count || 1

  cart.minus(item, count)

  return res.json({
    code: 0
  })

})

module.exports = router