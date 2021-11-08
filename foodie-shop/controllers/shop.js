const Product = require("../models/product");
const { sum } = require("./utils");

exports.getShop = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
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
  Product.find()
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
  Product.findById(productId)
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

// exports.getCart = (req, res, next) => {
//   let cart = {};

//   req.user
//     .getCart()
//     .then((products) => {
//       return products.map((product) => {
//         let itemInCartIndex = products.findIndex((prod) => {
//           return prod.productId.toString() == product.productId.toString();
//         });
//         return {
//           ...product,
//           quantity: products[itemInCartIndex].quantity,
//         };
//       });
//     })
//     .then((products) => {
//       const payload = {
//         pageTitle: "Cart",
//         path: "/cart",
//         products,
//         totalPrice: sum(products.map((p) => p.price * p.quantity)),
//       };
//       res.render("shop/cart", payload);
//     });
// };

// exports.postCart = (req, res, next) => {
//   const productId = req.body.productId;
//   Product.find(productId)
//     .then((product) => {
//       return req.user.addToCart(product);
//     })
//     .then((cart) => {
//       req.user.cart = cart;
//       res.redirect("/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postDeleteCartProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   req.user
//     .deleteItemFromCart(prodId)
//     .then((_) => {
//       console.log("Cart item deleted successfully!");
//       res.redirect("/cart");
//     })
//     .catch((err) => console.error(err));
// };

// exports.postCheckout = (req, res, next) => {
//   req.user
//     .checkout()
//     .then((_) => {
//       console.log("Order created successfully!");
//       res.redirect("/orders");
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders()
//     .then((orders) => {
//       const payload = {
//         path: "/orders",
//         pageTitle: "Orders",
//         orders,
//       };
//       res.render("shop/orders", payload);
//     })
//     .catch((error) => console.error(error));
// };
