import session from "express-session";
import { createSessionStore } from "../utils/sessionStore.js";

export const setSession = session({
  secret: "This is So cool MY NiGga",
  resave: false,
  saveUninitialized: false,
  store: createSessionStore(),
});