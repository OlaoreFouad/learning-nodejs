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

    constructor(title, description, price, imageUrl) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save() {
        this.id = Math.random().toString() + (101 / Math.random()).toString()
        getProductsFromFile((products) => {
            products.push(this)
            saveProductToFile(products)
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => {
                return p.id.trim() === id.trim();
            });
            cb(product);
        })
    }

}