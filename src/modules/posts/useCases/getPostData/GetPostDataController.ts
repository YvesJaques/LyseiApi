import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetPostDataUseCase } from "./GetPostDataUseCase";

class GetPostDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const getPostDataUseCase = container.resolve(GetPostDataUseCase);

    const post = await getPostDataUseCase.execute(post_id);

    return response.json(post);
  }
}

export { GetPostDataController };
