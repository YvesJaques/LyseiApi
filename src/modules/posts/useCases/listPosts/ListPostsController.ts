import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPostsUseCase } from "./ListPostsUseCase";

class ListPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { state, city } = request.body;

    const listPostsUseCase = container.resolve(ListPostsUseCase);

    const posts = await listPostsUseCase.execute(state, city);

    return response.json(posts);
  }
}

export { ListPostsController };
