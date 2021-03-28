const fs = require('fs')
const path = require('path')
const root = require('../utils/path')

const p = path.join(
    root, 'data', 'products.json'
)

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([])
        }
        cb(JSON.parse(fileContent))
    })
}

const saveProductToFile = (products) => {
    fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err)
            console.error(err)
    })
}

module.exports = class Product {

    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this)
            saveProductToFile(products)
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

}