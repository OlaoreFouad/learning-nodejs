const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// helpers
const root = require('./utils/path')

// routes
const userRoutes = require('./routes/users').router

const app = express()

// view engine configuration
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(root, 'public')))
app.use(userRoutes)

app.use('/', (req, res, next) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        path: null
    })
})

app.listen(3000)