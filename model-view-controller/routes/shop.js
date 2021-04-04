const express = require('express')
const path = require('path')

const shopController = require('../controllers/shop')

const router = express.Router()

// GET /
router.get('/', shopController.getShop)

// GET /products
router.get('/products', shopController.getProducts)

// GET /cart
router.get('/cart', shopController.getCart)

// GET /orders
router.get('/orders', shopController.getOrders)

module.exports = router;