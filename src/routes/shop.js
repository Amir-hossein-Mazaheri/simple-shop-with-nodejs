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
import { userAuth, adminAuth } from "../middlewares/index.js";

const router = express.Router();

router.get("/", renderShop);

router.get("/add-product", userAuth, adminAuth, renderAddProduct);

router.post("/add-product", userAuth, adminAuth, addProduct);

router.get("/product", renderSingleProduct);

router.get("/cart", userAuth, renderCart);

router.post("/cart", userAuth, addToCart);

router.post("/remove-from-cart", userAuth, removeFromCart);

router.post("/orders", userAuth, addOrder);

router.get("/orders", userAuth, renderOrders);

export default router;
