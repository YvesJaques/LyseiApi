import uploadConfig from "@config/upload";
import { ConcludePostController } from "@modules/posts/useCases/concludePost/ConcludePostController";
import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { LikePostController } from "@modules/posts/useCases/likePost/LikePostController";
import { ListPostsController } from "@modules/posts/useCases/listPosts/ListPostsController";
import { UploadPostImagesController } from "@modules/posts/useCases/uploadPostImages/UploadPostImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const postsRoutes = Router();

const createPostController = new CreatePostController();
const uploadPostImagesController = new UploadPostImagesController();
const likePostController = new LikePostController();
const listPostsController = new ListPostsController();
const concludePostController = new ConcludePostController();

postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

const upload = multer(uploadConfig);

postsRoutes.post("/list", ensureAuthenticated, listPostsController.handle);

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

postsRoutes.patch(
  "/conclude/:post_id",
  ensureAuthenticated,
  concludePostController.handle,
);

export { postsRoutes };
