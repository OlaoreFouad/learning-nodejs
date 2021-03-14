const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const root = require('./utils/path')

const app = express()

app.use(express.static(path.join(root, 'public')))

// routes
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')

app.use(shopRoutes);
app.use('/admin', adminRoutes)

app.use('/', (req, res, next) => {
    res.sendFile(
        path.join(root, 'views', '404.html')
    )
})

app.listen(3000);