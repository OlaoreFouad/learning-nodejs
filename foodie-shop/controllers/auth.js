const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  console.log("LoggedIn User...");
  console.dir(req.session.user);
  console.log("LoggedIn State: " + isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("61899808db5384090de2cffc")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      next();
    });
};
