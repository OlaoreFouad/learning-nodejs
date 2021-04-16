
const db = require('../utils/database')

const Cart = require('../models/cart')

module.exports = class Product {

    constructor(id, title, description, price, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    save() {
    }

    static delete(productId) {

    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        
    }

}