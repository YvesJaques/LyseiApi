import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class GetPostDataUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute(post_id: string): Promise<Post> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) throw new AppError("Post doesn't exist");

    return post;
  }
}

export { GetPostDataUseCase };
