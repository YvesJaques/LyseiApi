import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetPostImagesUseCase } from "./GetPostImagesUseCase";

class GetPostImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const getPostImagesUseCase = container.resolve(GetPostImagesUseCase);

    const images = await getPostImagesUseCase.execute(post_id);

    return response.json(images);
  }
}

export { GetPostImagesController };
