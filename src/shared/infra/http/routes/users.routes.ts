import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserProfileController } from "@modules/accounts/useCases/updateUserProfile/UpdateUserProfileController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserProfileUseCase = new UpdateUserProfileController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.patch("/", ensureAuthenticated, updateUserProfileUseCase.handle);

export { usersRoutes };
