exports.getPageNotFound = (req, res, next) => {
  const payload = {
    pageTitle: "Page Not Found",
    path: null,
  };
  res.render("404", payload);
};

exports.sum = (prices) => {
  if (prices.length == 0) {
    return 0;
  }

  return prices.reduce((prev, acc) => {
    return prev + acc;
  });
};
