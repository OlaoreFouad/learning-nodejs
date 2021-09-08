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
        return user.cart;
      });
  }
}

module.exports = User;
