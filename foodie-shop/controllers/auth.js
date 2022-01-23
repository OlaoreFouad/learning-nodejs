exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split("=")[1];
  console.log(isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
