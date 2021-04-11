
const Product = require('../models/product')
const Cart = require('../models/cart')

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

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        const payload = {
            pageTitle: product.title,
            path: '/products',
            product: product
        }
        res.render('shop/product-details', payload)
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        console.log(product);
        Cart.addProduct(productId, product.price);
        res.redirect('/cart')
    })
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (const product of cart.products) {
                const productInProducts = products.find(prod => prod.id == product.id)
                const p = {
                    data: productInProducts,
                    qty: product.qty
                }
                cartProducts.push(p)
            }
            const payload = {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts,
                totalPrice: cart.totalPrice
            }
            res.render('shop/cart', payload)
        })
    })
}

exports.deleteProductFromCart = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        Cart.deleteProduct(productId, product.price, () => {
            res.redirect('/cart')
        })
    })
}

exports.getOrders = (req, res, next) => {
    const payload = {
        path: '/orders',
        pageTitle: 'Your orders',
    }
    res.render('shop/orders', payload)
}