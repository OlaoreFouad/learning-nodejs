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

  Product.create({
    title,
    description,
    price,
    imageUrl,
  })
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(productId, (product) => {
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
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedProduct = new Product(
    productId,
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.imageUrl
  );

  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    const payload = {
      path: "/admin/products",
      pageTitle: "Admin Products",
      prods: products,
    };
    res.render("admin/view-products", payload);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.delete(productId, () => {
    res.redirect("/admin/products");
  });
};
