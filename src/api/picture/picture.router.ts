import express from "express";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import { uploadPicture, uploadPictureFromUrl } from "./picture.controller";
import { upload } from "../../utils/upload-middleware";

const router = express.Router();
router.post("/upload-picture", upload.single("picture"), uploadPicture);
router.post("/upload-url-picture", uploadPictureFromUrl);

export default router;
