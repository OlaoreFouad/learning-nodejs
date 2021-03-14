const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const root = require('../utils/path')

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

// GET add-product
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(root, 'views', 'add-product.html'))
})

// POST add-product
router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router;