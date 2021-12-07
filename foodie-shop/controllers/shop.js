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

exports.getCart = (req, res, next) => {
  req.user
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
        totalPrice: sum(cartItems.map((p) => p.productId.price * p.quantity)),
      };
      res.render("shop/cart", payload);
    });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
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

exports.postDeleteCartProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((_) => {
      console.log("Cart item deleted successfully!");
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
};

exports.postCheckout = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((products) => {
      const prods = products.cart.items;
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: prods.map((p) => {
          return { quantity: p.quantity, product: { ...p.productId._doc } };
        }),
      });
      return order.save();
    })
    .then((_) => {
      console.log("Order created successfully!");
      req.user.cart.items = [];
      req.user.save();
      res.redirect("/orders");
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
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
      };
      res.render("shop/orders", payload);
    })
    .catch((error) => console.error(error));
};
