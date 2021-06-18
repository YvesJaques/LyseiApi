import uploadConfig from "@config/upload";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { LikePostController } from "@modules/posts/useCases/likePost/LikePostController";
import { UploadPostImagesController } from "@modules/posts/useCases/uploadPostImages/UploadPostImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const uploadPostImagesController = new UploadPostImagesController();
const likePostController = new LikePostController();

postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

const upload = multer(uploadConfig);

postsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  upload.array("images"),
  uploadPostImagesController.handle,
);

postsRoutes.patch(
  "/like/:post_id",
  ensureAuthenticated,
  likePostController.handle,
);

export { postsRoutes };
