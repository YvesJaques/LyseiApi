import { PostImage } from "../infra/typeorm/entities/PostImage";

interface IPostsImagesRepository {
  create(post_id: string, image_name: string): Promise<PostImage>;
  findByPostId(postd_id: string): Promise<PostImage[]>;
  deleteByPostId(post_id: string): Promise<void>;
}

export { IPostsImagesRepository };
