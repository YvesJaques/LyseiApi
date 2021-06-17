import { IPostsImagesRepository } from "@modules/posts/repositories/IPostsImagesRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  post_id: string;
  images_name: string[];
}

@injectable()
class UploadPostImagesUseCase {
  constructor(
    @inject("PostsImagesRepository")
    private postsImagesRepository: IPostsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ post_id, images_name }: IRequest): Promise<void> {
    const previousImages = await this.postsImagesRepository.findByPostId(
      post_id,
    );

    if (previousImages) {
      await this.postsImagesRepository.deleteByPostId(post_id);
      previousImages.forEach(async image => {
        await deleteFile(`./tmp/posts/${image.image_name}`);
      });
    }

    images_name.map(async image => {
      await this.postsImagesRepository.create(post_id, image);
      await this.storageProvider.save(image, "posts");
    });
  }
}

export { UploadPostImagesUseCase };
