import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { PostImage } from "./PostImage";

@Entity("posts")
class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  solved: boolean;

  @Column()
  likes: number;

  @Column()
  author_id: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @OneToMany(() => PostImage, postImage => postImage.post)
  public images: PostImage[];

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Post };
