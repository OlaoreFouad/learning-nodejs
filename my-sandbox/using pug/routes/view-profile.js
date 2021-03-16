const express = require('express')
const path = require('path')
const root = require('./../utils/path')

const router = express.Router()

const profiles = require('./add-profile').profiles

// /view-profile route
router.get('/view-profile', (req, res, next) => {
    res.render('view-profile', {
        profiles: profiles,
        pageTitle: 'View Profiles',
        path: '/view-profile'
    })
})

module.exports = router;