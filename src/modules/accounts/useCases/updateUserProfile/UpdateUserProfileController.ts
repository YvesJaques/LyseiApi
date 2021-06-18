import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";

class UpdateUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, state, city, isPolitician, occupation } =
      request.body;
    const { id } = request.user;

    const updateUserUseCase = container.resolve(UpdateUserProfileUseCase);

    await updateUserUseCase.execute({
      id,
      name,
      cpf,
      email,
      state,
      city,
      isPolitician,
      occupation,
    });

    return response.status(201).send();
  }
}

export { UpdateUserProfileController };
