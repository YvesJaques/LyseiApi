import { PostConclusionHistory } from "@modules/posts/infra/typeorm/entities/PostConclusionHistory";

import { IPostConclusionHistoryRepository } from "../IPostConclusionHistory";

class PostConclusionHistoryRepositoryInMemory
  implements IPostConclusionHistoryRepository
{
  postConclusionHistory: PostConclusionHistory[] = [];

  async create(
    user_id: string,
    post_id: string,
    status: boolean,
  ): Promise<boolean> {
    const register = new PostConclusionHistory();

    Object.assign(register, {
      user_id,
      post_id,
      status,
    });

    this.postConclusionHistory.push(register);

    return status;
  }
}

export { PostConclusionHistoryRepositoryInMemory };
