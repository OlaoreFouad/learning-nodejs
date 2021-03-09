const express = require('express')
const path = require('path')

const root = require('../utils/path')

const router = express.Router()

router.get('/users', (req, res, next) => {
    res.sendFile(
        path.join(root, 'views', 'users.html')
    )
})

module.exports = router;