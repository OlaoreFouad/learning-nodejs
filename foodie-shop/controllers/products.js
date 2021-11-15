const Product = require("../models/product");
const ObjectID = require("mongodb").ObjectID;

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

  const product = new Product({
    title,
    description,
    price,
    imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      console.log("Product Created");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = req.query.edit;

  console.log(`Getting here: ${productId}, ${editMode}`);

  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(productId)
    .then((product) => {
      const payload = {
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: editMode,
        product: product,
      };
      res.render("admin/edit-product", payload);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      product.title = req.body.title;
      product.description = req.body.description;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;

      return product.save();
    })
    .then(() => {
      console.log("Product Updated Successfully!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      const payload = {
        path: "/admin/products",
        pageTitle: "Admin Products",
        prods: products,
      };
      res.render("admin/view-products", payload);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findOneAndRemove(productId)
    .then((deleted) => {
      console.log("Product deleted successfully!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
};
