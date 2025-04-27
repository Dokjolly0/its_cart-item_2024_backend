import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found";
import { validationErrorHandler } from "./validation";
import { dotenvHandler } from "./dotenv";

export const errorHandlers = [
  notFoundHandler,
  validationErrorHandler,
  genericHandler,
  dotenvHandler,
];
