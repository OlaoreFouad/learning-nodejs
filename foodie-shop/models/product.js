const ObjectID = require("mongodb").ObjectID;

const getDb = require("../utils/database").getDb;

class Product {
  constructor(title, description, imageUrl, price) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = Number(price);
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.error(err)) ;
  }

  static find(id) {

    const db = getDb();
    console.log(id);
    return db.collection("products")
      .find({ _id: new ObjectID(id) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => console.error(err))

  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
  }
}

module.exports = Product;
