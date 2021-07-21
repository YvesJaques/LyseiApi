import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { PostLikes } from "@modules/posts/infra/typeorm/entities/PostLikes";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => User, User => User.name)
  @JoinColumn({ name: "author_id" })
  public author: User;

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

  @OneToMany(() => PostLikes, postLikes => postLikes.post)
  public userLiked: PostLikes[];

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
