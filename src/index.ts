import "dotenv/config";
import "reflect-metadata";
import mongoose from "mongoose";

import app from "./app";
import { requireEnvVars } from "./utils/dotenv";

const [MONGO_URI, DB_NAME, PORT] = requireEnvVars([
  "MONGO_URI",
  "DB_NAME",
  "PORT",
]);

mongoose.set("debug", true);
mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then((_) => {
    PORT;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
