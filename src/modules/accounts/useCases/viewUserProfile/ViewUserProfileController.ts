import { Request, Response } from "express";
import { container } from "tsyringe";

import { ViewUserProfileUseCase } from "./ViewUserProfileUseCase";

class ViewUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const viewUserProfileUseCase = container.resolve(ViewUserProfileUseCase);

    const user = await viewUserProfileUseCase.execute(user_id);
    return response.json(user);
  }
}

export { ViewUserProfileController };
