const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const root = require('./utils/path')
const db = require('./utils/database')

// controllers
const utilControllers = require('./controllers/utils')

// routes
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(root, 'public')))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use('/', utilControllers.getPageNotFound)

app.listen(3000);