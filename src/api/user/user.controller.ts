import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request";
import { UnauthorizedError } from "../../errors/unoutorized-error";
import { UserModel } from "./user.model";
import userService from "./user.service";

export const me = async (req: TypedRequest, res: Response, next: NextFunction) => {
  res.json(req.user);
};

export const showAllUsers = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    if (!user) throw new UnauthorizedError();
    const users = await userService.showAllUsers(user.id!);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const userToFind: string = req.params.id;
    const result = await userService.getUserById(user.id!, userToFind);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const { newPassword } = req.body;
    const result = await userService.resetPassword(user.id!, newPassword);
    res.json({ message: "Password updated" });
  } catch (err) {
    next(err);
  }
};

export const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const oldPassword = req.params.oldPassword;
    const result = await userService.validatePassword(user.id!, oldPassword);
    res.json({ message: result ? "Password is valid" : "Password is invalid" });
  } catch (err) {
    console.error(err); // Log the error
    next(err); // Forward error to the error-handling middleware
  }
};

export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    const url: string = await userService.requestPasswordReset(username);
    res.status(200).json({
      message: "Controlla la tua email per le istruzioni di reset della password.",
      url,
    });
  } catch (error) {
    next(error);
  }
};

export const validateResetToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, userId } = req.query;
    const isValid = await userService.validatePasswordResetToken(token as string, userId as string);
    if (!isValid) return res.status(400).json({ message: "Token non valido o scaduto." });
    res.status(200).json({ message: "Token valido." });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordFromEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, userId } = req.query;
    const { newPassword } = req.body;
    const isValid = await userService.validatePasswordResetToken(token as string, userId as string);
    if (!isValid) return res.status(400).json({ message: "Token non valido o scaduto." });
    await userService.resetPasswordFromToken(userId as string, token as string, newPassword);
    res.status(200).json({ message: "Password reimpostata con successo." });
  } catch (error) {
    next(error);
  }
};

export const picture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const userExist = await UserModel.findById(user.id); // Trova l'utente nel database
    if (!userExist) throw new UnauthorizedError();

    // Percorso assoluto per l'immagine dell'utente
    const imagePath = path.posix.join(__dirname.replace(/\\/g, "/"), "../..", `${userExist.picture}`);

    // Verifica se l'immagine esiste
    if (fs.existsSync(imagePath)) {
      // Restituisci l'immagine come file
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ message: "Immagine non trovata", path: imagePath });
    }
  } catch (err: any) {
    res.status(500).json({ error: "Internal Server Error: " + err.message });
  }
};
