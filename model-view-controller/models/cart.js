
const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename), 'data', 'cart.json'
)

const writeCartToFile = (cart) => {
    fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('written cart back to file');
        }
    })
}

module.exports = class Cart {

    static addProduct(id, price) {

        // get the cart as a whole
        fs.readFile(p, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
            }

            const existingProductIndex = cart.products.findIndex( prod => prod.id === id )
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty += 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1, price }
                cart.products = [ ...cart.products, updatedProduct ]
            }

            cart.totalPrice += +price;
            console.log(cart);
            writeCartToFile(cart)

        })

    }

    static deleteProduct(id, price, cb) {
        // read the content of the cart
        fs.readFile(p, (err, data) => {
            if (err) {
                return
            }
            // find the product by id
            const currentCart = { ...JSON.parse(data) }
            const product = currentCart.products.find(prod => prod.id == id)
            if (!product) {
                return;
            }
            const productQty = product.qty
            // remove the product from the products array
            const updatedProducts = currentCart.products.filter(prod => prod.id !== product.id)
            currentCart.products = updatedProducts
            // reduce the total price
            currentCart.totalPrice -= price * productQty
            // re-write into the file
            writeCartToFile(currentCart)
            cb()
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, data) => {
            if (err) {
                cb(null)
            } else {
                const cart = JSON.parse(data)
                cb(cart)
            }
        })
    }

}