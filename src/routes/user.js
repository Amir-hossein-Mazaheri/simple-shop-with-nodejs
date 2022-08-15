import express from "express";

import {
  signUp,
  logout,
  renderSignin,
  renderSignUp,
  signIn,
} from "../controllers/user.js";
import { userAuth } from "../middlewares/index.js";

const router = express.Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUp);

router.get("/signin", renderSignin);

router.post("/signin", signIn);

router.post("/logout", userAuth, logout);

export default router;
