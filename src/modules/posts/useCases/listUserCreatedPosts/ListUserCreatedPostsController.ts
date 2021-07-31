import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserCreatedPostsUseCase } from "./ListUserCreatedPostsUseCase";

class ListUserCreatedPostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const listUserCreatedPostsUseCase = container.resolve(
      ListUserCreatedPostsUseCase,
    );

    const posts = await listUserCreatedPostsUseCase.execute(user_id);

    return response.json(posts);
  }
}

export { ListUserCreatedPostsController };
