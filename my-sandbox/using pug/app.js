const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')
const root = require('./utils/path')

// routes
const viewProfileRoutes = require('./routes/view-profile')
const indexRoutes = require('./routes/index')
const addProfile = require('./routes/add-profile')

// app initialization
const app = express()

// view engine configuration
app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(root, 'public')))

app.use(viewProfileRoutes)
app.use(addProfile.routes)
app.use(indexRoutes)

app.listen(3000)