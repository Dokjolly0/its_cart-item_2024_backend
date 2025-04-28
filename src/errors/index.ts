import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found";
import { validationErrorHandler } from "./validation";
import { dotenvHandler } from "./dotenv";
import { emptyStringHandler } from "./empty-string";
import { invalidArgumentTypeHandler } from "./invalid-argument-type";

export const errorHandlers = [
  notFoundHandler,
  validationErrorHandler,
  genericHandler,
  dotenvHandler,
  emptyStringHandler,
  invalidArgumentTypeHandler,
];
