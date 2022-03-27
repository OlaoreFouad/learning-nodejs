const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const root = require("./utils/path");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const utilsController = require("./controllers/utils");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

const MONGO_DB_URI =
  "mongodb+srv://fouad:foodiepassword@foodiecluster.34k3l.mongodb.net/shop?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGO_DB_URI,
  collection: "sessions",
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));
app.use(
  session({
    secret: "myveryveryverylongsecret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(authRoutes);
app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.get("/", utilsController.getPageNotFound);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.error(error));
