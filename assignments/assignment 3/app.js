const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// routes
const indexRoutes = require('./routes/index')
const usersRoutes = require('./routes/users')

const root = require('./utils/path')

const app = express()

app.use(express.static(path.join(root, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(indexRoutes)
app.use(usersRoutes)

app.listen(3000)