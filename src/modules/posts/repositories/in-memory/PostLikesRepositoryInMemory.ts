import { PostLikes } from "@modules/posts/infra/typeorm/entities/PostLikes";
import { IPostLikesRepository } from "@modules/posts/repositories/IPostLikesRepository";

class PostLikesRepositoryInMemory implements IPostLikesRepository {
  postLikes: PostLikes[] = [];

  async create(user_id: string, post_id: string): Promise<PostLikes> {
    const postLike = new PostLikes();

    Object.assign(postLike, {
      user_id,
      post_id,
    });

    this.postLikes.push(postLike);

    return postLike;
  }

  async findByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<boolean> {
    const postLike = this.postLikes.find(
      postLike => postLike.user_id === user_id && postLike.post_id === post_id,
    );

    if (postLike) return true;
    return false;
  }

  async deleteByUserIdAndPostId(
    user_id: string,
    post_id: string,
  ): Promise<void> {
    const postLike = this.postLikes.find(
      pl => pl.user_id === user_id && pl.post_id === post_id,
    );
    this.postLikes.splice(this.postLikes.indexOf(postLike));
  }
}

export { PostLikesRepositoryInMemory };
