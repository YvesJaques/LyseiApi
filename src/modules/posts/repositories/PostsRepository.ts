import { getRepository, Repository } from "typeorm";

import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { Post } from "../infra/typeorm/entities/Post";
import { IPostsRepository } from "./IPostsRepository";

class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async create({
    title,
    description,
    author_id,
    state,
    city,
    district,
    street,
    picture,
    video,
    number,
    latitude,
    longitude,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.repository.create({
      title,
      description,
      author_id,
      state,
      city,
      district,
      street,
      picture,
      video,
      number,
      latitude,
      longitude,
    });

    await this.repository.save(post);

    return post;
  }

  async findById(id: string): Promise<Post> {
    const post = await this.repository.findOne({ id });
    return post;
  }

  async findByCityAndState(city: string, state: string): Promise<Post> {
    const post = await this.repository
      .createQueryBuilder("post")
      .where("post.city = :city", { city })
      .andWhere("post.state = :state", { state })
      .getOne();

    return post;
  }

  async updateSolved(id: string, solved: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ solved })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { PostsRepository };
