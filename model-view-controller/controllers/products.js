const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    const payload = {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        activeAddProduct: true,
        productCss: true
    }
    res.render('admin/add-product', payload)
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getAdminProducts = (req, res, next) => {
    const payload = {
        path: '/admin/products',
        pageTitle: 'Admin Products'
    }
    res.render('admin/view-products', payload)
}

exports.getShop = (req, res, next) => {
    Product.fetchAll((products) => {
        let payload = {
            pageTitle: 'Shop',
            path: '/',
            prods: products,
            activeShop: true
        }
        res.render('shop/index', payload)
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        let payload = {
            pageTitle: 'All Products',
            path: '/products',
            prods: products,
            activeShop: true
        }
        res.render('shop/product-list', payload)
    })
}