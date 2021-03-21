const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const hbs = require('express-handlebars')

const root = require('./utils/path')

const app = express()

// configure view engine
app.engine('hbs', hbs({ defaultLayout: 'main-layout.hbs', extname: '.hbs', layoutsDir: 'views/layouts' }))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(root, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

// routes
const shopRoutes = require('./routes/shop')
const admin = require('./routes/admin')

app.use(shopRoutes);
app.use('/admin', admin.routes)

app.use('/', (req, res, next) => {
    const payload = {
        pageTitle: 'Page Not Found',
        pageNotFound: true
    }
    res.status(404).render('404', payload)
})

app.listen(3000);