import { connectToDB } from "./db.js";

let COUNT_OF_RETRIES = 3;

const initServer = (app) => {
  connectToDB()
    .then(() => app.listen(3000))
    .catch((err) => {
      if (COUNT_OF_RETRIES === 1) {
        return;
      }
      COUNT_OF_RETRIES--;
      initServer(app);
      console.log(err);
    });
};

export default initServer;
