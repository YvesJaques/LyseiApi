import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadPostImagesUseCase } from "./UploadPostImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadPostImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadPostImagesUseCase = container.resolve(UploadPostImagesUseCase);

    const images_name = images.map(file => file.filename);

    await uploadPostImagesUseCase.execute({
      post_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadPostImagesController };
