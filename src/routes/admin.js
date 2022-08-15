import express from "express";

import {
  deleteProduct,
  editProduct,
  renderAdminProducts,
  renderEditProduct,
} from "../controllers/admin.js";
import { adminAuth, userAuth } from "../middlewares/index.js";

const router = express.Router();

// adds Auth for all routes
router.use(userAuth, adminAuth);

router.get("/products", renderAdminProducts);

router.get("/edit-product", renderEditProduct);

router.post("/edit-product", editProduct);

router.post("/delete-product", deleteProduct);

export default router;
