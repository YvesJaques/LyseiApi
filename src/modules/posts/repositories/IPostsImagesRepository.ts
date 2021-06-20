import { PostImage } from "../infra/typeorm/entities/PostImage";

interface IPostsImagesRepository {
  create(post_id: string, image_name: string): Promise<PostImage>;
  findByPostId(post_id: string): Promise<string[]>;
  deleteByPostId(post_id: string): Promise<void>;
}

export { IPostsImagesRepository };
