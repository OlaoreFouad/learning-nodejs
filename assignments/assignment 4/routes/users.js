const express = require('express')
const path = require('path')
const root = require('./../utils/path')

const router = express.Router()

const names = [];

// / route to show form to register user
router.get('/', (req, res, next) => {
    res.render('add-user', {
        path: '/',
        title: 'Add User'
    })
})

// /users route to show all users add to list
router.get('/users', (req, res, next) => {
    res.render('view-users', {
        path: '/users',
        names: names,
        title: 'View Users'
    })
})

router.post('/add-user', (req, res, next) => {
    const name = req.body.name
    names.push(name)
    res.status(200).redirect('/')
})

module.exports = {
    data: names,
    router: router
}