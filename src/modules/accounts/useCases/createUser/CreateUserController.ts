import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      password,
      email,
      state,
      city,
      isPolitician,
      occupation,
    } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      cpf,
      password,
      email,
      state,
      city,
      isPolitician,
      occupation,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
