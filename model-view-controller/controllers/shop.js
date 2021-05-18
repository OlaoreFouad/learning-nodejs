const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getShop = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      let payload = {
        pageTitle: "My Products",
        path: "/",
        prods: products,
      };
      res.render("shop/index", payload);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      let payload = {
        pageTitle: "All Products",
        path: "/products",
        prods: products,
      };
      res.render("shop/product-list", payload);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      const payload = {
        pageTitle: product.title,
        path: "/products",
        product: product,
      };
      res.render("shop/product-details", payload);
    })
    .catch((err) => console.error(err));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then((_) => res.redirect("/cart"))
    .catch((err) => console.error(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      const myProducts = products.map((product) => {
        return {
          id: product.id,
          title: product.title,
          qty: product.cartItem.quantity,
          price: product.price,
        };
      });
      return myProducts;
    })
    .then((cartProducts) => {
      let totalPrice = 0;
      cartProducts.forEach((product) => {
        totalPrice += product.price * product.qty;
      });
      const payload = {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
        totalPrice,
      };
      res.render("shop/cart", payload);
    })
    .catch((err) => console.log(err));
};

exports.deleteProductFromCart = (req, res, next) => {
  const productId = req.params.productId;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      if (product.cartItem.quantity > 1) {
        let newQuantity = product.cartItem.quantity - 1;
        return fetchedCart
          .addProduct(product, { through: { quantity: newQuantity } })
          .then((_) => {
            console.log("deleted single item from cart");
          })
          .catch((err) => console.error(err));
      } else {
        return fetchedCart.removeProducts(productId);
      }
    })
    .then((_) => {
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
};

exports.postCheckout = (req, res, next) => {

  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((cartProducts) => {
      // create order
      return req.user
        .createOrder()
        .then((order) => {
          return order
            .addProducts(
              cartProducts.map((product) => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
              })
            )
            .catch((err) => console.error(err));
        })
        .then(_ => {
          return fetchedCart.setProducts(null);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .then((_) => res.redirect("/products"))
    .catch((err) => console.error(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ['products'] })
    .then((orders) => {
      console.log(orders);
      const payload = {
        path: "/orders",
        pageTitle: "Your orders",
        orders
      };
      res.render("shop/orders", payload);
    })
    .catch((err) => console.error(err));
};
