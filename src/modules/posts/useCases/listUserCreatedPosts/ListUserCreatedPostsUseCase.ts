import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserCreatedPostsUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute(user_id: string): Promise<Post[]> {
    let posts: Post[] = [];

    posts = await this.postsRepository.listUserCreatedPosts(user_id);

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

export { ListUserCreatedPostsUseCase };
