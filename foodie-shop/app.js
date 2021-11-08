const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const root = require("./utils/path");
const mongoose = require("mongoose");

const utilsController = require("./controllers/utils");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("61899808db5384090de2cffc")
    .then((user) => {
      req.user = user;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      next();
    });
});

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.get("/", utilsController.getPageNotFound);

mongoose
  .connect(
    "mongodb+srv://fouad:foodiepassword@foodiecluster.34k3l.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((u) => {
      if (!u) {
        const user = User({
          name: "Fouad",
          email: "fouad@email.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((error) => console.error(error));
