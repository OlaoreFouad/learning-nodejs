const express = require('express')
const path = require('path')

const root = require('../utils/path')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.sendFile(
        path.join(root, 'views', 'index.html')
    )
})

module.exports = router;