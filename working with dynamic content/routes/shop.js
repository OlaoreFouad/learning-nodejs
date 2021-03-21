const express = require('express')
const path = require('path')

const root = require('../utils/path')

// data
const admin = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
    const payload = {
        prods: admin.products,
        pageTitle: 'Shop',
        path: '/',
        activeShop: true
    }
    res.render('shop', payload)
})

module.exports = router;