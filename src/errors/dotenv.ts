import { Request, Response, NextFunction } from "express";

export class DotEnvError extends Error {
  constructor() {
    super("Entity not found in dotenv");
  }
}

export const dotenvHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof DotEnvError) {
    res.status(404);
    res.json({
      error: "DotEnvError",
      message: "Entity not found in dotenv",
    });
  } else {
    next(err);
  }
};
