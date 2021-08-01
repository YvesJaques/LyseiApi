import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { Post } from "../infra/typeorm/entities/Post";

interface IPostsRepository {
  listUserFavoritePosts(user_id: string): Promise<Post[]>;
  listUserCreatedPosts(user_id: string): Promise<Post[]>;
  findByCityAndState(city: string, state: string): Promise<Post>;
  create(data: ICreatePostDTO): Promise<Post>;
  findById(id: string): Promise<Post>;
  updateSolved(id: string, solved: boolean): Promise<void>;
  likeById(id: string): Promise<number>;
  disLikeById(id: string): Promise<number>;
  listPosts(): Promise<Post[]>;
  listPostsByStateAndCity(
    user_id: string,
    state: string,
    city: string,
  ): Promise<Post[]>;
}

export { IPostsRepository };
