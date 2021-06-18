import { IPostsImagesRepository } from "@modules/posts/repositories/IPostsImagesRepository";
import { getRepository, Repository } from "typeorm";

import { PostImage } from "../entities/PostImage";

class PostsImagesRepository implements IPostsImagesRepository {
  private repository: Repository<PostImage>;

  constructor() {
    this.repository = getRepository(PostImage);
  }

  async create(post_id: string, image_name: string): Promise<PostImage> {
    const postImage = this.repository.create({
      post_id,
      image_name,
    });

    await this.repository.save(postImage);

    return postImage;
  }

  async findByPostId(post_id: string): Promise<PostImage[]> {
    const images = await this.repository.find({ post_id });
    return images;
  }

  async deleteByPostId(post_id: string): Promise<void> {
    await this.repository.delete({ post_id });
  }
}

export { PostsImagesRepository };
