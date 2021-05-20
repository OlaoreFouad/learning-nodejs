
const express = require('express')
const shopRoutes = express.Router()

const shopController = require('../controllers/shop');

shopRoutes.get('/', shopController.getShop)

shopRoutes.get('/products', shopController.getProducts)

shopRoutes.get('/products/:productId', shopController.getProduct)

shopRoutes.get('/orders', shopController.getOrders)

shopRoutes.get('/cart', shopController.getCart)

shopRoutes.post('/cart', shopController.postCart)

module.exports = shopRoutes;