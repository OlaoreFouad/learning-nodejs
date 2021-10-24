const { getDb } = require("../utils/database");
const { ObjectID } = require("mongodb");

class User {
  constructor(username, email, cart, userId) {
    this.name = username;
    this.email = email;
    this.cart = cart || { items: [] };
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const newCart = { ...this.cart };
    const productIndex = newCart.items.findIndex((prod) => {
      return prod.productId.toString() == product._id.toString();
    });

    if (productIndex > -1) {
      newCart.items[productIndex].quantity =
        newCart.items[productIndex].quantity + 1;
    } else {
      newCart.items.push({
        productId: product._id,
        title: product.title,
        description: product.description,
        imageUrl: product.imageUrl,
        price: Number(product.price),
        quantity: 1,
      });
    }

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectID(this.userId) },
        {
          $set: {
            cart: newCart,
          },
        }
      )
      .then(() => {
        return newCart;
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(
      (product) => product.productId.toString() !== productId
    );
    const db = getDb();

    return db.collection("users").updateOne(
      {
        _id: new ObjectID(this.userId),
      },
      {
        $set: {
          cart: { items: updatedCartItems },
        },
      }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectID(userId) });
  }

  getCart() {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectID(this.userId) })
      .then((user) => {
        this.cart = user.cart;
        return user.cart.items;
      });
  }

  checkout() {
    const db = getDb();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            name: this.name,
            userId: this.userId,
          },
          createdOn: Date.now(),
        };

        return db.collection("orders").insertOne(order);
      })
      .then((_) => {
        console.log("Checkout Successful!");
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectID(this.userId) },
            { $set: { cart: this.cart } }
          );
      })
      .then((_) => {
        console.log("Cart updated in DB!");
      })
      .catch((error) => console.error(error));
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user.userId": new ObjectID(this.userId) })
      .toArray();
  }
}

module.exports = User;
