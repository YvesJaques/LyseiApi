import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { Post } from "@modules/posts/infra/typeorm/entities/Post";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePostUseCase {
  constructor(
    @inject("PostsRepository")
    private postsRepository: IPostsRepository,
  ) {}

  async execute({
    title,
    description,
    author_id,
    state,
    city,
    district,
    street,
    number,
    latitude,
    longitude,
  }: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.create({
      title,
      description,
      author_id,
      state,
      city,
      district,
      street,
      number,
      latitude,
      longitude,
    });

    return post;
  }
}

export { CreatePostUseCase };
