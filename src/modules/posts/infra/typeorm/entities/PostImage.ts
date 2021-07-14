import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Post } from "./Post";

@Entity("posts_images")
class PostImage {
  @PrimaryColumn()
  id: string;

  @Column()
  post_id: string;

  @Column()
  image_name: string;

  @ManyToOne(() => Post, post => post.images)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { PostImage };
