import { Request, Response } from "express";
import { container } from "tsyringe";

import { LikePostUseCase } from "./LikePostUseCase";

class LikePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { post_id } = request.params;

    const likePostUseCase = container.resolve(LikePostUseCase);

    const postLikes = await likePostUseCase.execute({ user_id, post_id });

    return response.json(postLikes);
  }
}

export { LikePostController };
