import { Request, Response } from "express";
import { container } from "tsyringe";

import { FavoritePostUseCase } from "./FavoritePostUseCase";

class FavoritePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { post_id } = request.params;

    const favoritePostUseCase = container.resolve(FavoritePostUseCase);

    const postFavorites = await favoritePostUseCase.execute({
      user_id,
      post_id,
    });

    return response.json(postFavorites);
  }
}

export { FavoritePostController };
