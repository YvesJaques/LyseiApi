import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute(state: string, city: string): Promise<Post[]> {
    const posts = await this.postsRepository.listPostsByStateAndCity(
      state,
      city,
    );

    return posts;
  }
}

export { ListPostsUseCase };
