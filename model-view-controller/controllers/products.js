const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  const payload = {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    activeAddProduct: true,
    productCss: true,
    editing: false,
  };
  res.render("admin/edit-product", payload);
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  req.user
    .createProduct({
      title,
      description,
      price,
      imageUrl,
      userId: req.user.id,
    })
    .then((_) => {
      console.log("product added");
      res.redirect("/admin/products");
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  req.user
    .getProducts({
      where: {
        id: productId,
      },
    })
    .then((products) => {
      const product = products[0];

      if (!product) {
        res.redirect("/");
      }

      const payload = {
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: editMode,
        product: product,
      };
      res.render("admin/edit-product", payload);
    })
    .catch((error) => console.error(error));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findByPk(productId)
    .then((product) => {
      product.title = req.body.title;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;

      return product.save();
    })
    .then((result) => {
      console.log("data updated successfully!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};

exports.getAdminProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
      const payload = {
        path: "/admin/products",
        pageTitle: "Admin Products",
        prods: products,
      };
      res.render("admin/view-products", payload);
    })
    .catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("product destroyed!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};
