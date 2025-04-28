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

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new DotEnvError();
const EXPIRED_IN_JWT = process.env.EXPIRED_IN_JWT;
if (!EXPIRED_IN_JWT) throw new DotEnvError();

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

    if (!userBody.firstName || !userBody.lastName) {
      const emptyFields: string[] = [];
      if (!userBody.firstName) emptyFields.push("firstName");
      if (!userBody.lastName) emptyFields.push("lastName");
      throw new EmptyStringError(emptyFields);
    }

    const userData: User = {
      firstName: userBody.firstName,
      lastName: userBody.lastName,
      picture: userBody.picture ?? null,
      birthDate: userBody.birthDate ?? null,
      gender: userBody.gender ?? null,
      addressInfo: userBody.addressInfo ?? {
        address: null,
        city: null,
        state: null,
        country: null,
        zipCode: null,
        location: {
          latitude: null,
          longitude: null,
        },
      },

      preferredLanguage: userBody.preferredLanguage ?? null,
      timeZone: userBody.timeZone ?? null,

      isActive: false,
      role: userBody.role ?? "user",
      status: null,

      createdAt: new Date(),
      updatedAt: null,
      lastLogin: null,

      resetPasswordToken: null,
      resetPasswordExpires: null,
    };

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
