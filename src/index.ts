import "reflect-metadata";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";
import { DotEnvError } from "./errors/dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new DotEnvError();
const DB_NAME = process.env.DB_NAME;
if (!DB_NAME) throw new DotEnvError();

mongoose.set("debug", true);
mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then((_) => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
