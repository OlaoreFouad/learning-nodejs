const express = require('express')

const app = express();

app.use('/', (req, res, next) => {
    console.log('This always runs!')
    next()
})

app.use('/add-product', (req, res, next) => {
    console.log('In "Add Product" middleware')
    res.send('<h1>Welcome to "Add Product" Page</h1>')
})

app.use('/', (req, res, next) => {
    console.log('In first middleware!')
    res.send('<h1>Hello from Express!</h1>')
})

app.listen(3000);