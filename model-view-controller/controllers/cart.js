exports.getCart = (req, res, next) => {
    const payload = {
        path: '/cart',
        pageTitle: 'Cart',
    }
    res.render('shop/cart', payload)
}