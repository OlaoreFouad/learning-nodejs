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

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;

    const product = new Product(title, description, price, imageUrl)
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