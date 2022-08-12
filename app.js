import express from "express";
import bodyParser from "body-parser";
import csrf from "csurf";
import flash from "connect-flash";

import { handle404 } from "./src/controllers/error.js";
import adminRouter from "./src/routes/admin.js";
import shopRouter from "./src/routes/shop.js";
import userRouter from "./src/routes/user.js";
import initServer from "./src/utils/initServer.js";
import {
  setIsLoggedIn,
  setLocals,
  setSession,
  setUser,
} from "./src/middlewares/index.js";

const app = express();
const csrfProtection = csrf();

// sets template engine to EJS and views folder
app.set("view engine", "ejs");
app.set("views", "./src/views");

// for more security
app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(setSession);
app.use(csrfProtection);
app.use(flash());

app.use(setLocals);

app.use(express.static("public"));

app.use(setIsLoggedIn);

app.use(setUser);

app.use("/admin", adminRouter);

app.use("/shop", shopRouter);

app.use("/user", userRouter);

app.use(handle404);

initServer(app);
