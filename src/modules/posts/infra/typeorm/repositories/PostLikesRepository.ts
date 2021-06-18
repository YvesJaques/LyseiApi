import { IPostLikesRepository } from "@modules/posts/repositories/IPostLikesRepository";
import { getRepository, Repository } from "typeorm";

import { PostLikes } from "../entities/PostLikes";

class PostLikesRepository implements IPostLikesRepository {
  private repository: Repository<PostLikes>;

  constructor() {
    this.repository = getRepository(PostLikes);
  }

  async create(user_id: string, post_id: string): Promise<PostLikes> {
    const postLike = this.repository.create({
      user_id,
      post_id,
    });

    await this.repository.save(postLike);

    return postLike;
  }

  async findByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<boolean> {
    const like = await this.repository.findOne({ user_id, post_id });

    if (like) return true;
    return false;
  }

  async deleteByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<void> {
    await this.repository.delete({ user_id, post_id });
  }
}

export { PostLikesRepository };
