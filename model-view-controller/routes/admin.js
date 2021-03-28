const express = require('express')
const path = require('path')

const productsController = require('../controllers/products')

const router = express.Router()

// data
const products = [];

// GET add-product
router.get('/add-product', productsController.getAddProduct)

// POST add-product
router.post('/add-product', productsController.postAddProduct)

module.exports = router;