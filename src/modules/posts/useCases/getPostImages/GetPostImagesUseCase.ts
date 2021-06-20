import { IPostsImagesRepository } from "@modules/posts/repositories/IPostsImagesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetPostImagesUseCase {
  constructor(
    @inject("PostsImagesRepository")
    private postsImagesRepository: IPostsImagesRepository,
  ) {}

  async execute(post_id: string): Promise<string[]> {
    const images = await this.postsImagesRepository.findByPostId(post_id);

    return images;
  }
}

export { GetPostImagesUseCase };
