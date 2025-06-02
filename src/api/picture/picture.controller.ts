import axios from "axios";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../user/user.model";
import { File as MulterFile } from "multer";
import path from "path";

export const uploadPicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: "userId mancante" });

    const userExist = await UserModel.findById(userId);
    if (!userExist) return res.status(404).json({ message: "Utente non trovato" });

    const file = (req as Request & { file: MulterFile }).file;
    if (!file) return res.status(400).json({ message: "Nessun file caricato" });

    const relativePath = `data/pictures/${userId}/${file.filename}`;
    userExist.picture = relativePath;
    await userExist.save();

    res.status(200).json({ message: "Immagine caricata", path: relativePath });
  } catch (err) {
    next(err);
  }
};

export const uploadPictureFromUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, imageUrl } = req.body;
    if (!userId || !imageUrl) return res.status(400).json({ message: "Dati mancanti" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "Utente non trovato" });

    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const ext = path.extname(imageUrl.split("?")[0]) || ".jpg";
    const dir = path.join(__dirname, "../../../data/pictures", userId);
    const filePath = path.join(dir, "profile" + ext);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, response.data);

    const relativePath = `data/pictures/${userId}/profile${ext}`;
    user.picture = relativePath;
    await user.save();

    res.status(200).json({ message: "Immagine da URL salvata", path: relativePath });
  } catch (err) {
    next(err);
  }
};
