import Router from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { postsRoutes } from "./posts.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/posts", postsRoutes);
router.use(authenticateRoutes);

export { router };
