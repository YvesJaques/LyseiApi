import { IPostFavoritesRepository } from "@modules/posts/repositories/IPostFavoritesRepository";
import { getRepository, Repository } from "typeorm";

import { PostFavorites } from "../entities/PostFavorites";

class PostFavoritesRepository implements IPostFavoritesRepository {
  private repository: Repository<PostFavorites>;

  constructor() {
    this.repository = getRepository(PostFavorites);
  }

  async create(user_id: string, post_id: string): Promise<PostFavorites> {
    const postFavorite = this.repository.create({
      user_id,
      post_id,
    });

    await this.repository.save(postFavorite);

    return postFavorite;
  }

  async findByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<boolean> {
    const favorite = await this.repository.findOne({ user_id, post_id });

    if (favorite) return true;
    return false;
  }

  async deleteByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<void> {
    await this.repository.delete({ user_id, post_id });
  }
}

export { PostFavoritesRepository };
