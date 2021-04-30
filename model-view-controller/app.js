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
const { use } = require("./routes/admin");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next()
    })
    .catch((err) => console.error(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", utilControllers.getPageNotFound);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Fouad",
        email: "test@test.com",
      });
    }
    return user;
  })
  .then((createdUser) => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
