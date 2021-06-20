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

  async findByPostId(post_id: string): Promise<string[]> {
    const postImages = await this.repository.find({ post_id });

    const imagesUrls: string[] = [];

    if (process.env.disk === "local") {
      postImages.forEach(image => {
        imagesUrls.push(`${process.env.APP_API_URL}/posts/${image.image_name}`);
      });
    } else if (process.env.disk === "s3") {
      postImages.forEach(image => {
        imagesUrls.push(
          `${process.env.AWS_BUCKET_URL}/posts/${image.image_name}`,
        );
      });
    }

    return imagesUrls;
  }

  async deleteByPostId(post_id: string): Promise<void> {
    await this.repository.delete({ post_id });
  }
}

export { PostsImagesRepository };
