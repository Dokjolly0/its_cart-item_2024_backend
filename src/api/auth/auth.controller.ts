import "dotenv/config";
import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request";
import userService from "../user/user.service";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import passport, { use } from "passport";
import * as jwt from "jsonwebtoken";
import { requireEnvVars } from "../../utils/dotenv";
import { User } from "../user/user.entity";
import { getIP } from "../../utils/fetch-ip";
import { UserModel } from "../user/user.model";
import { emailService } from "../../utils/services/email.service";

const [JWT_SECRET, EXPIRED_IN_JWT] = requireEnvVars([
  "JWT_SECRET",
  "EXPIRED_IN_JWT",
]);

export const login = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authMiddleware = passport.authenticate(
      "local",
      async (err, user, info) => {
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

        const userTmp = await UserModel.findById(user.id);
        const ip: string | undefined = await getIP();
        if (userTmp) {
          if (ip && userTmp.allowedIps && !userTmp.allowedIps.includes(ip)) {
            userTmp.allowedIps.push(ip);
            await userTmp.save();
          }
          userTmp.lastLogin = new Date();
          userTmp.lastUpdateAt = new Date();
          userTmp.lastAllowedIp = ip;
        }

        const token = jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRED_IN_JWT });

        res.status(200);
        res.json({
          user,
          token,
        });
      }
    );

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

    const newUser = await userService.add(userBody, credentials);
    let message = "User register succesfully.";

    if (!newUser.isActive) {
      emailService.sendConfirmationEmail(
        credentials.username,
        newUser.id!,
        newUser.confirmationToken!
      );
      message =
        "User add succesfully, please check the email and confirm the email verification.";
    }

    res.status(201).json({ newUser, message });
  } catch (err: any) {
    next(err);
  }
};
