import express from "express";

import {
  addUser,
  logout,
  renderSignin,
  renderSignUp,
  signIn,
} from "../controllers/user.js";

const router = express.Router();

router.get("/signup", renderSignUp);

router.post("/signup", addUser);

router.get("/signin", renderSignin);

router.post("/signin", signIn);

router.post("/logout", logout);

export default router;
