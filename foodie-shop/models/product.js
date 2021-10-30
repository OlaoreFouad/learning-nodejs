const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// const ObjectID = require("mongodb").ObjectID;

// const getDb = require("../utils/database").getDb;

// class Product {
//   constructor(title, description, imageUrl, price, id, userId) {
//     this.title = title;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.price = Number(price);
//     this._id = id;
//     this.userId = new ObjectID(userId);
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => console.error(err));
//   }

//   static delete(id) {
//     const db = getDb();
//     return db.collection("products").deleteOne({ _id: new ObjectID(id) });
//   }

//   static find(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new ObjectID(id) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.error(err));
//   }

//   save() {
//     const db = getDb();
//     let dbOperation;

//     if (this._id) {
//       dbOperation = db.collection("products").updateOne(
//         { _id: new ObjectID(this._id) },
//         {
//           $set: {
//             title: this.title,
//             description: this.description,
//             price: this.price,
//             imageUrl: this.imageUrl,
//           },
//         }
//       );
//     } else {
//       dbOperation = db.collection("products").insertOne(this);
//     }

//     return dbOperation
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.error(err));
//   }
// }

// module.exports = Product;
