import { PostFavorites } from "../infra/typeorm/entities/PostFavorites";

interface IPostFavoritesRepository {
  create(user_id: string, post_id: string): Promise<PostFavorites>;
  findByUserIdAndPostId(user_id: string, post_id: string): Promise<boolean>;
  deleteByUserIdAndPostId(user_id: string, post_id: string): Promise<void>;
}

export { IPostFavoritesRepository };
