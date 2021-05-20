const MongoClient = require("mongodb").MongoClient;

let _db;

const connectToDatabase = (callback) => {
  MongoClient.connect(
    "mongodb+srv://fouad:foodiepassword@cluster0.34k3l.mongodb.net/test"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback()
    })
    .catch((err) => {
      console.error(`Error occurred: ${err}`);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

module.exports = { connectToDatabase, getDb };
