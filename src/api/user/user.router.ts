import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import {
  findUserByFullName,
  getUserById,
  me,
  resetPassword,
  showAllUsers,
  validatePassword,
} from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, me);
router.get("/users", isAuthenticated, showAllUsers);
router.get("/find/:id", isAuthenticated, getUserById);
router.get("/find/:fullName", findUserByFullName);
router.post("/reset-password", resetPassword); // Reimposta la password
router.get("/validate-password/:oldPassword", validatePassword);
// router.get("/picture", picture);

export default router;
