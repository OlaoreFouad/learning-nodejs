const express = require('express')
const path = require('path')

const root = require('../utils/path')

const router = express.Router()

// data
const products = [];

// GET add-product
router.get('/add-product', (req, res, next) => {
    res.render('add-product')
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