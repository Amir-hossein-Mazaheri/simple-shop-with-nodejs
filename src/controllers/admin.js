import Product from "../models/Product.js";

export const renderAdminProducts = async (req, res) => {
  const { isLoggedIn } = req;

  if (req?.user?.role !== "superuser" || !isLoggedIn) {
    res.redirect("/shop");
    return;
  }

  try {
    const products = await Product.find();

    res.render("admin/admin-products", {
      pageTitle: "Admin Products",
      tab: "admin-products",
      isLoggedIn,
      role: req?.user?.role || "",
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

export const renderEditProduct = async (req, res) => {
  const { prodId } = req.query;
  const { isLoggedIn } = req;

  if (req?.user?.role !== "superuser" || !isLoggedIn) {
    res.redirect("/shop");
    return;
  }

  try {
    const product = await Product.findById(prodId);

    res.render("shop/add-product", {
      pageTitle: "Edit Product",
      tab: "admin-products",
      editing: true,
      isLoggedIn,
      role: req?.user?.role || "",
      ...product._doc,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editProduct = async (req, res) => {
  const { prodId, ...productProperties } = req.body;
  try {
    const result = await Product.findByIdAndUpdate(prodId, productProperties);
    console.log(result);
    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (req, res) => {
  const { prodId } = req.body;
  console.log(prodId);

  try {
    const result = await Product.findByIdAndDelete(prodId);
    console.log(result);

    res.redirect("/admin/products");
  } catch (err) {
    console.log(err);
  }
};
