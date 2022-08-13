import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const renderShop = async (req, res) => {
  const { isLoggedIn } = req;

  try {
    const products = await Product.find();
    res.render("shop/index", {
      pageTitle: "Shop",
      tab: "shop",
      isLoggedIn,
      role: req?.user?.role || "",
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

export const renderAddProduct = (req, res) => {
  const { isLoggedIn } = req;

  res.render("shop/add-product", {
    pageTitle: "Add Product",
    tab: "add-product",
    isLoggedIn,
    role: req?.user?.role || "",
    editing: false,
  });
};

export const renderCart = async (req, res) => {
  const { isLoggedIn } = req;

  try {
    const {
      cart: { items },
    } = await req.user.populate("cart.items.productId");

    // calculates total price of cart
    const totalPrice =
      items.length > 0
        ? items
            .map(({ quantity, productId: { price } }) => quantity * price)
            ?.reduce((prevValue, currValue) => prevValue + currValue)
        : 0;

    console.log(totalPrice);

    res.render("shop/cart", {
      pageTitle: "My Cart",
      tab: "cart",
      isLoggedIn,
      role: req?.user?.role || "",
      items,
      totalPrice,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = async (req, res) => {
  const { title, description, image, price } = req.body;

  const product = new Product({
    title,
    description,
    image,
    price,
    userId: req.user,
  });

  try {
    const result = await product.save();
    console.log(result);

    res.redirect("/shop");
  } catch (err) {
    console.log(err);
  }
};

export const renderSingleProduct = async (req, res) => {
  const { prodId } = req.query;
  const { isLoggedIn } = req;
  console.log(prodId);

  try {
    const { _id, title, description, image, price } = await Product.findById(
      prodId
    );
    res.render("shop/single-product", {
      pageTitle: `Product ${title}`,
      tab: "shop",
      isLoggedIn,
      role: req?.user?.role || "",
      _id,
      title,
      description,
      image,
      price,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (req, res) => {
  const { prodId } = req.body;

  try {
    const product = await Product.findById(prodId);
    const result = await req.user.addToCart(product);
    console.log(result);

    res.redirect("/shop/cart");
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = async (req, res) => {
  const { prodId } = req.body;

  try {
    const result = await req.user.removeFromCart({ _id: prodId });
    console.log(result);

    res.redirect("/shop/cart");
  } catch (err) {
    console.log(err);
  }
};

export const renderOrders = async (req, res) => {
  const { isLoggedIn } = req;

  try {
    const orders = await Order.find({ userId: req.user });
    console.log(orders);

    res.render("shop/orders", {
      pageTitle: "Orders",
      tab: "orders",
      isLoggedIn,
      role: req?.user?.role || "",
      orders,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addOrder = async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const {
      cart: { items },
    } = await req.user.populate("cart.items.productId");

    const order = new Order({
      userId: req.user,
      time: Date.now(),
      totalPrice,
      products: items.map(({ productId, quantity }) => ({
        product: { ...productId._doc },
        quantity,
      })),
    });

    const result = await order.save();
    console.log(result);

    req.user.clearCart();

    res.redirect("/shop/orders");
  } catch (err) {
    console.log(err);
  }
};
