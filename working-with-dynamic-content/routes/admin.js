const express = require('express')
const path = require('path')

const root = require('../utils/path')

const router = express.Router()

// data
const products = [];

// GET add-product
router.get('/add-product', (req, res, next) => {
    const payload = {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        activeAddProduct: true,
        productCss: true
    }
    res.render('add-product', payload)
})

// POST add-product
router.post('/add-product', (req, res, next) => {
    products.push({
        title: req.body.title
    })
    res.redirect('/')
})

module.exports = {
    routes: router,
    products: products
}