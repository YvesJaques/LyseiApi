import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserFavoritePostsUseCase } from "./ListUserFavoritePostsUseCase";

class ListUserFavoritePostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listUserFavoritePostsUseCase = container.resolve(
      ListUserFavoritePostsUseCase,
    );

    const posts = await listUserFavoritePostsUseCase.execute(user_id);

    return response.json(posts);
  }
}

export { ListUserFavoritePostsController };
