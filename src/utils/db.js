import mongoose from "mongoose";

const credentials = {
  username: "zeenzeninfo",
  password: "20fnWXwTWEAt8FmZ",
  database: "myshop",
};

export const MONGO_URI = `mongodb+srv://${credentials.username}:${credentials.password}@cluster0.hq9nlyk.mongodb.net/${credentials.database}?retryWrites=true&w=majority`;

export const connectToDB = () => {
  return mongoose.connect(MONGO_URI);
};
