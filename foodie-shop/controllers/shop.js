const Product = require("../models/product");
const { sum } = require("./utils");

exports.getShop = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      const payload = {
        pageTitle: "Shop",
        path: "/",
        prods: products,
      };
      res.render("shop/index", payload);
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      const payload = {
        pageTitle: "Products",
        path: "/products",
        prods: products,
      };
      res.render("shop/product-list", payload);
    })
    .catch((err) => console.error(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.find(productId)
    .then((product) => {
      console.log(product);
      const payload = {
        pageTitle: "Product",
        path: "/products",
        product,
      };
      res.render("shop/product-details", payload);
    })
    .catch((err) => {
      console.log(err);
    });
};

// exports.getOrders = (req, res, next) => {
//     const payload = {
//         pageTitle: 'Orders',
//         path: '/orders',
//         orders: []
//     }
//     res.render('shop/orders', payload);
// }

exports.getCart = (req, res, next) => {
  let cart = {};

  req.user
    .getCart()
    .then((_cart) => {
      cart = _cart;
      return Promise.all(
        _cart.items.map((product) => Product.find(product.productId))
      );
    })
    .then((products) => {
      return products.map((product) => {
        let itemInCartIndex = cart.items.findIndex((prod) => {
          return prod.productId.toString() == product._id.toString();
        });
        return {
          ...product,
          quantity: cart.items[itemInCartIndex].quantity,
        };
      });
    })
    .then((products) => {
      const payload = {
        pageTitle: "Cart",
        path: "/cart",
        products,
        totalPrice: sum(products.map((p) => p.price * p.quantity)),
      };
      res.render("shop/cart", payload);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.find(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((cart) => {
      req.user.cart = cart;
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
