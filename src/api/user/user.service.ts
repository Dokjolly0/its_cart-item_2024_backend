import { UserExistsError } from "../../errors/user-exists";
import { UnauthorizedError } from "../../errors/unoutorized-error";
import { NotFoundError } from "../../errors/not-found";
import { UserIdentityModel } from "../../utils/auth/local/user-identity.model";
import { User } from "./user.entity";
import { UserModel } from "./user.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import {
  validateNameField,
  verifyEmptyField,
} from "../../utils/verify-empty-field";
import { EmptyStringError } from "../../errors/empty-string";
import { userToFieldsInput } from "./user.utils";
import { getIP } from "../../utils/fetch-ip";
import { notThrowDotEnvError, requireEnvVars } from "../../utils/dotenv";

let ADMIN_USER_NAME: string | undefined = requireEnvVars(
  "ADMIN_USER_NAME",
  notThrowDotEnvError
);
if (!ADMIN_USER_NAME) ADMIN_USER_NAME = "admin";

export class UserService {
  async add(
    user: User,
    credentials: { username: string; password: string }
  ): Promise<User> {
    verifyEmptyField(userToFieldsInput(user), EmptyStringError);
    const existingIdentity = await UserIdentityModel.findOne({
      "credentials.username": credentials.username,
    });

    if (existingIdentity) throw new UserExistsError();
    if (user.firstName || user.lastName) {
      validateNameField(user.firstName, "first name");
      validateNameField(user.lastName, "last name");
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const confirmationToken = uuidv4();
    const ip: string | undefined = await getIP();
    const allowedIps: string[] = [];
    if (ip) allowedIps.push(ip);

    const newUser = await UserModel.create({
      ...user,
      confirmationToken,
      lastAllowedIp: ip,
      allowedIps,
      role: user.role ?? "user",
    });

    await UserIdentityModel.create({
      provider: "local",
      user: newUser.id,
      credentials: {
        username: credentials.username,
        hashedPassword,
      },
    });

    return newUser;
  }

  async showAllUsers(
    userId: string,
    isAdmin: boolean = false
  ): Promise<User[]> {
    const isAuthenticated = await UserModel.findById(userId);
    isAdmin = isAuthenticated?.role === ADMIN_USER_NAME ? true : false;
    if (!isAuthenticated || !isAdmin) throw new UnauthorizedError();
    const users = await UserModel.find();

    return users;
  }

  async getUserById(userId: string, userIdToFind: string) {
    const isAuthenticated = await UserModel.findById(userId);
    if (!isAuthenticated) throw new UnauthorizedError();

    const user = await UserModel.findById(userIdToFind);
    if (!user) throw new NotFoundError();

    return user;
  }

  async findUserByFullName(
    userId: string,
    firstName: string,
    lastName: string
  ) {
    const isAuthenticated = await UserModel.findById(userId);
    if (!isAuthenticated) throw new UnauthorizedError();

    const user = await UserModel.findOne({ firstName, lastName });
    if (!user) new NotFoundError();

    return user;
  }

  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user) throw new UnauthorizedError();
    const identity = await UserIdentityModel.findOne({
      user: userId,
      provider: "local",
    });
    if (!identity) throw new NotFoundError();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    identity.credentials.hashedPassword = hashedPassword;
    await identity.save();
  }

  async validatePassword(
    userId: string,
    oldPassword: string
  ): Promise<boolean> {
    const user = await UserModel.findById(userId);
    if (!user) new UnauthorizedError();
    const identity = await UserIdentityModel.findOne({
      user: userId,
      provider: "local",
    });
    if (!identity) throw new NotFoundError();
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      identity.credentials.hashedPassword
    );
    return passwordMatch;
  }

  // async verifyConfirmationCode(userId: string, confirmationCode: string) {
  //   const user = await UserModel.findById(userId);
  //   if (user && user.confirmationCode === confirmationCode) {
  //     user.isActive = true;
  //     user.confirmationCode = undefined;
  //     await user.save();
  //     return true;
  //   }
  //   return false;
  // }

  // async requestPasswordReset(username: string): Promise<void> {
  //   const user = await UserIdentityModel.findOne({
  //     "credentials.username": username,
  //   });
  //   if (!user) throw new NotFoundError();

  //   const token = uuidv4(); // Genera un token univoco
  //   const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 ora

  //   // Salva il token e la scadenza nel database
  //   user.resetPasswordToken = token;
  //   user.resetPasswordExpires = resetExpires;
  //   await user.save();
  //   const htmlContent = getHtmlRequestChangePassword(token, user.id);
  //   await emailService.sendEmail(
  //     username,
  //     "Reimposta la tua password",
  //     htmlContent
  //   );
  // }

  // async validatePasswordResetToken(
  //   token: string,
  //   userId: string
  // ): Promise<boolean> {
  //   const user = await UserIdentityModel.findById(userId);
  //   if (!user) return false;
  //   const isTokenValid = user.resetPasswordToken === token; // Controllo del token
  //   const isNotExpired =
  //     user.resetPasswordExpires !== null &&
  //     user.resetPasswordExpires! > new Date();
  //   // Restituisce true solo se il token è valido e non è scaduto
  //   return isTokenValid && isNotExpired;
  // }

  // async resetPasswordFromToken(
  //   userId: string,
  //   token: string,
  //   newPassword: string
  // ): Promise<void> {
  //   const user = await UserIdentityModel.findById(userId);
  //   if (!user || user.resetPasswordExpires! < new Date())
  //     throw new UnauthorizedError();
  //   const hashedPassword = await bcrypt.hash(newPassword, 10);
  //   user.resetPasswordToken = null;
  //   user.resetPasswordExpires = null;
  //   await UserIdentityModel.updateOne(
  //     { user: userId, provider: "local" },
  //     { "credentials.hashedPassword": hashedPassword }
  //   );
  //   await user.save();
  // }
}

export default new UserService();
