const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const root = require("./utils/path");
const db = require("./utils/database");

// controllers
const utilControllers = require("./controllers/utils");
const sequelize = require("./utils/database");

// routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// models
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", utilControllers.getPageNotFound);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

app.listen(3000);
