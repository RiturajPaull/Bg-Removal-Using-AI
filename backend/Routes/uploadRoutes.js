import express from "express";
import upload from "../Middleware/multer.js";
import authUser from "../Middleware/auth.js";
import removeBgImage from "../Controllers/imageController.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/remove-bg",
  upload.single("image"),
  authUser,
  removeBgImage
);

export default uploadRouter;
