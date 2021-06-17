import { CreatePostController } from "@modules/posts/useCases/createPost/CreatePostController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const postsRoutes = Router();

const createPostController = new CreatePostController();

postsRoutes.post("/", ensureAuthenticated, createPostController.handle);

export { postsRoutes };
