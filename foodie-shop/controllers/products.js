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

  console.log(`Getting here: ${ productId }, ${ editMode }`);

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

// exports.postEditProduct = (req, res, next) => {
//   const productId = req.body.productId;

//   res.redirect("/admin/products");
// };

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

// exports.postDeleteProduct = (req, res, next) => {
//   const productId = req.body.productId;
//   res.redirect("/admin/products");
// };
