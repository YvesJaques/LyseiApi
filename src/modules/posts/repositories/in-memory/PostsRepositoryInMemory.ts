import { ICreatePostDTO } from "../../dtos/ICreatePostDTO";
import { Post } from "../../infra/typeorm/entities/Post";
import { IPostsRepository } from "../IPostsRepository";

class PostsRepositoryInMemory implements IPostsRepository {
  posts: Post[] = [];

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
    const post = new Post();

    Object.assign(post, {
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

    this.posts.push(post);

    return post;
  }

  async findByCityAndState(city: string, state: string): Promise<Post> {
    const post = this.posts.find(
      post => post.state === state && post.city === city,
    );

    return post;
  }

  async findById(id: string): Promise<Post> {
    return this.posts.find(post => post.id === id);
  }

  async updateSolved(id: string, solved: boolean): Promise<void> {
    const post = this.posts.find(post => post.id === id);

    post.solved = solved;
  }

  async likeById(id: string): Promise<number> {
    const post = this.posts.find(post => post.id === id);

    post.likes += 1;

    return post.likes;
  }

  async disLikeById(id: string): Promise<number> {
    const post = this.posts.find(post => post.id === id);

    post.likes -= 1;

    return post.likes;
  }

  async listPostsByStateAndCity(state: string, city: string): Promise<Post[]> {
    const posts = this.posts.filter(
      post => post.state === state && post.city === city,
    );

    return posts;
  }

  async listPosts(): Promise<Post[]> {
    return this.posts;
  }
}

export { PostsRepositoryInMemory };
