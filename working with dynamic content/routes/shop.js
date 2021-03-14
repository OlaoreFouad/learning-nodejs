const express = require('express')
const path = require('path')

const root = require('../utils/path')

// data
const admin = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
    console.log(admin.products)
    res.render('shop')
})

module.exports = router;