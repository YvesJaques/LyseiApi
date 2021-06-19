import { Request, Response } from "express";
import { container } from "tsyringe";

import { ConcludePostUseCase } from "./ConcludePostUseCase";

class ConcludePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { post_id } = request.params;

    const concludePostUseCase = container.resolve(ConcludePostUseCase);

    const conclusion = await concludePostUseCase.execute({ user_id, post_id });

    return response.json(conclusion);
  }
}

export { ConcludePostController };
