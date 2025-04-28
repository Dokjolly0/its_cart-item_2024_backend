import { Request, Response, NextFunction } from "express";

export class EmptyStringError extends Error {
  constructor() {
    super('Entity must not be empty');
  }
}

export const emptyStringHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof EmptyStringError) {
    res.status(404);
    res.json({
      error: 'EmptyStringError',
      message: 'Entity must not be empty'
    });
  } else {
    next(err);
  }
}