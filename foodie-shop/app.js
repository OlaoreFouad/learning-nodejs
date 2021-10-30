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

// app.use((req, res, next) => {
//   User.findById("613854ac7ce70eb73dbf57e0")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       console.log(req.user);
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       next();
//     });
// });

app.use(shopRoutes);
app.use("/admin", adminRoutes);
app.get("/", utilsController.getPageNotFound);

mongoose
  .connect(
    "mongodb+srv://fouad:foodiepassword@foodiecluster.34k3l.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => console.error(error));
