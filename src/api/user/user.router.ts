import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import { me } from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, me);
// router.get("/users", showAllUsers);
// router.get("/user/:fullName", findUserByFullName);
// router.post("/reset-password", resetPassword); // Reimposta la password
// router.get("/validate-password/:oldPassword", validatePassword);
// router.get("/picture", picture);
// router.get("/:id", getUserById);

export default router;
