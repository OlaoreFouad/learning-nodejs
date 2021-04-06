const express = require('express')
const path = require('path')

const productsController = require('../controllers/products')

const router = express.Router()

// GET add-product
router.get('/add-product', productsController.getAddProduct)

// POST add-product
router.post('/add-product', productsController.postAddProduct)

// GET /products/:productId/edit
router.get('/edit-product/:productId', productsController.getEditProduct)

// POST /edit-product
router.post('/edit-product', productsController.postEditProduct)

// GET /admin/products
router.get('/products', productsController.getAdminProducts)

// POST/DELETE /admin/delete-product
router.post('/delete-product', productsController.postDeleteProduct)

module.exports = router;