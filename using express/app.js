const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/admin', adminRoutes) // configure admin routes
app.use(shopRoutes)

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000);