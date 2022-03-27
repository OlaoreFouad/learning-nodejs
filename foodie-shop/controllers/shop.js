const Product = require("../models/product");
const Order = require("../models/order");
const { sum } = require("./utils");

exports.getShop = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      const payload = {
        pageTitle: "Shop",
        path: "/",
        prods: products,
        isLoggedIn: req.session.isLoggedIn,
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
        isLoggedIn: req.session.isLoggedIn,
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
        isLoggedIn: req.session.isLoggedIn,
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
  req.session.user
    .populate("cart.items.productId")
    .then((products) => {
      console.log(products);
      return products;
    })
    .then((products) => {
      const cartItems = products.cart.items;
      const payload = {
        pageTitle: "Cart",
        path: "/cart",
        products: cartItems,
        isLoggedIn: req.session.isLoggedIn,
        totalPrice: sum(cartItems.map((p) => p.productId.price * p.quantity)),
      };
      res.render("shop/cart", payload);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      return req.session.user.addToCart(product);
    })
    .then((cart) => {
      req.session.user.cart = cart;
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.session.user
    .removeFromCart(prodId)
    .then((_) => {
      console.log("Cart item deleted successfully!");
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
};

exports.postCheckout = (req, res, next) => {
  req.session.user
    .populate("cart.items.productId")
    .then((products) => {
      const prods = products.cart.items;
      const user = req.session.user;
      const order = new Order({
        user: {
          name: user.name,
          userId: user,
        },
        products: prods.map((p) => {
          return { quantity: p.quantity, product: { ...p.productId._doc } };
        }),
      });
      return order.save();
    })
    .then((_) => {
      console.log("Order created successfully!");
      req.session.user.cart.items = [];
      req.session.user.save();
      res.redirect("/orders");
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.session.user._id })
    .then((orders) => {
      console.log(orders);
      const payload = {
        path: "/orders",
        pageTitle: "Orders",
        orders,
        totalPrices: orders.map((order) => {
          return sum(
            order.products.map((product) => {
              return product.quantity * product.product.price;
            })
          );
        }),
        isLoggedIn: req.session.isLoggedIn,
      };
      res.render("shop/orders", payload);
    })
    .catch((error) => console.error(error));
};
