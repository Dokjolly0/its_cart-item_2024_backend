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
const PORT = process.env.PORT;
if (!PORT) throw new DotEnvError();

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
