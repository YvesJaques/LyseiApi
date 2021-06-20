import { IPostLikesRepository } from "@modules/posts/repositories/IPostLikesRepository";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  post_id: string;
}

@injectable()
class LikePostUseCase {
  constructor(
    @inject("PostLikesRepository")
    private postLikesRepository: IPostLikesRepository,
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ user_id, post_id }: IRequest): Promise<number> {
    const likeAlreadyExists =
      await this.postLikesRepository.findByUserIdAndPostId(user_id, post_id);

    if (likeAlreadyExists) {
      this.postLikesRepository.deleteByUserIdAndPostId(user_id, post_id);
      const likes = await this.postsRepository.disLikeById(post_id);
      return likes;
    }
    this.postLikesRepository.create(user_id, post_id);
    const likes = await this.postsRepository.likeById(post_id);
    return likes;
  }
}

export { LikePostUseCase };
