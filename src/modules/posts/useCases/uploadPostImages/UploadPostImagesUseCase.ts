import { IPostsImagesRepository } from "@modules/posts/repositories/IPostsImagesRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
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
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ user_id, post_id, images_name }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(post_id);

    if (post.author_id !== user_id)
      throw new AppError("User is not the author of the post!");

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
