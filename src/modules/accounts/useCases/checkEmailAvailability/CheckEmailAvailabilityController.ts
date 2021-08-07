import { Request, Response } from "express";
import { container } from "tsyringe";

import { CheckEmailAvailabilityUseCase } from "./CheckEmailAvailabilityUseCase";

class CheckEmailAvailabilityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const checkEmailAvailabilityUseCase = container.resolve(
      CheckEmailAvailabilityUseCase,
    );

    await checkEmailAvailabilityUseCase.execute(email);

    return response.status(200).json({ message: "Email available!" });
  }
}

export { CheckEmailAvailabilityController };
