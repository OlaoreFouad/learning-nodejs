exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  console.log("LoggedIn State: " + isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};
