import path from "path";
import multer from "multer";
import sharp from "sharp";
import { RequestHandler } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

const IMAGE_WIDTH = 512;
const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const storage = () =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, `./public/uploads/images/full`),
    filename: (req, file, cb) => {
      cb(null, `${req.userId}.${Date.now()}${path.extname(file.originalname)}`);
    },
  });

export const upload: RequestHandler = multer({
  storage: storage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return new BadRequestError("InvalidImageType").throw();
    }

    cb(null, true);
  },
}).single("image");

export const modifyImage: RequestHandler = async (req, res, next) => {
  if (!req.file) return new NotFoundError("Image");
  await sharp(req.file.path)
    .resize({ height: IMAGE_WIDTH, width: IMAGE_WIDTH, position: "center" })
    .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
    .toFile(`./public/uploads/images/small/${req.file.filename}`);
  req.body.image = req.file.filename;

  next();
};
