import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import { getUserById, me, showAllUsers } from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, me);
router.get("/users", isAuthenticated, showAllUsers);
router.get("/find/:id", isAuthenticated, getUserById);
// router.get("/user/:fullName", findUserByFullName);
// router.post("/reset-password", resetPassword); // Reimposta la password
// router.get("/validate-password/:oldPassword", validatePassword);
// router.get("/picture", picture);

export default router;
