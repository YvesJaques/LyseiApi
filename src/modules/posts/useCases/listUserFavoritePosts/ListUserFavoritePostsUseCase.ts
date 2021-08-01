import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
class ListUserFavoritePostsUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute(user_id: string): Promise<Post[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exist!");
    let posts: Post[] = [];

    posts = await this.postsRepository.listUserFavoritePosts(user_id);

    posts.forEach(post => {
      post.images.forEach(image => {
        switch (process.env.disk) {
          case "local":
            image.image_name = `${process.env.APP_API_URL}/posts/${image.image_name}`;
            break;
          case "s3":
            image.image_name = `${process.env.AWS_BUCKET_URL}/posts/${image.image_name}`;
            break;
          default:
        }
      });

      if (post.author.avatar) {
        switch (process.env.disk) {
          case "local":
            post.author.avatar = `${process.env.APP_API_URL}/avatar/${post.author.avatar}`;
            break;
          case "s3":
            post.author.avatar = `${process.env.AWS_BUCKET_URL}/avatar/${post.author.avatar}`;
            break;
          default:
        }
      }
    });

    return posts;
  }
}

export { ListUserFavoritePostsUseCase };
