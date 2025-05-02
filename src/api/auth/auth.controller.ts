import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import userService from "../user/user.service";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import { UserExistsError } from "../../errors/user-exists";
import passport, { use } from "passport";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { DotEnvError } from "../../errors/dotenv";
import { User } from "../user/user.entity";
import { EmptyStringError } from "../../errors/empty-string";
import { verifyEmptyField } from "../../utils/verify-empty-field";
import { userToFieldsInput } from "../user/user.utils";
import { getIP } from "../../utils/fetch-ip";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new DotEnvError();
const EXPIRED_IN_JWT = process.env.EXPIRED_IN_JWT;
if (!EXPIRED_IN_JWT) throw new DotEnvError();
const IS_REQUIRED_EMAIL_VERIFICATION =
  process.env.IS_REQUIRED_EMAIL_VERIFICATION;
if (!IS_REQUIRED_EMAIL_VERIFICATION) throw new DotEnvError();

export const login = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authMiddleware = passport.authenticate("local", (err, user, info) => {
      if (err) {
        next(err);
        return;
      }

      if (!user) {
        res.status(401);
        res.json({
          error: "LoginError",
          message: info.message,
        });
        return;
      }

      if (!user.isActive) {
        res.status(400).json({
          error: "LoginError",
          message:
            "Account non attivato. Controlla la tua casella mail per confermare la registrazione.",
        });
        return;
      }

      const token = jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRED_IN_JWT });

      res.status(200);
      res.json({
        user,
        token,
      });
    });

    authMiddleware(req, res, next);
  } catch (e) {
    next(e);
  }
};

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userBody = omit(req.body, "username", "password");
    const credentials = pick(req.body, "username", "password");
    const ip: string | undefined = await getIP();

    const isActiveUser: boolean =
      IS_REQUIRED_EMAIL_VERIFICATION === "true" ? false : true;

    let userData: User = {
      ...userBody,
      lastAllowedIp: ip,
      isActive: isActiveUser,
      role: userBody.role ?? "user",
      createdAt: new Date(),
    };
    verifyEmptyField(userToFieldsInput(userData), EmptyStringError);
    const newUser = await userService.add(userData, credentials);

    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400);
      res.send(err.message);
    } else if (err instanceof EmptyStringError) {
      res.status(400).json({
        error: err.name,
        message: err.message,
        emptyFields: err.fields,
      });
    } else {
      next(err);
    }
  }
};
