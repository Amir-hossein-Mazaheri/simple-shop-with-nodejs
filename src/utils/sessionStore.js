import MongoStore from "connect-mongo";

import { MONGO_URI } from "./db.js";

export const createSessionStore = () => {
  return MongoStore.create({
    mongoUrl: MONGO_URI,
    collectionName: "sessions",
  });
};
