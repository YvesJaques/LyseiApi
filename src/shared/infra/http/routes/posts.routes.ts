import uploadConfig from "@config/upload";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { UploadPostImagesController } from "@modules/posts/useCases/uploadPostImages/UploadPostImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const uploadPostImagesController = new UploadPostImagesController();

postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

const upload = multer(uploadConfig);

postsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  upload.array("images"),
  uploadPostImagesController.handle,
);

export { postsRoutes };
