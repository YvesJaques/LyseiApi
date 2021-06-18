import { PostLikes } from "../infra/typeorm/entities/PostLikes";

interface IPostLikesRepository {
  create(user_id: string, post_id: string): Promise<PostLikes>;
  findByUserIdAndPostId(user_id: string, post_id: string): Promise<boolean>;
  deleteByUserIdAndPostId(user_id: string, post_id: string): Promise<void>;
}

export { IPostLikesRepository };
