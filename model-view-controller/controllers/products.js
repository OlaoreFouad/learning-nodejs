const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    const payload = {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        activeAddProduct: true,
        productCss: true
    }
    res.render('add-product', payload)
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getShop = (req, res, next) => {
    Product.fetchAll((products) => {
        let payload = {
            pageTitle: 'Shop',
            path: '/',
            prods: products,
            activeShop: true
        }
        res.render('shop', payload)
    })
}