
exports.getShop = (req, res, next) => {
    const payload = {
        pageTitle: 'Shop',
        path: '/',
        prods: []
    };
    res.render('shop/index', payload);
}

exports.getProducts = (req, res, next) => {
    const payload = {
        pageTitle: 'Products',
        path: '/products',
        prods: []
    }
    res.render('shop/product-list', payload);
}

exports.getProduct = (req, res, next) => {
    const payload = {
        pageTitle: 'Product',
        path: '/products',
        product: {}
    }
    res.render('shop/product-details', payload)
}

exports.getOrders = (req, res, next) => {
    const payload = {
        pageTitle: 'Orders',
        path: '/orders',
        orders: []
    }
    res.render('shop/orders', payload);
}

exports.getCart = (req, res, next) => {
    const payload = {
        pageTitle: 'Cart',
        path: '/cart',
        products: [],
        totalPrice: 0
    }
    res.render('shop/cart', payload);
}

exports.postCart = (req, res, next) => {
    res.render('shop/cart');
}