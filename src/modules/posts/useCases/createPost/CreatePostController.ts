import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePostUseCase } from "./CreatePostUseCase";

class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      state,
      city,
      district,
      street,
      number,
      picture,
      video,
      latitude,
      longitude,
    } = request.body;

    const { id: author_id } = request.user;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const post = await createPostUseCase.execute({
      title,
      description,
      author_id,
      state,
      city,
      district,
      street,
      number,
      picture,
      video,
      latitude,
      longitude,
    });

    return response.status(201).json(post);
  }
}

export { CreatePostController };
