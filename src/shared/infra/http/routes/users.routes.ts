import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { UpdateUserProfileController } from "@modules/accounts/useCases/updateUserProfile/UpdateUserProfileController";
import { ViewUserProfileController } from "@modules/accounts/useCases/viewUserProfile/ViewUserProfileController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserProfileUseCase = new UpdateUserProfileController();
const resetUserPasswordController = new ResetUserPasswordController();
const updateUserAvatarController = new UpdateUserAvatarController();
const viewUserProfileController = new ViewUserProfileController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.get(
  "/:user_id",
  ensureAuthenticated,
  viewUserProfileController.handle,
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle,
);

usersRoutes.patch("/", ensureAuthenticated, updateUserProfileUseCase.handle);

usersRoutes.patch(
  "/resetPassword",
  ensureAuthenticated,
  resetUserPasswordController.handle,
);

export { usersRoutes };
