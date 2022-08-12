import express from "express";

import {
  deleteProduct,
  editProduct,
  renderAdminProducts,
  renderEditProduct,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/products", renderAdminProducts);

router.get("/edit-product", renderEditProduct);

router.post("/edit-product", editProduct);

router.post("/delete-product", deleteProduct);

export default router;
