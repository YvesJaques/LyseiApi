import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { password } = request.body;
    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase,
    );
    await resetUserPasswordUseCase.execute(id, password);

    return response.send();
  }
}

export { ResetUserPasswordController };
