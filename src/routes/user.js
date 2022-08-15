import express from "express";

import {
  signUp,
  logout,
  renderSignin,
  renderSignUp,
  signIn,
} from "../controllers/user.js";
import { userAuth } from "../middlewares/index.js";
import { signInValidator, signUpValidator } from "../validators/user.js";

const router = express.Router();

router.get("/signup", renderSignUp);

router.post("/signup", signUpValidator, signUp);

router.get("/signin", renderSignin);

router.post("/signin", signInValidator, signIn);

router.post("/logout", userAuth, logout);

export default router;
