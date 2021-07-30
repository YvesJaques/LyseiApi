import { User } from "@modules/accounts/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Post } from "./Post";

@Entity("posts_favorites")
class PostFavorites {
  @PrimaryColumn()
  id: string;

  @Column()
  post_id: string;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "posts_favorites",
    joinColumns: [{ name: "post_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  users: User[];

  @ManyToOne(() => Post)
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

export { PostFavorites };
