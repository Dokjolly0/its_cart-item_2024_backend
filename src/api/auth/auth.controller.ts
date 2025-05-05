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
    const authMiddleware = passport.authenticate("local", async (err, user, info) => {
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

      /*
      TypeError: user.save is not a function
      at C:\Projects\its_cart-item_2024_backend\src\api\auth\auth.controller.ts:60:20
      at Generator.next (<anonymous>)
      at fulfilled (C:\Projects\its_cart-item_2024_backend\src\api\auth\auth.controller.ts:28:58)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      */
      // Breack
      // const ip: string | undefined = await getIP();
      // if (ip && user.allowedIps && !user.allowedIps.includes(ip)) {
      //   user.allowedIps.push(ip);
      //   await user.save();
      // } else if (ip && !user.allowedIps) {
      //   user.allowedIps = [ip];
      //   await user.save();
      // }

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
    const allowedIps: string[] = [];
    if (ip) allowedIps.push(ip);
    const isActiveUser: boolean =
      IS_REQUIRED_EMAIL_VERIFICATION === "true" ? false : true;

    const userData: User = {
      ...userBody,
      lastAllowedIp: ip,
      allowedIps: allowedIps,
      isActive: isActiveUser,
      role: userBody.role ?? "user",
      createdAt: new Date(),
    };
    verifyEmptyField(userToFieldsInput(userData), EmptyStringError);
    const newUser = await userService.add(userData, credentials);

    res.status(201).json(newUser);
  } catch (err: any) {
    switch (err.constructor) {
      case UserExistsError:
        res.status(400).send(err.message);
      case EmptyStringError:
        res.status(400).json({
          error: err.name,
          message: err.message,
          emptyFields: err.fields,
        });
      default:
        next(err);
    }
  }
};
