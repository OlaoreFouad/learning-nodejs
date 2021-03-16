const express = require('express')
const path = require('path')

const root = require('./../utils/path')

const router = express.Router()

router.get('/add-profile', (req, res, next) => {
    res.render('add-profile', {
        path: '/add-profile',
        pageTitle: 'Add Profile'
    })
})

const profiles = [];

router.post('/add-profile', (req, res, next) => {
    const newProfile = {
        name: req.body.name,
        job: req.body.job,
        about: req.body.about
    }
    profiles.push(newProfile)
    res.redirect('/')
})

module.exports = {
    routes: router,
    profiles: profiles
};