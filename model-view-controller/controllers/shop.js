
const Product = require('../models/product')

exports.getShop = (req, res, next) => {
    Product.fetchAll((products) => {
        let payload = {
            pageTitle: 'Shop',
            path: '/',
            prods: products
        }
        res.render('shop/index', payload)
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        let payload = {
            pageTitle: 'All Products',
            path: '/products',
            prods: products
        }
        res.render('shop/product-list', payload)
    })
}

exports.getCart = (req, res, next) => {
    const payload = {
        path: '/cart',
        pageTitle: 'Your Cart',
    }
    res.render('shop/cart', payload)
}

exports.getOrders = (req, res, next) => {
    const payload = {
        path: '/orders',
        pageTitle: 'Your orders',
    }
    res.render('shop/orders', payload)
}