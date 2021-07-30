import { ICreatePostDTO } from "@modules/posts/dtos/ICreatePostDTO";
import { IPostsRepository } from "@modules/posts/repositories/IPostsRepository";
import { getRepository, Repository } from "typeorm";

import { Post } from "../entities/Post";

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
      number,
      latitude,
      longitude,
    });

    await this.repository.save(post);

    return post;
  }

  async findById(id: string): Promise<Post> {
    const post = await this.repository.findOne(id, {
      relations: ["images"],
    });
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

  async likeById(id: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder()
      .from(Post, "posts")
      .update(Post)
      .set({ likes: () => "likes + 1" })
      .where("posts.id = :id", { id })
      .returning("likes")
      .updateEntity(true)
      .execute();

    const { likes } = result.raw[0];

    return likes;
  }

  async disLikeById(id: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder()
      .from(Post, "posts")
      .update(Post)
      .set({ likes: () => "likes - 1" })
      .where("posts.id = :id", { id })
      .returning("likes")
      .updateEntity(true)
      .execute();

    const { likes } = result.raw[0];

    return likes;
  }

  async listPostsByStateAndCity(
    user_id: string,
    state: string,
    city: string,
  ): Promise<Post[]> {
    const posts = await this.repository
      .createQueryBuilder("posts")
      .select([
        "posts",
        "images.image_name",
        "users.name",
        "users.avatar",
        "posts_likes.created_at",
        "posts_favorites.created_at",
      ])
      .where("posts.state = :state", { state })
      .andWhere("posts.city = :city", { city })
      .leftJoin("posts.images", "images")
      .leftJoin("posts.author", "users")
      .leftJoin(
        "posts.userLiked",
        "posts_likes",
        "posts_likes.user_id = :user_id",
        { user_id },
      )
      .leftJoin(
        "posts.userFavorited",
        "posts_favorites",
        "posts_favorites.user_id = :user_id",
        { user_id },
      )
      .getMany();

    return posts;
  }

  async listPosts(): Promise<Post[]> {
    const posts = await this.repository.find({ relations: ["images"] });
    return posts;
  }
}

export { PostsRepository };
