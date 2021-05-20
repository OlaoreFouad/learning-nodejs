const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const root = require("./utils/path");

const utilsController = require("./controllers/utils");
const connectToDatabase = require("./utils/database").connectToDatabase;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");

app.use(shopRoutes);
app.use("/admin", adminRoutes);

app.get("/", utilsController.getPageNotFound);

connectToDatabase(() => {
  app.listen(3000);
});
