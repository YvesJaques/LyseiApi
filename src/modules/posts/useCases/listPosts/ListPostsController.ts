import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPostsUseCase } from "./ListPostsUseCase";

class ListPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { state, city } = request.body;
    const { id: user_id } = request.user;

    const listPostsUseCase = container.resolve(ListPostsUseCase);

    const posts = await listPostsUseCase.execute(user_id, state, city);

    return response.json(posts);
  }
}

export { ListPostsController };
