const express = require('express')
const path = require('path')
const root = require('../utils/path')

const router = express.Router()

const profiles = require('./add-profile').profiles;

router.get('/', (req, res, next) => {
    res.render('index', {
        profiles: profiles,
        pageTitle: 'Home Page',
        path: '/'
    })
})

module.exports = router;