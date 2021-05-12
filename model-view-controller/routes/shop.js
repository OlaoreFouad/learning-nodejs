const express = require('express')
const path = require('path')

const shopController = require('../controllers/shop')

const router = express.Router()

// GET /
router.get('/', shopController.getShop)

// GET /products
router.get('/products', shopController.getProducts)

// GET /products/:productId
router.get('/products/:productId', shopController.getProduct)

// GET /cart
router.get('/cart', shopController.getCart)

// POST /cart
router.post('/cart', shopController.postCart)

// POST /cart/delete/:productId
router.post('/cart/delete/:productId', shopController.deleteProductFromCart)

// GET /orders
router.get('/orders', shopController.getOrders)

// GET /checkout
router.post('/checkout', shopController.postCheckout)

module.exports = router;