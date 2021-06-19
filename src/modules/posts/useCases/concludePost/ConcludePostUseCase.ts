import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IPostConclusionHistoryRepository } from "@modules/posts/repositories/IPostConclusionHistory";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  post_id: string;
}

@injectable()
class ConcludePostUseCase {
  constructor(
    @inject("PostConclusionHistoryRepository")
    private postConclusionHistoryRepository: IPostConclusionHistoryRepository,
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, post_id }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(user_id);

    if (!user.isPolitician) throw new AppError("User is not a politician!");

    const alreadyConcluded = await (
      await this.postsRepository.findById(post_id)
    ).solved;

    if (alreadyConcluded) {
      this.postConclusionHistoryRepository.create(user_id, post_id, false);
      this.postsRepository.updateSolved(post_id, false);
      return false;
    }
    this.postConclusionHistoryRepository.create(user_id, post_id, true);
    this.postsRepository.updateSolved(post_id, true);
    return true;
  }
}

export { ConcludePostUseCase };
