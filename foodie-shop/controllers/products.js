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

  const product = new Product(title, description, imageUrl, price);
  product
    .save()
    .then(() => {
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

  Product.find(productId)
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
  console.log(req.body.productId, typeof req.body.productId);
  const product = new Product(
    req.body.title,
    req.body.description,
    req.body.imageUrl,
    req.body.price,
    new ObjectID(req.body.productId)
  );
  product
    .save()
    .then((result) => {
      console.log("Product Updated Successfully!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));

};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
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

  Product.delete(productId)
    .then(deleted => {
      console.log("Product deleted successfully!");
      res.redirect("/admin/products");
    })
    .catch(err => console.error(err))
};
