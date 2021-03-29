const express = require('express')
const path = require('path')

const productsController = require('../controllers/products')

const router = express.Router()

// GET add-product
router.get('/add-product', productsController.getAddProduct)

// POST add-product
router.post('/add-product', productsController.postAddProduct)

// GET /admin/products
router.get('/products', productsController.getAdminProducts)

module.exports = router;