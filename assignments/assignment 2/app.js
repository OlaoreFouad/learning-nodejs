const express = require('express')

const app = express()

// app.use('/', (req, res, next) => {
//     console.log('In the first middleware!')
//     next()
// })

// app.use('/', (req, res, next) => {
//     console.log('In the second (and final) middleware!')
//     res.send('<h1>Welcome to Assignment 2</h1>')
// })

app.use('/users', (req, res, next) => {
    console.log('In the Users middleware')
    res.send('<h1>Welcome to Users Page</h1>')
})

app.use('/', (req, res, next) => {
    console.log('This always runs!')
    res.send('<h1>This is the main page ooo</h1>')
})

app.listen(3000)