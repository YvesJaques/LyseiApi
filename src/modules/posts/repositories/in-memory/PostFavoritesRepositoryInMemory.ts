import { PostFavorites } from "@modules/posts/infra/typeorm/entities/PostFavorites";
import { IPostFavoritesRepository } from "@modules/posts/repositories/IPostFavoritesRepository";

class PostFavoritesRepositoryInMemory implements IPostFavoritesRepository {
  postFavorites: PostFavorites[] = [];

  async create(user_id: string, post_id: string): Promise<PostFavorites> {
    const postFavorite = new PostFavorites();

    Object.assign(postFavorite, {
      user_id,
      post_id,
    });

    this.postFavorites.push(postFavorite);

    return postFavorite;
  }

  async findByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<boolean> {
    const postFavorite = this.postFavorites.find(
      postFavorite =>
        postFavorite.user_id === user_id && postFavorite.post_id === post_id,
    );

    if (postFavorite) return true;
    return false;
  }

  async deleteByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<void> {
    const postFavorite = this.postFavorites.find(
      pl => pl.user_id === user_id && pl.post_id === post_id,
    );
    this.postFavorites.splice(this.postFavorites.indexOf(postFavorite));
  }
}

export { PostFavoritesRepositoryInMemory };
