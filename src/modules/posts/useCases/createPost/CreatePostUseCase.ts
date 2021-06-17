import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
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
    picture,
    video,
    latitude,
    longitude,
  }: ICreatePostDTO): Promise<void> {
    await this.postsRepository.create({
      title,
      description,
      author_id,
      state,
      city,
      district,
      street,
      number,
      picture,
      video,
      latitude,
      longitude,
    });
  }
}

export { CreatePostUseCase };
