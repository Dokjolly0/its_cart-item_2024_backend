import express from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import pictureRouter from "./picture/picture.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/pictures", pictureRouter);
router.use(authRouter);

export default router;
