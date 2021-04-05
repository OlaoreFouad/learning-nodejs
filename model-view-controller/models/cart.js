
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
                cart.product[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1, price: price }
                cart.products = [ ...cart.products, updatedProduct ]
            }

            cart.totalPrice += +price;
            console.log(cart);
            writeCartToFile(cart)

        })
        // check the cart if the element exists
        // add the new element to the cart or increase the qty of the element in the cart array
        // effect the price

    }

}