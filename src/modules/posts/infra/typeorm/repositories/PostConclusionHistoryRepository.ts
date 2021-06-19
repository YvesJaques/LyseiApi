import { IPostConclusionHistoryRepository } from "@modules/posts/repositories/IPostConclusionHistory";
import { getRepository, Repository } from "typeorm";

import { PostConclusionHistory } from "../entities/PostConclusionHistory";

class PostConclusionHistoryRepository
  implements IPostConclusionHistoryRepository
{
  private repository: Repository<PostConclusionHistory>;

  constructor() {
    this.repository = getRepository(PostConclusionHistory);
  }
  async create(
    user_id: string,
    post_id: string,
    status: boolean,
  ): Promise<boolean> {
    const postConclusion = this.repository.create({
      user_id,
      post_id,
      status,
    });

    await this.repository.save(postConclusion);

    return status;
  }
}

export { PostConclusionHistoryRepository };
