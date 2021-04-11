const fs = require('fs')
const path = require('path')
const root = require('../utils/path')

const Cart = require('../models/cart')

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

    constructor(id, title, description, price, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save() {
        getProductsFromFile((products) => {

            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                products[existingProductIndex] = this
            } else {
                this.id = Math.random().toString() + (101 / Math.random()).toString()
                products.push(this)
            }

            saveProductToFile(products)
        })
    }

    static delete(productId, cb) {

        getProductsFromFile((products) => {
            const productIndex = products.findIndex(product => product.id === productId)
            const product = products[productIndex]
            products.splice(productIndex, 1)
            saveProductToFile(products)
            Cart.deleteProduct(productId, product.price, cb)
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