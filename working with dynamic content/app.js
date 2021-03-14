const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const root = require('./utils/path')

const app = express()

// configure view engine
app.set('view engine', 'pug')
app.set('views', 'views')


app.use(express.static(path.join(root, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
const shopRoutes = require('./routes/shop')
const admin = require('./routes/admin')

app.use(shopRoutes);
app.use('/admin', admin.routes)

app.use('/', (req, res, next) => {
    res.render('404')
})

app.listen(3000);