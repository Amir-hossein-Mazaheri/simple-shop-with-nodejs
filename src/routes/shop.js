import express from "express";

import {
  addOrder,
  addProduct,
  addToCart,
  removeFromCart,
  renderAddProduct,
  renderCart,
  renderOrders,
  renderShop,
  renderSingleProduct,
} from "../controllers/shop.js";

const router = express.Router();

router.get("/", renderShop);

router.get("/add-product", renderAddProduct);

router.post("/add-product", addProduct);

router.get("/product", renderSingleProduct);

router.get("/cart", renderCart);

router.post("/cart", addToCart);

router.post("/remove-from-cart", removeFromCart);

router.post("/orders", addOrder);

router.get("/orders", renderOrders);

export default router;
